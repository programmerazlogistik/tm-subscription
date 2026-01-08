"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Button from "@/components/Button/Button";

const CardPaketPending = ({ data }) => {
  const router = useRouter();

  const {
    id,
    transactionId,
    transactionDate,
    packageName,
    baseMuatkoin,
    bonusMuatkoin,
    isUnlimited,
    expiresAt,
    price,
    packageDetail,
    paymentMethod,
  } = data;

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
  };

  // Format price helper
  const formatPrice = (amount) => {
    if (!amount) return "-";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleDetail = () => {
    router.push(`/subscription/payment/${id}/detail`);
  };

  // Calculate total muatkoin display
  const muatkoinDisplay = isUnlimited
    ? "Unlimited muatkoin"
    : bonusMuatkoin > 0
      ? `${baseMuatkoin} + ${bonusMuatkoin} Free muatkoin`
      : `${baseMuatkoin} muatkoin`;

  // Calculate final price after discount
  const originalPrice = packageDetail?.price || price;
  const discount = packageDetail?.promo?.discount || 0;
  const finalPrice = originalPrice - discount;

  return (
    <div className="flex flex-col rounded-[12px] border border-[#868686] bg-white shadow-muat">
      <div className="flex flex-col gap-5 p-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <a
              href="#"
              className="w-fit text-xs font-medium text-[#1B69F7] hover:underline"
            >
              {transactionId}
            </a>
            <span className="text-xs font-medium text-neutral-900">
              {formatDate(transactionDate)}
            </span>
          </div>
          {/* Payment deadline badge */}
          <div className="flex h-[24px] items-center justify-center rounded-[6px] bg-[#FFF1A5] px-3 text-xs font-semibold text-[#FF7A00]">
            Bayar Sebelum {formatDate(expiresAt)}
          </div>
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
              {muatkoinDisplay}
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
              {packageDetail?.period || 30} Hari
            </span>
          </div>

          {/* Metode Pembayaran */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-600">
              <Image
                src="/svg/daftar-paket/metode-pembayaran.svg"
                alt="payment"
                width={16}
                height={16}
              />
              Metode Pembayaran
            </div>
            <div className="flex items-center gap-2">
              {paymentMethod?.icon && (
                <img
                  src={paymentMethod.icon}
                  alt={paymentMethod.name}
                  width={20}
                  height={20}
                  className="rounded"
                />
              )}
              <span className="text-sm font-medium text-neutral-900">
                {paymentMethod?.name || "-"}
              </span>
            </div>
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
              {discount > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-400 line-through">
                    {formatPrice(originalPrice)}
                  </span>
                  <span className="rounded bg-[#E93B3B] px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    {Math.round((discount / originalPrice) * 100)}% OFF
                  </span>
                </div>
              )}
              <span className="text-sm font-medium text-neutral-900">
                {formatPrice(finalPrice)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Button */}
      <div className="flex items-center justify-end gap-4 border-t border-[#868686] px-6 py-4">
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

export default CardPaketPending;
