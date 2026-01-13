"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import PageTitle from "@/components/PageTitle/PageTitle";

import { useGetPackageDetail } from "@/hooks/Subscription/use-get-package-detail";

import PaketYangDipilih from "./components/PaketYangDipilih";
import RingkasanPembayaran from "./components/RingkasanPembayaran";

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const packageId = searchParams.get("packageId");
  const { data, isLoading } = useGetPackageDetail(packageId);

  const current = useMemo(() => {
    if (!data?.Data) return null;
    const pkg = data.Data;

    return {
      title: pkg.name,
      desc: pkg.description,
      main: pkg.isUnlimited ? "Unlimited" : String(pkg.muatkoin),
      unit: "muatkoin",
      price: new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(pkg.price),
      gift:
        pkg.subUsersIncluded > 0
          ? `Termasuk ${pkg.subUsersIncluded} Sub User`
          : null,
      period: `Masa Aktif ${pkg.period} Hari`,
      summaryDesc: `Paket ${pkg.name} (${pkg.isUnlimited ? "Unlimited" : pkg.muatkoin} muatkoin)`,
      rawPrice: pkg.price,
      badge: pkg.bonusMuatkoin ? `+${pkg.bonusMuatkoin} Free` : null,
      strikethrough: pkg.originalPrice
        ? new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(pkg.originalPrice)
        : null,
      discount: pkg.originalPrice ? pkg.originalPrice - pkg.price : 0,
    };
  }, [data]);

  if (isLoading) {
    // Simple loading state
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-neutral-500">Paket tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <PageTitle withBack={true}>Detail Pembayaran Langganan</PageTitle>
        </div>

        <div className="flex gap-4">
          <div className="w-[590px]">
            <PaketYangDipilih data={data?.Data} />
          </div>

          <div className="w-[338px]">
            <RingkasanPembayaran current={current} packageId={packageId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
