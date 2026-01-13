import Image from "next/image";

// Helper function to format price
const formatPrice = (price, currency = "IDR") => {
  if (price === null || price === undefined) return null;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const PaketYangDipilih = ({ data }) => {
  if (!data) return null;

  const {
    name,
    description,
    muatkoin,
    bonusMuatkoin,
    isUnlimited,
    isRecommended,
    price,
    originalPrice,
    period,
    subUsersIncluded,
  } = data;

  return (
    <div className="flex flex-col gap-4 rounded-xl px-8 py-5 shadow-muat">
      <h2 className="text-sm font-semibold text-black">Paket yang Dipilih</h2>
      <div className="flex flex-col rounded-xl border border-primary-500 bg-white p-4">
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-bold text-black">{name}</h2>
          {isRecommended && (
            <div className="flex h-6 items-center gap-1 rounded-md bg-[#E5F0FF] px-2 text-xs font-semibold text-[#176CF7]">
              <Image
                src="/svg/recommended.svg"
                alt="Recommended"
                width={14}
                height={14}
                className="h-[14px] w-[14px]"
              />
              Populer
            </div>
          )}
        </div>

        <p className="mt-3 text-sm font-medium text-[#555555]">{description}</p>

        <div className="mt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-[32px] font-bold text-[#1B1B1B]">
              {isUnlimited ? "Unlimited" : muatkoin}
            </span>
            <span className="text-xl font-semibold text-[#1B1B1B]">
              muatkoin
            </span>
            {bonusMuatkoin > 0 && (
              <div className="flex items-center rounded-md bg-[#E8F8F2] px-2 py-0.5 text-xs font-bold text-[#00A862]">
                +{bonusMuatkoin} Free
              </div>
            )}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[18px] font-bold text-[#1B1B1B]">
              {price === 0 && (!originalPrice || originalPrice === 0)
                ? "Free"
                : formatPrice(price)}
            </span>
            {originalPrice > price && (
              <span className="text-sm text-[#868686] line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
        </div>

        {subUsersIncluded > 0 && (
          <div className="mt-2 flex items-center gap-2">
            <Image
              src="/svg/gift.svg"
              alt="Gift"
              width={18}
              height={18}
              className="h-[18px] w-[18px]"
            />
            <span className="text-sm font-semibold text-[#FF7A00]">
              Termasuk {subUsersIncluded} Sub User
            </span>
          </div>
        )}

        <div className="mt-4 w-full rounded-lg bg-[#D1E2FD] py-2 text-center text-xs font-semibold text-[#176CF7]">
          {period} Hari
        </div>
      </div>
    </div>
  );
};

export default PaketYangDipilih;
