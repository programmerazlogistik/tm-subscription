"use client";

import { useRouter } from "next/navigation";

import IconComponent from "@/components/IconComponent/IconComponent";

import { cn } from "@/lib/utils";

const PageTitle = ({
  className,
  href = null,
  children,
  withBack = true,
  onClick = null,
  onBackClick = null,
}) => {
  const router = useRouter();

  const handleBackClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 text-xl font-bold text-primary-700",
        className
      )}
    >
      {withBack && (
        <button onClick={onBackClick || handleBackClick}>
          <IconComponent
            src="/svg/icon-back-bo.svg"
            size={24}
            className="size-6"
          />
        </button>
      )}
      <h1>{children}</h1>
    </div>
  );
};

export default PageTitle;
