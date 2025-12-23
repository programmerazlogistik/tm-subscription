// components/Radio/RadioButton.jsx
import { useRef } from "react";

import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

import style from "./RadioButton.module.scss";

const RadioButton = ({
  onClick = () => {},
  name,
  label,
  checked,
  onChange,
  value,
  disabled,
  children,
  className,
  classNameRound,
  classNameLabel,
  ...props
}) => {
  const radioRef = useRef(null);

  const handleClick = () => {
    if (disabled) {
      return;
    }
    onChange?.({ target: { value, name } });
    radioRef.current?.focus();
  };

  return (
    <label
      className={cn(
        style.container_radio,
        "flex items-center gap-[8px]",
        className
      )}
      data-disabled={disabled}
    >
      <input
        type="radio"
        ref={radioRef}
        checked={checked}
        name={name}
        onChange={onChange}
        value={value}
        disabled={disabled}
        className={style.hidden_input}
        {...props}
      />
      <span className={cn(style.radio_visual, classNameRound)}></span>

      {children ? (
        children
      ) : (
        <span
          className={cn(
            style.label,
            "select-none text-sm font-semibold leading-[15.4px] text-neutral-900 md:text-xs md:font-medium md:leading-[14.4px]",
            classNameLabel
          )}
        >
          {label}
        </span>
      )}
    </label>
  );
};

export default RadioButton;

RadioButton.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};
