import { ImageComponent } from "@muatmuat/ui/ImageComponent";

const PaketYangDipilih = ({ current }) => {
  return (
    <div className="flex flex-col gap-4 rounded-xl px-8 py-5 shadow-muat">
      <h2 className="text-sm font-semibold text-black">Paket yang Dipilih</h2>
      <div className="flex flex-col rounded-xl border border-primary-500 bg-white p-4">
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-bold text-black">{current.title}</h2>
          {current.recommended && (
            <div className="flex h-6 items-center gap-1.5 rounded-md bg-[#E5F0FF] px-2 text-xs font-semibold text-[#176CF7]">
              <ImageComponent
                src="/svg/recommended.svg"
                alt="Recommended"
                width={12}
                height={14}
                className="h-[14px] w-[12px]"
              />
              Direkomendasikan
            </div>
          )}
        </div>

        <p className="mt-3 text-sm font-medium text-[#555555]">
          {current.desc}
        </p>

        <div className="mt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-[32px] font-bold text-[#1B1B1B]">
              {current.main}
            </span>
            <span className="text-xl font-semibold text-[#1B1B1B]">
              {current.unit}
            </span>
            {current.badge && (
              <div className="flex items-center rounded-md bg-[#E8F8F2] px-2 py-0.5 text-xs font-bold text-[#00A862]">
                {current.badge}
              </div>
            )}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[18px] font-bold text-[#1B1B1B]">
              {current.price}
            </span>
            {current.strikethrough && (
              <span className="text-sm text-[#868686] line-through">
                {current.strikethrough}
              </span>
            )}
          </div>
        </div>

        {current.gift && (
          <div className="mt-2 flex items-center gap-2">
            <ImageComponent
              src="/svg/gift.svg"
              alt="Gift"
              width={18}
              height={18}
              className="h-[18px] w-[18px]"
            />
            <span className="text-sm font-semibold text-[#FF7A00]">
              {current.gift}
            </span>
          </div>
        )}

        <div className="mt-4 w-full rounded-lg bg-[#D1E2FD] py-2 text-center text-xs font-semibold text-[#176CF7]">
          {current.period}
        </div>
      </div>
    </div>
  );
};

export default PaketYangDipilih;
