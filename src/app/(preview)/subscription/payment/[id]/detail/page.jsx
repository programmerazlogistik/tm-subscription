"use client";

import { useState } from "react";

import Button from "@/components/Button/Button";
import PageTitle from "@/components/PageTitle/PageTitle";

import CaraPembayaran from "./components/CaraPembayaran";
import CardDetailPaket from "./components/CardDetailPaket";
import CardPembayaranPaket from "./components/CardPembayaranPaket";
import CardStatusPaket from "./components/CardStatusPaket";

const DetailPembayaranPage = () => {
  const [selectedState, setSelectedState] = useState("waiting"); // Default pending

  const stateOptions = ["active", "waiting", "expired", "cancelled"];

  const renderContent = () => {
    switch (selectedState) {
      case "active":
        return (
          <div className="flex flex-col gap-6">
            <CardStatusPaket status="active" />
            <CardDetailPaket
              data={{
                subtotal: "Rp300.000",
                discount: "-Rp50.000",
                total: "Rp250.000",
                paymentMethod: "BCA Virtual Account",
              }}
            />
          </div>
        );
      case "waiting":
        return (
          <div className="flex flex-col gap-6">
            <CardStatusPaket status="waiting" />
            <div className="flex items-start gap-4">
              {/* Left Column: Transaction Details */}
              <div className="flex-1">
                <CardDetailPaket
                  data={{
                    subtotal: "Rp300.000",
                    discount: "-Rp50.000",
                    total: "Rp250.000",
                    paymentMethod: null,
                  }}
                />
              </div>
              {/* Right Column: Payment & Instructions */}
              <div className="flex w-[392px] flex-col gap-6">
                <CardPembayaranPaket />
                <CaraPembayaran />
              </div>
            </div>
          </div>
        );
      case "expired":
        return (
          <div className="flex flex-col gap-6">
            <CardStatusPaket status="expired" />
            <CardDetailPaket
              data={{
                subtotal: "Rp300.000",
                discount: "-Rp50.000",
                total: "Rp250.000",
                paymentMethod: "BCA Virtual Account",
              }}
            />
          </div>
        );
      case "cancelled":
        return (
          <div className="flex flex-col gap-6">
            <CardStatusPaket status="cancelled" />
            <CardDetailPaket
              data={{
                subtotal: "Rp300.000",
                discount: "-Rp50.000",
                total: "Rp250.000",
                paymentMethod: "BCA Virtual Account",
              }}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-white p-6">
      {/* Dev Select */}
      <div className="absolute right-6 top-6 z-50">
        <select
          className="rounded-md border border-gray-300 bg-white p-1 text-sm"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          {stateOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <PageTitle withBack={true} backUrl="/subscription/payment">
            Detail Pembayaran Langganan
          </PageTitle>
        </div>
      </div>

      <div
        className={`mx-auto ${
          selectedState === "waiting" ? "max-w-5xl" : "max-w-[646px]"
        }`}
      >
        {renderContent()}

        {selectedState !== "waiting" && (
          <div className="mt-8 flex justify-center gap-4">
            <Button variant="muatparts-primary" className="w-[136px]">
              Kembali
            </Button>
            <Button
              variant="muatparts-primary-secondary"
              className="w-[165px]"
              iconLeft="/svg/cetak.svg"
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
