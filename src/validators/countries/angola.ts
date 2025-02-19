
// Validation of NIF
export const validateNIFAO = (nif: string): boolean => {
    return /^\d{9}$/.test(nif);
  };
  
// Validation of phone number in Angola
  export const validatePhoneAO = (phone: string): boolean => {
    return /^(?:\+244|244)\d{9}$/.test(phone);
  };