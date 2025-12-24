const CardDetailPaket = ({ data }) => {
  const {
    idTransaksi = "INV/2024/0123456789",
    tanggal = "23 Jul 2025 18:00 WIB",
    paket = "Paket Starter",
    subUser = "(Termasuk 1 Sub User)",
    durasi = "30 Hari",
    tambahan = "320 + 20 muatkoin",
    subtotal = "Rp300.000",
    discount = "-Rp50.000",
    total = "Rp250.000",
    paymentMethod = null, // Only for completed/some states if needed
  } = data || {};

  return (
    <div className="flex flex-col gap-8 rounded-xl bg-white px-8 py-5 shadow-muat">
      <div className="grid grid-cols-2 gap-y-8">
        {/* ID Transaksi */}
        <div className="flex flex-col gap-3">
          <span className="text-[14px] font-medium text-[#7B7B7B]">
            ID Transaksi
          </span>
          <span className="w-fit rounded-[6px] bg-[#E2F2FF] px-2 py-1 text-[12px] font-semibold text-[#176CF7]">
            {idTransaksi}
          </span>
        </div>

        {/* Tanggal Transaksi */}
        <div className="flex flex-col gap-3">
          <span className="text-[14px] font-medium text-[#7B7B7B]">
            Tanggal Transaksi
          </span>
          <span className="text-[16px] font-semibold text-[#000000]">
            {tanggal}
          </span>
        </div>

        {/* Paket */}
        <div className="flex flex-col gap-3">
          <span className="text-[14px] font-medium text-[#7B7B7B]">Paket</span>
          <div className="flex flex-col">
            <span className="text-[16px] font-semibold text-[#000000]">
              {paket}
            </span>
            <span className="text-[16px] font-semibold text-[#000000]">
              {subUser}
            </span>
          </div>
        </div>

        {/* Durasi muatkoin */}
        <div className="flex flex-col gap-3">
          <span className="text-[14px] font-medium text-[#7B7B7B]">
            Durasi muatkoin
          </span>
          <span className="text-[16px] font-semibold text-[#000000]">
            {durasi}
          </span>
        </div>

        {/* Tambahan muatkoin */}
        <div className="col-span-2 flex flex-col gap-3">
          <span className="text-[14px] font-medium text-[#7B7B7B]">
            Tambahan muatkoin
          </span>
          <span className="text-[16px] font-semibold text-[#000000]">
            {tambahan}
          </span>
        </div>
      </div>

      {/* Ringkasan Pembayaran */}
      <div className="-mt-2 flex flex-col gap-5 border-b border-[#C4C4C4] pb-5">
        <h3 className="text-[16px] font-medium text-[#000000]">
          Ringkasan Pembayaran
        </h3>
        <div className="flex items-center justify-between text-[14px] font-medium text-[#7B7B7B]">
          <span>Tanggal Pembayaran</span>
          <span className="text-[16px] font-semibold text-[#000000]">
            {tanggal}
          </span>
        </div>
        {paymentMethod && (
          <div className="flex items-center justify-between text-[14px] font-medium text-[#7B7B7B]">
            <span>Metode Pembayaran</span>
            <span className="flex items-center gap-1 text-[16px] font-semibold text-[#000000]">
              {/* Placeholder icon */}
              <img
                src="/svg/bca.svg"
                alt="BCA"
                className="h-5 w-5 object-contain"
              />
              {paymentMethod}
            </span>
          </div>
        )}
      </div>

      {/* Detail Pembayaran */}
      <div className="flex flex-col gap-5">
        <h3 className="text-[16px] font-medium text-[#000000]">
          Detail Pembayaran
        </h3>
        <div className="flex items-center justify-between text-[14px] font-medium text-[#7B7B7B]">
          <span>{paket}</span>
          <span className="text-[16px] font-semibold text-[#000000]">
            {subtotal}
          </span>
        </div>
        {discount && (
          <div className="flex items-center justify-between text-[14px] font-medium text-[#7B7B7B]">
            <span>Potongan Harga</span>
            <span className="text-[16px] font-semibold text-[#EE4343]">
              {discount}
            </span>
          </div>
        )}

        <div className="h-px w-full bg-[#C4C4C4]" />

        <div className="flex items-center justify-between text-[14px] font-medium text-[#7B7B7B]">
          <span>Total</span>
          <span className="text-[16px] font-semibold text-[#000000]">
            {total}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardDetailPaket;
