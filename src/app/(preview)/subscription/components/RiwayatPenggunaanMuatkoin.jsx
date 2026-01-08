"use client";

import { useState } from "react";

import { Filter } from "lucide-react";

import { InputSearch } from "@/components/InputSearch/InputSearch";
import Pagination from "@/components/Pagination/Pagination";

import { useGetAllTransactions } from "@/hooks/Subscription/use-get-all-transactions";
import { useDebounce } from "@/hooks/use-debounce";

import { cn } from "@/lib/utils";

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
};

// Helper function to get user module type based on muatkoinChange
const getUserModulType = (muatkoinChange) => {
  if (muatkoinChange > 0) return "topup";
  if (muatkoinChange < 0) return "usage";
  return "usage";
};

// Helper function to get user module label based on description
const getUserModulLabel = (description, muatkoinChange) => {
  if (muatkoinChange > 0) return "Top Up muatkoin";
  if (description?.toLowerCase().includes("expired"))
    return "muatkoin Kedaluwarsa";
  return "Penggunaan";
};

const RiwayatPenggunaanMuatkoin = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // Debounce search value
  const debouncedSearch = useDebounce(searchValue, 500);

  // Fetch transactions with type="usage"
  const { data: apiResponse, isLoading } = useGetAllTransactions({
    type: "usage",
    page: currentPage,
    limit: perPage,
    search: debouncedSearch,
  });

  const transactions = apiResponse?.Data?.transactions ?? [];
  const pagination = apiResponse?.Data?.pagination ?? {
    currentPage: 1,
    totalPages: 1,
    totalData: 0,
    limit: 10,
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Filters */}
      <div className="flex items-center gap-4">
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
        <button className="flex h-[32px] items-center gap-2 rounded-md border border-neutral-400 px-3 py-1.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-50">
          <Filter size={16} />
          Filter
        </button>
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
            ) : transactions.length > 0 ? (
              transactions.map((item) => {
                const userModulType = getUserModulType(item.muatkoinChange);
                const userModulLabel = getUserModulLabel(
                  item.description,
                  item.muatkoinChange
                );
                const isPositive = item.muatkoinChange > 0;

                return (
                  <tr key={item.id} className="hover:bg-neutral-50">
                    <td className="w-[136px] whitespace-nowrap px-4 py-4 text-xs font-semibold text-[#1B1B1B]">
                      {formatDate(item.date)}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={cn(
                          "inline-flex h-[24px] w-[144px] items-center justify-center rounded-[6px] px-[8px] pb-[4px] pt-[6px] text-xs font-semibold",
                          userModulType === "topup" &&
                            "bg-[#D5FFC3] text-[#3ECD00]", // Green
                          userModulType === "usage" &&
                            "bg-[#E6F0FF] text-[#176CF7]", // Blue
                          userModulType === "expired" &&
                            "bg-[#FFD7D7] text-[#E93B3B]" // Red
                        )}
                      >
                        {userModulLabel}
                      </span>
                    </td>
                    <td className="w-[155px] px-4 py-4 text-xs font-semibold text-[#1B1B1B]">
                      {item.transactionId || "-"}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-[#1B1B1B]">
                          {item.description}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span
                        className={cn(
                          "inline-flex h-[24px] w-[136px] items-center justify-center rounded-[6px] px-[8px] pb-[4px] pt-[6px] text-xs font-semibold",
                          isPositive
                            ? "bg-[#D5FFC3] text-[#3ECD00]" // Green
                            : "bg-[#FFD7D7] text-[#E93B3B]" // Red
                        )}
                      >
                        {isPositive
                          ? `+${item.muatkoinChange} muatkoin`
                          : `${item.muatkoinChange} muatkoin`}
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

export default RiwayatPenggunaanMuatkoin;
