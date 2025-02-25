export type UsernameValidationOptions = {
  min?: number;
  max?: number;
  allowSpecialChars?: string;
  caseSensitive?: boolean;
  bannedWords?: string[];
};

export type UserValidationOptions = {
  min?: number;
  max?: number;
  allowSpecialChars?: string;
  caseSensitive?: boolean;
  bannedWords?: string[];
};

export type EmailValidationOptions = {
  allowedDomains?: string[];
};

export type PasswordValidationOptions = {
  min?: number;
  max?: number;
  allowSpecialChars?: string;
  bannedWords?: string[];
};

export type AgeValidationOptions = {
  minAge?: number;
  maxAge?: number;
};
