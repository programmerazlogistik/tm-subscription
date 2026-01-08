"use client";

import { useTokenStore } from "@muatmuat/lib/auth-adapter";
import useSWR from "swr";

import { fetcherTM } from "@/lib/axios";

export const getActivePackages = async ({
  page = 1,
  limit = 10,
  search = "",
  sort = "DESC",
} = {}) => {
  const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
  const sortParam = sort ? `&sort=${sort}` : "";
  const result = await fetcherTM.get(
    `/v1/tm/buyer_subscription/active-packages?page=${page}&limit=${limit}${searchParam}${sortParam}`
  );
  return result.data;
};

export const useGetActivePackages = ({
  page = 1,
  limit = 10,
  search = "",
  sort = "DESC",
} = {}) => {
  const accessToken = useTokenStore((state) => state.accessToken);

  return useSWR(
    accessToken
      ? `get-active-packages?page=${page}&limit=${limit}&search=${search}&sort=${sort}`
      : null,
    () => getActivePackages({ page, limit, search, sort }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
};
