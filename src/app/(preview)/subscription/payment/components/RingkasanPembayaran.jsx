import Button from "@/components/Button/Button";

const RingkasanPembayaran = () => {
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
              Paket Pro (320 + 20 muatkoin)
            </div>
            <div className="text-xs font-medium text-neutral-900">
              Rp300.000
            </div>
          </div>

          <div className="flex items-start justify-between">
            <div className="max-w-[166px] text-xs font-medium text-neutral-600">
              Potongan Harga
            </div>
            <div className="text-xs font-medium text-[#EE4040]">-Rp50.000</div>
          </div>

          <div className="my-2 h-px w-full bg-neutral-400" />

          <div className="flex items-center justify-between">
            <span className="font-bold text-neutral-900">Total</span>
            <span className="text-lg font-bold text-neutral-900">
              Rp250.000
            </span>
          </div>

          <Button
            variant="muatparts-primary"
            className="mt-2 w-full rounded-3xl text-white"
          >
            Pilih Opsi Pembayaran
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RingkasanPembayaran;
