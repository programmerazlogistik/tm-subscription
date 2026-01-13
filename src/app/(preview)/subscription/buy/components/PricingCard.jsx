import Button from "@/components/Button/Button";

import { formatMuatkoin } from "@/lib/utils/formatters";

// Helper function to format price
const formatPrice = (price, currency = "IDR") => {
  if (!price) return null;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const PricingCard = ({ data, onBuy }) => {
  if (!data) return null;

  const {
    name,
    description,
    muatkoin,
    isUnlimited,
    price,
    originalPrice,
    periodLabel,
    isRecommended,
    subUsersIncluded,
    bonusMuatkoin,
  } = data;

  return (
    <div className="relative flex h-[336px] w-[253px] flex-col rounded-[20px] border border-[#A8A8A8] bg-white p-5">
      {isRecommended && (
        <div className="absolute right-4 top-4 flex w-[77px] items-center gap-1 rounded-lg bg-[#E1EBFD] px-2 py-1.5 text-xs font-semibold text-[#1B69F7]">
          <img
            src="/svg/recommended.svg"
            alt="Recommended"
            width={14}
            height={14}
            className="w-4[14px] h-[14px]"
          />
          <span>Populer</span>
        </div>
      )}

      <div>
        <h3 className="w-[130px] break-all text-sm font-semibold text-neutral-900">
          {name}
        </h3>
        <p className="mt-3 line-clamp-2 text-xs font-medium text-neutral-500">
          {description}
        </p>

        <div className="mt-5">
          <div className="flex items-center gap-2">
            <span className="text-[32px] font-bold leading-none text-neutral-900">
              {isUnlimited ? "Unlimited" : formatMuatkoin(muatkoin)}
            </span>
            {bonusMuatkoin > 0 && (
              <span className="rounded bg-[#E3F5ED] px-2 py-0.5 text-xs font-semibold text-[#00AF6C]">
                +{formatMuatkoin(bonusMuatkoin)} Free
              </span>
            )}
          </div>
          <span className="text-sm font-semibold text-neutral-500">
            muatkoin
          </span>
        </div>

        <div className="mt-3">
          <div className="flex flex-col gap-1">
            <span className="text-xl font-bold text-neutral-900">
              {formatPrice(price)}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-xxs font-medium text-neutral-600 line-through decoration-neutral-400">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
          {subUsersIncluded > 0 && (
            <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-[#FF7A00]">
              <img
                src="/svg/gift.svg"
                alt="Gift"
                width={12}
                height={12}
                className="h-3 w-3"
              />
              <span>Termasuk {subUsersIncluded} Sub User</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto pt-2">
        <div className="mb-3 flex cursor-default items-center justify-center rounded-lg bg-[#E1EBFD] py-2 text-xs font-semibold text-[#1B69F7]">
          {periodLabel || `Masa Aktif 30 Hari`}
        </div>
        <Button
          className="h-9 w-full rounded-full bg-[#1B69F7] text-sm font-semibold text-white hover:bg-blue-700"
          variant="muatparts-primary"
          onClick={onBuy}
        >
          Beli muatkoin
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;
