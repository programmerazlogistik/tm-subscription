import useSWR from "swr";

import { fetcherMuatrans } from "@/lib/axios";
import { fetcherMuatransCS } from "@/lib/fetcherBasicAuth";

// Configuration flag for fetcher selection
const useFetcherMuatrans = true;

// Mock API result for development/testing
export const mockAPIResult = {
    "Message": {
        "Code": 200,
        "Text": "OK"
    },
    "Data": {
        "totalRoutes": 2,
        "totalRecords": 16,
        "routes": [
            {
                "routePricingId": "c9fc70fe-4eea-45ba-887d-dcee4e85ac5f",
                "routePricingAlias": "GORONTALO - LAMPUNG",
                "validFrom": "2025-12-22T00:00:00Z",
                "truckTypes": [
                    {
                        "id": "cde3a185-d72c-4a9b-a0a9-263227311232",
                        "truckTypeId": "550e8400-e29b-41d4-a716-446655440202",
                        "truckTypeName": "Colt Diesel Double",
                        "typePricingId": "749d58ea-eb6a-45b4-a19f-9da61aeead67",
                        "typePricingName": "Medium",
                        "createdAt": "2025-09-25T10:10:25.014Z"
                    },
                    {
                        "id": "58a6ff3f-eb70-4a41-abd2-fd057256625a",
                        "truckTypeId": "550e8400-e29b-41d4-a716-446655440201",
                        "truckTypeName": "Colt Diesel Engkel",
                        "typePricingId": "67ff9e7e-d3cb-48fe-8a1e-3b492915ce54",
                        "typePricingName": "Low edit",
                        "createdAt": "2025-09-25T10:10:25.014Z"
                    },
                    {
                        "id": "ce1620b5-4ad8-4652-bd89-b691ba02cf50",
                        "truckTypeId": "550e8400-e29b-41d4-a716-446655440204",
                        "truckTypeName": "Medium Truck 4 x 2 + Gandengan",
                        "typePricingId": "67ff9e7e-d3cb-48fe-8a1e-3b492915ce54",
                        "typePricingName": "Low edit",
                        "createdAt": "2025-09-25T10:10:25.014Z"
                    },
                    {
                        "id": "449ad131-1228-47bb-b0e8-738df75e57c8",
                        "truckTypeId": "550e8400-e29b-41d4-a716-446655440205",
                        "truckTypeName": "Medium Truck 6 x 2 (Rigid)",
                        "typePricingId": "749d58ea-eb6a-45b4-a19f-9da61aeead67",
                        "typePricingName": "Medium",
                        "createdAt": "2025-09-25T10:10:25.014Z"
                    },
                    {
                        "id": "087d4f11-53b7-447d-a285-35b75df0042b",
                        "truckTypeId": "550e8400-e29b-41d4-a716-446655440206",
                        "truckTypeName": "Medium Truck 6 x 4",
                        "typePricingId": "bef711a6-7a1c-4625-a129-ed933f38ce9e",
                        "typePricingName": "High",
                        "createdAt": "2025-09-25T10:10:25.014Z"
                    },
                    {
                        "id": "93e84e38-dc18-4724-89cc-c3d7b3444dde",
                        "truckTypeId": "550e8400-e29b-41d4-a716-446655440203",
                        "truckTypeName": "Medium Truk 4 x 2 (Rigid)",
                        "typePricingId": "bef711a6-7a1c-4625-a129-ed933f38ce9e",
                        "typePricingName": "High",
                        "createdAt": "2025-09-25T10:10:25.014Z"
                    },
                    {
                        "id": "565169fc-3d07-4fe9-bcd0-8569530abac7",
                        "truckTypeId": "550e8400-e29b-41d4-a716-446655440207",
                        "truckTypeName": "Tractor Head 4 x 2",
                        "typePricingId": "67ff9e7e-d3cb-48fe-8a1e-3b492915ce54",
                        "typePricingName": "Low edit",
                        "createdAt": "2025-09-25T10:10:25.014Z"
                    },
                    {
                        "id": "ae3dbabf-f42a-4e71-9bdb-c219c7928b12",
                        "truckTypeId": "550e8400-e29b-41d4-a716-446655440208",
                        "truckTypeName": "Tractor Head 6 x 4",
                        "typePricingId": "749d58ea-eb6a-45b4-a19f-9da61aeead67",
                        "typePricingName": "Medium",
                        "createdAt": "2025-09-25T10:10:25.014Z"
                    }
                ]
            },
            {
                "routePricingId": "731df77a-a9df-43df-9564-fba370e1d38c",
                "routePricingAlias": "Sumatra - SumatrA",
                "validFrom": "2025-12-22T00:00:00Z",
                "truckTypes": [
                    {
                        "id": "b78408b1-7bff-477c-a0d4-f14767c9e54c",
                        "truckTypeId": "550e8400-e29b-41d4-a716-446655440202",
                        "truckTypeName": "Colt Diesel Double",
                        "typePricingId": "749d58ea-eb6a-45b4-a19f-9da61aeead67",
                        "typePricingName": "Medium",
                        "createdAt": "2025-09-25T10:10:25.014Z"
                    },
                    {
                        "id": "4318c0b2-bc5f-4316-bb07-da16ba6145ff",
                        "truckTypeId": "550e8400-e29b-41d4-a716-446655440201",
                        "truckTypeName": "Colt Diesel Engkel",
                        "typePricingId": "67ff9e7e-d3cb-48fe-8a1e-3b492915ce54",
                        "typePricingName": "Low edit",
                        "createdAt": "2025-09-25T10:10:25.014Z"
                    },
                    {
                        "id": "2e5f7267-b837-49fc-aa4b-09eaad721a62",
                        "truckTypeId": "550e8400-e29b-41d4-a716-446655440204",
                        "truckTypeName": "Medium Truck 4 x 2 + Gandengan",
                        "typePricingId": "749d58ea-eb6a-45b4-a19f-9da61aeead67",
                        "typePricingName": "Medium",
                        "createdAt": "2025-09-25T10:10:25.014Z"
                    },
                    {
                        "id": "1fc6625a-c69b-4580-83a9-9f099c62c3a9",
                        "truckTypeId": "550e8400-e29b-41d4-a716-446655440205",
                        "truckTypeName": "Medium Truck 6 x 2 (Rigid)",
                        "typePricingId": "bef711a6-7a1c-4625-a129-ed933f38ce9e",
                        "typePricingName": "High",
                        "createdAt": "2025-09-25T10:10:25.014Z"
                    },
                    {
                        "id": "44ba560d-612a-4d63-ba31-023d43b8b6c8",
                        "truckTypeId": "550e8400-e29b-41d4-a716-446655440206",
                        "truckTypeName": "Medium Truck 6 x 4",
                        "typePricingId": "67ff9e7e-d3cb-48fe-8a1e-3b492915ce54",
                        "typePricingName": "Low edit",
                        "createdAt": "2025-09-25T10:10:25.014Z"
                    },
                    {
                        "id": "a7dcb081-ff0a-40e1-929e-80f5cbded90e",
                        "truckTypeId": "550e8400-e29b-41d4-a716-446655440203",
                        "truckTypeName": "Medium Truk 4 x 2 (Rigid)",
                        "typePricingId": "67ff9e7e-d3cb-48fe-8a1e-3b492915ce54",
                        "typePricingName": "Low edit",
                        "createdAt": "2025-09-25T10:10:25.014Z"
                    },
                    {
                        "id": "cf4f1799-b8b1-496f-99cc-2809b33847f7",
                        "truckTypeId": "550e8400-e29b-41d4-a716-446655440207",
                        "truckTypeName": "Tractor Head 4 x 2",
                        "typePricingId": "749d58ea-eb6a-45b4-a19f-9da61aeead67",
                        "typePricingName": "Medium",
                        "createdAt": "2025-09-25T10:10:25.014Z"
                    },
                    {
                        "id": "8751ba7c-d734-4a1f-9d00-43d1f77cab25",
                        "truckTypeId": "550e8400-e29b-41d4-a716-446655440208",
                        "truckTypeName": "Tractor Head 6 x 4",
                        "typePricingId": "bef711a6-7a1c-4625-a129-ed933f38ce9e",
                        "typePricingName": "High",
                        "createdAt": "2025-09-25T10:10:25.014Z"
                    }
                ]
            }
        ]
    },
    "Type": "/v1/bo/pricing/setting/default/regular/history/293ea4fb-8e12-4ff0-8639-9c1367428a8b"
};

/**
 * Fetcher function to get non-rute-khusus history detail data
 * @param {string} url - The API endpoint URL
 * @returns {Promise} - Axios response promise
 */
export const getNonRuteKhususHistoryDetail = async (url) => {
  // Use the actual fetcher instead of mock data
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.get(url);
};

/**
 * SWR hook for fetching non-rute-khusus history detail data
 * @param {string} id - The history ID
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetNonRuteKhususHistoryDetail = (id, options = {}) => {
  const cacheKey = id ? `/v1/bo/pricing/setting/default/regular/history/${id}` : null;

  return useSWR(cacheKey, getNonRuteKhususHistoryDetail, {
    // Default SWR options
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    ...options,
  });
};

/**
 * Get non-rute-khusus history detail data with mock data for development
 * @param {string} id - The history ID
 * @returns {Promise} - Mock data promise
 */
export const getNonRuteKhususHistoryDetailMock = async (id) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return { data: mockAPIResult };
};