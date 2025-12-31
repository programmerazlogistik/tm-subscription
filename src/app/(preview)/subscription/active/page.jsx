"use client";

import { useState } from "react";

import { ImageComponent } from "@muatmuat/ui/ImageComponent";

import PageTitle from "@/components/PageTitle/PageTitle";

import SaldoMuatkoin from "../components/SaldoMuatkoin";
import CardPaketAktif from "./components/CardPaketAktif";

const ActiveSubscriptionPage = () => {
  const [search, setSearch] = useState("");

  const dummyData = [
    {
      invoiceNumber: "INV/9090/SMP/00932933",
      date: "12 Aug 2021 13:59 WIB",
      packageName: "Business Pro",
      totalMuatkoin: "0/20 muatkoin",
      activePeriod: "30 Hari",
      expiryDate: "15 Okt 2020",
      price: "Rp800.000",
      discountedPrice: null,
    },
    {
      invoiceNumber: "INV/9090/SMP/00932933",
      date: "12 Aug 2021 13:59 WIB",
      packageName: "Business Pro",
      totalMuatkoin: "Unlimited muatkoin",
      activePeriod: "30 Hari",
      expiryDate: "15 Okt 2020",
      price: "Rp800.000", // Original price
      discountedPrice: "Rp720.000", // Discounted
    },
    // Add more dummy items if needed to test scrolling/pagination
  ];

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
        <div className="flex gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Cari Riwayat Penggunaan muatkoin" // Placeholder from image
              className="w-full rounded-md border border-neutral-400 py-2.5 pl-10 pr-4 text-sm text-neutral-900 placeholder-neutral-500 focus:border-[#176CF7] focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <ImageComponent
                src="/svg/search.svg"
                alt="search"
                width={20}
                height={20}
              />
            </div>
          </div>

          <button className="flex items-center gap-2 rounded-md border border-neutral-400 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900">
            <ImageComponent
              src="/svg/sorting-icon.svg" // Check if exists
              alt="sort"
              width={16}
              height={16}
            />
            Urutkan
            <ImageComponent
              src="/svg/chevron-down.svg"
              alt="chevron"
              width={16}
              height={16}
            />
          </button>
          <button className="flex items-center justify-center rounded-md border border-neutral-400 bg-white px-3 py-2.5">
            {/* AZ sort icon placeholder */}
            <span className="text-sm font-bold">A-Z</span>
          </button>
        </div>

        {/* List */}
        <div className="flex flex-col gap-4">
          {dummyData.map((item, idx) => (
            <CardPaketAktif key={idx} data={item} />
          ))}
        </div>

        {/* Pagination (Static for now) */}
        <div className="mt-4 flex items-center justify-end gap-4">
          <span className="text-sm text-neutral-600">
            Tampilkan Jumlah detail
          </span>
          {/* Pagination controls would go here */}
          <div className="flex gap-2">
            <button className="h-8 w-8 rounded-full bg-[#176CF7] text-sm font-medium text-white">
              1
            </button>
          </div>
          <div className="flex gap-4 text-sm text-neutral-600">
            <span className="font-bold text-[#176CF7]">10</span>
            <span>20</span>
            <span>40</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveSubscriptionPage;
