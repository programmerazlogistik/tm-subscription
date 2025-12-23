import useSWRMutation from "swr/mutation";
import { fetcherMuatransCS } from "@/lib/fetcherBasicAuth";
import { fetcherMuatrans } from "@/lib/axios";

/**
 * Transform form values to request body for voucher update
 * Similar to createVoucher but for PUT request
 * @param {Object} formValues - Form values from Zustand store
 * @param {Array} allPaymentMethods - All available payment methods for "all" detection
 * @returns {Object} - Request body for API
 */
export const transformFormValuesToUpdateRequestBody = (formValues, allPaymentMethods = []) => {
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

  // Transform user WhatsApp to user IDs or "all" string (same as createVoucher)
  const userIds = (() => {
    // If no users selected, return empty array
    if (!formValues.userWhatsApp || formValues.userWhatsApp.length === 0) {
      return [];
    }
    
    // Check if this represents "all users" selection
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
    termsAndConditions: formValues.syaratDanKetentuan,
    usageInstructions: formValues.caraPemakaian,
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

  console.log("🚀 Update form transformation debug:");
  console.log("Original locations:", { 
    lokasiMuat: formValues.lokasiMuat, 
    lokasiBongkar: formValues.lokasiBongkar 
  });
  console.log("Transformed locations:", { 
    pickupLocations, 
    deliveryLocations 
  });
  console.log("Transformed update body:", result);

  return result;
};

/**
 * API call to update voucher
 * @param {string} url - API endpoint
 * @param {Object} param1 - Contains arg (request body) and other options
 * @returns {Promise} - API response
 */
const updateVoucherFetcher = async (url, { arg }) => {
  const useFetcherMuatrans = true; // Set to false as requested
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  
  console.log("🚀 Update voucher API call:");
  console.log("URL:", url);
  console.log("Request body:", arg);
  
  try {
    const response = await fetcher.put(url, arg);
    console.log("✅ Update voucher success:", response);
    return response;
  } catch (error) {
    console.error("❌ Update voucher error:", error);
    throw error;
  }
};

/**
 * SWR Mutation hook for updating vouchers
 * @param {string} voucherId - The voucher ID to update
 * @returns {Object} - SWR mutation object with trigger function
 */
export const useUpdateVoucher = (voucherId) => {
  const endpoint = `/v1/bo/vouchers/${voucherId}`;
  
  return useSWRMutation(
    endpoint,
    updateVoucherFetcher,
    {
      onSuccess: (data) => {
        console.log("🎉 Voucher updated successfully:", data);
      },
      onError: (error) => {
        console.error("💥 Failed to update voucher:", error);
      }
    }
  );
};

/**
 * Update voucher with form data transformation
 * @param {string} voucherId - The voucher ID to update  
 * @param {Object} formValues - Form values from store
 * @returns {Promise} - API response
 */
export const updateVoucher = async (voucherId, formValues) => {
  const useFetcherMuatrans = false;
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  
  const requestBody = transformFormValuesToUpdateRequestBody(formValues);
  const endpoint = `/v1/bo/vouchers/${voucherId}`;
  
  console.log("🚀 Direct update voucher call:");
  console.log("Endpoint:", endpoint);
  console.log("Request body:", requestBody);
  
  try {
    const response = await fetcher.put(endpoint, requestBody);
    console.log("✅ Update voucher success:", response);
    return response;
  } catch (error) {
    console.error("❌ Update voucher error:", error);
    throw error;
  }
};