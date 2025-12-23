import Image from "next/image";
import Link from "next/link";

import Button from "@/components/Button/Button";
import { InfoTooltip } from "@/components/Form/InfoTooltip";

const SaldoMuatkoin = () => {
  return (
    <div className="relative h-[221px] w-[288px] overflow-hidden rounded-[12px] bg-[#E6F0FF] p-6">
      <div className="relative z-10 flex h-full flex-col justify-between">
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

        <div className="mb-6 mt-8">
          <span className="text-[32px] font-bold">0</span>
          <span className="ml-2 text-lg font-bold">muatkoin</span>
        </div>

        <Link href="/subscription/buy" className="w-full">
          <Button
            className="min-w-full rounded-full bg-[#1B69F7] text-white hover:bg-blue-700"
            variant="muatparts-primary"
          >
            Beli muatkoin
          </Button>
        </Link>
      </div>

      {/* Background Decoration */}
      {/* Background Decoration */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Image
          src="/svg/muatkoin/muatkoin-square.svg"
          alt="Background Decoration"
          fill
          className="object-cover opacity-100"
        />
      </div>
    </div>
  );
};

export default SaldoMuatkoin;
