// Validation of SSN (Social Security Number) in the USA
export const validateSSN = (ssn: string): boolean => {
  return /^\d{3}-\d{2}-\d{4}$/.test(ssn);
};

// Validation of phone number in the USA
export const validatePhoneUS = (
  phone: string,
  requireCountryCode: boolean = false
): boolean => {
  const countryCodeRegex = requireCountryCode ? "(\\+1|1)" : "(\\+1|1)?";
  const regex = new RegExp(
    `^${countryCodeRegex}\\s?\\d{3}\\s?\\d{3}\\s?\\d{4}$`
  );
  return regex.test(phone);
};

// Validation of ZIP code in the USA
export const validateZIPCode = (zipCode: string): boolean => {
  return /^\d{5}(-\d{4})?$/.test(zipCode);
};
