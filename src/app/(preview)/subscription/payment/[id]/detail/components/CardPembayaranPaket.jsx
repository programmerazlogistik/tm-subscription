"use client";

import { useState } from "react";

import { ImageComponent } from "@muatmuat/ui/ImageComponent";

import Button from "@/components/Button/Button";

const CardPembayaranPaket = ({ data }) => {
  const [openAccordion, setOpenAccordion] = useState(false);

  // Helper for currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price || 0);
  };

  const {
    expirationDate,
    paymentMethodName,
    paymentMethodIcon,
    paymentChannel,
    vaNumber,
    totalPrice,
  } = data || {};

  return (
    <div className="flex flex-col gap-6 rounded-xl bg-white p-6 shadow-muat">
      {/* Yellow Header */}
      <div className="flex items-center justify-between rounded-lg bg-[#FFF9C2] p-4">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-[#FF7A00]">Bayar Sebelum</span>
          <span className="text-xs font-semibold text-neutral-900">
            {expirationDate
              ? new Date(expirationDate).toLocaleString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZoneName: "short",
                })
              : "-"}
          </span>
        </div>
        <div className="mb-auto flex items-center gap-2">
          <div className="flex items-center gap-1 rounded bg-[#FFEFE2] px-2 py-1 text-sm font-medium text-[#DE2D39]">
            <ImageComponent
              src="/svg/timer-red.svg"
              alt="timer"
              width={16}
              height={16}
            />
            {/* Timer logic could be added here later */}
            --:--:--
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Metode Pembayaran */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-neutral-600">
            Metode Pembayaran
          </span>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-900">
              {paymentMethodName}
            </span>
            {paymentMethodIcon && (
              <ImageComponent
                src={paymentMethodIcon}
                alt={paymentMethodName || "payment"}
                width={32}
                height={32}
              />
            )}
          </div>
        </div>

        {/* Nomor Virtual Account - Only show for VA channel */}
        {paymentChannel === "VA" && (
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-neutral-600">
              Nomor Virtual Account
            </span>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-900">
                {vaNumber}
              </span>
              <div className="flex cursor-pointer items-center gap-1 text-xs font-semibold text-[#176CF7]">
                Salin
                <ImageComponent
                  src="/svg/salin.svg"
                  alt="copy"
                  width={16}
                  height={16}
                />
              </div>
            </div>
          </div>
        )}

        {/* Yang Harus Dibayarkan */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-neutral-600">
            Yang Harus Dibayarkan
          </span>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-900">
              {formatPrice(totalPrice)}
            </span>
            <div className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-[#176CF7]">
              Salin
              <ImageComponent
                src="/svg/salin.svg"
                alt="copy"
                width={16}
                height={16}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          variant="muatparts-primary-secondary"
          className="w-full border-[#176CF7] text-[#176CF7]"
          iconLeft="/svg/cetak.svg"
        >
          Cetak Invoice
        </Button>
        <Button variant="muatparts-error-secondary" className="w-full">
          Batalkan Pembelian
        </Button>
      </div>
    </div>
  );
};

export default CardPembayaranPaket;
