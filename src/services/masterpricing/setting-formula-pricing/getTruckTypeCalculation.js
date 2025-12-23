import useSWR from "swr";

import { fetcherMock, fetcherMuatrans } from "@/lib/axios";

const isMockTruckTypeCalculation = false;

export const fetcherTruckTypeCalculation = async (url, { arg }) => {
  if (isMockTruckTypeCalculation) {
    const result = await fetcherMock.get(`/api/${url}`, arg ?? null);
    return result.data;
  }
  const result = await fetcherMuatrans.get(url, arg);
  return result.data;
};

/**
 * SWR hook for fetching available truck types based on formula and route
 * @param {string} formulaId - The formula ID
 * @param {string} routePricingId - The route pricing ID
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetTruckTypeCalculation = (
  formulaId,
  routePricingId,
  options = {}
) => {
  // Build query string
  const queryParams = new URLSearchParams();
  if (formulaId) queryParams.append("formulaId", formulaId);
  if (routePricingId) queryParams.append("routePricingId", routePricingId);

  const queryString = queryParams.toString();
  const url = `v1/bo/pricing/setting/formula-pricing/calculation/truck-type${queryString ? `?${queryString}` : ""}`;

  // Create a unique key for SWR that includes all parameters
  // Only fetch if both formulaId and routePricingId are provided
  const swrKey =
    formulaId && routePricingId
      ? `truckTypeCalculation-${formulaId}-${routePricingId}`
      : null;

  return useSWR(swrKey, () => fetcherTruckTypeCalculation(url, { arg: null }), {
    // Default SWR options
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    ...options,
  });
};
