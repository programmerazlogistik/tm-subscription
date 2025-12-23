import Image from "next/image";

const TestimonialCard = ({ name, role, company, text, date, rating = 5 }) => {
  return (
    <div
      className="drop-shadow-testimonial relative flex flex-col items-start rounded-lg p-4"
      style={{
        width: "392px",
        height: "229px",
        background:
          "linear-gradient(260.65deg, #F3F7FF 23.57%, #E7EDF6 51.38%, rgba(234, 242, 255, 0.64) 79.19%)",
        opacity: 1,
        transform: "none",
      }}
    >
      {/* Quote Icon - Watermark style */}
      <div className="absolute right-3 top-3 z-0">
        <Image
          src="/svg/quote-testimonials.svg"
          alt="quote"
          width={44.79}
          height={34.56}
        />
      </div>

      <div className="z-10 flex h-[197px] w-[360px] flex-col justify-center gap-6">
        {/* Rating Section */}
        <div className="flex h-6 w-[360px] items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(rating)].map((_, i) => (
              <div key={i} className="relative h-6 w-6">
                {/* Vector background shape if needed, using simple star for now */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    fill="#FEA010"
                    stroke="#FEA010"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            ))}
          </div>
          <span className="text-sm font-semibold leading-[120%] text-neutral-900">
            Sangat Baik
          </span>
        </div>

        {/* Content Section */}
        <div className="flex h-[149px] w-[360px] flex-col items-start gap-2">
          <div className="flex h-[27px] w-full flex-col gap-2">
            <div className="flex h-[11px] w-full items-center gap-3">
              <h4 className="text-base font-semibold leading-[120%] text-black">
                {name}
              </h4>
              <span className="text-xs font-medium leading-[120%] text-[#676767]">
                {date}
              </span>
            </div>
          </div>

          <p className="h-[106px] w-[360px] text-left text-base font-medium leading-[120%] text-neutral-900">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
