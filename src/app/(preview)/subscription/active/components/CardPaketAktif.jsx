"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Button from "@/components/Button/Button";

import { formatDateWIB } from "@/lib/format-date";
import { printInvoice } from "@/lib/print-invoice";
import { formatMuatkoin } from "@/lib/utils/formatters";

const CardPaketAktif = ({ data }) => {
  const router = useRouter();

  const {
    purchaseId,
    transactionId,
    packageName,
    totalMuatkoin,
    isUnlimited,
    remainingMuatkoin,
    expirationDate,
    startDate,
    packageDetail,
  } = data;

  // Format price helper
  const formatPrice = (price) => {
    if (!price) return "-";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleDetail = () => {
    router.push(`/subscription/payment/${purchaseId}/detail`);
  };

  const handlePrintInvoice = () => {
    printInvoice({
      transactionId,
      buyerName: data?.buyerName || "-",
      topUpDate: startDate,
      packageName,
      totalMuatkoin,
      bonusMuatkoin: data?.bonusMuatkoin || 0,
      price: packageDetail?.price || 0,
      discount: packageDetail?.promo?.discount || 0,
      paymentMethod: data?.paymentMethod?.name || "-",
    });
  };

  return (
    <div className="flex flex-col rounded-[12px] border border-[#868686] bg-white shadow-muat">
      <div className="flex flex-col gap-5 p-6">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <a
            href="#"
            className="w-fit text-xs font-medium text-[#1B69F7] hover:underline"
          >
            {transactionId}
          </a>
          <span className="text-xs font-medium text-neutral-900">
            {formatDateWIB(startDate)}
          </span>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-5 gap-6">
          {/* Nama Paket */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-600">
              <Image
                src="/svg/daftar-paket/nama-paket.svg"
                alt="package"
                width={16}
                height={16}
              />
              Nama Paket
            </div>
            <span className="text-sm font-medium text-neutral-900">
              {packageName}
            </span>
          </div>

          {/* Total muatkoin */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-600">
              <Image
                src="/svg/daftar-paket/total-muatkoin.svg"
                alt="muatkoin"
                width={16}
                height={16}
              />
              Total muatkoin
            </div>
            <span className="text-sm font-medium text-neutral-900">
              {isUnlimited
                ? "Unlimited muatkoin"
                : `${formatMuatkoin(remainingMuatkoin)}/${formatMuatkoin(totalMuatkoin)} muatkoin`}
            </span>
          </div>

          {/* Masa Aktif muatkoin */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-600">
              <Image
                src="/svg/daftar-paket/masa-aktif.svg"
                alt="duration"
                width={16}
                height={16}
              />
              Masa Aktif muatkoin
            </div>
            <span className="text-sm font-medium text-neutral-900">
              {packageDetail?.period} Hari
            </span>
          </div>

          {/* Tanggal Kedaluwarsa */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-600">
              <Image
                src="/svg/daftar-paket/tanggal-kadaluwarsa.svg"
                alt="expiry"
                width={16}
                height={16}
              />
              Tanggal Kedaluwarsa
            </div>
            <span className="text-sm font-medium text-neutral-900">
              {formatDateWIB(expirationDate)}
            </span>
          </div>

          {/* Harga */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-600">
              <Image
                src="/svg/daftar-paket/harga.svg"
                alt="price"
                width={16}
                height={16}
              />
              Harga
            </div>
            <div className="flex flex-col">
              {packageDetail?.promo && (
                <span className="text-xs text-neutral-400 line-through">
                  {formatPrice(packageDetail?.price)}
                </span>
              )}
              <span className="text-sm font-medium text-neutral-900">
                {packageDetail?.promo
                  ? formatPrice(
                      packageDetail?.price - packageDetail?.promo?.discount
                    )
                  : formatPrice(packageDetail?.price)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex items-center justify-end gap-4 border-t border-[#868686] px-6 py-4">
        <Button
          variant="muatparts-primary-secondary"
          className="!h-[33px] !w-[136px] rounded-full border !px-0 text-sm font-semibold"
          onClick={handlePrintInvoice}
        >
          Cetak Invoice
        </Button>
        <Button
          variant="muatparts-primary"
          className="!h-[33px] !w-[112px] rounded-full text-sm font-semibold text-white"
          onClick={handleDetail}
        >
          Detail
        </Button>
      </div>
    </div>
  );
};

export default CardPaketAktif;
