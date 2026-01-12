"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from "@muatmuat/ui/Modal";
import { InfoTooltip } from "@muatmuat/ui/Tooltip";
import { Wallet } from "lucide-react";

import { Slider } from "@/components/Slider/Slider";

import { useGetPurchaseHistory } from "@/hooks/Payment/use-get-purchase-history";

import { formatDateWIB } from "@/lib/format-date";

// Helper function to format price to IDR
const formatPrice = (price, currency = "IDR") => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price || 0);
};

// Transform API data to card format
const transformPackageData = (pkg) => ({
  id: pkg.id,
  name: `${pkg.packageName} (${pkg.packageDetail?.period || 30} Hari)`,
  paymentDeadline: formatDateWIB(pkg.expiresAt),
  totalMuatkoin: pkg.isUnlimited
    ? "Unlimited"
    : pkg.bonusMuatkoin > 0
      ? `${pkg.baseMuatkoin} + ${pkg.bonusMuatkoin} Free`
      : String(pkg.baseMuatkoin),
  price: formatPrice(pkg.price, pkg.currency),
  paymentMethod: pkg.paymentMethod?.name || "-",
});

const PaketMenungguPembayaran = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch pending purchase history
  const { data: apiResponse, isLoading } = useGetPurchaseHistory({
    status: "pending",
    page: 1,
    limit: 100, // Fetch more for modal
  });

  // Transform API data
  const pendingPackages = useMemo(() => {
    const packages = apiResponse?.Data?.purchaseHistory ?? [];
    return packages.map(transformPackageData);
  }, [apiResponse]);

  const hasPackages = pendingPackages.length > 0;

  const slides = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < pendingPackages.length; i += 3) {
      chunks.push(pendingPackages.slice(i, i + 3));
    }
    return chunks;
  }, [pendingPackages]);

  const handleCardClick = (pkgId) => {
    router.push(`/subscription/payment/${pkgId}/detail`);
  };

  const PackageCard = ({ pkg, onClick }) => (
    <div
      onClick={() => onClick?.(pkg.id)}
      className="flex h-[159px] w-[280px] shrink-0 cursor-pointer flex-col items-center gap-[10px] rounded-[12px] border border-[#A8A8A8] bg-white p-[12px] transition-shadow hover:shadow-md"
    >
      <div className="flex w-[256px] items-center text-[16px] font-semibold leading-[120%] text-[#1B1B1B]">
        {pkg.name}
      </div>

      <div className="flex h-[24px] w-[256px] items-center justify-center gap-1 rounded-[6px] bg-[#FFF1A5] px-2 text-[12px] font-semibold text-[#FF7A00]">
        Bayar Sebelum {pkg.paymentDeadline}
      </div>

      <div className="flex w-[256px] flex-wrap content-start items-start gap-[12px]">
        {/* Total muatkoin */}
        <div className="flex w-[122px] flex-col gap-2">
          <div className="flex items-center gap-2">
            <Image
              src="/svg/muatkoin/m.svg"
              alt="Muatkoin"
              width={16}
              height={16}
              className="h-4 w-4 shrink-0 opacity-60 grayscale"
            />
            <div className="flex flex-col">
              <span className="text-[12px] font-medium leading-[120%] text-[#676767]">
                Total muatkoin
              </span>
              <span className="text-[12px] font-medium leading-[120%] text-[#1B1B1B]">
                {pkg.totalMuatkoin} muatkoin
              </span>
            </div>
          </div>
        </div>

        {/* Harga */}
        <div className="flex w-[122px] flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-4 w-4 shrink-0 items-center justify-center">
              <div className="relative flex h-[10px] w-[14px] items-center justify-center rounded-[2px] border-[1.5px] border-[#676767]">
                <div className="h-[4px] w-[4px] rounded-full border-[1.5px] border-[#676767]"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-medium leading-[120%] text-[#676767]">
                Harga
              </span>
              <span className="text-[12px] font-medium leading-[120%] text-[#1B1B1B]">
                {pkg.price}
              </span>
            </div>
          </div>
        </div>

        {/* Metode Pembayaran */}
        <div className="mt-0 flex w-full flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-4 w-4 shrink-0 items-center justify-center">
              <div className="relative flex h-[14px] w-[14px] items-center justify-center rounded-[2px] border-[1.5px] border-[#676767]">
                <div className="absolute top-[4px] h-[1.5px] w-full bg-[#676767]"></div>
                <div className="absolute bottom-[3px] h-[1.5px] w-[6px] bg-[#676767]"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-medium leading-[120%] text-[#676767]">
                Metode Pembayaran
              </span>
              <span className="text-[12px] font-medium leading-[120%] text-[#1B1B1B]">
                {pkg.paymentMethod}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div
        className="flex scroll-mt-24 flex-col overflow-hidden rounded-[12px] border border-[#d7d7d7] bg-white"
        id="paket-menunggu-pembayaran"
      >
        <div className="flex items-center justify-between border-b border-neutral-200 bg-[#E6F0FF] px-4 py-3 text-sm font-medium text-neutral-800">
          <div className="flex items-center gap-2">
            <Wallet size={14} />
            <span>Paket Menunggu Pembayaran</span>
            <InfoTooltip>
              Berikut adalah paket yang masih dalam status menunggu pembayaran,
              silahkan lakukan pembayaran segera.
            </InfoTooltip>
          </div>
        </div>
        <div className="flex min-h-[160px] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-[#176CF7]" />
        </div>
      </div>
    );
  }

  // Don't render the component if there are no pending packages
  if (!hasPackages) {
    return null;
  }

  return (
    <div
      className="flex scroll-mt-24 flex-col overflow-hidden rounded-[12px] border border-[#d7d7d7] bg-white"
      id="paket-menunggu-pembayaran"
    >
      <div className="flex items-center justify-between border-b border-neutral-200 bg-[#E6F0FF] px-4 py-3 text-sm font-medium text-neutral-800">
        <div className="flex items-center gap-2">
          <Wallet size={14} />
          <span>Paket Menunggu Pembayaran</span>
          <InfoTooltip>
            Berikut adalah paket yang <br /> masih dalam status menunggu
            pembayaran, <br />
            silahkan lakukan pembayaran segera.
          </InfoTooltip>
        </div>
        {hasPackages && (
          <button
            onClick={() => router.push("/subscription/pending")}
            className="text-[12px] font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            Lihat Semua
          </button>
        )}
      </div>

      <div className="relative mx-auto w-full px-[15px] pb-6 pt-4">
        <Slider.Root items={slides} loop={false} className="group relative">
          <Slider.Content className="w-full" effect="slide">
            {(items) => (
              <div className="flex w-full gap-3">
                {items.map((pkg) => (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    onClick={handleCardClick}
                  />
                ))}
              </div>
            )}
          </Slider.Content>

          <Slider.DesktopNavigation
            className="-left-[18px] -mt-2 w-[calc(100%+36px)] px-0"
            prevButtonClassName="scale-[0.65] rounded-full border border-neutral-200 bg-white p-1.5 shadow-sm hover:bg-neutral-50 disabled:opacity-0"
            nextButtonClassName="scale-[0.65] rounded-full border border-neutral-200 bg-white p-1.5 shadow-sm hover:bg-neutral-50 disabled:opacity-0"
          />

          <Slider.Indicator
            className="mt-4 gap-1.5"
            render={({ isActive, onClick }) => (
              <button
                onClick={onClick}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isActive ? "w-6 bg-blue-500" : "w-2 bg-neutral-300"
                }`}
              />
            )}
          />
        </Slider.Root>
      </div>

      <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
        <ModalContent className="max-w-[900px] overflow-hidden p-0">
          <ModalHeader variant="muattrans" />
          <ModalTitle withClose>Daftar Menunggu Pembayaran</ModalTitle>
          <div className="max-h-[600px] overflow-y-auto p-6">
            <div className="grid grid-cols-3 justify-items-center gap-6">
              {pendingPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} onClick={handleCardClick} />
              ))}
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PaketMenungguPembayaran;
