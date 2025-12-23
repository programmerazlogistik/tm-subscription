"use client";

import { useState } from "react";

import { ChevronDown } from "lucide-react";

import {
  SimpleDropdown,
  SimpleDropdownContent,
  SimpleDropdownItem,
  SimpleDropdownTrigger,
} from "@/components/Dropdown/SimpleDropdownMenu";

import { useTranslation } from "@/hooks/use-translation";

import { cn } from "@/lib/utils";

/**
 * BO-specific component for selecting the number of items to display per page
 */
const SelectTotalDataBO = ({
  perPage = 10,
  onPerPageChange,
  options = [10, 20, 40],
  className,
  labelText = "Menampilkan",
  suffixText = "data",
}) => {
  const { t = (key, _, fallback) => fallback || key } = useTranslation() || {};
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="text-xs font-medium text-gray-900">{labelText}</span>
      <SimpleDropdown open={open} onOpenChange={setOpen}>
        <SimpleDropdownTrigger asChild>
          <button
            className="relative w-[53px] flex items-center gap-1 rounded-md border border-[#A8A8A8] bg-white p-2 text-xs font-medium text-gray-900"
            aria-label={t(
              "SelectTotalDataBO.itemsPerPage",
              {},
              "Items per page"
            )}
          >
            {perPage}
            <ChevronDown
              className={cn(
                "transition-transform duration-200",
                open ? "rotate-180" : "rotate-0"
              )}
              size={16}
            />
          </button>
        </SimpleDropdownTrigger>
        <SimpleDropdownContent>
          {options.map((option) => (
            <SimpleDropdownItem
              key={option}
              onClick={() => onPerPageChange(option)}
              className={cn(
                option === perPage
                  ? "bg-neutral-200 font-semibold"
                  : "hover:bg-neutral-100",
                  "w-[53px]"
              )}
            >
              {option}
            </SimpleDropdownItem>
          ))}
        </SimpleDropdownContent>
      </SimpleDropdown>
      <span className="text-xs font-medium text-gray-900">{suffixText}</span>
    </div>
  );
};

export default SelectTotalDataBO;
