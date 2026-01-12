"use client";

import { cn } from "@/lib/utils";

/**
 * Custom checkbox component using SVG icons
 * @param {object} props
 * @param {boolean} props.checked - Whether the checkbox is checked
 * @param {function} props.onCheckedChange - Callback when checkbox state changes
 * @param {string} [props.label] - Optional label text
 * @param {string} [props.className] - Additional classes
 * @param {boolean} [props.disabled] - Whether the checkbox is disabled
 */
const CheckboxCustom = ({
  checked = false,
  onCheckedChange,
  label,
  className,
  disabled = false,
}) => {
  const handleClick = () => {
    if (!disabled && onCheckedChange) {
      onCheckedChange(!checked);
    }
  };

  return (
    <div
      className={cn(
        "flex cursor-pointer items-center gap-2",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      onClick={handleClick}
    >
      {checked ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <rect
            x="1"
            y="1"
            width="14"
            height="14"
            rx="3"
            fill="#176CF7"
            stroke="#176CF7"
            strokeWidth="2"
          />
          <path
            d="M11.8701 4.87002C12.0523 4.68778 12.3478 4.68778 12.53 4.87002C12.7123 5.05227 12.7123 5.34774 12.53 5.52999L6.93003 11.13C6.74779 11.3122 6.45231 11.3122 6.27007 11.13L3.93673 8.79665C3.75449 8.61441 3.75449 8.31893 3.93673 8.13669C4.11898 7.95444 4.41445 7.95444 4.5967 8.13669L6.60005 10.14L11.8701 4.87002Z"
            fill="#176CF7"
          />
          <mask
            id="mask0_checkbox"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="3"
            y="4"
            width="10"
            height="8"
          >
            <path
              d="M11.8701 4.87002C12.0523 4.68778 12.3478 4.68778 12.53 4.87002C12.7123 5.05227 12.7123 5.34774 12.53 5.52999L6.93003 11.13C6.74779 11.3122 6.45231 11.3122 6.27007 11.13L3.93673 8.79665C3.75449 8.61441 3.75449 8.31893 3.93673 8.13669C4.11898 7.95444 4.41445 7.95444 4.5967 8.13669L6.60005 10.14L11.8701 4.87002Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask0_checkbox)">
            <rect x="1" y="1" width="14" height="14" fill="white" />
          </g>
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <rect
            x="0.5"
            y="0.5"
            width="15"
            height="15"
            rx="3.5"
            fill="white"
            stroke="#868686"
          />
        </svg>
      )}
      {label && (
        <span className="select-none text-sm font-medium text-neutral-900">
          {label}
        </span>
      )}
    </div>
  );
};

export default CheckboxCustom;
