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
    type: "FIXED_PRICE",
    isHaveHistory: true,
    isSpecialRoute: false,
    totalRoutes: 2,
    totalRecords: 17,
    routes: [
      {
        routePricingId: "c9fc70fe-4eea-45ba-887d-dcee4e85ac5f",
        routePricingAlias: "GORONTALO - LAMPUNG",
        validFrom: "2025-09-22T00:00:00.000Z",
        truckTypes: [
          {
            id: "01d486f5-16a9-45eb-8006-3f4d9ae20d51",
            truckTypeId: "550e8400-e29b-41d4-a716-446655440202",
            truckTypeName: "Colt Diesel Double",
            typePricingId: "749d58ea-eb6a-45b4-a19f-9da61aeead67",
            typePricingName: "Medium",
            createdAt: "2025-09-22T04:41:38.565Z",
            createdBy: "Backend BO GM",
          },
          {
            id: "3d1b6c26-1bae-47d8-8d28-143ebdf6621d",
            truckTypeId: "550e8400-e29b-41d4-a716-446655440201",
            truckTypeName: "Colt Diesel Engkel",
            typePricingId: "67ff9e7e-d3cb-48fe-8a1e-3b492915ce54",
            typePricingName: "Low edit",
            createdAt: "2025-09-22T04:41:38.565Z",
            createdBy: "Backend BO GM",
          },
          {
            id: "57ba6926-5141-4d7d-8efd-dd240e29a91b",
            truckTypeId: "550e8400-e29b-41d4-a716-446655440204",
            truckTypeName: "Medium Truck 4 x 2 + Gandengan",
            typePricingId: "67ff9e7e-d3cb-48fe-8a1e-3b492915ce54",
            typePricingName: "Low edit",
            createdAt: "2025-09-22T04:41:38.565Z",
            createdBy: "Backend BO GM",
          },
          {
            id: "a220cc2c-bbd9-4e18-80ce-02f43eff72c2",
            truckTypeId: "550e8400-e29b-41d4-a716-446655440205",
            truckTypeName: "Medium Truck 6 x 2 (Rigid)",
            typePricingId: "749d58ea-eb6a-45b4-a19f-9da61aeead67",
            typePricingName: "Medium",
            createdAt: "2025-09-22T04:41:38.565Z",
            createdBy: "Backend BO GM",
          },
          {
            id: "89d46fc3-967b-483b-898f-ed3b8d0dc3c6",
            truckTypeId: "550e8400-e29b-41d4-a716-446655440206",
            truckTypeName: "Medium Truck 6 x 4",
            typePricingId: "bef711a6-7a1c-4625-a129-ed933f38ce9e",
            typePricingName: "High",
            createdAt: "2025-09-22T04:41:38.565Z",
            createdBy: "Backend BO GM",
          },
          {
            id: "483f8144-2366-4022-a7b2-796efc493096",
            truckTypeId: "550e8400-e29b-41d4-a716-446655440203",
            truckTypeName: "Medium Truk 4 x 2 (Rigid)",
            typePricingId: "bef711a6-7a1c-4625-a129-ed933f38ce9e",
            typePricingName: "High",
            createdAt: "2025-09-22T04:41:38.565Z",
            createdBy: "Backend BO GM",
          },
          {
            id: "c4b525ce-8afd-4c09-9945-340115ec545c",
            truckTypeId: "550e8400-e29b-41d4-a716-446655440207",
            truckTypeName: "Tractor Head 4 x 2",
            typePricingId: "67ff9e7e-d3cb-48fe-8a1e-3b492915ce54",
            typePricingName: "Low edit",
            createdAt: "2025-09-22T04:41:38.565Z",
            createdBy: "Backend BO GM",
          },
          {
            id: "bdf855d0-bdd9-4b62-b768-7f4444eb8669",
            truckTypeId: "550e8400-e29b-41d4-a716-446655440208",
            truckTypeName: "Tractor Head 6 x 4",
            typePricingId: "749d58ea-eb6a-45b4-a19f-9da61aeead67",
            typePricingName: "Medium",
            createdAt: "2025-09-22T04:41:38.565Z",
            createdBy: "Backend BO GM",
          },
        ],
      },
      {
        routePricingId: "731df77a-a9df-43df-9564-fba370e1d38c",
        routePricingAlias: "Sumatra - SumatrA",
        validFrom: "2025-09-22T00:00:00.000Z",
        truckTypes: [
          {
            id: "6e39196e-36bb-4d5b-84c2-6fc0de0467d4",
            truckTypeId: "550e8400-e29b-41d4-a716-446655440202",
            truckTypeName: "Colt Diesel Double",
            typePricingId: "749d58ea-eb6a-45b4-a19f-9da61aeead67",
            typePricingName: "Medium",
            createdAt: "2025-09-22T04:45:07.352Z",
            createdBy: "Backend BO GM",
          },
          {
            id: "bd27a376-4aa6-42d5-8bff-2bc78d59c4db",
            truckTypeId: "550e8400-e29b-41d4-a716-446655440202",
            truckTypeName: "Colt Diesel Double",
            typePricingId: "67ff9e7e-d3cb-48fe-8a1e-3b492915ce54",
            typePricingName: "Low edit",
            createdAt: "2025-09-22T04:41:38.565Z",
            createdBy: "Backend BO GM",
          },
          {
            id: "25a2c23a-5019-460d-9ebe-064ba38801b3",
            truckTypeId: "550e8400-e29b-41d4-a716-446655440201",
            truckTypeName: "Colt Diesel Engkel",
            typePricingId: "749d58ea-eb6a-45b4-a19f-9da61aeead67",
            typePricingName: "Medium",
            createdAt: "2025-09-22T04:41:38.565Z",
            createdBy: "Backend BO GM",
          },
          {
            id: "7a6af6e6-99c3-4dc3-983f-da2d625ffe86",
            truckTypeId: "550e8400-e29b-41d4-a716-446655440204",
            truckTypeName: "Medium Truck 4 x 2 + Gandengan",
            typePricingId: "749d58ea-eb6a-45b4-a19f-9da61aeead67",
            typePricingName: "Medium",
            createdAt: "2025-09-22T04:41:38.565Z",
            createdBy: "Backend BO GM",
          },
          {
            id: "7aee5ae7-cb76-49b4-abf3-51654bfce93d",
            truckTypeId: "550e8400-e29b-41d4-a716-446655440205",
            truckTypeName: "Medium Truck 6 x 2 (Rigid)",
            typePricingId: "bef711a6-7a1c-4625-a129-ed933f38ce9e",
            typePricingName: "High",
            createdAt: "2025-09-22T04:41:38.565Z",
            createdBy: "Backend BO GM",
          },
          {
            id: "ca0a5ae3-5b14-4743-84d4-a1931d6f173b",
            truckTypeId: "550e8400-e29b-41d4-a716-446655440206",
            truckTypeName: "Medium Truck 6 x 4",
            typePricingId: "67ff9e7e-d3cb-48fe-8a1e-3b492915ce54",
            typePricingName: "Low edit",
            createdAt: "2025-09-22T04:41:38.565Z",
            createdBy: "Backend BO GM",
          },
          {
            id: "997256f7-506d-4384-9f21-b5eec6963a0c",
            truckTypeId: "550e8400-e29b-41d4-a716-446655440203",
            truckTypeName: "Medium Truk 4 x 2 (Rigid)",
            typePricingId: "67ff9e7e-d3cb-48fe-8a1e-3b492915ce54",
            typePricingName: "Low edit",
            createdAt: "2025-09-22T04:41:38.565Z",
            createdBy: "Backend BO GM",
          },
          {
            id: "892d2c91-a404-41bd-9b56-9b4526832a7b",
            truckTypeId: "550e8400-e29b-41d4-a716-446655440207",
            truckTypeName: "Tractor Head 4 x 2",
            typePricingId: "749d58ea-eb6a-45b4-a19f-9da61aeead67",
            typePricingName: "Medium",
            createdAt: "2025-09-22T04:41:38.565Z",
            createdBy: "Backend BO GM",
          },
          {
            id: "39146b4b-8b6d-433f-b11e-358ff562fec3",
            truckTypeId: "550e8400-e29b-41d4-a716-446655440208",
            truckTypeName: "Tractor Head 6 x 4",
            typePricingId: "bef711a6-7a1c-4625-a129-ed933f38ce9e",
            typePricingName: "High",
            createdAt: "2025-09-22T04:41:38.565Z",
            createdBy: "Backend BO GM",
          },
        ],
      },
    ],
  },
  Type: "/v1/bo/pricing/setting/default/regular",
};

/**
 * Fetcher function to get regular pricing data
 * @param {string} url - The API endpoint URL
 * @returns {Promise} - Axios response promise
 */
export const getRegular = async (url) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.get(url);
};

/**
 * SWR hook for fetching regular pricing data
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetRegular = (options = {}) => {
  const cacheKey = "/v1/bo/pricing/setting/default/regular";

  return useSWR(cacheKey, getRegular, {
    // Default SWR options
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    ...options,
  });
};

/**
 * Get regular pricing data with mock data for development
 * @returns {Promise} - Mock data promise
 */
export const getRegularMock = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return mockAPIResult;
};
