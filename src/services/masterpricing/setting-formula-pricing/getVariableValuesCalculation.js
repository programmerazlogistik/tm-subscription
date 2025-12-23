import useSWR from "swr";

import { fetcherMock, fetcherMuatrans } from "@/lib/axios";

const isMockVariableValuesCalculation = false;

export const fetcherVariableValuesCalculation = async (url, { arg }) => {
  if (isMockVariableValuesCalculation) {
    const result = await fetcherMock.get(`/api/${url}`, arg ?? null);
    return result.data;
  }
  const result = await fetcherMuatrans.get(url, arg);
  return result.data;
};

/**
 * SWR hook for fetching variable values for formula pricing calculation
 * @param {string} truckTypeId - The truck type ID (optional)
 * @param {string} formulaId - The formula ID (optional)
 * @param {string} routePricingId - The route pricing ID (optional)
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetVariableValuesCalculation = (
  truckTypeId = "",
  formulaId = "",
  routePricingId = "",
  options = {}
) => {
  // Build query string
  const queryParams = new URLSearchParams();
  if (truckTypeId) queryParams.append("truckTypeId", truckTypeId);
  if (formulaId) queryParams.append("formulaId", formulaId);
  if (routePricingId) queryParams.append("routePricingId", routePricingId);

  const queryString = queryParams.toString();
  const url = `v1/bo/pricing/setting/formula-pricing/calculation/variable-values${queryString ? `?${queryString}` : ""}`;

  // Create a unique key for SWR that includes all parameters
  // Only fetch if at least one parameter is provided
  const swrKey =
    truckTypeId || formulaId || routePricingId
      ? `variableValuesCalculation-${truckTypeId || "none"}-${formulaId || "none"}-${routePricingId || "none"}`
      : null;

  return useSWR(
    swrKey,
    () => fetcherVariableValuesCalculation(url, { arg: null }),
    {
      // Default SWR options
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      ...options,
    }
  );
};

/**
 * Enhanced hook with parameter object for better flexibility
 * @param {Object} params - Parameters object
 * @param {string} params.truckTypeId - The truck type ID (optional)
 * @param {string} params.formulaId - The formula ID (optional)
 * @param {string} params.routePricingId - The route pricing ID (optional)
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetVariableValuesCalculationWithParams = (
  params = {},
  options = {}
) => {
  const { truckTypeId = "", formulaId = "", routePricingId = "" } = params;

  return useGetVariableValuesCalculation(
    truckTypeId,
    formulaId,
    routePricingId,
    options
  );
};
