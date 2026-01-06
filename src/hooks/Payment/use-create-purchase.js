"use client";

import { useState } from "react";

import { fetcherBaseURL } from "@/lib/axios";

// Use mock data for development
const USE_MOCK = false;

// Mock API result
const MOCK_DATA = {
  Message: {
    Code: 200,
    Text: "OK",
  },
  Data: {
    id: "9a61a632-24d1-4814-85eb-a6870cf62057",
    transactionId: "INV/202601/SMP/98339",
    packageId: "1e45854b-c0e6-4d92-b079-48ec60b46723",
    packageName: "coba sekali lagi di ubah",
    price: 1000,
    adminFee: 1000,
    totalPrice: 2000,
    status: "pending",
    paymentId: "501769ac-d6f6-41e7-bf3a-2772f62f5798",
    paymentUrl: null,
    snapToken: null,
    vaNumber: "80611089876543217",
    qrImage: null,
    expiresAt: "2026-01-03T10:29:38.677Z",
    message: "Silakan lakukan pembayaran untuk menyelesaikan transaksi",
  },
  Type: "/v1/tm/buyer_subscription/purchase",
};

export const useCreatePurchase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPurchase = async ({ packageId, paymentMethodId }) => {
    setIsLoading(true);
    setError(null);

    try {
      let data;
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        data = MOCK_DATA.Data;
      } else {
        const response = await fetcherBaseURL.post(
          "/v1/tm/buyer_subscription/purchase",
          {
            packageId,
            paymentMethodId,
          }
        );
        data = response.data.Data;
      }
      return data;
    } catch (err) {
      console.error("Purchase error:", err);
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createPurchase,
    isLoading,
    error,
  };
};
