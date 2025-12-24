"use client";

import PageTitle from "@/components/PageTitle/PageTitle";

import PaketYangDipilih from "./components/PaketYangDipilih";
import RingkasanPembayaran from "./components/RingkasanPembayaran";

const PaymentPage = () => {
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <PageTitle withBack={true}>Detail Pembayaran Langganan</PageTitle>
        </div>

        <div className="flex gap-4">
          <div className="w-[590px]">
            <PaketYangDipilih />
          </div>

          <div className="w-[338px]">
            <RingkasanPembayaran />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
