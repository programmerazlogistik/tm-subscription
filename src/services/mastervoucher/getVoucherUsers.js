// Mock API result for development/testing
export const mockAPIResult = {
  data: {
    Message: {
      Code: 200,
      Text: "OK",
    },
    Data: {
      users: [
        {
          id: 99,
          phoneNumber: "085954588332",
          fullName: "Trang Hai Phong ☭",
          email: "kevin.sutandijaya@azlogistik.net",
        },
        {
          id: 148,
          phoneNumber: "0812300134591",
          fullName: "Fenita Roji",
          email: "fenitaroji@yopmail.com",
        },
        {
          id: 200,
          phoneNumber: "081236632731",
          fullName: "John Doe",
          email: "john.doe@example.com",
        },
        {
          id: 201,
          phoneNumber: "081234654673",
          fullName: "Jane Smith",
          email: "jane.smith@example.com",
        },
        {
          id: 202,
          phoneNumber: "085737737171",
          fullName: "Alice Johnson",
          email: "alice.johnson@example.com",
        },
      ],
      pagination: {
        page: 1,
        totalPages: 40,
        totalItems: 3918,
        itemsPerPage: 100,
      },
    },
    Type: "/v1/bo/vouchers/users",
  },
};

import useSWR from "swr";
import { fetcherMuatransCS } from "@/lib/fetcherBasicAuth";
import { fetcherMuatrans } from "@/lib/axios";

export const getVoucherUsers = async (params = {}, useFetcherMuatrans = false) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  // Filter out empty search param
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
  );
  const query = new URLSearchParams(filteredParams).toString();
  const url = `/v1/bo/vouchers/users${query ? `?${query}` : ""}`;
  const res = await fetcher.get(url);
  return res.data;
};

export const useGetVoucherUsers = (params = {}, useFetcherMuatrans = false) => {
  const key = [`/v1/bo/vouchers/users`, params, useFetcherMuatrans];
  return useSWR(key, () => getVoucherUsers(params, useFetcherMuatrans));
};