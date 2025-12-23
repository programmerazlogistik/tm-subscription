"use client";

import { useMemo, useState } from "react";

import Button from "@/components/Button/Button";
import Checkbox from "@/components/Form/Checkbox";
import Input from "@/components/Form/Input";
import { Modal, ModalContent } from "@/components/Modal/Modal";
import VoucherSearchEmpty from "@/components/Voucher/VoucherSearchEmpty";

import { toast } from "@/lib/toast";

const ProvinceSelectionModal = ({
  isOpen,
  onClose,
  onSave,
  title = "Pilih Provinsi",
  provinces = [],
  isLoading = false,
  onSearch,
  onSearchEnter, // New prop for Enter key search
  initialSelectedProvinces = [],
  saveContext = null, // Parameter untuk membedakan context save
  enableSearchAPI = false, // Flag to enable search API integration
}) => {
  // Initialize selectedProvinces with any provinces that have isSelected = true
  const [searchProvince, setSearchProvince] = useState("");
  const [selectedProvinces, setSelectedProvinces] = useState(() => {
    // Start with any initialSelectedProvinces that were passed in
    const initialSelection = [...initialSelectedProvinces];

    // Add any provinces that have isSelected = true from the API data
    provinces.forEach((province) => {
      if (
        province.isSelected &&
        !initialSelection.includes(province.provinceId)
      ) {
        initialSelection.push(province.provinceId);
      }
    });

    return initialSelection;
  });

  // Use provinces directly when not using API search, or API results when using API search
  const displayProvinces = useMemo(() => {
    // When using API search, only show results from API when search has been performed
    if (enableSearchAPI) {
      return provinces || [];
    }
    return provinces || [];
  }, [provinces, enableSearchAPI]);

  // Group provinces by sortOrder or alphabetGroup (alphabetical grouping)
  const groupedProvinces = displayProvinces.reduce((acc, province) => {
    const group =
      province.alphabetGroup ||
      province.sortOrder ||
      province.provinceName.charAt(0).toUpperCase();
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(province);
    return acc;
  }, {});

  // Get display provinces for "select all" functionality
  const hasDisplayProvinces = displayProvinces.length > 0;

  // Check if all display provinces are selected
  const isAllSelected =
    hasDisplayProvinces &&
    displayProvinces.every(
      (province) =>
        selectedProvinces.includes(province.provinceId) ||
        province.isSelected === true
    );

  // Handle select all provinces (only for display provinces)
  const handleSelectAll = (checked) => {
    if (checked) {
      // Add all display provinces to selection
      const displayIds = displayProvinces.map(
        (province) => province.provinceId
      );
      setSelectedProvinces((prev) => {
        const newSelection = [...prev];
        displayIds.forEach((id) => {
          if (!newSelection.includes(id)) {
            newSelection.push(id);
          }
        });
        return newSelection;
      });
    } else {
      // Remove all display provinces from selection
      const displayIds = displayProvinces.map(
        (province) => province.provinceId
      );
      setSelectedProvinces((prev) =>
        prev.filter((id) => !displayIds.includes(id))
      );
    }
  };

  // Handle individual province selection
  const handleProvinceSelect = (provinceId, checked) => {
    if (checked) {
      setSelectedProvinces((prev) => [...prev, provinceId]);
    } else {
      setSelectedProvinces((prev) => prev.filter((id) => id !== provinceId));
    }
  };

  // Handle search when Enter key is pressed
  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter" && onSearchEnter) {
      onSearchEnter(searchProvince);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchProvince(newValue);

    // If input is cleared completely, trigger search with empty value immediately
    if (newValue === "" && onSearchEnter) {
      onSearchEnter("");
    }
  };

  // Handle save provinces
  const handleSaveProvinces = () => {
    // Create a list of all selected province IDs, combining:
    // 1. Provinces selected by the user (in selectedProvinces state)
    // 2. Provinces that have isSelected=true from the API
    const allSelectedProvinceIds = [...selectedProvinces];

    // Add any province IDs with isSelected=true that aren't already in the list
    provinces.forEach((province) => {
      if (
        province.isSelected &&
        !allSelectedProvinceIds.includes(province.provinceId)
      ) {
        allSelectedProvinceIds.push(province.provinceId);
      }
    });

    if (allSelectedProvinceIds.length === 0) {
      toast.error("Belum ada provinsi terpilih!");
      return;
    }

    // Get selected province data
    const selectedProvincesData = provinces.filter((province) =>
      allSelectedProvinceIds.includes(province.provinceId)
    );

    console.log("ProvinceSelectionModal - Saving provinces:", {
      selectedProvincesData,
      allSelectedProvinceIds,
      saveContext,
    });

    // Call the onSave callback with the selected data
    onSave(selectedProvincesData, allSelectedProvinceIds, saveContext);
    handleClose();
  };

  // Handle close modal
  const handleClose = () => {
    setSearchProvince("");
    setSelectedProvinces(initialSelectedProvinces);
    onClose();
  };

  return (
    <Modal open={isOpen} onOpenChange={handleClose}>
      <ModalContent className="max-h-[90vh] w-[708px]">
        <div className="flex flex-col px-6 py-4">
          <h2 className="mb-4 text-center text-lg font-bold leading-[21.6px]">
            {title}
          </h2>

          {/* Main Content with Border */}
          <div className="mb-4 h-[400px] overflow-y-auto rounded-lg border border-neutral-300">
            <div className="sticky top-0 z-10 rounded-t-lg bg-white p-4">
              {/* Search Input */}
              <div className="mb-4">
                <Input
                  placeholder="Cari Provinsi"
                  icon={{ left: "/icons/search.svg" }}
                  value={searchProvince}
                  onChange={handleInputChange}
                  onKeyDown={handleEnterKeyPress} // Handle Enter key press
                />
              </div>

              {/* Select All Checkbox */}
              <div className="flex items-center gap-3">
                <Checkbox
                  className="!gap-0"
                  label=""
                  checked={isAllSelected}
                  disabled={displayProvinces.length === 0}
                  onChange={(e) => handleSelectAll(e.checked)}
                />
                <span className="text-sm leading-[17.6px]">Pilih Semua</span>
              </div>
              <hr className="mt-4 border-b border-neutral-400" />
            </div>

            <div className="min-h-[200px] px-4">
              {isLoading ? (
                <div className="flex h-[200px] items-center justify-center">
                  <span className="text-sm text-neutral-600">Loading...</span>
                </div>
              ) : (
                <div className="flex flex-col gap-y-[18px]">
                  {Object.keys(groupedProvinces).length > 0 ? (
                    Object.keys(groupedProvinces).map((group, groupIndex) => (
                      <div className="flex flex-col gap-y-3" key={group}>
                        <span className="ms-7 text-lg font-bold leading-[21.6px]">
                          {group}
                        </span>
                        <div className="grid grid-cols-2 gap-4">
                          {groupedProvinces[group].map((province) => {
                            // Check if the province is selected either via our state or via its own isSelected property
                            const isChecked =
                              selectedProvinces.includes(province.provinceId) ||
                              province.isSelected === true;
                            return (
                              <div
                                key={province.provinceId}
                                className="flex items-center gap-3"
                              >
                                <Checkbox
                                  className="!gap-0"
                                  label=""
                                  checked={isChecked}
                                  onChange={(e) =>
                                    handleProvinceSelect(
                                      province.provinceId,
                                      e.checked
                                    )
                                  }
                                />
                                <span
                                  className="text-base font-normal leading-[19.2px] text-neutral-900"
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      enableSearchAPI &&
                                      province.highlightedName
                                        ? province.highlightedName
                                        : province.provinceName,
                                  }}
                                />
                              </div>
                            );
                          })}
                        </div>
                        {/* Border line per group, not per province */}
                        {groupIndex <
                          Object.keys(groupedProvinces).length - 1 && (
                          <div className="mt-4 border-b border-neutral-400"></div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="flex h-[200px] items-center justify-center">
                      <div className="flex w-full items-center justify-center">
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                          {/* SVG illustration for "Keyword Not Found" */}
                          <img
                            src="/img/search-not-found.webp"
                            alt="search-not-found"
                            className="h-[114px] w-[134px] object-contain"
                          />

                          <p className="mt-[12px] text-base font-medium text-gray-600">
                            Keyword Tidak Ditemukan <br /> Di Sistem
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons - Fixed at bottom */}
          <div className="flex items-center justify-center gap-3">
            <Button
              variant="muattrans-primary-secondary"
              className="h-[44px] w-[120px] text-base"
              onClick={handleClose}
            >
              Batal
            </Button>
            <Button
              variant="muattrans-primary"
              className="h-[44px] w-[120px] text-base"
              onClick={handleSaveProvinces}
            >
              Simpan
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ProvinceSelectionModal;
