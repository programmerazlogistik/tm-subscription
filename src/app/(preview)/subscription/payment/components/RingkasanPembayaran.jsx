import { useRouter } from "next/navigation";

import Button from "@/components/Button/Button";

const RingkasanPembayaran = ({ current }) => {
  const router = useRouter();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const finalPrice = current.rawPrice - (current.discount || 0);

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

          {current.discount && (
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

          <Button
            variant="muatparts-primary"
            className="mt-2 w-full rounded-3xl text-white"
            onClick={() => router.push("/subscription/payment/123/detail")}
          >
            {finalPrice === 0 ? "Bayar" : "Pilih Opsi Pembayaran"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RingkasanPembayaran;
