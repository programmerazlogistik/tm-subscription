"use client";

import { useState } from "react";

import PageTitle from "@/components/PageTitle/PageTitle";

import PaketYangDipilih from "./components/PaketYangDipilih";
import RingkasanPembayaran from "./components/RingkasanPembayaran";

const PaymentPage = () => {
  const [selectedDevOption, setSelectedDevOption] = useState(2); // Default to Pro

  const options = [
    {
      label: "Unlimited Free",
      title: "Starter",
      desc: "Paket ideal untuk kebutuhan dasar dan mencoba semua fitur dengan kredit terbatas.",
      main: "Unlimited",
      unit: "muatkoin",
      price: "Free",
      gift: "Termasuk 3 Sub User",
      period: "Masa Aktif 30 Hari",
      summaryDesc: "Paket Starter (Unlimited muatkoin)",
      rawPrice: 0,
    },
    {
      label: "30 Muatkoin",
      title: "Starter",
      desc: "Paket ideal untuk kebutuhan dasar dan mencoba semua fitur dengan kredit terbatas.",
      main: "30",
      unit: "muatkoin",
      price: "Rp50.000",
      period: "Masa Aktif 7 Hari",
      summaryDesc: "Paket Starter (30 muatkoin)",
      rawPrice: 50000,
    },
    {
      label: "Pro 320",
      title: "Pro",
      recommended: true,
      desc: "Paket hemat dengan bonus kredit dan akses ke semua fitur dengan kredit melimpah.",
      main: "320",
      unit: "muatkoin",
      badge: "+20 Free",
      price: "Rp250.000",
      strikethrough: "Rp300.000",
      gift: "Termasuk 1 Sub User",
      period: "Masa Aktif 30 Hari",
      summaryDesc: "Paket Pro (320 + 20 muatkoin)",
      rawPrice: 250000,
      discount: 50000,
    },
    {
      label: "Unlimited Paid",
      title: "Premium",
      desc: "Paket ideal untuk kebutuhan dasar dan mencoba semua fitur dengan kredit terbatas.",
      main: "Unlimited",
      unit: "muatkoin",
      price: "Rp2.000.000",
      gift: "Termasuk 3 Sub User",
      period: "Masa Aktif 30 Hari",
      summaryDesc: "Paket Premium (Unlimited muatkoin)",
      rawPrice: 2000000,
    },
  ];

  const current = options[selectedDevOption];

  return (
    <div className="relative min-h-screen bg-white p-6">
      {/* Dev Select */}
      <div className="absolute right-6 top-6 z-50">
        <select
          className="rounded-md border border-gray-300 bg-white p-1 text-sm"
          value={selectedDevOption}
          onChange={(e) => setSelectedDevOption(Number(e.target.value))}
        >
          {options.map((opt, idx) => (
            <option key={idx} value={idx}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <PageTitle withBack={true}>Detail Pembayaran Langganan</PageTitle>
        </div>

        <div className="flex gap-4">
          <div className="w-[590px]">
            <PaketYangDipilih current={current} />
          </div>

          <div className="w-[338px]">
            <RingkasanPembayaran current={current} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
