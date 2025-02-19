// Validation of CPF
export const validateCPF = (cpf: string): boolean => {
    cpf = cpf.replace(/\D/g, '');
  
    if (cpf.length !== 11) return false;
      if (/^(\d)\1{10}$/.test(cpf)) return false;
  
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(9))) return false;
  
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(10))) return false;
  
    return true;
  };
  
// Validation of CNPJ
  export const validateCNPJ = (cnpj: string): boolean => {
    cnpj = cnpj.replace(/\D/g, '');
  
    if (cnpj.length !== 14) return false;
  
    if (/^(\d)\1{13}$/.test(cnpj)) return false;
  
    let sum = 0;
    let weight = 5;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cnpj.charAt(i)) * weight;
      weight = weight === 2 ? 9 : weight - 1;
    }
    let remainder = sum % 11;
    let digit1 = remainder < 2 ? 0 : 11 - remainder;
  
    sum = 0;
    weight = 6;
    for (let i = 0; i < 13; i++) {
      sum += parseInt(cnpj.charAt(i)) * weight;
      weight = weight === 2 ? 9 : weight - 1;
    }
    remainder = sum % 11;
    let digit2 = remainder < 2 ? 0 : 11 - remainder;
  
    return digit1 === parseInt(cnpj.charAt(12)) && digit2 === parseInt(cnpj.charAt(13));
  };
  
// Validation of phone number in Brazil
  export const validatePhoneBR = (phone: string): boolean => {
    return /^(?:\+55|55)\d{11}$/.test(phone);
  };