"use client";

import { useParams, useRouter } from "next/navigation";

import Button from "@/components/Button/Button";
import PageTitle from "@/components/PageTitle/PageTitle";

import { useGetPurchaseDetail } from "@/hooks/Payment/use-get-purchase-detail";

import { printInvoice } from "@/lib/print-invoice";

import CaraPembayaran from "./components/CaraPembayaran";
import CardDetailPaket from "./components/CardDetailPaket";
import CardPembayaranPaket from "./components/CardPembayaranPaket";
import CardStatusPaket from "./components/CardStatusPaket";

const DetailPembayaranPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const { data: apiResponse, isLoading } = useGetPurchaseDetail(id);
  const data = apiResponse?.Data;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price || 0);
  };

  // Map API status to UI status
  // API: "pending" -> UI: "waiting"
  // API: "paid" -> UI: "active" (Assuming paid means active for now)
  // API: "expired" -> UI: "expired"
  let uiStatus = "waiting";
  if (data?.status === "pending") uiStatus = "waiting";
  else if (
    data?.status === "paid" ||
    data?.status === "success" ||
    data?.status === "active"
  )
    uiStatus = "active";
  else if (data?.status === "expired") uiStatus = "expired";
  else if (data?.status === "cancelled") uiStatus = "cancelled";

  // Data for CardPembayaranPaket
  const paymentData = {
    purchaseId: data?.id,
    expirationDate: data?.expirationDate || data?.payment?.expiredAt,
    paymentMethodName: data?.paymentMethod?.name,
    paymentMethodIcon: data?.paymentMethod?.icon,
    paymentChannel: data?.paymentMethod?.channel,
    paymentCode: data?.paymentMethod?.code,
    vaNumber: data?.payment?.vaNumber || data?.vaNumber,
    totalPrice: data?.price,
    packageDetail: data?.packageDetail,
    originalPrice: data?.originalPrice,
    transactionId: data?.transactionId,
    transactionDate: data?.transactionDate,
    buyerName: data?.buyerName,
    packageName: data?.packageName,
    discount: data?.packageDetail?.promo?.discount,
    qrisData: data?.payment?.qrisData,
    status: data?.status, // For invoice watermark
  };

  const handlePrintInvoice = () => {
    // Calculate values from data structure for page-level print
    const pkgDetail = data?.packageDetail || {};
    const promo = pkgDetail.promo || {};

    // Pricing
    const originalPrice = data?.originalPrice || data?.price || 0;
    const finalPrice = data?.price || 0;
    const discountAmount = originalPrice - finalPrice;

    // Muatkoin
    const baseMuatkoin = pkgDetail.baseMuatkoin || 0;
    const bonusMuatkoin = pkgDetail.bonusMuatkoin || promo.bonusMuatkoin || 0;
    const totalMuatkoin = baseMuatkoin + bonusMuatkoin;

    printInvoice({
      transactionId: data?.transactionId || "-",
      buyerName: data?.buyerName || "-",
      topUpDate: data?.transactionDate,
      packageName: data?.packageName || "-",
      totalMuatkoin: totalMuatkoin,
      bonusMuatkoin: bonusMuatkoin,
      price: originalPrice,
      discount: discountAmount,
      paymentMethod: data?.paymentMethod?.name || "-",
      status: data?.status || "pending",
      invoiceType: "credit",
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-[#176CF7]" />
      </div>
    );
  }

  if (!data && !isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-neutral-500">Data tidak ditemukan</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (uiStatus) {
      case "active":
        return (
          <div className="flex flex-col gap-6">
            <CardStatusPaket status="active" />
            <CardDetailPaket data={data} />
          </div>
        );
      case "waiting":
        return (
          <div className="flex flex-col gap-6">
            <CardStatusPaket status="waiting" />
            <div className="flex items-start gap-4">
              {/* Left Column: Transaction Details */}
              <div className="flex-1">
                <CardDetailPaket data={data} />
              </div>
              {/* Right Column: Payment & Instructions */}
              <div className="flex w-[392px] flex-col gap-6">
                <CardPembayaranPaket data={paymentData} />
                <CaraPembayaran />
              </div>
            </div>
          </div>
        );
      case "expired":
        return (
          <div className="flex flex-col gap-6">
            <CardStatusPaket status="expired" />
            <CardDetailPaket data={data} />
          </div>
        );
      case "cancelled":
        return (
          <div className="flex flex-col gap-6">
            <CardStatusPaket status="cancelled" />
            <CardDetailPaket data={data} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-white p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <PageTitle withBack={true}>Detail Pembayaran Langganan</PageTitle>
        </div>
      </div>

      <div
        className={`mx-auto ${
          uiStatus === "waiting" ? "max-w-5xl" : "max-w-[646px]"
        }`}
      >
        {renderContent()}

        {uiStatus !== "waiting" && (
          <div className="mt-8 flex justify-center gap-4">
            <Button
              variant="muatparts-primary"
              className="w-[136px]"
              onClick={() => router.back()}
            >
              Kembali
            </Button>
            <Button
              variant="muatparts-primary-secondary"
              className="w-[165px]"
              iconLeft="/svg/cetak.svg"
              onClick={handlePrintInvoice}
            >
              Cetak Invoice
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPembayaranPage;
