import Image from "next/image";

import { cn } from "@/lib/utils";

const DataEmpty = ({
  title = "Add Your Title",
  subtitle = "",
  src = "/svg/data-empty.svg",
  className,
  titleClassname,
  subtitleClassname,
  imageClassname,
  childrenClassname,
  children,
}) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center bg-white",
        className
      )}
    >
      <Image
        src={src}
        width={95}
        height={95}
        alt="Empty cart"
        className={cn(imageClassname)}
      />
      <div
        className={cn("mt-2.5 font-semibold text-neutral-600", titleClassname)}
      >
        {title}
      </div>
      {subtitle && (
        <div
          className={cn(
            "mb-3 max-w-[322px] text-center text-xs font-medium text-neutral-600",
            subtitleClassname
          )}
        >
          {subtitle}
        </div>
      )}
      <div className={cn("flex items-center gap-3", childrenClassname)}>
        {children}
      </div>
    </div>
  );
};

export default DataEmpty;
