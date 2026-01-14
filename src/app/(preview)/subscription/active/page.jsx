"use client";

import { useState } from "react";

import { InputSearch } from "@/components/InputSearch/InputSearch";
import PageTitle from "@/components/PageTitle/PageTitle";
import Pagination from "@/components/Pagination/Pagination";
import SearchNotFound from "@/components/SearchNotFound/SearchNotFound";

import { useGetActivePackages } from "@/hooks/Subscription/use-get-active-packages";
import { useDebounce } from "@/hooks/use-debounce";

import SaldoMuatkoin from "../components/SaldoMuatkoin";
import SortComponent from "../components/SortComponent";
import CardPaketAktif from "./components/CardPaketAktif";

const SORT_OPTIONS = [{ value: "transactionTime", label: "Waktu Transaksi" }];

const ActiveSubscriptionPage = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortDirection, setSortDirection] = useState("DESC");
  const [sortField, setSortField] = useState("");

  // Debounce search value
  const debouncedSearch = useDebounce(search, 500);

  // Fetch active packages from API
  const { data: apiResponse, isLoading } = useGetActivePackages({
    page: currentPage,
    limit: perPage,
    search: debouncedSearch,
    sort: sortDirection,
  });

  const packages = apiResponse?.Data?.packages ?? [];
  const pagination = apiResponse?.Data?.pagination ?? {
    currentPage: 1,
    totalPages: 1,
    totalData: 0,
    limit: 10,
  };

  const handleSortFieldChange = (field) => {
    setSortField(field);
    setCurrentPage(1);
  };

  const handleSortDirectionChange = (direction) => {
    setSortDirection(direction);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="mx-auto flex w-[944px] flex-col gap-6">
        {/* Banner Saldo */}
        <SaldoMuatkoin variant="rectangle" />

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

          <SortComponent
            options={SORT_OPTIONS}
            sortField={sortField}
            onSortFieldChange={handleSortFieldChange}
            sortDirection={sortDirection}
            onSortDirectionChange={handleSortDirectionChange}
          />
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
            <div className="flex flex-col gap-9">
              {debouncedSearch && (
                <p className="text-left font-semibold text-neutral-900">
                  Tidak Ditemukan Hasil Pencarian Dari &quot;{debouncedSearch}
                  &quot;
                </p>
              )}
              <SearchNotFound />
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
