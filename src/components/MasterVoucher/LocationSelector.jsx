import { useMemo, useState } from "react";

import IconComponent from "@/components/IconComponent/IconComponent";
import { LocationSelectorModal } from "@/components/MasterVoucher/LocationSelectorModal";
import {
  generateBadges,
  removeBadgeFromLocations,
} from "@/components/MasterVoucher/locationHelpers";
import SelectedItemsModal from "@/components/SelectedItemsModal/SelectedItemsModal";

import { useLocationData } from "@/hooks/useLocationData";

import { cn } from "@/lib/utils";

export const LocationSelector = ({
  title = "Provinsi & Kota/Kabupaten Lokasi*",
  placeholder = "Pilih Kota/Kabupaten",
  selectedLocations = [],
  onSelectionChange,
  errorMessage,
  maxVisible = 3,
  className,
  modalTitle = "Pilih Lokasi",
  disabled = false,
}) => {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isSelectedItemsModalOpen, setIsSelectedItemsModalOpen] =
    useState(false);

  // Get location data from API with fallback
  const { currentCitiesByProvince } = useLocationData();

  const badges = useMemo(() => {
    return generateBadges(selectedLocations, currentCitiesByProvince);
  }, [selectedLocations, currentCitiesByProvince]);

  const handleApply = (locations) => {
    onSelectionChange?.(locations);
    setIsLocationModalOpen(false);
  };

  const handleRemoveBadge = (e, badge) => {
    e.stopPropagation();
    const newLocations = removeBadgeFromLocations(
      badge,
      selectedLocations,
      currentCitiesByProvince
    );
    onSelectionChange?.(newLocations);
  };

  const handleClearAll = (e) => {
    e.stopPropagation();
    onSelectionChange?.([]);
  };

  return (
    <div className={cn("relative w-full", className)}>
      <div
        className={cn(
          "flex h-[32px] w-full items-center gap-2 rounded-lg border bg-white px-2 py-2 text-xs text-neutral-500 transition-colors",
          "border-[#868686]",
          !disabled && "cursor-pointer hover:border-neutral-400",
          disabled && "cursor-not-allowed bg-neutral-100"
        )}
        onClick={() => !disabled && setIsLocationModalOpen(true)}
      >
        <IconComponent src="/icons/location.svg" width={16} height={16} />
        <span>{placeholder}</span>
      </div>
      <div
        className={cn(
          "mt-2 flex w-full flex-wrap items-start gap-2 rounded-lg border p-2.5 pb-6",
          "min-h-[88px]",
          errorMessage ? "border-error-400" : "border-[#868686]",
          disabled ? "bg-neutral-100" : "bg-white"
        )}
      >
        {selectedLocations.length > 0 && (
          <>
            <div className="flex flex-1 flex-wrap items-center gap-2">
              {badges.slice(0, 3).map((badge) => (
                <div
                  key={badge.value}
                  className={cn(
                    "flex items-center gap-1 rounded-full border bg-white px-2.5 py-1",
                    disabled ? "border-[#868686]" : "border-primary-700"
                  )}
                >
                  <span
                    className={cn(
                      "text-xxs font-semibold",
                      disabled ? "text-[#868686]" : "text-primary-700"
                    )}
                  >
                    {badge.label}
                  </span>
                  <button
                    onClick={(e) => !disabled && handleRemoveBadge(e, badge)}
                    className={cn(
                      disabled
                        ? "pointer-events-none text-[#868686]"
                        : "text-primary-700 hover:text-primary-900"
                    )}
                  >
                    <IconComponent
                      src="/icons/close12.svg"
                      color={disabled ? "gray" : "primary"}
                      width={10}
                      height={10}
                    />
                  </button>
                </div>
              ))}

              {badges.length > 3 && (
                <div
                  className="inline-flex h-[22px] cursor-pointer items-center rounded-full bg-primary-700 px-3"
                  onClick={() => setIsSelectedItemsModalOpen(true)}
                >
                  <span className="text-xxs font-semibold text-white">
                    +{badges.length - 3}
                  </span>
                </div>
              )}
            </div>
            {!disabled && (
              <button
                onClick={handleClearAll}
                className="absolute bottom-2 right-2 text-[#868686] hover:text-neutral-700"
              >
                <IconComponent src="/icons/silang.svg" width={14} height={14} />
              </button>
            )}
          </>
        )}
      </div>

      {errorMessage && (
        <p className="mt-1 text-xs font-medium text-error-400">
          {errorMessage}
        </p>
      )}
      <LocationSelectorModal
        open={isLocationModalOpen}
        onOpenChange={setIsLocationModalOpen}
        title={title}
        modalTitle={modalTitle}
        selectedLocations={selectedLocations}
        onApply={handleApply}
      />
      <SelectedItemsModal
        isOpen={isSelectedItemsModalOpen && badges.length > 3}
        onClose={() => setIsSelectedItemsModalOpen(false)}
        items={badges.slice(maxVisible)}
        title={modalTitle}
      />
    </div>
  );
};
