"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { ChevronDown } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/Collapsible/Collapsible";
import PageTitle from "@/components/PageTitle/PageTitle";
import { Slider } from "@/components/Slider/Slider";

import { useGetAvailablePackages } from "@/hooks/Subscription/use-get-available-packages";
import { useGetFaq } from "@/hooks/Subscription/use-get-faq";
import { useGetTestimonials } from "@/hooks/Subscription/use-get-testimonials";

import { formatDateWIB } from "@/lib/format-date";

import PricingCard from "./components/PricingCard";
import TestimonialCard from "./components/TestimonialCard";

// Helper function to format price to IDR
const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const BuyPage = () => {
  const router = useRouter();
  const { data } = useGetAvailablePackages();
  const { data: testimonialResponse } = useGetTestimonials();
  const { data: faqResponse } = useGetFaq("57");

  // Transform FAQ API data
  const faqData = useMemo(() => {
    const faqs = faqResponse?.Data ?? [];
    return faqs.map((item) => ({
      question: item.title,
      answer: item.content,
      link: item.link,
      showMore: item.IsShowLihatSelengkapnya === 1,
    }));
  }, [faqResponse]);

  // Transform testimonial API data
  const testimonialData = useMemo(() => {
    const testimonials = testimonialResponse?.Data?.testimonials ?? [];
    return testimonials.map((item) => ({
      id: item.id,
      name: item.username,
      text: item.testimonial,
      date: formatDateWIB(item.createdAt),
      rating: item.rating,
    }));
  }, [testimonialResponse]);

  // Transform API data to PricingCard props
  const pricingData = useMemo(() => {
    const packages = data?.Data?.packages ?? [];
    return packages.map((pkg) => ({
      id: pkg.id,
      title: pkg.name,
      description: pkg.description,
      muatkoinAmount: pkg.isUnlimited ? "Unlimited" : String(pkg.muatkoin),
      price: formatPrice(pkg.price),
      discountPrice: pkg.originalPrice ? formatPrice(pkg.originalPrice) : null,
      bonus: pkg.bonusMuatkoin ? `+${pkg.bonusMuatkoin} Free` : null,
      subUser:
        pkg.subUsersIncluded > 0
          ? `Termasuk ${pkg.subUsersIncluded} Sub User`
          : null,
      masaAktif: pkg.periodLabel,
      isRecommended: pkg.isRecommended,
      isBestValue: pkg.isPopular,
      canPurchase: pkg.canPurchase,
    }));
  }, [data]);

  const handleBuy = (plan) => {
    // Navigate to payment page with plan id
    router.push(`/subscription/payment?packageId=${plan.id}`);
  };

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
      <div className="mb-16 bg-white">
        <div className="mx-auto max-w-6xl">
          <Slider.Root
            items={useMemo(() => {
              const chunkSize = 3;
              const chunks = [];
              for (let i = 0; i < pricingData.length; i += chunkSize) {
                chunks.push(pricingData.slice(i, i + chunkSize));
              }
              return chunks;
            }, [pricingData])}
            className="relative"
          >
            <div className="px-[68px]">
              <Slider.Content effect="slide">
                {(items) => (
                  <div className="mx-auto grid max-w-[807px] grid-cols-3 gap-6">
                    {items.map((plan) => (
                      <div key={plan.id} className="flex justify-center">
                        <PricingCard {...plan} onBuy={() => handleBuy(plan)} />
                      </div>
                    ))}
                  </div>
                )}
              </Slider.Content>
            </div>

            <Slider.DesktopNavigation
              className="-mt-3 !w-full !max-w-none !justify-between !px-0"
              prevButtonClassName="bg-white rounded-full p-2 shadow-md h-12 w-12 flex items-center justify-center border border-neutral-100 hover:bg-neutral-50"
              nextButtonClassName="bg-white rounded-full p-2 shadow-md h-12 w-12 flex items-center justify-center border border-neutral-100 hover:bg-neutral-50"
            />
          </Slider.Root>
        </div>
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
            }, [testimonialData])}
            className="relative"
          >
            <div className="px-[68px]">
              <Slider.Content effect="slide">
                {(items) => (
                  <div className="mx-auto grid max-w-[808px] grid-cols-1 gap-6 md:grid-cols-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-center">
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
                  <div dangerouslySetInnerHTML={{ __html: item.answer }} />
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
