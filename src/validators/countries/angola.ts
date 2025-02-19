// Validation of NIF
export const validateNIFAO = (nif: string): boolean => {
  return /^\d{9}$/.test(nif);
};

// Validation of phone number in Angola
export const validatePhoneAO = (
  phone: string,
  requireCountryCode: boolean = false
): boolean => {
  const countryCodeRegex = requireCountryCode
    ? "(\\+244|244)"
    : "(\\+244|244)?";
  const regex = new RegExp(
    `^${countryCodeRegex}\\s?\\d{3}\\s?\\d{3}\\s?\\d{3}$`
  );
  return regex.test(phone);
};
