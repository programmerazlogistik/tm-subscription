"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { toast } from "@muatmuat/ui/Toaster";

import Button from "@/components/Button/Button";

import { useCancelPurchase } from "@/hooks/Payment/use-cancel-purchase";
import { transformToPrintInvoiceData } from "@/hooks/Payment/use-get-purchase-detail";

import { formatDateWIB } from "@/lib/format-date";
import { printInvoice } from "@/lib/print-invoice";

import { ModalQRIS } from "./ModalQRIS";

const CardPembayaranPaket = ({ data }) => {
  const router = useRouter();
  const { cancelPurchase, isLoading: isCancelling } = useCancelPurchase();
  const [timeRemaining, setTimeRemaining] = useState("--:--:--");

  // Calculate and format time remaining
  useEffect(() => {
    if (!data?.expirationDate) {
      setTimeRemaining("--:--:--");
      return;
    }

    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const expiration = new Date(data.expirationDate).getTime();
      const diff = expiration - now;

      if (diff <= 0) {
        setTimeRemaining("00:00:00");
        return false; // Stop the interval
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
      );
      return true; // Continue the interval
    };

    // Initial calculation
    calculateTimeRemaining();

    // Update every second
    const interval = setInterval(() => {
      const shouldContinue = calculateTimeRemaining();
      if (!shouldContinue) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [data?.expirationDate]);

  // Helper for currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price || 0);
  };

  // Copy to clipboard function - uses execCommand for iframe compatibility
  const handleCopy = (text, message) => {
    try {
      // Use execCommand method which works in iframes
      const textArea = document.createElement("textarea");
      textArea.value = text;
      // Prevent scrolling and make invisible
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "-9999px";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);

      if (successful) {
        toast.success(message);
      } else {
        toast.error("Gagal menyalin");
      }
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Gagal menyalin");
    }
  };

  // Handle cancel purchase
  const handleCancelPurchase = async () => {
    if (!data?.purchaseId) {
      toast.error("ID pembelian tidak ditemukan");
      return;
    }

    try {
      await cancelPurchase({
        purchaseId: data.purchaseId,
        cancelReason: "Tidak jadi beli",
      });
      toast.success("Pembelian paket berhasil dibatalkan");
      router.push("/subscription");
    } catch (err) {
      toast.error(
        err?.response?.data?.Message?.Text || "Gagal membatalkan pembelian"
      );
    }
  };

  const handlePrintInvoice = () => {
    // Use transformToPrintInvoiceData as single source of truth
    // Transform data props to match the expected format
    const invoiceData = transformToPrintInvoiceData({
      transactionId: data?.transactionId,
      buyerName: data?.buyerName,
      transactionDate: data?.transactionDate,
      packageName: data?.packageName,
      packageDetail: data?.packageDetail,
      originalPrice: data?.originalPrice,
      price: data?.totalPrice || data?.price,
      paymentMethod: { name: data?.paymentMethodName },
      status: data?.status,
    });
    printInvoice(invoiceData);
  };

  const {
    expirationDate,
    paymentMethodName,
    paymentMethodIcon,
    paymentChannel,
    paymentCode,
    vaNumber,
    totalPrice,
    qrisData,
  } = data || {};

  return (
    <div className="flex flex-col gap-6 rounded-xl bg-white p-6 shadow-muat">
      {/* Yellow Header */}
      <div className="flex items-center justify-between rounded-lg bg-[#FFF9C2] p-4">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-[#FF7A00]">Bayar Sebelum</span>
          <span className="text-xs font-semibold text-neutral-900">
            {formatDateWIB(expirationDate)}
          </span>
        </div>
        <div className="mb-auto flex items-center gap-2">
          <div className="flex items-center gap-1 rounded bg-[#FFEFE2] px-2 py-1 text-sm font-medium text-[#DE2D39]">
            <Image
              src="/svg/timer-red.svg"
              alt="timer"
              width={16}
              height={16}
            />
            {timeRemaining}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Metode Pembayaran */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-neutral-600">
            Metode Pembayaran
          </span>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-900">
              {paymentMethodName}
            </span>
            {paymentMethodIcon && (
              <img
                src={paymentMethodIcon}
                alt={paymentMethodName || "payment"}
                width={32}
                height={32}
              />
            )}
          </div>
        </div>

        {/* Nomor Virtual Account - Only show for VA channel */}
        {paymentChannel === "VA" && (
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-neutral-600">
              Nomor Virtual Account
            </span>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-900">
                {vaNumber}
              </span>
              <button
                onClick={() =>
                  handleCopy(vaNumber, "Nomor Virtual Account berhasil disalin")
                }
                className="flex cursor-pointer items-center gap-1 text-xs font-semibold text-[#176CF7] hover:text-[#1259CC]"
              >
                Salin
                <Image src="/svg/salin.svg" alt="copy" width={16} height={16} />
              </button>
            </div>
          </div>
        )}

        {/* Yang Harus Dibayarkan */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-neutral-600">
            Yang Harus Dibayarkan
          </span>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-900">
              {formatPrice(totalPrice)}
            </span>
            <button
              onClick={() =>
                handleCopy(String(totalPrice), "Total Tagihan berhasil disalin")
              }
              className="flex cursor-pointer items-center gap-1 text-xs font-semibold text-[#176CF7] hover:text-[#1259CC]"
            >
              Salin
              <Image src="/svg/salin.svg" alt="copy" width={16} height={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {paymentCode === "qris" ? (
          <ModalQRIS totalPrice={totalPrice} qrData={qrisData}>
            <Button variant="muatparts-primary" className="w-full">
              Lihat QR Code
            </Button>
          </ModalQRIS>
        ) : null}
        <Button
          variant="muatparts-primary-secondary"
          className="w-full border-[#176CF7] text-[#176CF7]"
          iconLeft="/svg/cetak.svg"
          onClick={handlePrintInvoice}
        >
          Cetak Invoice
        </Button>
        <Button
          variant="muatparts-error-secondary"
          className="w-full"
          onClick={handleCancelPurchase}
          disabled={isCancelling}
        >
          {isCancelling ? "Membatalkan..." : "Batalkan Pembelian"}
        </Button>
      </div>
    </div>
  );
};

export default CardPembayaranPaket;
