import { forwardRef } from "react";

import { X } from "lucide-react";

import { useTranslation } from "@/hooks/use-translation";

import { cn } from "@/lib/utils";

import IconComponent from "../IconComponent/IconComponent";

/**
 * Configuration for input icons.
 * @typedef {Object} InputIcon
 * @property {React.ReactNode|string} [left] - Left icon element or icon source string
 * @property {React.ReactNode|string} [right] - Right icon element or icon source string
 */

/**
 * Configuration for input text elements.
 * @typedef {Object} InputText
 * @property {React.ReactNode} [left] - Text to display on the left side
 * @property {React.ReactNode} [right] - Text to display on the right side
 */

/**
 * Configuration for input appearance customization.
 * @typedef {Object} InputAppearance
 * @property {string} [containerClassName] - Additional classes for the container element
 * @property {string} [inputClassName] - Additional classes for the input element
 * @property {string} [errorMessageClassName] - Additional classes for the error message
 * @property {string} [supportiveTextClassName] - Additional classes for the supportive text
 * @property {string} [iconClassName] - Additional classes for the icons
 */

/**
 * Props for the Input component.
 * @typedef {import('react').ComponentPropsWithoutRef<'input'> & {
 * name?: string;
 * type?: "text"|"password"|"email"|"number"|"tel"|"url";
 * placeholder?: string;
 * disabled?: boolean;
 * icon?: InputIcon;
 * text?: InputText;
 * errorMessage?: string;
 * className?: string;
 * appearance?: InputAppearance;
 * hideErrorMessage?: boolean;
 * supportiveText?: string;
 * positiveOnly?: boolean;
 * withReset?: boolean;
 * }} InputProps
 */

/**
 * Input component with left/right icon, left/right text, and error message support.
 * Uses Tailwind CSS for styling and cn for class composition.
 * @param {InputProps} props - The component props.
 * @param {React.ForwardedRef<HTMLInputElement>} ref - The forwarded ref to the input element.
 * @returns {React.ReactElement}
 */
const InputComponent = (
  {
    name,
    type = "text",
    placeholder = "Placeholder",
    disabled = false,
    icon = { left: null, right: null },
    text = { left: null, right: null },
    className,
    maxLength,
    appearance = {
      containerClassName: "",
      inputClassName: "",
      errorMessageClassName: "",
      supportiveTextClassName: "",
      iconClassName: "",
    },
    errorMessage,
    hideErrorMessage = false,

    supportiveText,
    onChange,
    positiveOnly = false,
    withReset = false,
    ...props
  },
  ref
) => {
  const { t } = useTranslation();

  return (
    <div className={cn("flex w-full flex-col gap-y-2", className)}>
      <div
        className={cn(
          "flex h-8 w-full items-center rounded-md border border-neutral-600 bg-neutral-50 px-3 transition-colors",
          "focus-within:border-primary-700 hover:border-primary-700",
          errorMessage && "border-error-400",
          appearance.containerClassName,
          disabled
            ? "cursor-not-allowed border-neutral-600 bg-neutral-200 hover:border-neutral-600"
            : "cursor-pointer"
        )}
      >
        {icon.left && (
          <div className="mr-2 flex items-center">
            {typeof icon.left === "string" ? (
              <IconComponent
                loader={false}
                src={{ src: icon.left }}
                height={16}
                width={16}
                className={cn(
                  "text-neutral-700",
                  appearance.iconClassName,
                  errorMessage && "text-error-400"
                )}
              />
            ) : (
              icon.left
            )}
          </div>
        )}
        {text.left && (
          <span className="mr-3 text-sm font-semibold text-neutral-900 md:text-xs md:font-medium">
            {text.left}
          </span>
        )}
        <input
          maxLength={maxLength}
          {...props}
          onChange={onChange}
          type={type}
          ref={ref}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "w-full min-w-0 cursor-pointer border-none border-transparent bg-transparent text-sm font-semibold text-neutral-900 outline-none placeholder:text-neutral-600 md:text-xs md:font-medium",
            disabled && "cursor-not-allowed text-neutral-500",
            appearance.inputClassName
          )}
        />
        {withReset && (props.value || ref?.current?.value) ? (
          <div className="ml-2 flex items-center">
            <X
              onClick={() => {
                if (onChange) {
                  // Create a synthetic event object that mimics the input change event
                  const syntheticEvent = {
                    target: {
                      value: "",
                      name: name,
                    },
                    currentTarget: {
                      value: "",
                      name: name,
                    },
                  };
                  onChange(syntheticEvent);
                }
                // Also clear the input directly if ref is available
                if (ref && ref.current) {
                  ref.current.value = "";
                }
              }}
              className="h-4 w-4 cursor-pointer text-neutral-700 hover:text-neutral-900"
            />
          </div>
        ) : icon.right ? (
          <div className="ml-2 flex items-center">
            {typeof icon.right === "string" ? (
              <IconComponent
                loader={false}
                src={{ src: icon.right }}
                height={16}
                width={16}
                className={cn(
                  "text-neutral-700",
                  appearance.iconClassName,
                  errorMessage && "text-error-400"
                )}
              />
            ) : (
              icon.right
            )}
          </div>
        ) : null}
        {text.right && (
          <span className="ml-3 text-sm font-semibold text-neutral-900 md:text-xs md:font-medium">
            {text.right}
          </span>
        )}
      </div>
      {errorMessage || supportiveText ? (
        <div className="flex w-full items-center">
          <span
            className={cn(
              "text-xs font-medium text-error-400",
              appearance.errorMessageClassName
            )}
          >
            {t(errorMessage)}
          </span>

          {supportiveText && (
            <span
              className={cn(
                "ml-auto text-xs font-medium text-neutral-900",
                appearance.supportiveTextClassName
              )}
            >
              {supportiveText}
            </span>
          )}
        </div>
      ) : null}
    </div>
  );
};

// Wrap with forwardRef and set displayName
const Input = forwardRef(InputComponent);
Input.displayName = "Input";

export default Input;
