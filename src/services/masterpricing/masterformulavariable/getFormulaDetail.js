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
    id: "39100e8e-f4c9-4dd2-a025-85df7a4a3f89",
    name: "4PL",
    isActive: true,
    createdAt: "2025-09-18T16:17:49.926Z",
    createdBy: "Backend BO GM",
    variables: [
      {
        id: "5441c5e3-fc52-4e0f-a12f-306cdc6c792d",
        variableName: "a",
        isFromShipper: false,
        isActive: true,
        createdAt: "2025-09-18T16:17:49.976Z"
      },
      {
        id: "d33da90c-233d-48b9-bf0f-36fc44e173f5",
        variableName: "b",
        isFromShipper: false,
        isActive: true,
        createdAt: "2025-09-18T16:17:49.976Z"
      },
      {
        id: "0d305d28-2752-4585-a331-1b2bea3e232e",
        variableName: "c",
        isFromShipper: false,
        isActive: true,
        createdAt: "2025-09-18T16:17:49.976Z"
      },
      {
        id: "e3464bad-f832-403f-9443-5cd3e321a941",
        variableName: "d",
        isFromShipper: false,
        isActive: true,
        createdAt: "2025-09-18T16:17:49.976Z"
      },
      {
        id: "e6e0fd5b-7734-4aad-8ad9-769d4deedeb9",
        variableName: "jarak",
        isFromShipper: true,
        isActive: true,
        createdAt: "2025-09-18T16:17:49.976Z"
      },
      {
        id: "4ec224a0-bd77-42fa-9a85-2ab07115c266",
        variableName: "tonase",
        isFromShipper: true,
        isActive: true,
        createdAt: "2025-09-18T16:17:49.976Z"
      }
    ]
  },
  Type: "/v1/bo/pricing/master/formula/39100e8e-f4c9-4dd2-a025-85df7a4a3f89"
};

/**
 * Fetcher function to get formula detail
 * @param {string} url - The API endpoint URL
 * @returns {Promise} - Axios response promise
 */
export const getFormulaDetail = async (url) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.get(url);
};

/**
 * Transform API response data to form format
 * @param {Object} apiData - Raw API response data
 * @returns {Object} - Transformed data for form usage
 */
export const transformFormulaDetailToFormData = (apiData) => {
  if (!apiData) return null;

  return {
    id: apiData.id,
    name: apiData.name,
    isActive: apiData.isActive,
    variables: apiData.variables || [],
  };
};

/**
 * Transform API response data to table format
 * @param {Object} apiData - Raw API response data
 * @returns {Object} - Transformed data for table usage
 */
export const transformFormulaDetailToTableData = (apiData) => {
  if (!apiData) return null;

  const createdDate = new Date(apiData.createdAt);
  
  return {
    id: apiData.id,
    name: apiData.name,
    isActive: apiData.isActive,
    createdAt: apiData.createdAt,
    createdBy: apiData.createdBy,
    variables: apiData.variables || [],
    // Formatted display values
    status: apiData.isActive ? "Aktif" : "Tidak Aktif",
    statusColor: apiData.isActive ? "text-green-600" : "text-red-600",
    statusBadge: apiData.isActive 
      ? "bg-green-100 text-green-800 border-green-200" 
      : "bg-red-100 text-red-800 border-red-200",
    createdAtFormatted: `${createdDate.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })} ${createdDate.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    })}`,
    variablesCount: apiData.variables ? apiData.variables.length : 0,
    variablesList: apiData.variables ? apiData.variables.map(v => v.variableName).join(", ") : "",
  };
};

/**
 * Transform API response data to detail page format
 * @param {Object} apiData - Raw API response data
 * @returns {Object} - Transformed data for detail page usage
 */
export const transformFormulaDetailToDetailData = (apiData) => {
  if (!apiData) return null;

  const createdDate = new Date(apiData.createdAt);
  
  return {
    id: apiData.id,
    name: apiData.name,
    isActive: apiData.isActive,
    createdAt: apiData.createdAt,
    createdBy: apiData.createdBy,
    variables: apiData.variables || [],
    // Formatted display values
    status: apiData.isActive ? "Aktif" : "Tidak Aktif",
    statusColor: apiData.isActive ? "text-green-600" : "text-red-600",
    statusBadge: apiData.isActive 
      ? "bg-green-100 text-green-800 border-green-200" 
      : "bg-red-100 text-red-800 border-red-200",
    createdAtFormatted: `${createdDate.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })} ${createdDate.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    })}`,
    variablesCount: apiData.variables ? apiData.variables.length : 0,
    variablesList: apiData.variables ? apiData.variables.map(v => v.variableName).join(", ") : "",
    // Variable details
    variablesTableData: apiData.variables ? apiData.variables.map(variable => ({
      id: variable.id,
      variableName: variable.variableName,
      isFromShipper: variable.isFromShipper,
      isActive: variable.isActive,
      createdAt: variable.createdAt,
      // Formatted display values
      source: variable.isFromShipper ? "Shipper" : "Sistem",
      sourceColor: variable.isFromShipper ? "text-blue-600" : "text-green-600",
      sourceBadge: variable.isFromShipper 
        ? "bg-blue-100 text-blue-800 border-blue-200" 
        : "bg-green-100 text-green-800 border-green-200",
      status: variable.isActive ? "Aktif" : "Tidak Aktif",
      statusColor: variable.isActive ? "text-green-600" : "text-red-600",
      statusBadge: variable.isActive 
        ? "bg-green-100 text-green-800 border-green-200" 
        : "bg-red-100 text-red-800 border-red-200",
    })) : [],
  };
};

/**
 * Transform variables to dropdown format
 * @param {Array} variables - Array of variables
 * @returns {Array} - Transformed data for dropdown usage
 */
export const transformVariablesToDropdownData = (variables) => {
  if (!variables || !Array.isArray(variables)) return [];

  return variables
    .filter(variable => variable.isActive)
    .map(variable => ({
      value: variable.id,
      label: variable.variableName,
      isFromShipper: variable.isFromShipper,
    }));
};

/**
 * Transform variables to select format
 * @param {Array} variables - Array of variables
 * @returns {Array} - Transformed data for select usage
 */
export const transformVariablesToSelectData = (variables) => {
  if (!variables || !Array.isArray(variables)) return [];

  return variables.map(variable => ({
    value: variable.id,
    label: variable.variableName,
    isFromShipper: variable.isFromShipper,
    isActive: variable.isActive,
  }));
};

/**
 * Get variables by source
 * @param {Array} variables - Array of variables
 * @param {boolean} isFromShipper - Filter by source
 * @returns {Array} - Filtered variables
 */
export const getVariablesBySource = (variables, isFromShipper) => {
  if (!variables || !Array.isArray(variables)) return [];
  
  return variables.filter(variable => variable.isFromShipper === isFromShipper);
};

/**
 * Get active variables only
 * @param {Array} variables - Array of variables
 * @returns {Array} - Active variables only
 */
export const getActiveVariables = (variables) => {
  if (!variables || !Array.isArray(variables)) return [];
  
  return variables.filter(variable => variable.isActive);
};

/**
 * Get inactive variables only
 * @param {Array} variables - Array of variables
 * @returns {Array} - Inactive variables only
 */
export const getInactiveVariables = (variables) => {
  if (!variables || !Array.isArray(variables)) return [];
  
  return variables.filter(variable => !variable.isActive);
};

/**
 * Get variables count by source
 * @param {Array} variables - Array of variables
 * @returns {Object} - Count by source
 */
export const getVariablesCountBySource = (variables) => {
  if (!variables || !Array.isArray(variables)) return { shipper: 0, system: 0, total: 0 };
  
  const shipperCount = variables.filter(v => v.isFromShipper).length;
  const systemCount = variables.filter(v => !v.isFromShipper).length;
  
  return {
    shipper: shipperCount,
    system: systemCount,
    total: variables.length,
  };
};

/**
 * Get variables count by status
 * @param {Array} variables - Array of variables
 * @returns {Object} - Count by status
 */
export const getVariablesCountByStatus = (variables) => {
  if (!variables || !Array.isArray(variables)) return { active: 0, inactive: 0, total: 0 };
  
  const activeCount = variables.filter(v => v.isActive).length;
  const inactiveCount = variables.filter(v => !v.isActive).length;
  
  return {
    active: activeCount,
    inactive: inactiveCount,
    total: variables.length,
  };
};

/**
 * Search variables by name
 * @param {Array} variables - Array of variables
 * @param {string} searchTerm - Search term
 * @returns {Array} - Filtered variables
 */
export const searchVariablesByName = (variables, searchTerm) => {
  if (!variables || !Array.isArray(variables) || !searchTerm) return variables;
  
  return variables.filter(variable => 
    variable.variableName.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

/**
 * Sort variables by name
 * @param {Array} variables - Array of variables
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} - Sorted variables
 */
export const sortVariablesByName = (variables, order = 'asc') => {
  if (!variables || !Array.isArray(variables)) return [];
  
  return [...variables].sort((a, b) => {
    const comparison = a.variableName.localeCompare(b.variableName);
    return order === 'desc' ? -comparison : comparison;
  });
};

/**
 * Sort variables by source
 * @param {Array} variables - Array of variables
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} - Sorted variables
 */
export const sortVariablesBySource = (variables, order = 'asc') => {
  if (!variables || !Array.isArray(variables)) return [];
  
  return [...variables].sort((a, b) => {
    const comparison = a.isFromShipper - b.isFromShipper;
    return order === 'desc' ? -comparison : comparison;
  });
};

/**
 * Sort variables by status
 * @param {Array} variables - Array of variables
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} - Sorted variables
 */
export const sortVariablesByStatus = (variables, order = 'asc') => {
  if (!variables || !Array.isArray(variables)) return [];
  
  return [...variables].sort((a, b) => {
    const comparison = a.isActive - b.isActive;
    return order === 'desc' ? -comparison : comparison;
  });
};

/**
 * SWR hook for fetching formula detail
 * @param {string} formulaId - Formula ID
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetFormulaDetail = (formulaId, options = {}) => {
  const cacheKey = formulaId ? `/v1/bo/pricing/master/formula/${formulaId}` : null;

  return useSWR(cacheKey, getFormulaDetail, {
    // Default SWR options
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    ...options,
  });
};

/**
 * SWR hook for fetching formula detail for form
 * @param {string} formulaId - Formula ID
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object with form data
 */
export const useGetFormulaDetailForForm = (formulaId, options = {}) => {
  const { data, error, isLoading, mutate } = useGetFormulaDetail(formulaId, options);
  
  return {
    data: data ? transformFormulaDetailToFormData(data.data.Data) : null,
    error,
    isLoading,
    mutate,
  };
};

/**
 * SWR hook for fetching formula detail for table
 * @param {string} formulaId - Formula ID
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object with table data
 */
export const useGetFormulaDetailForTable = (formulaId, options = {}) => {
  const { data, error, isLoading, mutate } = useGetFormulaDetail(formulaId, options);
  
  return {
    data: data ? transformFormulaDetailToTableData(data.data.Data) : null,
    error,
    isLoading,
    mutate,
  };
};

/**
 * SWR hook for fetching formula detail for detail page
 * @param {string} formulaId - Formula ID
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object with detail data
 */
export const useGetFormulaDetailForDetail = (formulaId, options = {}) => {
  const { data, error, isLoading, mutate } = useGetFormulaDetail(formulaId, options);
  
  return {
    data: data ? transformFormulaDetailToDetailData(data.data.Data) : null,
    error,
    isLoading,
    mutate,
  };
};

/**
 * Get formula detail with mock data for development
 * @param {string} formulaId - Formula ID
 * @returns {Promise} - Mock data promise
 */
export const getFormulaDetailMock = async (formulaId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    ...mockAPIResult,
    Data: {
      ...mockAPIResult.Data,
      id: formulaId || mockAPIResult.Data.id,
    }
  };
};

/**
 * Get status display text
 * @param {boolean} isActive - Active status
 * @returns {string} - Display text
 */
export const getStatusDisplayText = (isActive) => {
  return isActive ? "Aktif" : "Tidak Aktif";
};

/**
 * Get status color class
 * @param {boolean} isActive - Active status
 * @returns {string} - CSS class
 */
export const getStatusColorClass = (isActive) => {
  return isActive ? "text-green-600" : "text-red-600";
};

/**
 * Get status badge class
 * @param {boolean} isActive - Active status
 * @returns {string} - CSS class for badge
 */
export const getStatusBadgeClass = (isActive) => {
  return isActive 
    ? "bg-green-100 text-green-800 border-green-200" 
    : "bg-red-100 text-red-800 border-red-200";
};

/**
 * Get source display text
 * @param {boolean} isFromShipper - Whether from shipper
 * @returns {string} - Display text
 */
export const getSourceDisplayText = (isFromShipper) => {
  return isFromShipper ? "Shipper" : "Sistem";
};

/**
 * Get source color class
 * @param {boolean} isFromShipper - Whether from shipper
 * @returns {string} - CSS class
 */
export const getSourceColorClass = (isFromShipper) => {
  return isFromShipper ? "text-blue-600" : "text-green-600";
};

/**
 * Get source badge class
 * @param {boolean} isFromShipper - Whether from shipper
 * @returns {string} - CSS class for badge
 */
export const getSourceBadgeClass = (isFromShipper) => {
  return isFromShipper 
    ? "bg-blue-100 text-blue-800 border-blue-200" 
    : "bg-green-100 text-green-800 border-green-200";
};
