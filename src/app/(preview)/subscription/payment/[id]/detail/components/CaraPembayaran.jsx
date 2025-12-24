"use client";

import { useState } from "react";

import { ImageComponent } from "@muatmuat/ui/ImageComponent";

import { cn } from "@/lib/utils";

const CaraPembayaran = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const items = [
    "ATM",
    "Internet Banking",
    "Mobile Banking (m-BCA)",
    "Kantor Bank BCA",
  ];

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-muat">
      <h3 className="text-lg font-bold text-neutral-900">Cara Pembayaran</h3>
      <div className="flex flex-col">
        {items.map((item, index) => (
          <div
            key={index}
            className="border-b border-neutral-200 last:border-0"
          >
            <button
              className="flex w-full items-center justify-between py-4 text-left"
              onClick={() => toggleAccordion(index)}
            >
              <span className="text-sm font-medium text-neutral-900">
                {item}
              </span>
              <ImageComponent
                src="/svg/chevron-down.svg"
                alt="arrow"
                width={24}
                height={24}
                className={cn(
                  "transition-transform duration-200",
                  openIndex === index ? "rotate-180" : ""
                )}
              />
            </button>
            {openIndex === index && (
              <div className="pb-4 text-xs text-neutral-600">
                {/* Placeholder content for instructions */}
                <ol className="list-decimal space-y-1 pl-5">
                  <li>Masuk ke menu {item}</li>
                  <li>Pilih menu Transaksi Lainnya</li>
                  <li>Pilih menu Transfer</li>
                  <li>Pilih menu ke Rekening BCA Virtual Account</li>
                </ol>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaraPembayaran;
