import Image from "next/image";
import Link from "next/link";

import Button from "@/components/Button/Button";
import { InfoTooltip } from "@/components/Form/InfoTooltip";

import { cn } from "@/lib/utils";

const SaldoMuatkoin = ({
  balance = 0,
  maxBalance = 0,
  isUnlimited = false,
  variant = "square", // "square" | "rectangle"
}) => {
  const isRectangle = variant === "rectangle";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[12px] bg-[#E6F0FF] p-6",
        isRectangle && "h-[124px] w-[944px]"
      )}
    >
      <div
        className={cn(
          "relative z-10 flex h-full",
          isRectangle
            ? "flex-row items-center justify-between"
            : "w-[240px] flex-col justify-between"
        )}
      >
        {/* Left Side: Title + Balance */}
        <div className={cn("flex flex-col", isRectangle ? "gap-2" : "gap-14")}>
          {/* Title */}
          <div className="flex items-center gap-2 text-sm font-medium text-neutral-800">
            <Image
              src="/svg/muatkoin/m.svg"
              alt="Muatkoin"
              width={16}
              height={16}
              className="h-4 w-4"
            />
            <span>Saldo muatkoin</span>
            <InfoTooltip>
              Ini adalah sisa saldo muatkoin anda yang dapat anda gunakan untuk
              membuka semua fitur premium pada transport market
            </InfoTooltip>
          </div>

          {/* Balance Display */}
          <div>
            {isUnlimited ? (
              <div
                className={cn(
                  "flex",
                  isRectangle ? "flex-row items-baseline gap-2" : "flex-col"
                )}
              >
                <span className="text-[32px] font-bold leading-9 text-[#1B1B1B]">
                  Unlimited
                </span>
                <span className="text-xl font-semibold leading-9 text-[#1B1B1B]">
                  muatkoin
                </span>
              </div>
            ) : (
              <div className="flex flex-col">
                <div className="flex items-end gap-2">
                  <span className="text-[40px] font-bold leading-10 text-[#1B1B1B]">
                    {balance}
                  </span>
                  <span className="mb-1 text-xl font-semibold text-[#1B1B1B]">
                    muatkoin
                  </span>
                </div>
                {maxBalance > 0 && (
                  <span className="text-sm font-medium text-[#868686]">
                    Dari {maxBalance} muatkoin
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Button */}
        <div className={cn(isRectangle ? "shrink-0" : "w-full")}>
          <Link href="/subscription/buy" className="block w-full">
            <Button
              className={cn(
                "rounded-full bg-[#1B69F7] text-white hover:bg-blue-700",
                isRectangle ? "whitespace-nowrap px-6" : "w-full"
              )}
              variant="muatparts-primary"
            >
              Beli muatkoin
            </Button>
          </Link>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 z-0">
        <Image
          src={
            isRectangle
              ? "/svg/muatkoin/muatkoin-rectangle.svg"
              : "/svg/muatkoin/muatkoin-square.svg"
          }
          alt="Background Decoration"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default SaldoMuatkoin;
