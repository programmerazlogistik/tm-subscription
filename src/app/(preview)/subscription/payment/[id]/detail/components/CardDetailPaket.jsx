import Image from "next/image";

import { formatDateWIB } from "@/lib/format-date";

const CardDetailPaket = ({ data }) => {
  const {
    transactionId: idTransaksi = "-",
    transactionDate,
    packageName: paket = "-",
    packageDetail = {},
    price = 0,
    paymentMethod: paymentMethodData,
    additionalMuatkoin,
  } = data || {};

  // Fallback if packageDetail is null (though data||{} handles undefined, explicit null might slip through if data.packageDetail is null)
  const { subUsersIncluded, period, promo = {} } = packageDetail || {};

  const discountAmount = promo?.discount || 0;
  // Calculate subtotal from price if price is total, or from originalPrice
  // Based on logical display: Subtotal is usually Price before discount.
  // API: price = 200000, originalPrice = 359999.
  // Display Subtotal: originalPrice (or price + discount)
  // Display Total: price

  const originalPrice = data?.originalPrice || price + discountAmount;

  const formatPrice = (p) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(p || 0);
  };

  const tanggal = formatDateWIB(transactionDate);
  const subUser = subUsersIncluded
    ? `(Termasuk ${subUsersIncluded} Sub User)`
    : null;
  const durasi = period ? `${period} Hari` : "-";
  const tambahan = additionalMuatkoin || "-";

  const subtotalDisplay = formatPrice(originalPrice);
  const discountDisplay = discountAmount
    ? `-${formatPrice(discountAmount)}`
    : null;
  const totalDisplay = formatPrice(price);

  const paymentMethodName = paymentMethodData?.name;
  const paymentMethodIcon = paymentMethodData?.icon;

  return (
    <div className="flex flex-col gap-8 rounded-xl bg-white px-8 py-5 shadow-muat">
      <div className="grid grid-cols-2 gap-y-8">
        {/* ID Transaksi */}
        <div className="flex flex-col gap-3">
          <span className="text-[14px] font-medium text-[#7B7B7B]">
            ID Transaksi
          </span>
          <span className="w-fit rounded-[6px] bg-[#E2F2FF] px-2 py-1 text-[12px] font-semibold text-[#176CF7]">
            {idTransaksi}
          </span>
        </div>

        {/* Tanggal Transaksi */}
        <div className="flex flex-col gap-3">
          <span className="text-[14px] font-medium text-[#7B7B7B]">
            Tanggal Transaksi
          </span>
          <span className="text-[16px] font-semibold text-[#000000]">
            {tanggal}
          </span>
        </div>

        {/* Paket */}
        <div className="flex flex-col gap-3">
          <span className="text-[14px] font-medium text-[#7B7B7B]">Paket</span>
          <div className="flex flex-col">
            <span className="text-[16px] font-semibold text-[#000000]">
              {paket}
            </span>
            <span className="text-[16px] font-semibold text-[#000000]">
              {subUser}
            </span>
          </div>
        </div>

        {/* Durasi muatkoin */}
        <div className="flex flex-col gap-3">
          <span className="text-[14px] font-medium text-[#7B7B7B]">
            Durasi muatkoin
          </span>
          <span className="text-[16px] font-semibold text-[#000000]">
            {durasi}
          </span>
        </div>

        {/* Tambahan muatkoin */}
        <div className="col-span-2 flex flex-col">
          <span className="text-[14px] font-medium text-[#7B7B7B]">
            Tambahan muatkoin
          </span>
          <span className="text-[16px] font-semibold text-[#000000]">
            {tambahan}
          </span>
        </div>
      </div>

      {/* Ringkasan Pembayaran */}
      {data.status !== "pending" && data.price > 0 ? (
        <div className="flex flex-col gap-5">
          <h3 className="text-[16px] font-medium text-[#000000]">
            Ringkasan Pembayaran
          </h3>
          <div className="flex items-center justify-between text-[14px] font-medium text-[#7B7B7B]">
            <span>Tanggal Pembayaran</span>
            <span className="text-[16px] font-semibold text-[#000000]">
              {tanggal}
            </span>
          </div>
          {paymentMethodName && (
            <div className="flex items-center justify-between text-[14px] font-medium text-[#7B7B7B]">
              <span>Metode Pembayaran</span>
              <span className="flex items-center gap-1 text-[16px] font-semibold text-[#000000]">
                {paymentMethodIcon && (
                  <Image
                    src={paymentMethodIcon}
                    alt={paymentMethodName}
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                )}
                {paymentMethodName}
              </span>
            </div>
          )}
        </div>
      ) : null}
      {/* Detail Pembayaran */}
      <div className="flex flex-col gap-2">
        <h3 className="text-[16px] font-medium text-[#000000]">
          Detail Pembayaran
        </h3>
        <div className="flex items-center justify-between text-[14px] font-medium text-[#7B7B7B]">
          <span>{paket}</span>
          <span className="text-[16px] font-semibold text-[#000000]">
            {subtotalDisplay}
          </span>
        </div>
        {discountDisplay && (
          <div className="flex items-center justify-between text-[14px] font-medium text-[#7B7B7B]">
            <span>Potongan Harga</span>
            <span className="text-[16px] font-semibold text-[#EE4343]">
              {discountDisplay}
            </span>
          </div>
        )}

        <div className="h-px w-full bg-[#C4C4C4]" />

        <div className="flex items-center justify-between text-[14px] font-medium text-[#7B7B7B]">
          <span>Total</span>
          <span className="text-[16px] font-semibold text-[#000000]">
            {totalDisplay}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardDetailPaket;
