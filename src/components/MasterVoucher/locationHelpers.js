import { citiesByProvince } from "./dummy";

/**
 * Get the selection state of a province based on selected locations
 * @param {string} province - The province name
 * @param {string[]|Object[]} selectedLocations - Array of selected location strings or objects
 * @param {Object} citiesByProvinceData - Optional cities by province data (defaults to dummy data)
 * @returns {'none' | 'all' | 'partial'} - The selection state
 */
export const getProvinceSelectionState = (province, selectedLocations, citiesByProvinceData = null) => {
  const dataSource = citiesByProvinceData || citiesByProvince;
  const citiesInProvince = dataSource[province] || [];
  
  let selectedCitiesCount;
  
  // Handle both string format ("Province - City") and object format
  if (selectedLocations.length > 0 && typeof selectedLocations[0] === 'string') {
    selectedCitiesCount = selectedLocations.filter((loc) =>
      loc.startsWith(`${province} - `)
    ).length;
  } else {
    selectedCitiesCount = selectedLocations.filter((loc) => 
      loc.provinceName === province || (loc.label && loc.label.startsWith(`${province} - `))
    ).length;
  }

  if (selectedCitiesCount === 0) return "none";
  if (selectedCitiesCount === citiesInProvince.length) return "all";
  return "partial";
};

/**
 * Get all possible locations (province - city combinations)
 * @param {Object} citiesByProvinceData - Optional cities by province data (defaults to dummy data)
 * @returns {Array<{province: string, city: string}>} - Array of all location objects
 */
export const getAllLocations = (citiesByProvinceData = null) => {
  const dataSource = citiesByProvinceData || citiesByProvince;
  return Object.entries(dataSource).flatMap(([province, cities]) =>
    cities.map((city) => ({ province, city }))
  );
};

/**
 * Check if all provinces are selected
 * @param {string[]|Object[]} selectedLocations - Array of selected location strings or objects
 * @param {Object} citiesByProvinceData - Optional cities by province data (defaults to dummy data)
 * @returns {boolean} - True if all provinces are selected
 */
export const isAllProvincesSelected = (selectedLocations, citiesByProvinceData = null) => {
  const allLocations = getAllLocations(citiesByProvinceData);
  return selectedLocations.length === allLocations.length;
};

/**
 * Generate badges from selected locations (supports both string and object formats)
 * @param {string[]|Object[]} selectedLocations - Array of selected location strings or objects
 * @param {Object} citiesByProvinceData - Optional cities by province data (defaults to dummy data)
 * @returns {Array<{type: string, label: string, value: string, province?: string}>} - Array of badge objects
 */
export const generateBadges = (selectedLocations, citiesByProvinceData = null) => {
  const badges = [];
  const selectedProvinces = {};

  if (isAllProvincesSelected(selectedLocations, citiesByProvinceData)) {
    badges.push({
      type: "all-provinces",
      label: "Semua Provinsi",
      value: "all",
    });
  } else {
    // Handle both string and object formats
    selectedLocations.forEach((location) => {
      let province, city;
      
      if (typeof location === 'string') {
        [province, city] = location.split(" - ");
      } else {
        province = location.provinceName || location.province;
        city = location.cityName || location.city;
      }
      
      if (!selectedProvinces[province]) {
        selectedProvinces[province] = [];
      }
      selectedProvinces[province].push(city);
    });

    Object.entries(selectedProvinces).forEach(([province, cities]) => {
      if (getProvinceSelectionState(province, selectedLocations, citiesByProvinceData) === "all") {
        badges.push({
          type: "province",
          province,
          label: `${province} - Semua Kota/Kabupaten`,
          value: province,
        });
      } else {
        cities.forEach((city) => {
          badges.push({
            type: "city",
            label: `${province} - ${city}`,
            value: `${province} - ${city}`,
          });
        });
      }
    });
  }

  return badges;
};

/**
 * Remove a badge from selected locations (supports both string and object formats)
 * @param {Array<{type: string, province?: string, value: string}>} badge - The badge to remove
 * @param {string[]|Object[]} selectedLocations - Current selected locations
 * @param {Object} citiesByProvinceData - Optional cities by province data (defaults to dummy data)
 * @returns {string[]|Object[]} - New selected locations array
 */
export const removeBadgeFromLocations = (badge, selectedLocations, citiesByProvinceData = null) => {
  let newLocations = [...selectedLocations];
  const dataSource = citiesByProvinceData || citiesByProvince;

  if (badge.type === "all-provinces") {
    newLocations = [];
  } else if (badge.type === "province") {
    // Handle both string and object formats
    if (selectedLocations.length > 0 && typeof selectedLocations[0] === 'string') {
      newLocations = newLocations.filter(
        (loc) => !loc.startsWith(`${badge.province} - `)
      );
    } else {
      newLocations = newLocations.filter(
        (loc) => loc.provinceName !== badge.province && 
                !(loc.label && loc.label.startsWith(`${badge.province} - `))
      );
    }
  } else if (badge.type === "city") {
    // Handle both string and object formats
    if (selectedLocations.length > 0 && typeof selectedLocations[0] === 'string') {
      newLocations = newLocations.filter((loc) => loc !== badge.value);
    } else {
      newLocations = newLocations.filter((loc) => loc.label !== badge.value);
    }
  }

  return newLocations;
};
