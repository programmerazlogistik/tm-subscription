"use client";

import { useState } from "react";

import { IconComponent } from "@muatmuat/ui/IconComponent";

const SortComponent = ({
  options = [],
  sortField = "",
  onSortFieldChange,
  sortDirection = "DESC",
  onSortDirectionChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleFieldSelect = (field) => {
    onSortFieldChange?.(field);
    setIsDropdownOpen(false);
  };

  const toggleSortDirection = () => {
    onSortDirectionChange?.(sortDirection === "DESC" ? "ASC" : "DESC");
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <button
          className={`flex h-8 items-center gap-2 rounded-md border bg-white px-4 text-sm font-semibold ${
            sortField
              ? "border-[#176CF7] text-[#1B69F7]"
              : "border-neutral-400 text-neutral-900"
          }`}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <IconComponent
            src="/icons/sort-phase-one.svg"
            width={16}
            height={16}
          />
          {sortField || "Urutkan"}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        {isDropdownOpen && (
          <div className="absolute left-0 top-full z-10 mt-1 min-w-[200px] rounded-lg border border-neutral-200 bg-white py-2 shadow-lg">
            {options.map((option) => (
              <button
                key={option.value}
                className="w-full px-4 py-2 text-left text-sm hover:bg-neutral-50"
                onClick={() => handleFieldSelect(option.label)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <button
        className={`flex h-8 items-center justify-center rounded-md border bg-white px-2 ${
          sortField
            ? "border-[#176CF7] text-[#1B69F7]"
            : "border-neutral-400 text-neutral-900"
        }`}
        onClick={toggleSortDirection}
      >
        <IconComponent
          src={sortDirection === "ASC" ? "/icons/atoz.svg" : "/icons/ztoa.svg"}
          width={18}
          height={21}
        />
      </button>
    </div>
  );
};

export default SortComponent;
