import { ImageComponent } from "@muatmuat/ui/ImageComponent";

import Button from "@/components/Button/Button";

const CardPaketAktif = ({ data }) => {
  const {
    invoiceNumber,
    date,
    packageName,
    totalMuatkoin,
    activePeriod,
    expiryDate,
    price,
    discountedPrice,
  } = data;

  return (
    <div className="flex flex-col rounded-[12px] border border-neutral-200 bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col gap-5 p-6">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <a
            href="#"
            className="w-fit text-sm font-semibold text-[#1B69F7] hover:underline"
          >
            {invoiceNumber}
          </a>
          <span className="text-sm font-semibold text-neutral-900">{date}</span>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-5 gap-6">
          {/* Nama Paket */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-600">
              <ImageComponent
                src="/svg/detail-paket/aktif.svg"
                alt="package"
                width={16}
                height={16}
              />
              Nama Paket
            </div>
            <span className="text-sm font-semibold text-neutral-900">
              {packageName}
            </span>
          </div>

          {/* Total muatkoin */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-600">
              <ImageComponent
                src="/svg/muatkoin/m.svg"
                alt="muatkoin"
                width={16}
                height={16}
              />
              Total muatkoin
            </div>
            <span className="text-sm font-semibold text-neutral-900">
              {totalMuatkoin}
            </span>
          </div>

          {/* Masa Aktif muatkoin */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-600">
              <ImageComponent
                src="/svg/timer-red.svg"
                alt="duration"
                width={16}
                height={16}
              />
              Masa Aktif muatkoin
            </div>
            <span className="text-sm font-semibold text-neutral-900">
              {activePeriod}
            </span>
          </div>

          {/* Tanggal Kedaluwarsa */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-600">
              <ImageComponent
                src="/svg/detail-paket/kadaluwarsa.svg"
                alt="expiry"
                width={16}
                height={16}
              />
              Tanggal Kedaluwarsa
            </div>
            <span className="text-sm font-semibold text-neutral-900">
              {expiryDate}
            </span>
          </div>

          {/* Harga */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-600">
              <ImageComponent
                src="/svg/muatkoin/m.svg"
                alt="price"
                width={16}
                height={16}
              />
              Harga
            </div>
            <div className="flex flex-col">
              {discountedPrice && (
                <span className="text-xs text-neutral-400 line-through">
                  {price}
                </span>
              )}
              <span className="text-sm font-semibold text-neutral-900">
                {discountedPrice || price}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex items-center justify-end gap-4 border-t border-neutral-200 px-6 py-4">
        <Button
          variant="muatparts-primary-secondary"
          className="!h-[33px] !w-[136px] rounded-full border !px-0 text-sm font-semibold"
        >
          Cetak Invoice
        </Button>
        <Button
          variant="muatparts-primary"
          className="!h-[33px] !w-[112px] rounded-full text-sm font-semibold text-white"
        >
          Detail
        </Button>
      </div>
    </div>
  );
};

export default CardPaketAktif;
