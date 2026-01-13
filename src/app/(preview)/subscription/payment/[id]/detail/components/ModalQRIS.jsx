"use client";

import Button from "@/components/Button/Button";
import { Modal, ModalContent, ModalTrigger } from "@/components/Modal/Modal";

import { IconComponent } from "@/components";

export const ModalQRIS = ({ children, totalPrice, qrData }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price || 0);
  };

  const handleDownload = () => {
    if (!qrData?.qrImage) return;
    const link = document.createElement("a");
    if (qrData?.qrUrl) {
      link.href = qrData.qrUrl;
      link.download = "QRIS-muatmuat.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }
    link.href = `data:image/png;base64,${qrData.qrImage}`;
    link.download = "QRIS-muatmuat.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Modal>
      <ModalTrigger>{children}</ModalTrigger>
      <ModalContent
        className="w-[328px] overflow-hidden md:w-[400px]"
        appearance={{}}
        type=""
        withCloseButton={true}
      >
        {/* Custom Blue Header */}
        <div className="relative flex h-[70px] w-full items-center justify-center overflow-hidden bg-[#176CF7]">
          {/* Decorative shapes (simulated) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            {/* You can add SVG patterns here if available */}
            <IconComponent
              src="/icons/meteor-right.svg"
              alt="meteor"
              width={97}
              height={97}
              className="object-cover object-center"
            />
          </div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            {/* You can add SVG patterns here if available */}
            <IconComponent
              src="/icons/meteor-left.svg"
              alt="meteor"
              width={97}
              height={97}
              className="object-cover object-center"
            />
          </div>

          <div className="z-10 rounded-full border-4 border-[#176CF7] bg-[#FFD920] p-1">
            <IconComponent
              src="/icons/muat-kuning.svg"
              alt="muatmuat"
              width={44}
              height={44}
              className="object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 p-6">
          <h2 className="text-base font-bold text-neutral-900">
            Pembayaran QRIS
          </h2>

          <div className="rounded-lg border border-neutral-100 bg-white p-2">
            {qrData?.qrImage ? (
              <img
                src={`data:image/png;base64,${qrData.qrImage}`}
                alt="QRIS Code"
                width={200}
                height={200}
                className="object-contain"
              />
            ) : (
              <div className="flex h-[200px] w-[200px] items-center justify-center bg-neutral-100">
                <span className="text-xs text-neutral-400">
                  QR Code tidak tersedia
                </span>
              </div>
            )}
          </div>

          <p className="text-center text-sm font-medium text-neutral-900">
            *Pindai kode QR untuk melakukan pembayaran
          </p>

          <div className="w-full rounded-lg border border-neutral-300 p-3">
            <span className="text-[10px] font-medium text-neutral-600">
              Total Pesanan
            </span>
            <div className="text-base font-bold text-neutral-900">
              {formatPrice(totalPrice)}
            </div>
          </div>

          <Button
            variant="muatparts-primary"
            className="!h-[32px] w-[175px]"
            iconLeft="/icons/unduh.svg"
            appearance={{
              iconClassName: "w-[16px] h-[16px]",
            }}
            onClick={handleDownload}
            disabled={!qrData?.qrImage}
          >
            <span className="text-sm">Unduh QR Code</span>
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};
