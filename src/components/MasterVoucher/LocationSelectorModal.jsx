import { useCallback, useEffect, useMemo, useState } from "react";

import { useGetVoucherLocations } from "@/services/mastervoucher/getVoucherLocations";

import Button from "@/components/Button/Button";
import Checkbox from "@/components/Form/Checkbox";
import Input from "@/components/Form/Input";
import IconComponent from "@/components/IconComponent/IconComponent";
import { citiesByProvince, provinces } from "@/components/MasterVoucher/dummy";
import {
  generateBadges,
  getProvinceSelectionState,
  isAllProvincesSelected,
  removeBadgeFromLocations,
} from "@/components/MasterVoucher/locationHelpers";
import { Modal, ModalContent, ModalTitle } from "@/components/Modal/Modal";
import SelectedItemsModal from "@/components/SelectedItemsModal/SelectedItemsModal";

import { cn } from "@/lib/utils";

export const LocationSelectorModal = ({
  open,
  onOpenChange,
  title = "Provinsi & Kota/Kabupaten Lokasi Muat*",
  modalTitle = "Pilih Lokasi",
  onApply,
  selectedLocations: initialSelectedLocations = [],
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openProvinces, setOpenProvinces] = useState(new Set());
  const [tempSelectedLocations, setTempSelectedLocations] = useState(
    initialSelectedLocations
  );
  const [showAllModal, setShowAllModal] = useState(false);

  // Fetch locations from API
  const useFetcherMuatrans = true; // Set to false as requested
  const {
    data: locationsData,
    error,
    isLoading,
  } = useGetVoucherLocations(useFetcherMuatrans);

  // Transform API data to match existing format + add ID support
  const { provinces: apiProvinces, citiesByProvince: apiCitiesByProvince, provinceIdMap, cityIdMap } =
    useMemo(() => {
      if (!locationsData?.Data) {
        return { provinces: [], citiesByProvince: {}, provinceIdMap: {}, cityIdMap: {} };
      }

      const provincesArray = locationsData.Data.map(
        (province) => province.name
      );
      const citiesMap = {};
      const provIdMap = {}; // Map province name to ID
      const cityIdMapData = {}; // Map "provinceName-cityName" to cityId

      locationsData.Data.forEach((province) => {
        provIdMap[province.name] = province.id;
        citiesMap[province.name] = province.cities.map((city) => city.name);
        
        province.cities.forEach((city) => {
          cityIdMapData[`${province.name}-${city.name}`] = city.id;
        });
      });

      return {
        provinces: provincesArray,
        citiesByProvince: citiesMap,
        provinceIdMap: provIdMap,
        cityIdMap: cityIdMapData,
      };
    }, [locationsData]);

  // Use API data if available, fallback to dummy data
  const currentProvinces = apiProvinces.length > 0 ? apiProvinces : provinces;
  const currentCitiesByProvince =
    Object.keys(apiCitiesByProvince).length > 0
      ? apiCitiesByProvince
      : citiesByProvince;
  
  // Use API ID mappings if available, otherwise create fallback mappings using names as IDs
  const currentProvinceIdMap = Object.keys(provinceIdMap || {}).length > 0 
    ? provinceIdMap 
    : Object.fromEntries(currentProvinces.map(p => [p, p])); // Use name as ID fallback
  
  const currentCityIdMap = Object.keys(cityIdMap || {}).length > 0
    ? cityIdMap
    : Object.fromEntries(
        Object.entries(currentCitiesByProvince).flatMap(([province, cities]) =>
          cities.map(city => [`${province}-${city}`, city]) // Use name as ID fallback
        )
      );

  useEffect(() => {
    if (open) {
      setTempSelectedLocations(initialSelectedLocations);
    }
  }, [open, initialSelectedLocations]);

  const allLocations = useMemo(() => {
    const locations = [];
    currentProvinces.forEach((province) => {
      const cities = currentCitiesByProvince[province] || [];
      cities.forEach((city) => {
        locations.push({ province, city });
      });
    });
    return locations;
  }, [currentProvinces, currentCitiesByProvince]);

  const isAllProvincesSelectedState = useMemo(
    () =>
      isAllProvincesSelected(tempSelectedLocations, currentCitiesByProvince),
    [tempSelectedLocations, currentCitiesByProvince]
  );

  const handleToggleProvince = (province) => {
    const newOpenProvinces = new Set(openProvinces);
    if (newOpenProvinces.has(province)) {
      newOpenProvinces.delete(province);
    } else {
      newOpenProvinces.add(province);
    }
    setOpenProvinces(newOpenProvinces);
  };

  const handleSelectAllProvinces = ({ checked }) => {
    if (checked) {
      const all = allLocations.map(({ province, city }) => {
        const provinceId = currentProvinceIdMap[province];
        const cityId = currentCityIdMap[`${province}-${city}`];
        return {
          label: `${province} - ${city}`,
          provinceId,
          provinceName: province,
          cityId,
          cityName: city,
        };
      });
      setTempSelectedLocations(all);
    } else {
      setTempSelectedLocations([]);
    }
  };

  const handleProvinceSelect = (province, { checked }) => {
    const citiesInProvince = currentCitiesByProvince[province] || [];
    let newSelections = [...tempSelectedLocations];

    if (checked) {
      const provinceId = currentProvinceIdMap[province];
      citiesInProvince.forEach((city) => {
        const cityId = currentCityIdMap[`${province}-${city}`];
        const locationObj = {
          label: `${province} - ${city}`,
          provinceId,
          provinceName: province,
          cityId,
          cityName: city,
        };
        
        // Check if this location is already selected (by comparing label)
        const existsIndex = newSelections.findIndex(loc => loc.label === locationObj.label);
        if (existsIndex === -1) {
          newSelections.push(locationObj);
        }
      });
    } else {
      newSelections = newSelections.filter(
        (loc) => !loc.label.startsWith(`${province} - `)
      );
    }
    setTempSelectedLocations(newSelections);
  };

  const handleCitySelect = (province, city, { checked }) => {
    const provinceId = currentProvinceIdMap[province];
    const cityId = currentCityIdMap[`${province}-${city}`];
    const locationObj = {
      label: `${province} - ${city}`,
      provinceId,
      provinceName: province,
      cityId,
      cityName: city,
    };
    
    let newSelections = [...tempSelectedLocations];
    if (checked) {
      const existsIndex = newSelections.findIndex(loc => loc.label === locationObj.label);
      if (existsIndex === -1) {
        newSelections.push(locationObj);
      }
    } else {
      newSelections = newSelections.filter((loc) => loc.label !== locationObj.label);
    }
    setTempSelectedLocations(newSelections);
  };

  const getProvSelectionState = useCallback(
    (province) => {
      return getProvinceSelectionState(
        province,
        tempSelectedLocations,
        currentCitiesByProvince
      );
    },
    [tempSelectedLocations, currentCitiesByProvince]
  );

  const badges = useMemo(() => {
    return generateBadges(tempSelectedLocations, currentCitiesByProvince);
  }, [tempSelectedLocations, currentCitiesByProvince]);

  const handleRemoveBadge = (e, badge) => {
    e.stopPropagation();
    const newSelections = removeBadgeFromLocations(
      badge,
      tempSelectedLocations,
      currentCitiesByProvince
    );
    setTempSelectedLocations(newSelections);
  };

  const renderSelectedBadges = () => {
    if (badges.length === 0) {
      return null;
    }

    return (
      <div className="flex flex-wrap items-center gap-2">
        {badges.slice(0, 3).map((badge) => (
          <div
            key={badge.value}
            className="flex items-center gap-2 rounded-full border border-primary-700 bg-white px-3 py-[6px]"
          >
            <span className="text-xxs font-semibold text-primary-700">
              {badge.label}
            </span>
            <button
              onClick={(e) => handleRemoveBadge(e, badge)}
              className="text-primary-700"
            >
              <IconComponent src="/icons/close12.svg" width={12} height={12} />
            </button>
          </div>
        ))}
        {badges.length > 3 && (
          <div
            className="cursor-pointer rounded-full bg-primary-700 px-3 py-[6px] text-xxs font-semibold text-white"
            onClick={() => setShowAllModal(true)}
          >
            +{badges.length - 3}
          </div>
        )}
      </div>
    );
  };

  const filteredProvinces = currentProvinces.filter((province) =>
    province.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReset = () => {
    setTempSelectedLocations([]);
    setSearchQuery("");
  };

  const handleApply = () => {
    onApply(tempSelectedLocations);
    onOpenChange(false);
  };

  return (
    <>
      <Modal open={open} onOpenChange={onOpenChange}>
        <ModalContent
          className="w-[586px] p-0 pt-3"
          appearance={{ closeButtonClassname: "size-[14px] m-1" }}
        >
          <div className="space-y-4 py-6">
            <div className="flex gap-3 px-6">
              <h2 className="w-[124px] text-xs font-semibold text-[#868686]">
                {title}
              </h2>
              <div className="relative flex min-h-[78px] w-full items-start rounded-lg border border-[#868686] p-2">
                {renderSelectedBadges()}
                {tempSelectedLocations.length > 0 && (
                  <IconComponent
                    src="/icons/silang.svg"
                    onClick={() => setTempSelectedLocations([])}
                    width={12}
                    height={12}
                    className="absolute bottom-2 right-2 cursor-pointer hover:opacity-70"
                  />
                )}
              </div>
            </div>

            {/* Search Input */}
            <Input
              placeholder="Cari Provinsi"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-6"
              icon={{
                left: (
                  <IconComponent
                    src="/icons/search.svg"
                    width={20}
                    height={20}
                    color="gray-500"
                  />
                ),
              }}
            />

            {/* Main Content Area */}
            <div className="!mt-0 px-6">
              <div className="border-b border-b-[#868686] py-6">
                <Checkbox
                  checked={isAllProvincesSelectedState}
                  onChange={handleSelectAllProvinces}
                  label="Pilih Semua Provinsi"
                  appearance={{
                    labelClassName: "!font-semibold text-sm",
                  }}
                />
              </div>
            </div>
            <div className="!mt-0 px-3">
              <div className="max-h-[360px] overflow-y-auto px-3">
                {/* Provinces List */}
                {filteredProvinces.map((province, idx) => {
                  const selectionState = getProvSelectionState(province);
                  const isOpen = openProvinces.has(province);

                  return (
                    <div key={province} className="border-b border-[#868686]">
                      <div
                        className={cn(
                          "flex cursor-pointer items-center justify-between py-3"
                        )}
                        onClick={() => handleToggleProvince(province)}
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={selectionState === "all"}
                            isIndeterminate={selectionState === "partial"}
                            onChange={(payload) =>
                              handleProvinceSelect(province, payload)
                            }
                            onClick={(e) => e.stopPropagation()}
                            label={province}
                            appearance={{
                              labelClassName: "!font-semibold !text-sm",
                            }}
                          />
                        </div>
                        <IconComponent
                          src="/icons/chevron-down.svg"
                          width={20}
                          height={20}
                          className={cn(
                            "transition-transform",
                            isOpen && "rotate-180"
                          )}
                        />
                      </div>

                      {isOpen && (
                        <div className="grid grid-cols-3 gap-x-4 gap-y-3 pb-4 pr-4">
                          {(currentCitiesByProvince[province] || []).map(
                            (city) => {
                              // Check if city is selected (support both string and object formats)
                              const isCitySelected = tempSelectedLocations.some(location => {
                                if (typeof location === 'string') {
                                  return location === `${province} - ${city}`;
                                }
                                return location.label === `${province} - ${city}`;
                              });
                              
                              return (
                                <Checkbox
                                  key={city}
                                  checked={isCitySelected}
                                  onChange={(payload) =>
                                    handleCitySelect(province, city, payload)
                                  }
                                  label={city}
                                />
                              );
                            }
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-center gap-3 border-t border-gray-200 p-4">
            <Button
              variant="muatparts-primary-secondary"
              onClick={handleReset}
              className="w-[112px]"
            >
              Reset
            </Button>
            <Button onClick={handleApply} className="w-[112px]">
              Terapkan
            </Button>
          </div>
        </ModalContent>
      </Modal>

      {showAllModal && (
        <SelectedItemsModal
          isOpen={showAllModal}
          onClose={() => setShowAllModal(false)}
          items={badges?.slice(3)}
          title={modalTitle}
        />
      )}
    </>
  );
};
