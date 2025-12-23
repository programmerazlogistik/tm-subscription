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
        id: "874df675-a424-4e41-a2b4-07b8c05b6c2f",
        name: "Permata Virtual Account",
        method: "VA",
        institution: "permata",
      },
      {
        id: "1a7097be-a91e-40c9-a181-3b3812e31b0c",
        name: "CIMB Virtual Account",
        method: "VA",
        institution: "cimb",
      },
      {
        id: "83351a03-b112-4320-b7df-a59d0cd91876",
        name: "BRI Virtual Account",
        method: "VA",
        institution: "bri",
      },
      {
        id: "39cf6f00-bf62-4ba6-a50f-3fb8239455c4",
        name: "Alfamart/Alfamidi/Lawson/DanDan",
        method: "OUTLET",
        institution: "alfamart",
      },
      {
        id: "3908df88-0a6a-4a4a-90ea-6643356c4d61",
        name: "Gopay",
        method: "E-WALLET",
        institution: "gopay",
      },
      {
        id: "0f154406-0e83-4837-b180-f4e900dd035b",
        name: "ShopeePay",
        method: "E-WALLET",
        institution: "shopeepay",
      },
      {
        id: "55b6b81f-f761-48e4-a37b-bf6ae7b947da",
        name: "Dana",
        method: "E-WALLET",
        institution: "dana",
      },
      {
        id: "62532917-1b78-47b4-947b-c4a44a1732b3",
        name: "Akulaku",
        method: "CARDLESS_CREDIT",
        institution: "akulaku",
      },
      {
        id: "cf4b1aec-3b41-4b88-a956-b48123dd0cfb",
        name: "Kredivo",
        method: "CARDLESS_CREDIT",
        institution: "kredivo",
      },
      {
        id: "e823fb6e-0b54-46a2-bee0-c639a9c6f4a5",
        name: "Indomart/Ceriamart",
        method: "OUTLET",
        institution: "indomart",
      },
      {
        id: "d2aa95f5-6b8e-4272-b922-624234c443a3",
        name: "BCA Virtual Account",
        method: "VA",
        institution: "bca",
      },
      {
        id: "9cb40c45-4145-45df-9b29-39db93978650",
        name: "Mandiri Virtual Account",
        method: "VA",
        institution: "mandiri",
      },
      {
        id: "06ee2880-ddb9-4add-860a-51de97b17a31",
        name: "BNI Virtual Account",
        method: "VA",
        institution: "bni",
      },
      {
        id: "82f6d054-b81e-4fb7-9af1-0cfb98757e19",
        name: "QRIS",
        method: "QRIS",
        institution: "qris",
      },
      {
        id: "e558c153-a618-4d14-ab8b-b6210e1b3c3a",
        name: "Credit Card",
        method: "CREDIT_CARD",
        institution: "credit_card",
      },
    ],
    Type: "/v1/bo/vouchers/payment-methods",
  },
};

export const getVoucherPaymentMethods = async (useFetcherMuatrans = false) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  const url = `/v1/bo/vouchers/payment-methods`;
  const res = await fetcher.get(url);
  return res.data;
};

export const useGetVoucherPaymentMethods = (useFetcherMuatrans = false) => {
  const key = [`/v1/bo/vouchers/payment-methods`, useFetcherMuatrans];
  return useSWR(key, () => getVoucherPaymentMethods(useFetcherMuatrans));
};
