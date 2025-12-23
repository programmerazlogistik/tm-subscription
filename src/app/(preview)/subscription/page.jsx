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
import SaldoMuatkoin from "./components/SaldoMuatkoin";

const Page = () => {
  return (
    <div className="font-primary flex w-full flex-col gap-6 p-8 text-neutral-900">
      <PageTitle withBack={false}>Subscription</PageTitle>

      <div className="flex flex-col gap-6 rounded-xl bg-white p-6 drop-shadow-muat">
        <div className="flex gap-6">
          {/* Left Card: Saldo muatkoin */}
          <SaldoMuatkoin />

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
          </TabsList>

          <TabsContent
            value="usage"
            className="flex h-[300px] items-center justify-center"
          >
            <DataEmpty
              title="Belum Ada Riwayat Penggunaan muatkoin"
              titleClassname="text-sm font-semibold text-neutral-500 mt-4"
            />
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
