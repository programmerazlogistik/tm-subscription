"use client";

import { forwardRef } from "react";

// Helper to format price
const formatPrice = (price) => {
  if (!price && price !== 0) return "-";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Helper to format date
const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });
};

const formatDownloadDate = () => {
  return new Date().toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
};

const InvoiceTemplate = forwardRef(({ data }, ref) => {
  const {
    transactionId = "INV/00000000/MPM/000000",
    buyerName = "-",
    topUpDate = new Date().toISOString(),
    packageName = "-",
    totalMuatkoin = 0,
    bonusMuatkoin = 0,
    price = 0,
    discount = 0,
    paymentMethod = "-",
  } = data || {};

  const totalHarga = price;
  const potonganHarga = discount;
  const totalPesanan = price - discount;
  const totalTagihan = totalPesanan;

  const muatkoinDisplay =
    bonusMuatkoin > 0
      ? `${totalMuatkoin - bonusMuatkoin} Credit + Bonus ${bonusMuatkoin} Credit`
      : `${totalMuatkoin} Credit`;

  return (
    <div
      ref={ref}
      className="mx-auto w-[595px] bg-white p-8 font-sans text-[11px] text-neutral-800"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between border-b border-neutral-200 pb-4">
        <div>
          {/* Logo */}
          <div className="mb-1 flex items-center gap-1">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFB800]">
              <span className="text-xs font-bold text-white">m</span>
            </div>
            <span className="text-lg font-bold text-[#1B69F7]">
              m<span className="text-[#FFB800]">u</span>atmuat
            </span>
          </div>
          <div className="text-[9px] text-[#1B69F7]">
            Ekosistem Digital Logistik Terpercaya
          </div>
        </div>
        <div className="text-right">
          <div className="text-[9px] font-medium text-neutral-500">INVOICE</div>
          <div className="text-sm font-bold text-[#1B69F7]">
            {transactionId}
          </div>
        </div>
      </div>

      {/* Download date & Page */}
      <div className="flex justify-between py-2 text-[10px] text-neutral-600">
        <div>
          Diunduh pada{" "}
          <span className="font-semibold">{formatDownloadDate()}</span>
        </div>
        <div>Halaman 1 dari 1</div>
      </div>

      {/* Ditujukan Kepada */}
      <div className="mb-4 mt-4">
        <div className="mb-2 text-xs font-bold text-neutral-800">
          DITUJUKAN KEPADA
        </div>
        <div className="grid grid-cols-[120px_1fr] gap-y-1 text-[11px]">
          <span className="text-neutral-500">Pembeli</span>
          <span className="font-medium">{buyerName}</span>
          <span className="text-neutral-500">Tanggal Top-up Credit</span>
          <span className="font-medium">{formatDate(topUpDate)}</span>
        </div>
      </div>

      {/* Diterbitkan Atas Nama */}
      <div className="mb-4">
        <div className="mb-2 text-xs font-bold text-neutral-800">
          DITERBITKAN ATAS NAMA
        </div>
        <div className="grid grid-cols-[120px_1fr] gap-y-1 text-[11px]">
          <span className="text-neutral-500">Penjual</span>
          <span className="font-medium">muatmuat</span>
        </div>
      </div>

      {/* Rincian Pesanan */}
      <div className="mb-4">
        <div className="mb-2 text-xs font-bold text-neutral-800">
          RINCIAN PESANAN
        </div>

        {/* Table Header */}
        <div className="flex justify-between border-b border-t border-neutral-200 py-2 text-[10px]">
          <span className="text-neutral-500">Produk</span>
          <span className="text-neutral-500">Sub Total Harga</span>
        </div>

        {/* Product Row */}
        <div className="flex justify-between border-b border-neutral-200 py-3">
          <div>
            <div className="font-semibold">{packageName}</div>
            <div className="text-[10px] text-neutral-500">
              {muatkoinDisplay}
            </div>
          </div>
          <div className="font-medium">{formatPrice(price)}</div>
        </div>
      </div>

      {/* Totals Section with LUNAS watermark */}
      <div className="relative">
        {/* LUNAS Watermark */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-15deg]">
          <div className="rounded-lg border-4 border-[#4CAF50] px-8 py-4 text-center opacity-30">
            <div className="text-3xl font-bold tracking-widest text-[#4CAF50]">
              LUNAS
            </div>
          </div>
        </div>

        {/* Right-aligned totals */}
        <div className="ml-auto w-[280px]">
          <div className="flex justify-between border-b border-neutral-100 py-2 text-[11px]">
            <span className="text-neutral-500">Total Harga</span>
            <span className="font-medium">{formatPrice(totalHarga)}</span>
          </div>
          {potonganHarga > 0 && (
            <div className="flex justify-between border-b border-neutral-100 py-2 text-[11px]">
              <span className="text-neutral-500">Potongan Harga</span>
              <span className="font-medium text-red-500">
                -{formatPrice(potonganHarga)}
              </span>
            </div>
          )}
          <div className="flex justify-between border-b border-neutral-100 py-2 text-[11px]">
            <span className="font-semibold">Total Pesanan</span>
            <span className="font-bold">{formatPrice(totalPesanan)}</span>
          </div>
          <div className="flex justify-between py-2 text-[11px]">
            <span className="font-bold text-[#1B69F7]">Total Tagihan</span>
            <span className="text-base font-bold text-[#1B69F7]">
              {formatPrice(totalTagihan)}
            </span>
          </div>
          <div className="flex justify-between py-1 text-[10px]">
            <span className="text-neutral-400">Metode Pembayaran</span>
            <span className="font-medium">{paymentMethod}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-[10px] text-neutral-500">
        Jika kamu berbadan usaha dan membutuhkan dokumen perpajakan dapat
        menghubungi CS muatmuat
        <br />
        <a href="tel:081138867000" className="text-[#1B69F7]">
          (081138867000)
        </a>
      </div>
    </div>
  );
});

InvoiceTemplate.displayName = "InvoiceTemplate";

export default InvoiceTemplate;
