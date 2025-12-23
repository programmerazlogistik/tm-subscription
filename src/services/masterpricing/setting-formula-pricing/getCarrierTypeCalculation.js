import useSWR from "swr";

import { fetcherMock, fetcherMuatrans } from "@/lib/axios";

const isMockCarrierTypeCalculation = false;

export const fetcherCarrierTypeCalculation = async (url, { arg }) => {
  if (isMockCarrierTypeCalculation) {
    const result = await fetcherMock.get(`/api/${url}`, arg ?? null);
    return result.data;
  }
  const result = await fetcherMuatrans.get(url, arg);
  return result.data;
};

export const useGetCarrierTypeCalculation = (truckTypeId) => {
  // Only fetch if truckTypeId is provided and not empty
  const shouldFetch = truckTypeId && truckTypeId.trim() !== "";

  const url = shouldFetch
    ? `v1/bo/pricing/setting/formula-pricing/calculation/carrier-type?truckTypeId=${truckTypeId}`
    : null;

  return useSWR(
    url ? `carrierTypeCalculation-${truckTypeId}` : null,
    () => fetcherCarrierTypeCalculation(url, { arg: null }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      // Don't retry on error to avoid spamming the API
      errorRetryCount: 1,
      // Cache for 5 minutes since truck types don't change frequently
      dedupingInterval: 300000,
    }
  );
};
