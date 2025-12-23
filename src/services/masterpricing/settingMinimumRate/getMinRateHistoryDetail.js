import useSWR from "swr";

import { fetcherMuatrans } from "@/lib/axios";
import { fetcherMuatransCS } from "@/lib/fetcherBasicAuth";

// Configuration flag for fetcher selection
const useFetcherMuatrans = true;

// Mock API result for development/testing
export const mockAPIResult = {
  Message: {
    Code: 200,
    Text: "OK"
  },
  Data: {
    id: "21368ef0-7c38-4b51-a0ee-a495230b1642",
    action: "UPDATE",
    createdAt: "2025-09-20T02:55:26.455Z",
    createdBy: "Backend BO GM",
    changes: {
      coltDieselEngkel: {
        from: "2",
        to: "3",
        changed: true
      },
      coltDieselDouble: {
        from: "2",
        to: "3",
        changed: true
      },
      mediumTruckRigid4x2: {
        from: "12",
        to: "15",
        changed: true
      },
      mediumTruck6x2Rigid: {
        from: "12",
        to: "15",
        changed: true
      },
      mediumTruckRigid6x4: {
        from: "12",
        to: "15",
        changed: true
      },
      mediumTruck4x2Gandengan: {
        from: "12",
        to: "15",
        changed: true
      },
      tractorHead4x2SemiTrailer: {
        from: "18",
        to: "20",
        changed: true
      },
      tractorHead6x4SemiTrailer: {
        from: "18",
        to: "20",
        changed: true
      },
      effectiveDate: {
        from: "2024-12-25T00:00:00.000Z",
        to: "2024-12-30T00:00:00.000Z",
        changed: true
      }
    },
    vehicleTypes: [
      {
        key: "coltDieselEngkel",
        label: "Colt Diesel Engkel",
        from: "2",
        to: "3",
        changed: true
      },
      {
        key: "coltDieselDouble",
        label: "Colt Diesel Double",
        from: "2",
        to: "3",
        changed: true
      },
      {
        key: "mediumTruckRigid4x2",
        label: "Medium truck Rigid 4 x 2",
        from: "12",
        to: "15",
        changed: true
      },
      {
        key: "mediumTruck6x2Rigid",
        label: "Medium truck 6 x 2 (Rigid)",
        from: "12",
        to: "15",
        changed: true
      },
      {
        key: "mediumTruckRigid6x4",
        label: "Medium Truck Rigid 6 x 4",
        from: "12",
        to: "15",
        changed: true
      },
      {
        key: "mediumTruck4x2Gandengan",
        label: "Medium truck 4 x 2 + gandengan",
        from: "12",
        to: "15",
        changed: true
      },
      {
        key: "tractorHead4x2SemiTrailer",
        label: "Tractor Head 4x2 dan Medium Semi Trailer",
        from: "18",
        to: "20",
        changed: true
      },
      {
        key: "tractorHead6x4SemiTrailer",
        label: "Tractor head 6 x 4 dan Semi Trailer",
        from: "18",
        to: "20",
        changed: true
      }
    ],
    effectiveDate: {
      from: "2024-12-25T00:00:00.000Z",
      to: "2024-12-30T00:00:00.000Z",
      changed: true
    }
  },
  Type: "/v1/bo/pricing/setting/min-rates/history/21368ef0-7c38-4b51-a0ee-a495230b1642"
};

/**
 * Fetcher function to get min rate history detail
 * @param {string} url - The API endpoint URL
 * @returns {Promise} - Axios response promise
 */
export const getMinRateHistoryDetail = async (url) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.get(url);
};

/**
 * Transform API response data to detail format
 * @param {Object} apiData - Raw API response data
 * @returns {Object} - Transformed data for detail usage
 */
export const transformMinRateHistoryDetailToDetailData = (apiData) => {
  if (!apiData) return null;

  const createdDate = new Date(apiData.createdAt);
  
  return {
    id: apiData.id,
    action: apiData.action,
    createdAt: apiData.createdAt,
    createdBy: apiData.createdBy,
    history: apiData.history || {},
    // Formatted display values
    createdAtFormatted: `${createdDate.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })} ${createdDate.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    })}`,
    actionText: getActionDisplayText(apiData.action),
    actionColor: getActionColorClass(apiData.action),
    actionBadge: getActionBadgeClass(apiData.action),
    // Process afterState data
    afterState: apiData.history?.afterState || [],
    beforeState: apiData.history?.beforeState || [],
    // Process effective date from history changes
    effectiveDate: {
      validFrom: apiData.history?.changes?.validFrom || null,
      actionType: apiData.history?.changes?.actionType || null
    }
  };
};

/**
 * Transform API response data to table format
 * @param {Object} apiData - Raw API response data
 * @returns {Object} - Transformed data for table usage
 */
export const transformMinRateHistoryDetailToTableData = (apiData) => {
  if (!apiData) return null;

  const createdDate = new Date(apiData.createdAt);
  
  return {
    id: apiData.id,
    action: apiData.action,
    createdAt: apiData.createdAt,
    createdBy: apiData.createdBy,
    changes: apiData.changes || {},
    vehicleTypes: apiData.vehicleTypes || [],
    effectiveDate: apiData.effectiveDate || {},
    // Formatted display values
    createdAtFormatted: `${createdDate.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })} ${createdDate.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    })}`,
    actionText: getActionDisplayText(apiData.action),
    actionColor: getActionColorClass(apiData.action),
    actionBadge: getActionBadgeClass(apiData.action),
    // Summary information
    totalChanges: Object.keys(apiData.changes || {}).length,
    vehicleChanges: (apiData.vehicleTypes || []).filter(v => v.changed).length,
    effectiveDateChanged: apiData.effectiveDate?.changed || false,
  };
};

/**
 * Transform API response data to form format
 * @param {Object} apiData - Raw API response data
 * @returns {Object} - Transformed data for form usage
 */
export const transformMinRateHistoryDetailToFormData = (apiData) => {
  if (!apiData) return null;

  return {
    id: apiData.id,
    action: apiData.action,
    createdAt: apiData.createdAt,
    createdBy: apiData.createdBy,
    changes: apiData.changes || {},
    vehicleTypes: apiData.vehicleTypes || [],
    effectiveDate: apiData.effectiveDate || {},
  };
};

/**
 * Get action display text
 * @param {string} action - Action code
 * @returns {string} - Display text
 */
export const getActionDisplayText = (action) => {
  const actionMap = {
    CREATE: "Dibuat",
    UPDATE: "Diperbarui", 
    DELETE: "Dihapus",
    ACTIVATE: "Diaktifkan",
    DEACTIVATE: "Dinonaktifkan"
  };
  
  return actionMap[action] || action;
};

/**
 * Get action color class
 * @param {string} action - Action code
 * @returns {string} - CSS class
 */
export const getActionColorClass = (action) => {
  const colorMap = {
    CREATE: "text-green-600 bg-green-100",
    UPDATE: "text-blue-600 bg-blue-100",
    DELETE: "text-red-600 bg-red-100",
    ACTIVATE: "text-green-600 bg-green-100",
    DEACTIVATE: "text-orange-600 bg-orange-100"
  };
  
  return colorMap[action] || "text-gray-600 bg-gray-100";
};

/**
 * Get action badge class
 * @param {string} action - Action code
 * @returns {string} - CSS class for badge
 */
export const getActionBadgeClass = (action) => {
  const badgeMap = {
    CREATE: "bg-green-100 text-green-800 border-green-200",
    UPDATE: "bg-blue-100 text-blue-800 border-blue-200",
    DELETE: "bg-red-100 text-red-800 border-red-200",
    ACTIVATE: "bg-green-100 text-green-800 border-green-200",
    DEACTIVATE: "bg-orange-100 text-orange-800 border-orange-200"
  };
  
  return badgeMap[action] || "bg-gray-100 text-gray-800 border-gray-200";
};

/**
 * Get change summary text
 * @param {Object} changes - Changes object
 * @returns {string} - Change summary
 */
export const getChangeSummaryText = (changes) => {
  if (!changes || Object.keys(changes).length === 0) {
    return "Tidak ada perubahan";
  }

  const changeList = [];
  const vehicleTypes = [
    { key: "coltDieselEngkel", label: "Colt Diesel Engkel" },
    { key: "coltDieselDouble", label: "Colt Diesel Double" },
    { key: "mediumTruckRigid4x2", label: "Medium truck Rigid 4 x 2" },
    { key: "mediumTruck6x2Rigid", label: "Medium truck 6 x 2 (Rigid)" },
    { key: "mediumTruckRigid6x4", label: "Medium Truck Rigid 6 x 4" },
    { key: "mediumTruck4x2Gandengan", label: "Medium truck 4 x 2 + gandengan" },
    { key: "tractorHead4x2SemiTrailer", label: "Tractor Head 4x2 dan Medium Semi Trailer" },
    { key: "tractorHead6x4SemiTrailer", label: "Tractor head 6 x 4 dan Semi Trailer" }
  ];

  // Check vehicle type changes
  vehicleTypes.forEach(vehicle => {
    const change = changes[vehicle.key];
    if (change && change.changed) {
      changeList.push(`${vehicle.label}: ${change.from} km → ${change.to} km`);
    }
  });

  // Check effective date change
  if (changes.effectiveDate && changes.effectiveDate.changed) {
    const fromDate = new Date(changes.effectiveDate.from).toLocaleDateString("id-ID");
    const toDate = new Date(changes.effectiveDate.to).toLocaleDateString("id-ID");
    changeList.push(`Berlaku Mulai: ${fromDate} → ${toDate}`);
  }

  return changeList.join(", ");
};

/**
 * Get vehicle type change details
 * @param {Object} changes - Changes object
 * @returns {Array} - Array of vehicle type changes
 */
export const getVehicleTypeChanges = (changes) => {
  if (!changes) return [];

  const vehicleTypes = [
    { key: "coltDieselEngkel", label: "Colt Diesel Engkel" },
    { key: "coltDieselDouble", label: "Colt Diesel Double" },
    { key: "mediumTruckRigid4x2", label: "Medium truck Rigid 4 x 2" },
    { key: "mediumTruck6x2Rigid", label: "Medium truck 6 x 2 (Rigid)" },
    { key: "mediumTruckRigid6x4", label: "Medium Truck Rigid 6 x 4" },
    { key: "mediumTruck4x2Gandengan", label: "Medium truck 4 x 2 + gandengan" },
    { key: "tractorHead4x2SemiTrailer", label: "Tractor Head 4x2 dan Medium Semi Trailer" },
    { key: "tractorHead6x4SemiTrailer", label: "Tractor head 6 x 4 dan Semi Trailer" }
  ];

  return vehicleTypes.map(vehicle => {
    const change = changes[vehicle.key];
    return {
      key: vehicle.key,
      label: vehicle.label,
      from: change?.from || "-",
      to: change?.to || "-",
      changed: change?.changed || false,
      fromFormatted: change?.from ? `${change.from} km` : "-",
      toFormatted: change?.to ? `${change.to} km` : "-",
      changeText: change?.changed ? `${change.from} km → ${change.to} km` : "Tidak ada perubahan",
      changeColor: change?.changed ? "text-blue-600" : "text-gray-500"
    };
  });
};

/**
 * Get effective date change details
 * @param {Object} changes - Changes object
 * @returns {Object} - Effective date change details
 */
export const getEffectiveDateChange = (changes) => {
  if (!changes || !changes.effectiveDate) {
    return {
      from: "-",
      to: "-",
      changed: false,
      fromFormatted: "-",
      toFormatted: "-",
      changeText: "Tidak ada perubahan",
      changeColor: "text-gray-500"
    };
  }

  const change = changes.effectiveDate;
  const fromDate = change.from ? new Date(change.from) : null;
  const toDate = change.to ? new Date(change.to) : null;

  return {
    from: change.from || "-",
    to: change.to || "-",
    changed: change.changed || false,
    fromFormatted: fromDate ? fromDate.toLocaleDateString("id-ID") : "-",
    toFormatted: toDate ? toDate.toLocaleDateString("id-ID") : "-",
    changeText: change.changed && fromDate && toDate ? 
      `${fromDate.toLocaleDateString("id-ID")} → ${toDate.toLocaleDateString("id-ID")}` : 
      "Tidak ada perubahan",
    changeColor: change.changed ? "text-blue-600" : "text-gray-500"
  };
};

/**
 * Get change statistics
 * @param {Object} changes - Changes object
 * @returns {Object} - Change statistics
 */
export const getChangeStatistics = (changes) => {
  if (!changes) {
    return {
      totalChanges: 0,
      vehicleChanges: 0,
      effectiveDateChanged: false,
      changedFields: []
    };
  }

  const vehicleTypes = [
    "coltDieselEngkel", "coltDieselDouble", "mediumTruckRigid4x2", 
    "mediumTruck6x2Rigid", "mediumTruckRigid6x4", "mediumTruck4x2Gandengan",
    "tractorHead4x2SemiTrailer", "tractorHead6x4SemiTrailer"
  ];

  const changedFields = [];
  let vehicleChanges = 0;

  // Check vehicle type changes
  vehicleTypes.forEach(key => {
    if (changes[key] && changes[key].changed) {
      changedFields.push(key);
      vehicleChanges++;
    }
  });

  // Check effective date change
  const effectiveDateChanged = changes.effectiveDate && changes.effectiveDate.changed;
  if (effectiveDateChanged) {
    changedFields.push("effectiveDate");
  }

  return {
    totalChanges: Object.keys(changes).filter(key => changes[key] && changes[key].changed).length,
    vehicleChanges,
    effectiveDateChanged,
    changedFields
  };
};

/**
 * SWR hook for fetching min rate history detail
 * @param {string} historyId - History ID
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetMinRateHistoryDetail = (historyId, options = {}) => {
  const cacheKey = historyId ? `/v1/bo/pricing/setting/min-rates/history/${historyId}` : null;

  return useSWR(cacheKey, getMinRateHistoryDetail, {
    // Default SWR options
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    ...options,
  });
};

/**
 * SWR hook for fetching min rate history detail for detail page
 * @param {string} historyId - History ID
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object with detail data
 */
export const useGetMinRateHistoryDetailForDetail = (historyId, options = {}) => {
  const { data, error, isLoading, mutate } = useGetMinRateHistoryDetail(historyId, options);
  
  return {
    data: data ? data.data.Data : null,
    error,
    isLoading,
    mutate,
  };
};

/**
 * SWR hook for fetching min rate history detail for table
 * @param {string} historyId - History ID
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object with table data
 */
export const useGetMinRateHistoryDetailForTable = (historyId, options = {}) => {
  const { data, error, isLoading, mutate } = useGetMinRateHistoryDetail(historyId, options);
  
  return {
    data: data ? transformMinRateHistoryDetailToTableData(data.data.Data) : null,
    error,
    isLoading,
    mutate,
  };
};

/**
 * SWR hook for fetching min rate history detail for form
 * @param {string} historyId - History ID
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object with form data
 */
export const useGetMinRateHistoryDetailForForm = (historyId, options = {}) => {
  const { data, error, isLoading, mutate } = useGetMinRateHistoryDetail(historyId, options);
  
  return {
    data: data ? transformMinRateHistoryDetailToFormData(data.data.Data) : null,
    error,
    isLoading,
    mutate,
  };
};

/**
 * Get min rate history detail with mock data for development
 * @param {string} historyId - History ID
 * @returns {Promise} - Mock data promise
 */
export const getMinRateHistoryDetailMock = async (historyId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    ...mockAPIResult,
    Data: {
      ...mockAPIResult.Data,
      id: historyId || mockAPIResult.Data.id,
    }
  };
};
