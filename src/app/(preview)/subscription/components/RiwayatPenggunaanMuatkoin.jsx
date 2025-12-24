"use client";

import { useState } from "react";

import { Filter } from "lucide-react";

import { InputSearch } from "@/components/InputSearch/InputSearch";
import Pagination from "@/components/Pagination/Pagination";

import { cn } from "@/lib/utils";

// Mock Data
const mockData = Array.from({ length: 25 }, (_, i) => {
  const type = i === 0 ? "topup" : i === 4 ? "expired" : "usage";
  return {
    id: i + 1,
    date: "27 Mar 2021 17:43 WIB",
    userModul:
      type === "topup"
        ? "Top Up muatkoin"
        : type === "expired"
          ? "muatkoin Kedaluwarsa"
          : "Shipper",
    userModulType: type, // topup, usage, expired
    reference: i === 0 ? "INV/9090/SMP/00932933" : "-",
    description:
      type === "topup"
        ? "Top Up muatkoin"
        : type === "expired"
          ? "muatkoin Kedaluwarsa"
          : i % 2 === 0
            ? "Melihat No. Telp Transporter"
            : "Melihat Profil Transporter",
    subDescription:
      type === "topup"
        ? "Paket Business Pro (7 Hari)"
        : type === "expired"
          ? "Paket Business Pro (7 Hari)"
          : i % 2 === 0
            ? "PT Transport Recal Recal in Base"
            : "PT Transnusa Minshitar",
    amount:
      type === "topup"
        ? "+Unlimited muatkoin"
        : type === "expired"
          ? "-200 muatkoin"
          : "-20 muatkoin",
    isPositive: type === "topup",
  };
});

const RiwayatPenggunaanMuatkoin = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // Filter Logic (Simple client-side)
  const filteredData = mockData.filter((item) =>
    item.description.toLowerCase().includes(searchValue.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / perPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="w-[344px]">
          <InputSearch
            placeholder="Cari Riwayat Penggunaan muatkoin"
            searchValue={searchValue}
            setSearchValue={setSearchValue}
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
            {paginatedData.map((item) => (
              <tr key={item.id} className="hover:bg-neutral-50">
                <td className="w-[136px] whitespace-nowrap px-4 py-4 text-xs font-semibold text-[#1B1B1B]">
                  {item.date}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={cn(
                      "inline-flex h-[24px] w-[144px] items-center justify-center rounded-[6px] px-[8px] pb-[4px] pt-[6px] text-xs font-semibold",
                      item.userModulType === "topup" &&
                        "bg-[#D5FFC3] text-[#3ECD00]", // Green Corrected
                      item.userModulType === "usage" &&
                        "bg-[#E6F0FF] text-[#176CF7]", // Blue
                      item.userModulType === "expired" &&
                        "bg-[#FFD7D7] text-[#E93B3B]" // Red
                    )}
                  >
                    {item.userModul}
                  </span>
                </td>
                <td className="w-[155px] px-4 py-4 text-xs font-semibold text-[#1B1B1B]">
                  {item.reference}
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-[#1B1B1B]">
                      {item.description}
                    </span>
                    <span className="text-[10px] font-semibold text-[#676767]">
                      {item.subDescription}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 text-right">
                  <span
                    className={cn(
                      "inline-flex h-[24px] w-[136px] items-center justify-center rounded-[6px] px-[8px] pb-[4px] pt-[6px] text-xs font-semibold",
                      item.isPositive
                        ? "bg-[#D5FFC3] text-[#3ECD00]" // Green Corrected
                        : "bg-[#FFD7D7] text-[#E93B3B]"
                    )}
                  >
                    {item.amount}
                  </span>
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
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
    </div>
  );
};

export default RiwayatPenggunaanMuatkoin;
