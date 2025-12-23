import useSWR from "swr";

import { fetcherMuatrans } from "@/lib/axios";
import { fetcherMuatransCS } from "@/lib/fetcherBasicAuth";

// Configuration flag for fetcher selection
const useFetcherMuatrans = true;

// Mock API result for development/testing
export const mockAPIResult = {
  Message: {
    Code: 200,
    Text: "OK",
  },
  Data: {
    id: "c80f6664-1cd6-43fc-a8d3-84e5bca259be",
    routePricingId: "731df77a-a9df-43df-9564-fba370e1d38c",
    routePricingSpecialId: "c80f6664-1cd6-43fc-a8d3-84e5bca259be",
    routePricingSpecialName: "KAB. ACEH BESAR - KAB. ACEH SINGKIL",
    type: "FIXED_PRICE",
    validFrom: "2025-09-20T00:00:00.000Z",
    truckTypes: [
      {
        truckTypeId: "550e8400-e29b-41d4-a716-446655440200",
        truckTypeName: "Colt Diesel Engkel",
        typePricingId: "bef711a6-7a1c-4625-a129-ed933f38ce9e",
        typePricingName: "High",
      },
      {
        truckTypeId: "550e8400-e29b-41d4-a716-446655440201",
        truckTypeName: "Colt Diesel Double",
        typePricingId: "749d58ea-eb6a-45b4-a19f-9da61aeead67",
        typePricingName: "Medium",
      },
      {
        truckTypeId: "550e8400-e29b-41d4-a716-446655440202",
        truckTypeName: "Medium Truk Rigid 4 x 2",
        typePricingId: "67ff9e7e-d3cb-48fe-8a1e-3b492915ce54",
        typePricingName: "Low edit",
      },
      {
        truckTypeId: "550e8400-e29b-41d4-a716-446655440203",
        truckTypeName: "Medium Truk 6 x 2 (Rigid)",
        typePricingId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        typePricingName: "Premium",
      },
      {
        truckTypeId: "550e8400-e29b-41d4-a716-446655440204",
        truckTypeName: "Medium Truck Rigid 6 x 4",
        typePricingId: "b2c3d4e5-f6g7-8901-bcde-f23456789012",
        typePricingName: "Standard",
      },
      {
        truckTypeId: "550e8400-e29b-41d4-a716-446655440205",
        truckTypeName: "Medium truck 4 x 2 + gandengan",
        typePricingId: "c3d4e5f6-g7h8-9012-cdef-345678901234",
        typePricingName: "Basic",
      },
      {
        truckTypeId: "550e8400-e29b-41d4-a716-446655440207",
        truckTypeName: "Tractor Head 4 x 2",
        typePricingId: "d4e5f6g7-h8i9-0123-defg-456789012345",
        typePricingName: "Enterprise",
      },
      {
        truckTypeId: "550e8400-e29b-41d4-a716-446655440208",
        truckTypeName: "Tractor head 6 x 4",
        typePricingId: "e5f6g7h8-i9j0-1234-efgh-567890123456",
        typePricingName: "Starter",
      },
    ],
    isActive: true,
    createdAt: "2025-09-19T01:44:50.283Z",
    createdBy: "Backend BO GM",
  },
  Type: "/v1/bo/pricing/setting/default/special/c80f6664-1cd6-43fc-a8d3-84e5bca259be",
};

/**
 * Fetcher function to get special pricing detail by ID
 * @param {string} url - The API endpoint URL
 * @returns {Promise} - Axios response promise
 */
export const getSpecialDetail = async (url) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.get(url);
};

/**
 * SWR hook for fetching special pricing detail
 * @param {string} id - The special pricing ID to fetch
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetSpecialDetail = (id, options = {}) => {
  const cacheKey = id ? `/v1/bo/pricing/setting/default/special/${id}` : null;

  return useSWR(cacheKey, getSpecialDetail, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    ...options,
  });
};

/**
 * Get special pricing detail with mock data for development
 * @param {string} id - The special pricing ID to fetch
 * @returns {Promise} - Mock data promise
 */
export const getSpecialDetailMock = async (id) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // If id is provided, filter mock data accordingly
  if (id) {
    return {
      ...mockAPIResult,
      Data: {
        ...mockAPIResult.Data,
        id: id,
      },
    };
  }

  return mockAPIResult;
};
