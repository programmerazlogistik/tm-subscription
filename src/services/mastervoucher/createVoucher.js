import useSWRMutation from "swr/mutation";

import { fetcherMuatrans } from "@/lib/axios";
import { fetcherMuatransCS } from "@/lib/fetcherBasicAuth";

// Configuration flag for fetcher selection
const useFetcherMuatrans = true; // Set to false as requested

// Mock API result for development/testing
export const mockAPIResult = {
  data: {
    Message: {
      Code: 201,
      Text: "Voucher created successfully"
    },
    Data: {
      id: "uuid-voucher-new",
      voucherCode: "DISCOUNT10",
      isActive: true,
      createdAt: "2025-01-15T11:30:00Z",
      createdBy: "admin-user-id"
    },
    Type: "CREATE_VOUCHER"
  }
};

/**
 * Fetcher function to create a new voucher
 * @param {string} url - The API endpoint URL
 * @param {Object} options - Options object containing the request body
 * @param {Object} options.arg - The request body data
 * @returns {Promise} - Axios response promise
 */
export const createVoucher = async (url, { arg }) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.post(url, arg);
};

/**
 * Transform form values to API request body format
 * @param {Object} formValues - Form values from the voucher form
 * @param {Array} allPaymentMethods - All available payment methods for "all" detection
 * @returns {Object} - Transformed data for API request
 */
export const transformFormValuesToRequestBody = (formValues, allPaymentMethods = []) => {
  // Transform discount type
  const discountType = formValues.jenisPotongan === "Rp x" ? "nominal" : "percentage";
  
  // Transform locations - LocationSelector can store locations in different formats:
  // 1. Array of strings in format "Province - City" (legacy format)
  // 2. Array of objects with provinceId, cityId, and label properties (new format)
  const transformLocations = (locations) => {
    if (!locations || !Array.isArray(locations)) return [];
    
    const locationMap = new Map();
    
    locations.forEach(location => {
      if (typeof location === 'string') {
        // Handle legacy string format: "Province - City"
        const [province, city] = location.split(' - ');
        
        if (province && city) {
          if (!locationMap.has(province)) {
            locationMap.set(province, {
              provinceId: province,
              cities: []  // Changed from cityIds to cities
            });
          }
          locationMap.get(province).cities.push(city);
        }
      } else if (typeof location === 'object' && location !== null) {
        // Handle new object format with provinceId and cityId
        const provinceId = location.provinceId;
        const cityId = location.cityId;
        
        if (provinceId && cityId) {
          if (!locationMap.has(provinceId)) {
            locationMap.set(provinceId, {
              provinceId: provinceId,
              cities: []  // Changed from cityIds to cities
            });
          }
          
          if (!locationMap.get(provinceId).cities.includes(cityId)) {
            locationMap.get(provinceId).cities.push(cityId);
          }
        }
      }
    });
    
    return Array.from(locationMap.values());
  };

  // Transform pickup locations
  const pickupLocations = transformLocations(formValues.lokasiMuat);
  
  // Transform delivery locations
  const deliveryLocations = transformLocations(formValues.lokasiBongkar);

  // Transform user WhatsApp to user IDs or "all" string
  // Check if all available users are selected by comparing with the total user count
  // If user selected "Select All" in the UI, send "all" to backend
  const userIds = (() => {
    // If no users selected, return empty array
    if (!formValues.userWhatsApp || formValues.userWhatsApp.length === 0) {
      return [];
    }
    
    // Check if this represents "all users" selection
    // We'll check if the first item has a special "all" indicator or if selection matches total count
    const hasAllIndicator = formValues.userWhatsApp.some(user => 
      user === "all" || user.value === "all" || user.isAllSelected === true
    );
    
    if (hasAllIndicator) {
      return "all";
    }
    
    // Otherwise, transform individual user IDs
    return formValues.userWhatsApp.map(user => {
      if (typeof user === 'string') return user;
      return user.id || user.userId || user.value || user.phoneNumber;
    }).filter(Boolean);
  })();

  // Transform payment method IDs - check if all are selected
  let paymentMethodIds = formValues.metodeInstansiTujuanPembayaran?.map(method => {
    if (typeof method === 'string') return method;
    return method.value || method.id;
  }).filter(Boolean) || [];

  // If all available payment methods are selected, send "all" instead of individual IDs
  if (allPaymentMethods.length > 0 && paymentMethodIds.length === allPaymentMethods.length) {
    const allMethodIds = allPaymentMethods.map(method => method.id || method.value);
    const allSelected = paymentMethodIds.every(id => allMethodIds.includes(id));
    if (allSelected) {
      paymentMethodIds = "all";
    }
  }

  // Handle case where form contains "all" indicator directly
  if (paymentMethodIds.length === 1 && paymentMethodIds[0] === "all") {
    paymentMethodIds = "all";
  }

  const result = {
    voucherCode: formValues.kodeVoucher,
    termsAndConditions: formValues.syaratDanKetentuan,
    usageInstructions: formValues.caraPemakaian,
    discountType: discountType,
    discountValue: parseFloat(formValues.nominal) || 0,
    maxDiscountAmount: formValues.maksimalPotonganRp && formValues.maksimalPotonganRp !== "" ? parseFloat(formValues.maksimalPotonganRp) : 0,
    minTransactionAmount: formValues.minimalTransaksiRp && formValues.minimalTransaksiRp !== "" ? parseFloat(formValues.minimalTransaksiRp) : 0,
    validPeriodStart: formValues.periodeAwal,
    validPeriodEnd: formValues.periodeAkhir,
    totalQuota: parseInt(formValues.kuotaVoucher) || 0,
    quotaPerUser: parseInt(formValues.kuotaPerUser) || 0,
    isActive: formValues.status === "Aktif",
    isApplicableForReverseRoute: formValues.berlakuRuteSebaliknya || false,
    userIds: userIds,
    paymentMethodIds: paymentMethodIds,
    pickupLocations: pickupLocations,
    deliveryLocations: deliveryLocations
  };

  console.log("🚀 Form transformation debug:");
  console.log("Original locations:", { 
    lokasiMuat: formValues.lokasiMuat, 
    lokasiBongkar: formValues.lokasiBongkar 
  });
  console.log("Transformed locations:", { 
    pickupLocations, 
    deliveryLocations 
  });

  return result;
};

/**
 * SWR Mutation hook for creating vouchers
 * @returns {Object} - SWR mutation hook result
 */
export const useCreateVoucher = () => {
  return useSWRMutation('/v1/bo/vouchers', (url, { arg }) =>
    createVoucher(url, { arg })
  );
};