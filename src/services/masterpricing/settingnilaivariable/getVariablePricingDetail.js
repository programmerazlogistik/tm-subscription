import useSWR from "swr";

import { fetcherMuatrans } from "@/lib/axios";
import { fetcherMuatransCS } from "@/lib/fetcherBasicAuth";

// Configuration flag for fetcher selection
const useFetcherMuatrans = true;

// Mock API result for development/testing based on the provided response
export const mockAPIResult = {
  Message: {
    Code: 200,
    Text: "OK",
  },
  Data: {
    routeId: "c9fc70fe-4eea-45ba-887d-dcee4e85ac5f",
    routeName: "GORONTALO - LAMPUNG",
    truckTypeId: "550e8400-e29b-41d4-a716-446655440201",
    truckTypeName: "Colt Diesel Engkel",
    formulaId: "f655e5c3-35a4-4703-a3c7-4f321652f9c2",
    settingVariableId: "3a12019b-58a6-432d-a70a-d3780d3a77e4",
    validFrom: "2024-12-02",
    isActive: true,
    isNewRecord: false,
    basePrice: [
      {
        typePricingId: "bef711a6-7a1c-4625-a129-ed933f38ce9e",
        typePricingName: "High",
        variables: {
          enam: {
            id: "34b44f3d-d265-4c2b-a284-565bc94f11d2",
            value: 6000,
            isFromShipper: false,
          },
          jarak: {
            id: "2ccb11f1-2265-4361-b769-55d773928760",
            value: null,
            isFromShipper: true,
          },
          PL: {
            id: "f979e389-2930-4bf0-b790-badb7bb21d70",
            value: 1500,
            isFromShipper: false,
          },
          tonase: {
            id: "070e3ff1-bdd1-4e2a-a46b-d1c2044327e2",
            value: null,
            isFromShipper: true,
          },
        },
      },
      {
        typePricingId: "67ff9e7e-d3cb-48fe-8a1e-3b492915ce54",
        typePricingName: "Low edit",
        variables: {
          enam: {
            id: "34b44f3d-d265-4c2b-a284-565bc94f11d2",
            value: 4000,
            isFromShipper: false,
          },
          jarak: {
            id: "2ccb11f1-2265-4361-b769-55d773928760",
            value: null,
            isFromShipper: true,
          },
          PL: {
            id: "f979e389-2930-4bf0-b790-badb7bb21d70",
            value: 800,
            isFromShipper: false,
          },
          tonase: {
            id: "070e3ff1-bdd1-4e2a-a46b-d1c2044327e2",
            value: null,
            isFromShipper: true,
          },
        },
      },
      {
        typePricingId: "1346450a-ea1d-4f7f-8604-3a9d4f7605fe",
        typePricingName: "Harga",
        variables: {
          enam: {
            id: "34b44f3d-d265-4c2b-a284-565bc94f11d2",
            value: 7000,
            isFromShipper: false,
          },
          jarak: {
            id: "2ccb11f1-2265-4361-b769-55d773928760",
            value: null,
            isFromShipper: true,
          },
          PL: {
            id: "f979e389-2930-4bf0-b790-badb7bb21d70",
            value: 2000,
            isFromShipper: false,
          },
          tonase: {
            id: "070e3ff1-bdd1-4e2a-a46b-d1c2044327e2",
            value: null,
            isFromShipper: true,
          },
        },
      },
      {
        typePricingId: "a286ef64-73f6-484b-87f4-c7f8614e424d",
        typePricingName: "coba2",
        variables: {
          enam: {
            id: "34b44f3d-d265-4c2b-a284-565bc94f11d2",
            value: null,
            isFromShipper: false,
          },
          jarak: {
            id: "2ccb11f1-2265-4361-b769-55d773928760",
            value: null,
            isFromShipper: true,
          },
          PL: {
            id: "f979e389-2930-4bf0-b790-badb7bb21d70",
            value: null,
            isFromShipper: false,
          },
          tonase: {
            id: "070e3ff1-bdd1-4e2a-a46b-d1c2044327e2",
            value: null,
            isFromShipper: true,
          },
        },
      },
    ],
    specialPrice: [
      {
        routePricingSpecialId: "d638c323-7498-4cb5-8912-b4626038336f",
        route: "KAB. BOALEMO - KAB. LAMPUNG UTARA",
        originCityId: 7502,
        originCityName: "KAB. BOALEMO",
        destinationCityId: 1803,
        destinationCityName: "KAB. LAMPUNG UTARA",
        fixedPricing: [
          {
            typePricingId: "bef711a6-7a1c-4625-a129-ed933f38ce9e",
            typePricingName: "High",
            value: 200000,
          },
          {
            typePricingId: "67ff9e7e-d3cb-48fe-8a1e-3b492915ce54",
            typePricingName: "Low edit",
            value: 120000,
          },
          {
            typePricingId: "1346450a-ea1d-4f7f-8604-3a9d4f7605fe",
            typePricingName: "Harga",
            value: 250000,
          },
          {
            typePricingId: "a286ef64-73f6-484b-87f4-c7f8614e424d",
            typePricingName: "coba2",
            value: null,
          },
        ],
        specialPricing: [
          {
            typePricingId: "bef711a6-7a1c-4625-a129-ed933f38ce9e",
            typePricingName: "High",
            variables: {
              enam: {
                id: "34b44f3d-d265-4c2b-a284-565bc94f11d2",
                value: 6500,
                isFromShipper: false,
              },
              jarak: {
                id: "2ccb11f1-2265-4361-b769-55d773928760",
                value: null,
                isFromShipper: true,
              },
              PL: {
                id: "f979e389-2930-4bf0-b790-badb7bb21d70",
                value: 1600,
                isFromShipper: false,
              },
              tonase: {
                id: "070e3ff1-bdd1-4e2a-a46b-d1c2044327e2",
                value: null,
                isFromShipper: true,
              },
            },
          },
          {
            typePricingId: "67ff9e7e-d3cb-48fe-8a1e-3b492915ce54",
            typePricingName: "Low edit",
            variables: {
              enam: {
                id: "34b44f3d-d265-4c2b-a284-565bc94f11d2",
                value: 4500,
                isFromShipper: false,
              },
              jarak: {
                id: "2ccb11f1-2265-4361-b769-55d773928760",
                value: null,
                isFromShipper: true,
              },
              PL: {
                id: "f979e389-2930-4bf0-b790-badb7bb21d70",
                value: 900,
                isFromShipper: false,
              },
              tonase: {
                id: "070e3ff1-bdd1-4e2a-a46b-d1c2044327e2",
                value: null,
                isFromShipper: true,
              },
            },
          },
          {
            typePricingId: "1346450a-ea1d-4f7f-8604-3a9d4f7605fe",
            typePricingName: "Harga",
            variables: {
              enam: {
                id: "34b44f3d-d265-4c2b-a284-565bc94f11d2",
                value: 7500,
                isFromShipper: false,
              },
              jarak: {
                id: "2ccb11f1-2265-4361-b769-55d773928760",
                value: null,
                isFromShipper: true,
              },
              PL: {
                id: "f979e389-2930-4bf0-b790-badb7bb21d70",
                value: 2100,
                isFromShipper: false,
              },
              tonase: {
                id: "070e3ff1-bdd1-4e2a-a46b-d1c2044327e2",
                value: null,
                isFromShipper: true,
              },
            },
          },
          {
            typePricingId: "a286ef64-73f6-484b-87f4-c7f8614e424d",
            typePricingName: "coba2",
            variables: {
              enam: {
                id: "34b44f3d-d265-4c2b-a284-565bc94f11d2",
                value: null,
                isFromShipper: false,
              },
              jarak: {
                id: "2ccb11f1-2265-4361-b769-55d773928760",
                value: null,
                isFromShipper: true,
              },
              PL: {
                id: "f979e389-2930-4bf0-b790-badb7bb21d70",
                value: null,
                isFromShipper: false,
              },
              tonase: {
                id: "070e3ff1-bdd1-4e2a-a46b-d1c2044327e2",
                value: null,
                isFromShipper: true,
              },
            },
          },
        ],
      },
      {
        routePricingSpecialId: "c7c2fbc5-3638-42a5-965b-08244d7ad28f",
        route: "KAB. POHUWATO - KOTA METRO",
        originCityId: 7504,
        originCityName: "KAB. POHUWATO",
        destinationCityId: 1872,
        destinationCityName: "KOTA METRO",
        fixedPricing: [
          {
            typePricingId: "bef711a6-7a1c-4625-a129-ed933f38ce9e",
            typePricingName: "High",
            value: 210000,
          },
          {
            typePricingId: "67ff9e7e-d3cb-48fe-8a1e-3b492915ce54",
            typePricingName: "Low edit",
            value: 130000,
          },
          {
            typePricingId: "1346450a-ea1d-4f7f-8604-3a9d4f7605fe",
            typePricingName: "Harga",
            value: 260000,
          },
          {
            typePricingId: "a286ef64-73f6-484b-87f4-c7f8614e424d",
            typePricingName: "coba2",
            value: null,
          },
        ],
        specialPricing: [
          {
            typePricingId: "bef711a6-7a1c-4625-a129-ed933f38ce9e",
            typePricingName: "High",
            variables: {
              enam: {
                id: "34b44f3d-d265-4c2b-a284-565bc94f11d2",
                value: 6600,
                isFromShipper: false,
              },
              jarak: {
                id: "2ccb11f1-2265-4361-b769-55d773928760",
                value: null,
                isFromShipper: true,
              },
              PL: {
                id: "f979e389-2930-4bf0-b790-badb7bb21d70",
                value: 1700,
                isFromShipper: false,
              },
              tonase: {
                id: "070e3ff1-bdd1-4e2a-a46b-d1c2044327e2",
                value: null,
                isFromShipper: true,
              },
            },
          },
          {
            typePricingId: "67ff9e7e-d3cb-48fe-8a1e-3b492915ce54",
            typePricingName: "Low edit",
            variables: {
              enam: {
                id: "34b44f3d-d265-4c2b-a284-565bc94f11d2",
                value: 4600,
                isFromShipper: false,
              },
              jarak: {
                id: "2ccb11f1-2265-4361-b769-55d773928760",
                value: null,
                isFromShipper: true,
              },
              PL: {
                id: "f979e389-2930-4bf0-b790-badb7bb21d70",
                value: 950,
                isFromShipper: false,
              },
              tonase: {
                id: "070e3ff1-bdd1-4e2a-a46b-d1c2044327e2",
                value: null,
                isFromShipper: true,
              },
            },
          },
          {
            typePricingId: "1346450a-ea1d-4f7f-8604-3a9d4f7605fe",
            typePricingName: "Harga",
            variables: {
              enam: {
                id: "34b44f3d-d265-4c2b-a284-565bc94f11d2",
                value: 7600,
                isFromShipper: false,
              },
              jarak: {
                id: "2ccb11f1-2265-4361-b769-55d773928760",
                value: null,
                isFromShipper: true,
              },
              PL: {
                id: "f979e389-2930-4bf0-b790-badb7bb21d70",
                value: 2200,
                isFromShipper: false,
              },
              tonase: {
                id: "070e3ff1-bdd1-4e2a-a46b-d1c2044327e2",
                value: null,
                isFromShipper: true,
              },
            },
          },
          {
            typePricingId: "a286ef64-73f6-484b-87f4-c7f8614e424d",
            typePricingName: "coba2",
            variables: {
              enam: {
                id: "34b44f3d-d265-4c2b-a284-565bc94f11d2",
                value: null,
                isFromShipper: false,
              },
              jarak: {
                id: "2ccb11f1-2265-4361-b769-55d773928760",
                value: null,
                isFromShipper: true,
              },
              PL: {
                id: "f979e389-2930-4bf0-b790-badb7bb21d70",
                value: null,
                isFromShipper: false,
              },
              tonase: {
                id: "070e3ff1-bdd1-4e2a-a46b-d1c2044327e2",
                value: null,
                isFromShipper: true,
              },
            },
          },
        ],
      },
    ],
  },
  Type: "/v1/bo/pricing/setting/variable/routes/c9fc70fe-4eea-45ba-887d-dcee4e85ac5f/truck-type/550e8400-e29b-41d4-a716-446655440201?formulaId=f655e5c3-35a4-4703-a3c7-4f321652f9c2",
};

/**
 * Fetcher function to get variable pricing details for a specific route, truck type, and formula
 * @param {string} url - The API endpoint URL
 * @returns {Promise} - Axios response promise
 */
export const getVariablePricingDetail = async (url) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.get(url);
};

/**
 * SWR hook for fetching variable pricing details
 * @param {string} routeId - The route ID to fetch data for
 * @param {string} truckTypeId - The truck type ID to fetch data for
 * @param {string} formulaId - The formula ID to fetch data for
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetVariablePricingDetail = (
  routeId,
  truckTypeId,
  formulaId,
  options = {}
) => {
  const cacheKey =
    routeId && truckTypeId && formulaId
      ? `/v1/bo/pricing/setting/variable/routes/${routeId}/truck-type/${truckTypeId}?formulaId=${formulaId}`
      : null;

  return useSWR(cacheKey, getVariablePricingDetail, {
    // Default SWR options
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    // Ensure the hook re-runs when any of the parameters change
    refreshInterval: 0,
    ...options,
  });
};

/**
 * Get variable pricing details with mock data for development
 * @returns {Promise} - Mock data promise
 */
export const getVariablePricingDetailMock = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return mockAPIResult;
};