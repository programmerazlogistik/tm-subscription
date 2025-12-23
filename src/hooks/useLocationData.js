import { useMemo } from 'react';
import { useGetVoucherLocations } from '@/services/mastervoucher/getVoucherLocations';
import { citiesByProvince, provinces } from '@/components/MasterVoucher/dummy';

/**
 * Custom hook to get location data from API with fallback to dummy data
 * @returns {Object} - { currentProvinces, currentCitiesByProvince, isLoading, error }
 */
export const useLocationData = () => {
  const useFetcherMuatrans = true; // Set to false as requested
  const { data: locationsData, error, isLoading } = useGetVoucherLocations(useFetcherMuatrans);

  // Transform API data to match existing format
  const { apiProvinces, apiCitiesByProvince } = useMemo(() => {
    if (!locationsData?.Data) {
      return { apiProvinces: [], apiCitiesByProvince: {} };
    }

    const provincesArray = locationsData.Data.map(province => province.name);
    const citiesMap = {};
    
    locationsData.Data.forEach(province => {
      citiesMap[province.name] = province.cities.map(city => city.name);
    });

    return { 
      apiProvinces: provincesArray, 
      apiCitiesByProvince: citiesMap 
    };
  }, [locationsData]);

  // Use API data if available, fallback to dummy data
  const currentProvinces = apiProvinces.length > 0 ? apiProvinces : provinces;
  const currentCitiesByProvince = Object.keys(apiCitiesByProvince).length > 0 ? apiCitiesByProvince : citiesByProvince;

  return {
    currentProvinces,
    currentCitiesByProvince,
    isLoading,
    error,
  };
};