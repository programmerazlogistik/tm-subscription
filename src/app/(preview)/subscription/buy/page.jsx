"use client";

import Image from "next/image";
import { useMemo } from "react";

import { ChevronDown, ChevronLeft } from "lucide-react";

import Button from "@/components/Button/Button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/Collapsible/Collapsible";
import PageTitle from "@/components/PageTitle/PageTitle";
import {
  Slider,
  // SliderContent, // Check export name
} from "@/components/Slider/Slider";

// Need to verify if it exports SliderContent or Content directly. It exports Slider.Content

import PricingCard from "./components/PricingCard";
import TestimonialCard from "./components/TestimonialCard";

const pricingData = [
  {
    title: "Starter",
    description:
      "Paket ideal untuk kebutuhan dasar dan mencoba semua fitur dengan kredit terbatas.",
    muatkoinAmount: "30",
    price: "Rp50.000",
    discountPrice: null,
    bonus: null,
    subUser: null,
    masaAktif: "Masa Aktif 30 Hari",
    isRecommended: false,
    isBestValue: false,
  },
  {
    title: "Pro",
    description:
      "Paket hemat dengan bonus kredit dan akses ke semua fitur dengan kredit melimpah.",
    muatkoinAmount: "350",
    price: "Rp250.000",
    discountPrice: "Rp300.000",
    bonus: "+20 Free",
    subUser: "Termasuk 1 Sub User",
    masaAktif: "Masa Aktif 30 Hari",
    isRecommended: true,
    isBestValue: false, // Wait, Pro is recommended
  },
  {
    title: "Premium",
    description:
      "Paket ideal untuk kebutuhan dasar dan mencoba semua fitur dengan kredit terbatas.",
    muatkoinAmount: "Unlimited",
    price: "Rp2.000.000",
    discountPrice: null,
    bonus: null,
    subUser: "Termasuk 3 Sub User",
    masaAktif: "Masa Aktif 30 Hari",
    isRecommended: false,
    isBestValue: false, // "Unlimited" usually is best value but visual says "Unlimited" big.
  },
];

const testimonialData = [
  {
    name: "Maulana Junior",
    role: "Operational Manager",
    company: "Transport Market",
    date: "28 Sep 2024 13:30 WIB",
    text: "Sejak memakai Transport Market, kami jauh lebih mudah mencari harga truk yang kompetitif tanpa harus telepon sana-sini. Data pricelist dan promo yang lengkap menghemat waktu tim operasional kami. Prosesnya lebih cepat, dan kami bisa langsung kontak transporter tanpa perantara.",
    rating: 5,
  },
  {
    name: "Maulana Junior",
    role: "Operational Manager",
    company: "Transport Market",
    date: "28 Sep 2024 13:30 WIB",
    text: "Sejak memakai Transport Market, kami jauh lebih mudah mencari harga truk yang kompetitif tanpa harus telepon sana-sini. Data pricelist dan promo yang lengkap menghemat waktu tim operasional kami. Prosesnya lebih cepat, dan kami bisa langsung kontak transporter tanpa perantara.",
    rating: 5,
  },
];

const faqData = [
  {
    question: "Apa itu Kredit di Transport Market?",
    answer: "Jawaban untuk pertanyaan ini...",
  },
  {
    question: "Untuk apa saja Kredit Transport Market dapat digunakan?",
    answer: "Jawaban untuk pertanyaan ini...",
  },
  {
    question: "Bagaimana cara membeli Kredit Transport Market?",
    answer: "Jawaban untuk pertanyaan ini...",
  },
  {
    question:
      "Apakah Kredit Transport Market memiliki masa berlaku dan apakah sisa kredit bisa hangus?",
    answer: "Jawaban untuk pertanyaan ini...",
  },
  {
    question:
      "Bagaimana cara mengecek sisa Kredit Transport Market yang saya miliki?",
    answer: "Jawaban untuk pertanyaan ini...",
  },
];

const BuyPage = () => {
  return (
    <div className="font-primary flex w-full flex-col bg-white p-8">
      <PageTitle withBack={true} href="/subscription">
        Beli muatkoin
      </PageTitle>

      {/* Hero Section */}
      <div className="my-6 px-6 text-center">
        <h1 className="text-[32px] font-bold text-neutral-900 md:text-4xl">
          Berlangganan Transport Market
        </h1>
        <p className="mx-auto mt-4 max-w-3xl">
          Nikmati berbagai fitur exclusive di Transport Market dengan membeli
          muatkoin anda. Segala informasi dan kemudahan sudah didepan mata.
        </p>
      </div>

      {/* Pricing Section */}
      <div className="mx-auto mb-16 grid max-w-[807px] grid-cols-3 gap-6">
        {pricingData.map((plan, index) => (
          <PricingCard key={index} {...plan} />
        ))}
      </div>

      {/* Testimonial Section */}
      <div className="mb-16 bg-white">
        <h2 className="mb-8 text-center text-2xl font-bold text-neutral-900">
          Testimonial
        </h2>

        <div className="mx-auto max-w-6xl">
          <Slider.Root
            items={useMemo(() => {
              const chunkSize = 2;
              const chunks = [];
              for (let i = 0; i < testimonialData.length; i += chunkSize) {
                chunks.push(testimonialData.slice(i, i + chunkSize));
              }
              return chunks;
            }, [])}
            className="relative"
          >
            <div className="px-[68px]">
              <Slider.Content>
                {(items) => (
                  <div className="mx-auto grid max-w-[808px] grid-cols-1 gap-6 md:grid-cols-2">
                    {items.map((item, index) => (
                      <div key={index} className="flex justify-center">
                        <TestimonialCard {...item} />
                      </div>
                    ))}
                    {/* Handle odd number of items if needed: empty div or styling? 
                        If only 1 item in chunk, grid-cols-2 will show it on left. 
                        Design implies even distribution or centered. 
                        For now, left aligned is fine for carousel.
                    */}
                  </div>
                )}
              </Slider.Content>
            </div>

            <Slider.DesktopNavigation
              className="-mt-3 !w-full !max-w-none !justify-between !px-0"
              prevButtonClassName="bg-white rounded-full p-2 shadow-md h-12 w-12 flex items-center justify-center border border-neutral-100 hover:bg-neutral-50"
              nextButtonClassName="bg-white rounded-full p-2 shadow-md h-12 w-12 flex items-center justify-center border border-neutral-100 hover:bg-neutral-50"
            />

            <div className="mt-8 flex justify-center">
              <Slider.Indicator />
            </div>
          </Slider.Root>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mx-auto mb-20 w-full max-w-[808px] px-6">
        <h2 className="mb-8 text-center text-[32px] font-bold text-neutral-900">
          Paling Sering Ditanyakan
        </h2>
        <div className="flex flex-col rounded-[12px] border border-neutral-200 bg-white p-6 shadow-[0px_4px_16px_rgba(0,0,0,0.04)]">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="w-full border-b border-neutral-200 last:border-0"
            >
              <Collapsible className="w-full">
                <CollapsibleTrigger className="flex !h-auto w-full items-center justify-between !rounded-none !border-none !bg-transparent !p-0 !py-4 text-left !text-base !font-semibold !text-neutral-900 hover:!bg-transparent">
                  <span>{item.question}</span>
                  <ChevronDown
                    strokeWidth={1.5}
                    className="h-5 w-5 text-neutral-400 transition-transform duration-200 group-data-[state=open]:rotate-180"
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="pb-4 pt-2 text-sm text-neutral-600">
                  {item.answer}
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyPage;
