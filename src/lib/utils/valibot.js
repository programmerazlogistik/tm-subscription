/**
 * Maps nested Valibot errors to a flat error object.
 * @param {object} valibotErrors - The `nested` error object from Valibot's `flatten`.
 * @returns {object} A flat error object for the Zustand state.
 */
export const mapValibotErrors = (valibotErrors) => {
  const newErrors = {};

  for (const fieldName in valibotErrors) {
    const messageArray = valibotErrors[fieldName];
    if (messageArray?.[0]) {
      newErrors[fieldName] = messageArray[0];
    }
  }

  return newErrors;
};

/**
 * Validates if dropdown fields are filled.
 * @param {object} formData - The form data to validate.
 * @param {array} requiredDropdownFields - Array of field names that are required dropdowns.
 * @returns {object} Validation errors for empty dropdowns.
 */
export const validateRequiredDropdowns = (formData, requiredDropdownFields) => {
  const errors = {};

  requiredDropdownFields.forEach((field) => {
    if (!formData[field] || formData[field] === "") {
      errors[field] = "Tipe Pricing Default wajib diisi";
    }
  });

  return errors;
};
