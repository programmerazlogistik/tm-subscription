import useSWR from "swr";

import { fetcherMock, fetcherMuatrans } from "@/lib/axios";

const isMockMasterPricingSettingFormulaPricingHistory = false;

export const fetcherMasterPricingSettingFormulaPricingHistory = async (
  url,
  { arg }
) => {
  if (isMockMasterPricingSettingFormulaPricingHistory) {
    const result = await fetcherMock.get(`/api/${url}`, arg ?? null);
    return result.data;
  }
  const result = await fetcherMuatrans.get(url, arg);
  return result.data;
};

export const useGetMasterPricingSettingFormulaPricingHistory = (url) => {
  return useSWR(
    url ? `masterPricingSettingFormulaPricingHistory-${url}` : null,
    () => fetcherMasterPricingSettingFormulaPricingHistory(url, { arg: null })
  );
};

// Enhanced hook with query parameters (for pagination)
export const useGetMasterPricingSettingFormulaPricingHistoryWithParams = (
  params = {}
) => {
  const { page = 1, limit = 10 } = params;

  // Build query string
  const queryParams = new URLSearchParams();
  if (page) queryParams.append("page", page);
  if (limit) queryParams.append("limit", limit);

  const queryString = queryParams.toString();
  const url = `v1/bo/pricing/setting/formula-pricing/history${queryString ? `?${queryString}` : ""}`;

  // Create a unique key for SWR that includes all parameters
  const swrKey = `masterPricingSettingFormulaPricingHistory-${JSON.stringify(params)}`;

  return useSWR(swrKey, () =>
    fetcherMasterPricingSettingFormulaPricingHistory(url, { arg: null })
  );
};
