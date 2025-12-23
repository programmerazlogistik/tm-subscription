import { fetcherMuatrans } from "@/lib/axios";
import { fetcherMuatransCS } from "@/lib/fetcherBasicAuth";

// Configuration flag for fetcher selection
const useFetcherMuatrans = true;

/**
 * Save special pricing data
 * @param {Object} data - The data to save
 * @returns {Promise} - Axios response promise
 */
export const saveSpecialPricing = async (data) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.post("/v1/bo/pricing/setting/default/special", data);
};

/**
 * Transform form data to API request format
 * @param {Object} formData - The form data from AturDefaultPricingRuteKhususForm
 * @param {string} routePricingId - The route pricing ID
 * @param {string} routePricingSpecialId - The route pricing special ID
 * @param {Array} headTrucks - The head trucks data
 * @returns {Object} - Transformed data for API request
 */
export const transformFormDataToAPIRequest = (
  formData,
  routePricingId,
  routePricingSpecialId,
  headTrucks
) => {
  // Extract truck type data from form
  const truckTypes = Object.entries(formData)
    .filter(
      ([key, value]) =>
        key !== "effectiveDate" &&
        key !== "routeName" &&
        key !== "pricingType" &&
        value !== "" &&
        value !== null &&
        value !== undefined
    )
    .map(([truckTypeId, typePricingId]) => ({
      truckTypeId,
      typePricingId,
    }));

  // Group truck types by head truck
  const headTrucksWithTypes = headTrucks.map((headTruck) => ({
    headTruckId: headTruck.headTruckId,
    truckTypes: truckTypes.filter((truckType) =>
      headTruck.truckTypes.some((ht) => ht.id === truckType.truckTypeId)
    ),
  }));

  return {
    routePricingId,
    routePricingSpecialId,
    validFrom: formData.effectiveDate
      ? new Date(formData.effectiveDate).toISOString()
      : null,
    type: formData.pricingType,
    headTrucks: headTrucksWithTypes,
  };
};
