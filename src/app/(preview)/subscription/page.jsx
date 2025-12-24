import DataEmpty from "@/components/DataEmpty/DataEmpty";
import PageTitle from "@/components/PageTitle/PageTitle";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTriggerWithSeparator,
} from "@/components/Tabs/Tabs";

import PaketMenungguPembayaran from "./components/PaketMenungguPembayaran";
import PaketMuatkoinAktif from "./components/PaketMuatkoinAktif";
import RiwayatPenggunaanMuatkoin from "./components/RiwayatPenggunaanMuatkoin";
import SaldoMuatkoin from "./components/SaldoMuatkoin";

const Page = () => {
  return (
    <div className="font-primary flex w-full flex-col gap-6 p-8 text-neutral-900">
      <PageTitle withBack={false}>Subscription</PageTitle>

      <div className="flex flex-col gap-6 rounded-xl bg-white p-6 drop-shadow-muat">
        <div className="flex gap-6">
          {/* Left Card: Saldo muatkoin */}
          <SaldoMuatkoin balance={80} maxBalance={125} isUnlimited={false} />

          {/* Right Card: Paket muatkoin Aktif */}
          <div className="flex-1">
            <PaketMuatkoinAktif />
          </div>
        </div>

        {/* Bottom Card: Paket Menunggu Pembayaran */}
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

            <div className="relative ml-auto">
              <select className="h-[36px] min-w-[150px] appearance-none rounded-md border border-neutral-400 bg-white pl-3 pr-8 text-sm font-semibold text-neutral-800 outline-none hover:bg-neutral-50 focus:border-blue-500">
                <option>Semua Periode</option>
                <option>7 Hari Terakhir</option>
                <option>30 Hari Terakhir</option>
              </select>
              <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-neutral-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </TabsList>

          <TabsContent
            value="usage"
            className="flex min-h-[300px] flex-col pt-6"
          >
            <RiwayatPenggunaanMuatkoin />
          </TabsContent>

          <TabsContent
            value="purchase"
            className="flex h-[300px] items-center justify-center"
          >
            <DataEmpty
              title="Belum Ada Riwayat Pembelian muatkoin"
              titleClassname="text-sm font-semibold text-neutral-500 mt-4"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
