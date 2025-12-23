import useSWR from "swr";

import { fetcherMuatrans } from "@/lib/axios";
import { fetcherMuatransCS } from "@/lib/fetcherBasicAuth";

// Mock API result for development/testing
export const mockAPIResult = {
  data: {
    Message: {
      Code: 200,
      Text: "OK",
    },
    Data: [
      {
        id: 11,
        name: "ACEH",
        cities: [
          {
            id: 1105,
            name: "KAB. ACEH BARAT",
          },
          {
            id: 1112,
            name: "KAB. ACEH BARAT DAYA",
          },
          {
            id: 1106,
            name: "KAB. ACEH BESAR",
          },
          {
            id: 1171,
            name: "KOTA BANDA ACEH",
          },
          {
            id: 1174,
            name: "KOTA LANGSA",
          },
        ],
      },
      {
        id: 12,
        name: "SUMATERA UTARA",
        cities: [
          {
            id: 1209,
            name: "KAB. ASAHAN",
          },
          {
            id: 1219,
            name: "KAB. BATU BARA",
          },
          {
            id: 1211,
            name: "KAB. DAIRI",
          },
          {
            id: 1271,
            name: "KOTA MEDAN",
          },
          {
            id: 1277,
            name: "KOTA PADANG SIDEMPUAN",
          },
        ],
      },
      {
        id: 31,
        name: "DKI JAKARTA",
        cities: [
          {
            id: 3171,
            name: "KOTA JAKARTA SELATAN",
          },
          {
            id: 3172,
            name: "KOTA JAKARTA TIMUR",
          },
          {
            id: 3173,
            name: "KOTA JAKARTA PUSAT",
          },
          {
            id: 3174,
            name: "KOTA JAKARTA BARAT",
          },
          {
            id: 3175,
            name: "KOTA JAKARTA UTARA",
          },
          {
            id: 3101,
            name: "KAB. KEPULAUAN SERIBU",
          },
        ],
      },
    ],
    Type: "/v1/bo/vouchers/locations",
  },
};

export const getVoucherLocations = async (useFetcherMuatrans = false) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  const url = `/v1/bo/vouchers/locations`;
  const res = await fetcher.get(url);
  return res.data;
};

export const useGetVoucherLocations = (useFetcherMuatrans = false) => {
  const key = [`/v1/bo/vouchers/locations`, useFetcherMuatrans];
  return useSWR(key, () => getVoucherLocations(useFetcherMuatrans));
};
