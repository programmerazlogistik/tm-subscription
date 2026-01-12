"use client";

import { useState } from "react";

import { fetcherTM } from "@/lib/axios";

export const useCancelPurchase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const cancelPurchase = async ({ purchaseId, cancelReason }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetcherTM.post(
        "/v1/tm/buyer_subscription/purchase/cancel",
        {
          purchaseId,
          cancelReason,
        }
      );
      return response.data.Data;
    } catch (err) {
      console.error("Cancel purchase error:", err);
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    cancelPurchase,
    isLoading,
    error,
  };
};
