"use client";

import Image from "next/image";
import { useState } from "react";

import { InputSearch } from "@/components/InputSearch/InputSearch";
import PageTitle from "@/components/PageTitle/PageTitle";
import Pagination from "@/components/Pagination/Pagination";

import { useGetActivePackages } from "@/hooks/Subscription/use-get-active-packages";
import { useDebounce } from "@/hooks/use-debounce";

import SaldoMuatkoin from "../components/SaldoMuatkoin";
import CardPaketAktif from "./components/CardPaketAktif";

const ActiveSubscriptionPage = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sort, setSort] = useState("DESC");

  // Debounce search value
  const debouncedSearch = useDebounce(search, 500);

  // Fetch active packages from API
  const { data: apiResponse, isLoading } = useGetActivePackages({
    page: currentPage,
    limit: perPage,
    search: debouncedSearch,
    sort: sort,
  });

  const packages = apiResponse?.Data?.packages ?? [];
  const pagination = apiResponse?.Data?.pagination ?? {
    currentPage: 1,
    totalPages: 1,
    totalData: 0,
    limit: 10,
  };

  const toggleSort = () => {
    setSort((prev) => (prev === "DESC" ? "ASC" : "DESC"));
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        {/* Banner Saldo */}
        <SaldoMuatkoin balance={80} maxBalance={120} variant="rectangle" />

        {/* Header with Back Button */}
        <PageTitle withBack={true} backUrl="/subscription">
          Paket muatkoin Aktif
        </PageTitle>

        {/* Search & Sort */}
        <div className="flex items-center justify-between">
          <div className="w-[328px]">
            <InputSearch
              placeholder="Cari Paket muatkoin Aktif"
              searchValue={search}
              setSearchValue={(value) => {
                setSearch(value);
                setCurrentPage(1);
              }}
              hideDropdown={true}
              appearance={{
                inputClassName: "!h-8 !py-0",
              }}
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              className="flex h-8 items-center gap-2 rounded-md border border-neutral-400 bg-white px-4 text-sm font-semibold text-neutral-900"
              onClick={toggleSort}
            >
              <Image
                src="/svg/sorting-icon.svg"
                alt="sort"
                width={16}
                height={16}
              />
              Urutkan
              <Image
                src="/svg/chevron-down.svg"
                alt="chevron"
                width={16}
                height={16}
              />
            </button>
            <button
              className="flex h-8 items-center justify-center rounded-md border border-neutral-400 bg-white px-3"
              onClick={toggleSort}
            >
              <span className="text-sm font-bold">
                {sort === "ASC" ? "A-Z" : "Z-A"}
              </span>
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex flex-col gap-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-[#176CF7]" />
            </div>
          ) : packages.length > 0 ? (
            packages.map((item) => <CardPaketAktif key={item.id} data={item} />)
          ) : (
            <div className="flex items-center justify-center py-12 text-neutral-500">
              Tidak ada paket aktif ditemukan
            </div>
          )}
        </div>

        {/* Pagination */}
        {!isLoading && packages.length > 0 && (
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
    </div>
  );
};

export default ActiveSubscriptionPage;
