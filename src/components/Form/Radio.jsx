"use client";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Radio = forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      type="radio"
      className={cn(
        "h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Radio.displayName = "Radio";

export default Radio;
