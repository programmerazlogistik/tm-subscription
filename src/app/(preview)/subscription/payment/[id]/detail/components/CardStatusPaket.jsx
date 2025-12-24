import { ImageComponent } from "@muatmuat/ui/ImageComponent";

const CardStatusPaket = ({ status = "active" }) => {
  const statusConfig = {
    active: {
      icon: "/svg/detail-paket/aktif.svg",
      title: "Aktif",
      desc: "Paket aktif! Semua layanan dan fitur sudah tersedia untuk Kamu.",
      titleColor: "text-neutral-900",
    },
    waiting: {
      icon: "/svg/detail-paket/menunggu.svg",
      title: "Menunggu Pembayaran",
      desc: "Selesaikan pembayaran segera, jika melewati batas waktu maka transaksi otomatis dibatalkan.",
      titleColor: "text-neutral-900",
    },
    expired: {
      icon: "/svg/detail-paket/kadaluwarsa.svg",
      title: "Kedaluwarsa",
      desc: "Paket ini sudah tidak aktif lagi.",
      titleColor: "text-neutral-900",
    },
    cancelled: {
      icon: "/svg/detail-paket/dibatalkan.svg",
      title: "Dibatalkan",
      desc: "Pembelian paket langganan ini telah dibatalkan.",
      titleColor: "text-neutral-900",
    },
  };

  const config = statusConfig[status] || statusConfig.active;

  return (
    <div className="flex items-center gap-4 rounded-xl bg-white p-6 shadow-muat">
      <div className="flex-shrink-0">
        <ImageComponent
          src={config.icon}
          alt={config.title}
          width={48}
          height={48}
          className="h-12 w-12"
        />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className={`text-lg font-semibold ${config.titleColor}`}>
          {config.title}
        </h3>
        <p className="font-medium text-neutral-900">{config.desc}</p>
      </div>
    </div>
  );
};

export default CardStatusPaket;
