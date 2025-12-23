import { Award, Gift } from "lucide-react";

import Button from "@/components/Button/Button";

const PricingCard = ({
  title,
  description,
  muatkoinAmount,
  price,
  discountPrice,
  bonus,
  subUser,
  masaAktif = "Masa Aktif 30 Hari",
  isRecommended = false,
  isBestValue = false,
  onBuy,
}) => {
  return (
    <div className="relative flex h-[336px] w-[253px] flex-col rounded-[20px] border border-neutral-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      {isRecommended && (
        <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-lg bg-[#E1EBFD] px-3 py-1.5 text-xs font-semibold text-[#1B69F7]">
          <Award className="h-4 w-4" />
          <span>Direkomendasikan</span>
        </div>
      )}

      <div>
        <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
        <p className="mt-4 line-clamp-2 text-xs font-medium text-neutral-500">
          {description}
        </p>

        <div className="mt-6">
          <div className="flex items-center gap-2">
            <span className="text-[32px] font-bold leading-none text-neutral-900">
              {muatkoinAmount}
            </span>
            {bonus && (
              <span className="rounded bg-[#E3F5ED] px-2 py-0.5 text-xs font-semibold text-[#00AF6C]">
                {bonus}
              </span>
            )}
          </div>
          <span className="text-sm font-semibold text-neutral-500">
            muatkoin
          </span>
        </div>

        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-neutral-900">{price}</span>
            {discountPrice && (
              <span className="text-xs font-semibold text-neutral-400 line-through decoration-neutral-400">
                {discountPrice}
              </span>
            )}
          </div>
          {subUser && (
            <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-[#FFA700]">
              <Gift className="h-3 w-3" />
              <span>{subUser}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto pt-2">
        <div className="mb-3 flex cursor-default items-center justify-center rounded-lg bg-[#E1EBFD] py-2 text-xs font-semibold text-[#1B69F7]">
          {masaAktif}
        </div>
        <Button
          className="h-9 w-full rounded-full bg-[#1B69F7] text-sm font-semibold text-white hover:bg-blue-700"
          variant="muatparts-primary"
        >
          Beli muatkoin
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;
