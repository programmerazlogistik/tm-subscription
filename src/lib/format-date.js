/**
 * Format date to Indonesian locale with WIB timezone
 * This ensures consistent "WIB" display across all browsers
 * @param {string|Date} dateString - Date string or Date object
 * @param {object} options - Optional formatting options
 * @returns {string} Formatted date string
 */
export const formatDateWIB = (dateString, options = {}) => {
  if (!dateString) return "-";

  const { showTime = true, showSeconds = false, showDate = true } = options;

  const date = new Date(dateString);

  const formatOptions = {
    timeZone: "Asia/Jakarta",
    ...(showDate && {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    ...(showTime && {
      hour: "2-digit",
      minute: "2-digit",
      ...(showSeconds && { second: "2-digit" }),
    }),
  };

  const formatted = date.toLocaleString("id-ID", formatOptions);

  // Append WIB manually to ensure consistency across all browsers
  return showTime ? `${formatted} WIB` : formatted;
};

/**
 * Format date with seconds for detailed timestamps
 */
export const formatDateTimeWIB = (dateString) => {
  return formatDateWIB(dateString, { showSeconds: true });
};
