"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { InfoTooltip } from "@muatmuat/ui/Tooltip";
import { Calendar } from "lucide-react";

import DataEmpty from "@/components/DataEmpty/DataEmpty";
import { Slider } from "@/components/Slider/Slider";

import { useGetActivePackages } from "@/hooks/Subscription/use-get-active-packages";

import { formatMuatkoin } from "@/lib/utils/formatters";

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// Transform API data to card format
const transformPackageData = (pkg) => ({
  id: pkg.purchaseId,
  name: `${pkg.packageName} (${pkg.packageDetail?.period || 30} Hari)`,
  totalMuatkoin: pkg.isUnlimited ? "Unlimited" : String(pkg.totalMuatkoin),
  isUnlimited: pkg.isUnlimited,
  expiry: formatDate(pkg.expirationDate),
});

const PaketMuatkoinAktif = () => {
  const router = useRouter();

  // Fetch active packages
  const { data: apiResponse, isLoading } = useGetActivePackages({
    page: 1,
    limit: 100,
  });

  // Transform API data
  const activePackages = useMemo(() => {
    const packages = apiResponse?.Data?.packages ?? [];
    return packages.map(transformPackageData);
  }, [apiResponse]);

  const hasPackages = activePackages.length > 0;

  const slides = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < activePackages.length; i += 2) {
      chunks.push(activePackages.slice(i, i + 2));
    }
    return chunks;
  }, [activePackages]);

  const handleCardClick = (pkgId) => {
    router.push(`/subscription/payment/${pkgId}/detail`);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col overflow-hidden rounded-[12px] border border-[#d7d7d7] bg-white">
        <div className="flex items-center justify-between border-b border-neutral-200 bg-[#D1E2FD] px-4 py-3 text-sm font-medium text-neutral-800">
          <div className="flex items-center gap-2">
            <Image
              src="/svg/paket-aktif.svg"
              alt="Paket Aktif"
              width={14}
              height={16}
            />
            <span>Paket muatkoin Aktif</span>
            <InfoTooltip>
              Ini adalah paket aktif yang anda miliki dalam periode ini.
            </InfoTooltip>
          </div>
        </div>
        <div className="flex min-h-[140px] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-[#176CF7]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-[12px] border border-[#d7d7d7] bg-white">
      <div className="flex items-center justify-between border-b border-neutral-200 bg-[#D1E2FD] px-4 py-3 text-sm font-medium text-neutral-800">
        <div className="flex items-center gap-2">
          <Image
            src="/svg/paket-aktif.svg"
            alt="Paket Aktif"
            width={14}
            height={16}
          />
          <span>Paket muatkoin Aktif</span>
          <InfoTooltip>
            Ini adalah paket aktif yang anda miliki dalam periode ini.
          </InfoTooltip>
        </div>
        {hasPackages && (
          <Link
            href="/subscription/active"
            className="text-[12px] font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            Lihat Semua Transaksi
          </Link>
        )}
      </div>

      <div className="relative mx-auto w-fit px-4 pb-6 pt-4">
        {!hasPackages ? (
          <div className="flex min-h-[140px] items-center justify-center">
            <DataEmpty
              title="Belum Ada Paket muatkoin Aktif"
              titleClassname="text-sm font-semibold text-neutral-500 mt-4"
            />
          </div>
        ) : (
          <Slider.Root items={slides} loop={false} className="relative">
            <Slider.Content className="w-[560px]" effect="slide">
              {(items) => (
                <div className="flex gap-4">
                  {items.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => handleCardClick(pkg.id)}
                      className="flex h-[123px] w-[272px] shrink-0 cursor-pointer flex-col gap-3 rounded-xl border border-[#A8A8A8] bg-white p-3 transition-shadow hover:shadow-md"
                    >
                      <div className="flex max-h-[24px] items-center text-[16px] font-semibold leading-[120%] text-[#1B1B1B]">
                        {pkg.name}
                      </div>

                      <div className="flex flex-col gap-3">
                        <div className="flex items-start gap-2">
                          <Image
                            src="/svg/muatkoin/m.svg"
                            alt="Muatkoin"
                            width={16}
                            height={16}
                            className="h-4 w-4 shrink-0"
                          />
                          <div className="flex flex-col gap-2">
                            <span className="h-2 text-[12px] font-medium leading-[120%] text-[#676767]">
                              Total muatkoin
                            </span>
                            <span className="h-2 text-[12px] font-medium leading-[120%] text-[#1B1B1B]">
                              {pkg.isUnlimited
                                ? "Unlimited muatkoin"
                                : `${formatMuatkoin(pkg.totalMuatkoin)} muatkoin`}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Calendar
                            className="h-4 w-4 shrink-0 text-[#676767]"
                            strokeWidth={1.5}
                          />
                          <div className="flex flex-col gap-2">
                            <span className="h-2 text-[12px] font-medium leading-[120%] text-[#676767]">
                              Tanggal Kedaluwarsa
                            </span>
                            <span className="h-2 text-[12px] font-medium leading-[120%] text-[#1B1B1B]">
                              {pkg.expiry}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
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
              className="mt-2 gap-1.5"
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
        )}
      </div>
    </div>
  );
};

export default PaketMuatkoinAktif;
