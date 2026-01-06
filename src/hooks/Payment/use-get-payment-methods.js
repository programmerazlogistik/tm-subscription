"use client";

import { useTokenStore } from "@muatmuat/lib/auth-adapter";
import useSWR from "swr";

import { fetcherPayment } from "@/lib/axios";

// Use mock data for development since server data is not available yet
const USE_MOCK = false;

// Mock API result for development/testing
export const MOCK_DATA = {
  Message: {
    Code: 200,
    Text: "OK",
  },
  Data: [
    {
      channel: "VA",
      category: "Transfer Virtual Account",
      icon: "https://azlogistik.s3.ap-southeast-3.amazonaws.com/dev/file-1758177893240.webp",
      methods: [
        {
          id: "874df675-a424-4e41-a2b4-07b8c05b6c2f",
          name: "Permata Virtual Account",
          code: "permata",
          icon: "https://azlogistik.s3.ap-southeast-3.amazonaws.com/dev/file-1736740165999.webp",
          paymentType: "permata",
          fee: "4000.00",
          feeUnit: "currency",
          additionalFee: "0.00",
          subsidy: "3000.00",
          subsidyUnit: "currency",
          additionalSubsidy: "0.00",
          targetFee: "0.00",
          targetFeeStatus: false,
        },
        {
          id: "1a7097be-a91e-40c9-a181-3b3812e31b0c",
          name: "CIMB Virtual Account",
          code: "cimb",
          icon: "https://azlogistik.s3.ap-southeast-3.amazonaws.com/dev/file-1736740196710.webp",
          paymentType: "bank_transfer",
          fee: "4000.00",
          feeUnit: "currency",
          additionalFee: "0.00",
          subsidy: "3000.00",
          subsidyUnit: "currency",
          additionalSubsidy: "0.00",
          targetFee: "0.00",
          targetFeeStatus: false,
        },
        {
          id: "83351a03-b112-4320-b7df-a59d0cd91876",
          name: "BRI Virtual Account",
          code: "bri",
          icon: "https://azlogistik.s3.ap-southeast-3.amazonaws.com/dev/file-1736740241479.webp",
          paymentType: "bank_transfer",
          fee: "4000.00",
          feeUnit: "currency",
          additionalFee: "0.00",
          subsidy: "3000.00",
          subsidyUnit: "currency",
          additionalSubsidy: "0.00",
          targetFee: "0.00",
          targetFeeStatus: false,
        },
        {
          id: "d2aa95f5-6b8e-4272-b922-624234c443a3",
          name: "BCA Virtual Account",
          code: "bca",
          icon: "https://azlogistik.s3.ap-southeast-3.amazonaws.com/dev/file-1736740281046.webp",
          paymentType: "bank_transfer",
          fee: "4000.00",
          feeUnit: "currency",
          additionalFee: "0.00",
          subsidy: "3000.00",
          subsidyUnit: "currency",
          additionalSubsidy: "0.00",
          targetFee: "0.00",
          targetFeeStatus: false,
        },
        {
          id: "9cb40c45-4145-45df-9b29-39db93978650",
          name: "Mandiri Virtual Account",
          code: "mandiri",
          icon: "https://azlogistik.s3.ap-southeast-3.amazonaws.com/dev/file-1736740259536.webp",
          paymentType: "echannel",
          fee: "4000.00",
          feeUnit: "currency",
          additionalFee: "0.00",
          subsidy: "3000.00",
          subsidyUnit: "currency",
          additionalSubsidy: "0.00",
          targetFee: "0.00",
          targetFeeStatus: false,
        },
        {
          id: "06ee2880-ddb9-4add-860a-51de97b17a31",
          name: "BNI Virtual Account",
          code: "bni",
          icon: "https://azlogistik.s3.ap-southeast-3.amazonaws.com/dev/file-1736740223222.webp",
          paymentType: "bank_transfer",
          fee: "4000.00",
          feeUnit: "currency",
          additionalFee: "0.00",
          subsidy: "3000.00",
          subsidyUnit: "currency",
          additionalSubsidy: "0.00",
          targetFee: "0.00",
          targetFeeStatus: false,
        },
      ],
    },
    {
      channel: "CREDIT_CARD",
      category: "Kartu Kredit",
      icon: "https://azlogistik.s3.ap-southeast-3.amazonaws.com/dev/file-1739244052489.webp",
      methods: [
        {
          id: "e558c153-a618-4d14-ab8b-b6210e1b3c3a",
          name: "Credit Card",
          code: "credit_card",
          icon: "https://azlogistik.s3.ap-southeast-3.amazonaws.com/undefined/file-1739244052489.webp",
          paymentType: "credit_card",
          fee: "2.90",
          feeUnit: "percentage",
          additionalFee: "2000.00",
          subsidy: "0.00",
          subsidyUnit: "currency",
          additionalSubsidy: "0.00",
          targetFee: "1000.00",
          targetFeeStatus: true,
        },
      ],
    },
    {
      channel: "QRIS",
      category: "QRIS",
      icon: "https://azlogistik.s3.ap-southeast-3.amazonaws.com/dev/file-1739244052489.webp",
      methods: [
        {
          id: "82f6d054-b81e-4fb7-9af1-0cfb98757e19",
          name: "QRIS",
          code: "qris",
          icon: "https://azlogistik.s3.ap-southeast-3.amazonaws.com/undefined/file-1739245433414.webp",
          paymentType: "qris",
          fee: "0.70",
          feeUnit: "percentage",
          additionalFee: "0.00",
          subsidy: "0.00",
          subsidyUnit: "currency",
          additionalSubsidy: "0.00",
          targetFee: "1000.00",
          targetFeeStatus: true,
        },
      ],
    },
    {
      channel: "TRANSFER_BANK",
      category: "Transfer Bank",
      icon: "https://azlogistik.s3.ap-southeast-3.amazonaws.com/muatparts-plus/domestic/photo-1764919687234.webp",
      methods: [
        {
          id: "db5b6535-9954-4056-9db8-baaa6012cff5",
          name: "Transfer Bank BCA",
          code: "bca_transfer_bank",
          icon: "https://azlogistik.s3.ap-southeast-3.amazonaws.com/dev/file-1736740281046.webp",
          paymentType: "bank_transfer",
          fee: "0.00",
          feeUnit: "currency",
          additionalFee: "0.00",
          subsidy: "0.00",
          subsidyUnit: "currency",
          additionalSubsidy: "0.00",
          targetFee: "0.00",
          targetFeeStatus: false,
        },
      ],
    },
  ],
  Type: "/v1/payment/methods",
};

// Fetcher function
export const getPaymentMethods = async () => {
  let result;
  if (USE_MOCK) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    result = { data: MOCK_DATA };
  } else {
    result = await fetcherPayment.get("/v1/payment/methods");
  }
  return result.data;
};

// Hook for fetching payment methods
export const useGetPaymentMethods = () => {
  const accessToken = useTokenStore((state) => state.accessToken);

  return useSWR(
    accessToken ? "get-payment-methods" : null,
    () => getPaymentMethods(),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
};
