import { useCallback } from "react";

import { NumericFormat } from "react-number-format";

import { cn } from "@/lib/utils";

/**
 * @typedef {Object} ManualInputProps
 * @property {string | number} [value] - Value of the input
 * @property {(value: string | number) => void} [setValue] - Set value of the input
 */

/**
 * DimensionInput component for handling 3D measurements (panjang x lebar x tinggi)
 * Designed to work with react-hook-form Controller
 *
 * @param {Object} props
 * @param {{panjang: ManualInputProps, lebar: ManualInputProps, tinggi: ManualInputProps}} props.manual - Manual input props for panjang, lebar, and tinggi
 * @param {string} [props.className] - Additional class for the container
 * @param {Object} [props.appearance] - Custom appearance options
 * @param {string} [props.appearance.containerClassName] - Additional classes for the input container
 * @param {string} [props.appearance.inputClassName] - Additional classes for the input fields
 */
export const DimensionInput = ({
  manual,
  className,
  appearance = {
    inputClassName: "",
    dividerClassName: "",
  },
  disabled,
}) => {
  // Common input props
  const getInputProps = useCallback(
    ({ value, setValue }) => {
      return {
        allowNegative: false,
        decimalScale: 2,
        thousandSeparator: ".",
        decimalSeparator: ",",
        className: cn(
          "w-full min-w-0 text-center text-xs font-medium placeholder:text-neutral-600 focus:outline-none",
          disabled ? "cursor-not-allowed" : "cursor-pointer",
          appearance.inputClassName
        ),
        value: value || "",
        onValueChange: (values) => {
          const val = values.floatValue;
          setValue(val === undefined ? "" : val);
        },
        isAllowed: (values) => {
          const { formattedValue, floatValue } = values;
          // Allow empty values
          if (!formattedValue || floatValue === undefined) return true;
          // Convert to string and remove decimal separator to count digits
          const valueStr = floatValue.toString().replace(".", "");
          // Limit to 6 digits maximum
          return valueStr.length <= 6;
        },
      };
    },
    [appearance.inputClassName]
  );

  return (
    <div
      className={cn(
        "grid h-8 w-full grid-cols-[1fr,auto,1fr,auto,1fr] items-center gap-x-1 rounded-md border border-neutral-600 px-3",
        disabled
          ? "bg-neutral-200"
          : "bg-neutral-50 focus-within:border-primary-700 hover:border-primary-700",
        className
      )}
    >
      <NumericFormat
        {...getInputProps({
          value: manual?.panjang?.value,
          setValue: manual?.panjang?.setValue,
        })}
        placeholder="p"
        disabled={disabled}
      />
      <span
        className={cn("text-xs text-neutral-600", appearance.dividerClassName)}
      >
        x
      </span>
      <NumericFormat
        {...getInputProps({
          value: manual?.lebar?.value,
          setValue: manual?.lebar?.setValue,
        })}
        placeholder="l"
        disabled={disabled}
      />
      <span
        className={cn("text-xs text-neutral-600", appearance.dividerClassName)}
      >
        x
      </span>
      <NumericFormat
        {...getInputProps({
          value: manual?.tinggi?.value,
          setValue: manual?.tinggi?.setValue,
        })}
        placeholder="t"
        disabled={disabled}
      />
    </div>
  );
};

export default DimensionInput;
