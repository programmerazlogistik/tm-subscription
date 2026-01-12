"use client";

import { useState } from "react";

import { Filter } from "lucide-react";

import Button from "@/components/Button/Button";
import CheckboxCustom from "@/components/CheckboxCustom/CheckboxCustom";
import { InputSearch } from "@/components/InputSearch/InputSearch";
import Pagination from "@/components/Pagination/Pagination";
import {
  RightDrawer,
  RightDrawerBody,
  RightDrawerClose,
  RightDrawerContent,
  RightDrawerFooter,
  RightDrawerHeader,
  RightDrawerTitle,
  RightDrawerTrigger,
} from "@/components/RightDrawer/RightDrawer";

import { useGetUsageHistory } from "@/hooks/Subscription/use-get-usage-history";
import { useDebounce } from "@/hooks/use-debounce";

import { formatDateWIB } from "@/lib/format-date";
import { cn } from "@/lib/utils";

// Map usageType to Indonesian label
const usageTypeMap = {
  view_transporter_profile_pricelist: "Melihat Profil Transporter (Price List)",
  view_transporter_contact_pricelist: "Melihat Kontak Transporter (Price List)",
  view_bid_participant: "Melihat Peserta Bid",
  view_bid_detail_participate: "Melihat Detail Bid yang Diikuti",
  view_transporter_profile_bid: "Melihat Profil Transporter (Bid)",
  view_transporter_contact_bid: "Melihat Kontak Transporter (Bid)",
  top_up: "Beli muatkoin",
  expiry: "muatkoin kedaluwarsa",
};

// Filter options for the drawer
const filterOptions = [
  { key: "top_up", label: "Top Up muatkoin" },
  {
    key: "view_transporter_contact_pricelist",
    label: "Melihat No. Telp Transporter",
  },
  {
    key: "view_transporter_profile_pricelist",
    label: "Melihat Profil Transporter",
  },
  { key: "expiry", label: "muatkoin Kedaluwarsa" },
];

const parseUsageType = (type) => {
  return usageTypeMap[type] || type;
};

// Get badge style based on moduleType
const getModuleBadgeStyle = (moduleType, isPositive) => {
  if (isPositive) {
    return "bg-[#D5FFC3] text-[#3ECD00]"; // Green for top up
  }
  switch (moduleType) {
    case "transporter":
      return "bg-[#E6F0FF] text-[#176CF7]"; // Blue
    case "shipper":
      return "bg-[#FFF1A5] text-[#FF7A00]"; // Yellow/Orange
    case "purchase":
      return "bg-[#D5FFC3] text-[#3ECD00]"; // Green
    default:
      return "bg-[#E6F0FF] text-[#176CF7]"; // Blue default
  }
};

const RiwayatPenggunaanMuatkoin = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [tempFilters, setTempFilters] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Debounce search value
  const debouncedSearch = useDebounce(searchValue, 500);

  // Build usageType filter param
  const usageTypeParam =
    selectedFilters.length > 0 ? selectedFilters.join(",") : "";

  // Fetch usage history
  const { data: apiResponse, isLoading } = useGetUsageHistory({
    period: "all",
    page: currentPage,
    limit: perPage,
    search: debouncedSearch,
    usageType: usageTypeParam,
  });

  const usageHistory = apiResponse?.Data?.usageHistory ?? [];
  const pagination = apiResponse?.Data?.pagination ?? {
    currentPage: 1,
    totalPages: 1,
    totalData: 0,
    limit: 10,
  };

  const handleFilterToggle = (filterKey) => {
    setTempFilters((prev) =>
      prev.includes(filterKey)
        ? prev.filter((f) => f !== filterKey)
        : [...prev, filterKey]
    );
  };

  const handleApplyFilters = () => {
    setSelectedFilters(tempFilters);
    setCurrentPage(1);
    setIsDrawerOpen(false);
  };

  const handleClearFilters = () => {
    setTempFilters([]);
  };

  const handleOpenDrawer = () => {
    setTempFilters(selectedFilters);
    setIsDrawerOpen(true);
  };

  const activeFilterCount = selectedFilters.length;

  return (
    <div className="flex flex-col gap-6">
      {/* Filters */}
      <div className="flex items-center justify-between gap-4">
        <div className="w-[344px]">
          <InputSearch
            placeholder="Cari Riwayat Penggunaan muatkoin"
            searchValue={searchValue}
            setSearchValue={(val) => {
              setSearchValue(val);
              setCurrentPage(1);
            }}
          />
        </div>
        <RightDrawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <RightDrawerTrigger asChild>
            <button
              className="flex h-[32px] items-center gap-2 rounded-md border border-neutral-400 px-3 py-1.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
              onClick={handleOpenDrawer}
            >
              <Filter size={16} />
              Filter
              {activeFilterCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#176CF7] text-xs font-semibold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </RightDrawerTrigger>
          <RightDrawerContent>
            <RightDrawerHeader>
              <RightDrawerTitle>Filter</RightDrawerTitle>
              <button
                onClick={handleClearFilters}
                className="text-xs font-medium text-[#176CF7]"
              >
                Hapus Semua Filter
              </button>
            </RightDrawerHeader>
            <RightDrawerBody>
              <div className="flex flex-col gap-6">
                {/* Deskripsi Section */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-neutral-900">
                      Deskripsi
                    </span>
                    <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#176CF7] px-2 text-xs font-semibold text-white">
                      {tempFilters.length}
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {filterOptions.map((option) => (
                      <CheckboxCustom
                        key={option.key}
                        label={option.label}
                        checked={tempFilters.includes(option.key)}
                        onCheckedChange={() => handleFilterToggle(option.key)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </RightDrawerBody>
            <RightDrawerFooter>
              <RightDrawerClose>
                <Button
                  variant="muatparts-primary-secondary"
                  className="h-8 w-[112px]"
                >
                  Batal
                </Button>
              </RightDrawerClose>
              <Button
                variant="muatparts-primary"
                className="h-8 w-[112px]"
                onClick={handleApplyFilters}
              >
                Terapkan
              </Button>
            </RightDrawerFooter>
          </RightDrawerContent>
        </RightDrawer>
      </div>

      {/* Table */}
      <div className="w-full overflow-hidden rounded-lg border border-neutral-400">
        <table className="w-full text-left text-sm text-neutral-800">
          <thead className="border-b border-[#A8A8A8] bg-white text-[12px] font-semibold leading-[14px] text-[#868686]">
            <tr>
              <th className="w-[136px] px-4 py-3 font-semibold">
                Tanggal Pemakaian
              </th>
              <th className="w-[144px] px-4 py-3 font-semibold">User Modul</th>
              <th className="w-[155px] px-4 py-3 font-semibold">Referensi</th>
              <th className="px-4 py-3 font-semibold">Deskripsi</th>
              <th className="w-[136px] px-4 py-3 text-center font-semibold">
                muatkoin Digunakan
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center">
                  <div className="flex items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-[#176CF7]" />
                  </div>
                </td>
              </tr>
            ) : usageHistory.length > 0 ? (
              usageHistory.map((item) => {
                const usageDescription = parseUsageType(item.usageType);

                return (
                  <tr key={item.id} className="hover:bg-neutral-50">
                    <td className="w-[136px] whitespace-nowrap px-4 py-4 text-xs font-semibold text-[#1B1B1B]">
                      {formatDateWIB(item.usageDate)}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={cn(
                          "inline-flex h-[24px] w-[144px] items-center justify-center rounded-[6px] px-[8px] pb-[4px] pt-[6px] text-xs font-semibold",
                          getModuleBadgeStyle(item.moduleType, item.isPositive)
                        )}
                      >
                        {item.userModule}
                      </span>
                    </td>
                    <td className="w-[155px] px-4 py-4 text-xs font-semibold text-[#1B1B1B]">
                      {item.transactionId?.startsWith("INV")
                        ? item.transactionId
                        : item.reference || "-"}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-[#1B1B1B]">
                          {usageDescription}
                        </span>
                        {item.opponentCompanyName && (
                          <span className="text-xxs font-semibold text-[#676767]">
                            {item.opponentCompanyName}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span
                        className={cn(
                          "inline-flex h-[24px] w-[136px] items-center justify-center rounded-[6px] px-[8px] pb-[4px] pt-[6px] text-xs font-semibold",
                          item.isPositive
                            ? "bg-[#D5FFC3] text-[#3ECD00]" // Green
                            : "bg-[#FFD7D7] text-[#E93B3B]" // Red
                        )}
                      >
                        {item.isPositive
                          ? `+${item.muatkoinAmount} muatkoin`
                          : `${item.muatkoinAmount} muatkoin`}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-neutral-500">
                  Tidak ada data ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!isLoading && usageHistory.length > 0 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={setCurrentPage}
          onPerPageChange={(val) => {
            setPerPage(val);
            setCurrentPage(1);
          }}
          perPage={perPage}
          variants="blue"
          showPerPageLabel="Tampilkan Jumlah Detail"
          showPrevNext={false}
        />
      )}
    </div>
  );
};

export default RiwayatPenggunaanMuatkoin;
