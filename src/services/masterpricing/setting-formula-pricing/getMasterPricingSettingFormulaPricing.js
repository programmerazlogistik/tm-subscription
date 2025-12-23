

import { fetcherMock, fetcherMuatrans } from "@/lib/axios";
import useSWR from "swr";

const isMockMasterPricingSettingFormulaPricing = false;

export const fetcherMasterPricingSettingFormulaPricing = async (
  url,
  { arg }
) => {
  if (isMockMasterPricingSettingFormulaPricing) {
    const result = await fetcherMock.get(`/api/${url}`, arg ?? null);
    return result.data;
  }
  const result = await fetcherMuatrans.get(url, arg);
  return result.data;
};

export const useGetMasterPricingSettingFormulaPricing = (url) => {
  return useSWR(url ? `masterPricingSettingFormulaPricing-${url}` : null, () =>
    fetcherMasterPricingSettingFormulaPricing(url, { arg: null })
  );
};

// Enhanced hook with query parameters (for filtering and search)
export const useGetMasterPricingSettingFormulaPricingWithParams = (
  params = {}
) => {
  const { search = "", status = "" } = params;

  // Build query string
  const queryParams = new URLSearchParams();
  if (search) queryParams.append("search", search);
  if (status) queryParams.append("status", status);

  const queryString = queryParams.toString();
  const url = `v1/bo/pricing/setting/formula-pricing${queryString ? `?${queryString}` : ""}`;

  // Create a unique key for SWR that includes all parameters
  const swrKey = `masterPricingSettingFormulaPricing-${JSON.stringify(params)}`;

  return useSWR(swrKey, () =>
    fetcherMasterPricingSettingFormulaPricing(url, { arg: null })
  );
};
