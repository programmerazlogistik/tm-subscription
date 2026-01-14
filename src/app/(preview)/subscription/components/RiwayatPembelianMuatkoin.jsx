"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { format, subDays } from "date-fns";

import Button from "@/components/Button/Button";
import CheckboxCustom from "@/components/CheckboxCustom/CheckboxCustom";
import DataEmpty from "@/components/DataEmpty/DataEmpty";
import DropdownPeriode from "@/components/DropdownPeriode/DropdownPeriode";
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

import { useGetFailedTransactions } from "@/hooks/Subscription/use-get-failed-transactions";

import { formatDateWIB } from "@/lib/format-date";
import { cn } from "@/lib/utils";

// Helper function to format price
const formatPrice = (price, currency = "IDR") => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price || 0);
};

// Get status badge style
const getStatusStyle = (status) => {
  switch (status) {
    case "paid":
      return "bg-[#D5FFC3] text-[#3ECD00]";
    case "pending":
      return "bg-[#FFF1A5] text-[#FF7A00]";
    case "expired":
      return "bg-[#E6F0FF] text-[#176CF7]";
    case "cancelled":
      return "bg-[#FFD7D7] text-[#E93B3B]";
    default:
      return "bg-[#E6F0FF] text-[#176CF7]";
  }
};

// Get status label
const getStatusLabel = (status) => {
  switch (status) {
    case "paid":
      return "Berhasil";
    case "pending":
      return "Menunggu";
    case "expired":
      return "Kedaluwarsa";
    case "cancelled":
      return "Dibatalkan";
    default:
      return status;
  }
};

// Filter options will be fetched from API response

// Map status to label and color
const statusMap = {
  pending: {
    label: "Menunggu Pembayaran",
    color: "text-[#F16209] bg-[#FFF2E0]",
  },
  success: { label: "Berhasil", color: "text-[#00AF6C] bg-[#E3F5ED]" },
  failed: { label: "Gagal", color: "text-[#E93B3B] bg-[#FFEBEB]" },
};

const PERIOD_OPTIONS = [
  { name: "Semua Periode (Default)", value: "all" },
  { name: "Hari Ini", value: "today" },
  { name: "30 Hari Terakhir", value: "30_days" },
  { name: "90 Hari Terakhir", value: "90_days" },
];

const RiwayatPembelianMuatkoin = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [tempFilters, setTempFilters] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(PERIOD_OPTIONS[0]);

  // Build status filter param
  const statusParam =
    selectedFilters.length > 0 ? selectedFilters.join(",") : "";

  // Calculate dates based on period presets
  let startDateParam = selectedPeriod?.iso_start_date || "";
  let endDateParam = selectedPeriod?.iso_end_date || "";

  if (!selectedPeriod?.range && selectedPeriod?.value !== "all") {
    const today = new Date();
    endDateParam = format(today, "yyyy-MM-dd");
    if (selectedPeriod?.value === "today") {
      startDateParam = format(today, "yyyy-MM-dd");
    } else if (selectedPeriod?.value === "30_days") {
      startDateParam = format(subDays(today, 30), "yyyy-MM-dd");
    } else if (selectedPeriod?.value === "90_days") {
      startDateParam = format(subDays(today, 90), "yyyy-MM-dd");
    }
  }

  // Fetch transactions using failed-transactions API
  const { data: apiResponse, isLoading } = useGetFailedTransactions({
    page: currentPage,
    limit: perPage,
    search: searchValue,
    status: statusParam,
    startDate: startDateParam,
    endDate: endDateParam,
  });

  const transactions = apiResponse?.Data?.purchaseHistory ?? [];
  const pagination = apiResponse?.Data?.pagination ?? {
    currentPage: 1,
    totalPages: 1,
    totalData: 0,
    limit: 10,
  };
  // Filter options from API
  const filterOptions = (apiResponse?.Data?.statusOptions ?? []).map((opt) => ({
    key: opt.value,
    label: opt.name,
  }));

  const handleDetail = (id) => {
    router.push(`/subscription/payment/${id}/detail`);
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

  // Check if any filters are applied
  const hasFiltersApplied =
    searchValue.length > 0 ||
    selectedFilters.length > 0 ||
    selectedPeriod?.value !== "all";

  // Show controls when there's data OR filters are applied (even if result is 0)
  const showControls =
    !isLoading && (transactions.length > 0 || hasFiltersApplied);

  return (
    <div className="relative flex flex-col gap-6">
      {/* Periode selector - absolutely positioned to align with tabs */}
      {showControls && (
        <div className="absolute -top-16 right-0">
          <DropdownPeriode
            options={PERIOD_OPTIONS}
            onSelect={(val) => {
              setSelectedPeriod(val);
              setCurrentPage(1);
            }}
            value={selectedPeriod}
            width="w-[180px]"
          />
        </div>
      )}

      {/* Filters - show when there's data OR filters are applied */}
      {showControls && (
        <div className="flex items-center justify-between gap-4">
          <div className="w-[344px]">
            <InputSearch
              placeholder="Cari Riwayat Pembelian muatkoin"
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
                className={`flex h-[32px] items-center justify-center gap-2 rounded-[6px] border bg-white px-3 py-2 shadow-[1px_2px_4px_rgba(0,0,0,0.11)] hover:bg-neutral-50 ${
                  activeFilterCount > 0
                    ? "border-[#176CF7] text-[#1B69F7]"
                    : "border-[#EBEBEB] text-[#1B1B1B]"
                }`}
                onClick={handleOpenDrawer}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.33325 4.66666H14.6666"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M2.66663 8H13.3333"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4 11.3333H12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-sm font-medium">Filter</span>
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
                  {/* Status Section */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-neutral-900">
                        Status
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
      )}

      {/* Table */}
      {!isLoading && transactions.length === 0 ? (
        <div className="!h-[20vh] w-full">
          <DataEmpty
            title={
              hasFiltersApplied
                ? "Tidak ada data"
                : "Belum Ada Riwayat Pembelian muatkoin"
            }
            titleClassname="text-sm font-semibold text-neutral-500 mt-4"
            className="mt-6"
          />
        </div>
      ) : (
        <div className="w-full overflow-hidden rounded-lg border border-neutral-400">
          <table className="w-full text-left text-sm text-neutral-800">
            <thead className="border-b border-[#A8A8A8] bg-white text-[12px] font-semibold leading-[14px] text-[#868686]">
              <tr>
                <th className="w-[180px] px-4 py-3 font-semibold">
                  ID Transaksi
                </th>
                <th className="px-4 py-3 font-semibold">Nama Paket</th>
                <th className="w-[160px] px-4 py-3 font-semibold">
                  Tambahan muatkoin
                </th>
                <th className="w-[120px] px-4 py-3 font-semibold">Harga</th>
                <th className="w-[100px] px-4 py-3 text-center font-semibold">
                  Status
                </th>
                <th className="w-[80px] px-4 py-3 text-center font-semibold">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center">
                    <div className="flex items-center justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-[#176CF7]" />
                    </div>
                  </td>
                </tr>
              ) : (
                transactions.map((item) => (
                  <tr key={item.id} className="hover:bg-neutral-50">
                    {/* ID Transaksi + Date */}
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-[#1B1B1B]">
                          {item.transactionId}
                        </span>
                        <span className="text-[10px] font-medium text-[#676767]">
                          {formatDateWIB(item.transactionDate)}
                        </span>
                      </div>
                    </td>
                    {/* Nama Paket + Sub User */}
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-[#1B1B1B]">
                          {item.packageName || item.description}
                        </span>
                        {item.subUsersIncluded > 0 && (
                          <span className="text-[10px] font-medium text-[#676767]">
                            Termasuk {item.subUsersIncluded} Sub User
                          </span>
                        )}
                      </div>
                    </td>
                    {/* Tambahan muatkoin */}
                    <td className="px-4 py-4">
                      <span className="text-xs font-semibold text-[#1B1B1B]">
                        {item.isUnlimited
                          ? "Unlimited muatkoin"
                          : item.bonusMuatkoin > 0
                            ? `${item.baseMuatkoin} + ${item.bonusMuatkoin} Free muatkoin`
                            : `${item.baseMuatkoin} muatkoin`}
                      </span>
                    </td>
                    {/* Harga */}
                    <td className="px-4 py-4">
                      <span className="text-xs font-semibold text-[#1B1B1B]">
                        {formatPrice(item.price)}
                      </span>
                    </td>
                    {/* Status */}
                    <td className="px-4 py-4 text-center">
                      <span
                        className={cn(
                          "inline-flex h-[24px] items-center justify-center rounded-[6px] px-3 text-xs font-semibold",
                          getStatusStyle(item.status)
                        )}
                      >
                        {getStatusLabel(item.status)}
                      </span>
                    </td>
                    {/* Aksi */}
                    <td className="px-4 py-4 text-center">
                      <Button
                        variant="muatparts-primary"
                        className="h-[28px] px-4 text-xs"
                        onClick={() => handleDetail(item.id)}
                      >
                        Detail
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {!isLoading && transactions.length > 0 && (
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

export default RiwayatPembelianMuatkoin;
