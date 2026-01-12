"use client";

import { useTokenStore } from "@muatmuat/lib/auth-adapter";
import useSWR from "swr";

import { fetcherTM } from "@/lib/axios";

export const getUsageHistory = async ({
  period = "all",
  page = 1,
  limit = 10,
  search = "",
  usageType = "",
} = {}) => {
  const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
  const usageTypeParam = usageType
    ? `&usageType=${encodeURIComponent(usageType)}`
    : "";
  const result = await fetcherTM.get(
    `/v1/tm/buyer_subscription/usage-history?period=${period}&page=${page}&limit=${limit}${searchParam}${usageTypeParam}`
  );
  return result.data;
};

export const useGetUsageHistory = ({
  period = "all",
  page = 1,
  limit = 10,
  search = "",
  usageType = "",
} = {}) => {
  const accessToken = useTokenStore((state) => state.accessToken);

  return useSWR(
    accessToken
      ? `get-usage-history?period=${period}&page=${page}&limit=${limit}&search=${search}&usageType=${usageType}`
      : null,
    () => getUsageHistory({ period, page, limit, search, usageType }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
};
