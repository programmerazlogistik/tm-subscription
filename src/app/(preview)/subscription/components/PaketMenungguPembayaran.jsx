"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from "@muatmuat/ui/Modal";
import { Wallet } from "lucide-react";

import DataEmpty from "@/components/DataEmpty/DataEmpty";
import { InfoTooltip } from "@/components/Form/InfoTooltip";
import { Slider } from "@/components/Slider/Slider";

const pendingPackages = [
  {
    id: 1,
    name: "Business Pro (30 Hari)",
    paymentDeadline: "28 Okt 2024 08:12 WIB",
    totalMuatkoin: "20",
    price: "Rp200.000",
    paymentMethod: "Bank BCA Virtual Account",
  },
  {
    id: 2,
    name: "Business Pro (30 Hari)",
    paymentDeadline: "28 Okt 2024 08:12 WIB",
    totalMuatkoin: "20",
    price: "Rp200.000",
    paymentMethod: "Bank BCA Virtual Account",
  },
  {
    id: 3,
    name: "Business Pro (30 Hari)",
    paymentDeadline: "28 Okt 2024 08:12 WIB",
    totalMuatkoin: "20",
    price: "Rp200.000",
    paymentMethod: "Bank BCA Virtual Account",
  },
];

const allPendingPackages = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: "Business Pro (30 Hari)",
  paymentDeadline: "28 Okt 2024 08:12 WIB",
  totalMuatkoin: "20",
  price: "Rp200.000",
  paymentMethod: "Bank BCA Virtual Account",
}));

const PaketMenungguPembayaran = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasPackages = pendingPackages.length > 0;

  const slides = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < pendingPackages.length; i += 3) {
      chunks.push(pendingPackages.slice(i, i + 3));
    }
    return chunks;
  }, []);

  return (
    <div
      className="flex scroll-mt-24 flex-col overflow-hidden rounded-[12px] border border-[#d7d7d7] bg-white"
      id="paket-menunggu-pembayaran"
    >
      <div className="flex items-center justify-between border-b border-neutral-200 bg-[#E6F0FF] px-4 py-3 text-sm font-medium text-neutral-800">
        <div className="flex items-center gap-2">
          <Wallet size={14} />
          <span>Paket Menunggu Pembayaran</span>
          <InfoTooltip>
            Berikut adalah paket yang masih dalam status menunggu pembayaran,
            silahkan lakukan pembayaran segera.
          </InfoTooltip>
        </div>
        <button
          onClick={() => {
            const isIframe = window.self !== window.top;
            if (isIframe) {
              window.parent.postMessage(
                {
                  type: "OPEN_PENDING_PAYMENT_MODAL",
                  payload: allPendingPackages,
                },
                "*"
              );
            } else {
              setIsModalOpen(true);
            }
          }}
          className="text-[12px] font-semibold text-blue-600 hover:text-blue-700 hover:underline"
        >
          Lihat Semua
        </button>
      </div>

      <div className="relative mx-auto w-full px-[15px] pb-6 pt-4">
        {!hasPackages ? (
          <div className="flex min-h-[160px] items-center justify-center">
            <DataEmpty
              title="Belum Ada Paket Menunggu Pembayaran"
              titleClassname="text-sm font-semibold text-neutral-500 mt-4"
            />
          </div>
        ) : (
          <Slider.Root items={slides} loop={false} className="group relative">
            <Slider.Content className="w-full" effect="slide">
              {(items) => (
                <div className="flex w-full gap-3">
                  {items.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="flex h-[159px] w-[280px] shrink-0 flex-col items-center gap-[10px] rounded-[12px] border border-[#A8A8A8] bg-white p-[12px]"
                    >
                      <div className="flex w-[256px] items-center text-[16px] font-semibold leading-[120%] text-[#1B1B1B]">
                        {pkg.name}
                      </div>

                      <div className="flex h-[24px] w-[256px] items-center justify-center gap-1 rounded-[6px] bg-[#FFF1A5] px-2 text-[12px] font-semibold text-[#FF7A00]">
                        Bayar Sebelum {pkg.paymentDeadline}
                      </div>

                      <div className="flex w-[256px] flex-wrap content-start items-start gap-[12px]">
                        {/* Total muatkoin */}
                        <div className="flex w-[122px] flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <Image
                              src="/svg/muatkoin/m.svg"
                              alt="Muatkoin"
                              width={16}
                              height={16}
                              className="h-4 w-4 shrink-0 opacity-60 grayscale"
                            />
                            <div className="flex flex-col">
                              <span className="text-[12px] font-medium leading-[120%] text-[#676767]">
                                Total muatkoin
                              </span>
                              <span className="text-[12px] font-medium leading-[120%] text-[#1B1B1B]">
                                {pkg.totalMuatkoin} muatkoin
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Harga */}
                        <div className="flex w-[122px] flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <div className="flex h-4 w-4 shrink-0 items-center justify-center">
                              <div className="relative flex h-[10px] w-[14px] items-center justify-center rounded-[2px] border-[1.5px] border-[#676767]">
                                <div className="h-[4px] w-[4px] rounded-full border-[1.5px] border-[#676767]"></div>
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[12px] font-medium leading-[120%] text-[#676767]">
                                Harga
                              </span>
                              <span className="text-[12px] font-medium leading-[120%] text-[#1B1B1B]">
                                {pkg.price}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Metode Pembayaran */}
                        <div className="mt-0 flex w-full flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <div className="flex h-4 w-4 shrink-0 items-center justify-center">
                              <div className="relative flex h-[14px] w-[14px] items-center justify-center rounded-[2px] border-[1.5px] border-[#676767]">
                                <div className="absolute top-[4px] h-[1.5px] w-full bg-[#676767]"></div>
                                <div className="absolute bottom-[3px] h-[1.5px] w-[6px] bg-[#676767]"></div>
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[12px] font-medium leading-[120%] text-[#676767]">
                                Metode Pembayaran
                              </span>
                              <span className="text-[12px] font-medium leading-[120%] text-[#1B1B1B]">
                                {pkg.paymentMethod}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Slider.Content>

            {/* Navigation Buttons - Absolute positioned on the sides */}
            <Slider.DesktopNavigation
              className="pointer-events-none absolute -left-[18px] top-1/2 z-10 w-[calc(100%+36px)] -translate-y-1/2 px-0"
              prevButtonClassName="scale-[0.6] rounded-full border border-neutral-200 bg-white p-1.5 shadow-sm hover:bg-neutral-50 disabled:opacity-0"
              nextButtonClassName="scale-[0.6] rounded-full border border-neutral-200 bg-white p-1.5 shadow-sm hover:bg-neutral-50 disabled:opacity-0"
            />

            <Slider.Indicator
              className="mt-4 gap-1.5"
              render={({ isActive, onClick }) => (
                <button
                  onClick={onClick}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isActive ? "w-6 bg-blue-500" : "w-2 bg-neutral-300"
                  }`}
                />
              )}
            />
          </Slider.Root>
        )}
      </div>

      <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
        <ModalContent className="max-w-[900px] overflow-hidden p-0">
          <ModalHeader variant="muattrans" />
          <ModalTitle withClose>Daftar Menunggu Pembayaran</ModalTitle>
          <div className="max-h-[600px] overflow-y-auto p-6">
            <div className="grid grid-cols-3 justify-items-center gap-6">
              {allPendingPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="flex h-[159px] w-[280px] shrink-0 flex-col items-center gap-[10px] rounded-[12px] border border-[#A8A8A8] bg-white p-[12px]"
                >
                  <div className="flex w-[256px] items-center text-[16px] font-semibold leading-[120%] text-[#1B1B1B]">
                    {pkg.name}
                  </div>

                  <div className="flex h-[24px] w-[256px] items-center justify-center gap-1 rounded-[6px] bg-[#FFF1A5] px-2 text-[12px] font-semibold text-[#FF7A00]">
                    Bayar Sebelum {pkg.paymentDeadline}
                  </div>

                  <div className="flex w-[256px] flex-wrap content-start items-start gap-[12px]">
                    {/* Total muatkoin */}
                    <div className="flex w-[122px] flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Image
                          src="/svg/muatkoin/m.svg"
                          alt="Muatkoin"
                          width={16}
                          height={16}
                          className="h-4 w-4 shrink-0 opacity-60 grayscale"
                        />
                        <div className="flex flex-col">
                          <span className="text-[12px] font-medium leading-[120%] text-[#676767]">
                            Total muatkoin
                          </span>
                          <span className="text-[12px] font-medium leading-[120%] text-[#1B1B1B]">
                            {pkg.totalMuatkoin} muatkoin
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Harga */}
                    <div className="flex w-[122px] flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <div className="flex h-4 w-4 shrink-0 items-center justify-center">
                          <div className="relative flex h-[10px] w-[14px] items-center justify-center rounded-[2px] border-[1.5px] border-[#676767]">
                            <div className="h-[4px] w-[4px] rounded-full border-[1.5px] border-[#676767]"></div>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[12px] font-medium leading-[120%] text-[#676767]">
                            Harga
                          </span>
                          <span className="text-[12px] font-medium leading-[120%] text-[#1B1B1B]">
                            {pkg.price}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Metode Pembayaran */}
                    <div className="mt-0 flex w-full flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <div className="flex h-4 w-4 shrink-0 items-center justify-center">
                          <div className="relative flex h-[14px] w-[14px] items-center justify-center rounded-[2px] border-[1.5px] border-[#676767]">
                            <div className="absolute top-[4px] h-[1.5px] w-full bg-[#676767]"></div>
                            <div className="absolute bottom-[3px] h-[1.5px] w-[6px] bg-[#676767]"></div>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[12px] font-medium leading-[120%] text-[#676767]">
                            Metode Pembayaran
                          </span>
                          <span className="text-[12px] font-medium leading-[120%] text-[#1B1B1B]">
                            {pkg.paymentMethod}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PaketMenungguPembayaran;
