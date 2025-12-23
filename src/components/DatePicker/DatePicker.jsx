import { useEffect, useRef, useState } from "react";

import { format } from "date-fns";
import { id } from "date-fns/locale/id";
import DatePickerLib, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

import { IconComponent } from "../IconComponent";

const ensureDate = (dateValue) => {
  if (!dateValue) return null;
  if (dateValue instanceof Date && !isNaN(dateValue)) {
    return dateValue;
  }
  try {
    const newDate = new Date(dateValue);
    if (!isNaN(newDate.getTime())) {
      return newDate;
    }
  } catch {
    console.error("Invalid date:", dateValue);
  }
  return null;
};

const DatePicker = ({
  value = null,
  onChange = () => {},
  minDate,
  maxDate,
  placeholder = "Tanggal",
  className = "",
  disabled = false,
  errorMessage = null,
  showErrorMessage = true,
  iconPosition = "left",
}) => {
  const initialDate = ensureDate(value);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({});
  const pickerRef = useRef(null);
  const inputRef = useRef(null);
  const portalRef = useRef(null);
  // Compute effective minimum date to disable past dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const effectiveMinDate = minDate ? ensureDate(minDate) : today;

  registerLocale("id", id);

  useEffect(() => {
    const dateObj = ensureDate(value);
    setSelectedDate(dateObj);
  }, [value]);

  const hasError = () => {
    return Boolean(errorMessage);
  };

  useEffect(() => {
    const dateObj = ensureDate(value);
    setSelectedDate(dateObj);
  }, [value]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedInsideInput =
        pickerRef.current && pickerRef.current.contains(event.target);
      const clickedInsidePortal =
        portalRef.current && portalRef.current.contains(event.target);

      if (!clickedInsideInput && !clickedInsidePortal) {
        setIsPickerOpen(false);
      }
    };

    const handleScroll = () => {
      if (isPickerOpen && inputRef.current) {
        const inputRect = inputRef.current.getBoundingClientRect();
        const dropdownHeight = 320;
        const dropdownWidth = 280;

        const position = {
          position: "fixed",
          zIndex: 9999,
          left: inputRect.left,
          top: inputRect.bottom + 8,
        };

        if (inputRect.left + dropdownWidth > window.innerWidth) {
          position.left = inputRect.right - dropdownWidth;
        }

        if (inputRect.bottom + dropdownHeight + 8 > window.innerHeight) {
          position.top = inputRect.top - dropdownHeight - 8;
        }

        if (position.left < 16) {
          position.left = 16;
        }

        if (position.top < 16) {
          position.top = 16;
        }

        setDropdownPosition(position);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("scroll", handleScroll, true); // Use capture phase
    window.addEventListener("resize", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isPickerOpen]);

  useEffect(() => {
    if (isPickerOpen && inputRef.current) {
      const inputRect = inputRef.current.getBoundingClientRect();
      const dropdownHeight = 320;
      const dropdownWidth = 280;

      const position = {
        position: "fixed",
        zIndex: 9999,
        left: inputRect.left,
        top: inputRect.bottom + 8,
      };
      if (inputRect.left + dropdownWidth > window.innerWidth) {
        position.left = inputRect.right - dropdownWidth;
      }
      if (inputRect.bottom + dropdownHeight + 8 > window.innerHeight) {
        position.top = inputRect.top - dropdownHeight - 8;
      }
      if (position.left < 16) {
        position.left = 16;
      }
      if (position.top < 16) {
        position.top = 16;
      }

      setDropdownPosition(position);
    }
  }, [isPickerOpen]);
  const CustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => (
    <div className="flex items-center justify-between px-2 py-2">
      <button
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        className="rounded-full p-1 hover:bg-gray-100 disabled:opacity-50"
        type="button"
      >
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div className="text-base font-medium">
        {format(date, "MMMM yyyy", { locale: id })}
      </div>
      <button
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        className="rounded-full p-1 hover:bg-gray-100 disabled:opacity-50"
        type="button"
      >
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onChange(date);
    setIsPickerOpen(false);
  };

  return (
    <div className={cn("flex w-full flex-col gap-y-1", className)}>
      <div className="relative" ref={pickerRef}>
        <div
          ref={inputRef}
          onClick={() => !disabled && setIsPickerOpen(!isPickerOpen)}
          className={cn(
            "flex h-8 w-full items-center gap-x-2 rounded-md border border-neutral-600 px-3 transition-colors",
            hasError() ? "border-error-400" : "hover:border-primary-700",
            disabled
              ? "cursor-not-allowed bg-neutral-200 !text-neutral-500 hover:border-neutral-600"
              : "cursor-pointer"
          )}
        >
          {iconPosition === "left" && (
            <IconComponent
              src="/icons/calendar-input.svg"
              width={16}
              height={16}
            />
          )}
          <span
            className={`flex-1 text-xs font-medium leading-[14.4px] ${
              selectedDate
                ? !disabled
                  ? "text-neutral-900"
                  : "text-neutral-500"
                : "text-neutral-600"
            }`}
          >
            {selectedDate ? format(selectedDate, "dd MMM yyyy") : placeholder}
          </span>
          {iconPosition === "right" && (
            <IconComponent
              src="/icons/calendar-input.svg"
              width={16}
              height={16}
            />
          )}
        </div>
      </div>
      {hasError() && showErrorMessage && typeof errorMessage === "string" && (
        <span className="text-xs font-medium text-error-400">
          {errorMessage}
        </span>
      )}
      {isPickerOpen &&
        createPortal(
          <div
            ref={portalRef}
            className="w-fit max-w-[calc(100dvw-32px)] rounded-lg border border-[#E5E7F0] bg-white shadow-lg"
            style={dropdownPosition}
          >
            <div className="flex max-w-[100%] overflow-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <DatePickerLib
                selected={selectedDate}
                onChange={handleDateChange}
                inline
                dateFormat="dd MMM yyyy"
                minDate={effectiveMinDate}
                maxDate={ensureDate(maxDate)}
                renderCustomHeader={CustomHeader}
                calendarClassName="!border-0"
                dayClassName={() =>
                  "rounded-lg text-center !w-[40px] !h-8 !leading-8"
                }
                weekDayClassName={() =>
                  "text-center !w-[40px] !h-8 !leading-8 font-medium"
                }
                monthClassName={() => "!mt-0"}
                renderDayContents={(day) => (
                  <div className="pickerDayContent rounded">{day}</div>
                )}
                locale="id"
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default DatePicker;
