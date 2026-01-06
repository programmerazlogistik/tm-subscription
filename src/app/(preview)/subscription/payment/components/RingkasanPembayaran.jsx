import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/components/Button/Button";

import { useCreatePurchase } from "@/hooks/Payment/use-create-purchase";
import { useGetPaymentMethods } from "@/hooks/Payment/use-get-payment-methods";

import { ModalOpsiPembayaran } from "./ModalOpsiPembayaran";

const RingkasanPembayaran = ({ current, packageId }) => {
  const router = useRouter();
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(null);

  const { data: paymentMethodsData } = useGetPaymentMethods();
  const paymentMethods = paymentMethodsData?.Data || [];

  const { createPurchase, isLoading } = useCreatePurchase();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const finalPrice = current.rawPrice - (current.discount || 0);

  const handleProceedPayment = async () => {
    try {
      const result = await createPurchase({
        packageId,
        paymentMethodId: selectedPaymentMethodId,
      });

      if (result?.id) {
        router.push(`/subscription/payment/${result.id}/detail`);
      }
    } catch (error) {
      console.error("Failed to create purchase:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl px-5 py-6 shadow-muat">
      <h2 className="font-bold text-neutral-900">Ringkasan Pembayaran</h2>
      <div className="h-fit">
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-neutral-900">
            Detail Pembayaran
          </h3>

          <div className="flex items-start justify-between">
            <div className="max-w-[166px] text-xs font-medium text-neutral-600">
              {current.summaryDesc}
            </div>
            <div className="text-xs font-medium text-neutral-900">
              {current.strikethrough ? current.strikethrough : current.price}
            </div>
          </div>

          {current.discount > 0 && (
            <div className="flex items-start justify-between">
              <div className="max-w-[166px] text-xs font-medium text-neutral-600">
                Potongan Harga
              </div>
              <div className="text-xs font-medium text-[#EE4040]">
                -{formatPrice(current.discount)}
              </div>
            </div>
          )}

          <div className="my-2 h-px w-full bg-neutral-400" />

          <div className="flex items-center justify-between">
            <span className="font-bold text-neutral-900">Total</span>
            <span className="text-lg font-bold text-neutral-900">
              {formatPrice(finalPrice)}
            </span>
          </div>

          {finalPrice === 0 ? (
            <Button
              variant="muatparts-primary"
              className="mt-2 w-full rounded-3xl text-white"
              onClick={handleProceedPayment}
            >
              Bayar
            </Button>
          ) : (
            <div className="mt-2">
              <ModalOpsiPembayaran
                paymentMethods={paymentMethods}
                selectedPaymentMethodId={selectedPaymentMethodId}
                onSelectedPaymentMethodId={setSelectedPaymentMethodId}
                onProceedPayment={handleProceedPayment}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RingkasanPembayaran;
