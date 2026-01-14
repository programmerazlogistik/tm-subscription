"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { useTokenActions, useUserActions } from "@muatmuat/lib/auth-adapter";

import PageTitle from "@/components/PageTitle/PageTitle";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTriggerWithSeparator,
} from "@/components/Tabs/Tabs";

import PaketMenungguPembayaran from "./components/PaketMenungguPembayaran";
import PaketMuatkoinAktif from "./components/PaketMuatkoinAktif";
import RiwayatPembelianMuatkoin from "./components/RiwayatPembelianMuatkoin";
import RiwayatPenggunaanMuatkoin from "./components/RiwayatPenggunaanMuatkoin";
import SaldoMuatkoin from "./components/SaldoMuatkoin";

const Page = () => {
  const searchParams = useSearchParams();
  const { setToken } = useTokenActions();
  const { setUser } = useUserActions();

  // Save accessToken and role from query params on every load
  useEffect(() => {
    const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN
      ? process.env.NEXT_PUBLIC_ACCESS_TOKEN
      : searchParams.get("accessToken");
    if (accessToken) {
      setToken({ accessToken, refreshToken: "" });
    }

    // Get and store role in dataUser: "2" = shipper, "4" = transporter
    const roleMap = { shipper: "2", transporter: "4" };
    const envRole = process.env.NEXT_PUBLIC_ROLE;
    const role = envRole
      ? roleMap[envRole] || envRole
      : searchParams.get("role") || "2"; // Default to shipper
    setUser({ role });
  }, [searchParams, setToken, setUser]);

  return (
    <div className="font-primary flex w-full flex-col gap-6 p-8 text-neutral-900">
      <PageTitle withBack={false}>Subscription</PageTitle>

      <div className="flex flex-col gap-6 rounded-xl bg-white p-6 drop-shadow-muat">
        <div className="flex gap-6">
          <SaldoMuatkoin />

          <div className="flex-1">
            <PaketMuatkoinAktif />
          </div>
        </div>

        <PaketMenungguPembayaran />
      </div>

      <div className="">
        <Tabs defaultValue="usage">
          <TabsList className="justify-start gap-8">
            <TabsTriggerWithSeparator
              value="usage"
              className="px-0 pb-3 text-lg text-neutral-500 data-[state=active]:border-b-4 data-[state=active]:border-[#1B69F7] data-[state=active]:text-[#1B69F7]"
              showSeparator={false}
              activeColor="blue-600"
            >
              Riwayat Penggunaan
            </TabsTriggerWithSeparator>
            <TabsTriggerWithSeparator
              value="purchase"
              className="px-0 pb-3 text-lg text-neutral-500 data-[state=active]:border-b-4 data-[state=active]:border-[#1B69F7] data-[state=active]:text-[#1B69F7]"
              showSeparator={false}
              activeColor="blue-600"
            >
              Riwayat Pembelian
            </TabsTriggerWithSeparator>
          </TabsList>

          <TabsContent
            value="usage"
            className="flex min-h-[300px] flex-col pt-6"
          >
            <RiwayatPenggunaanMuatkoin />
          </TabsContent>

          <TabsContent
            value="purchase"
            className="flex min-h-[300px] flex-col pt-6"
          >
            <RiwayatPembelianMuatkoin />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
