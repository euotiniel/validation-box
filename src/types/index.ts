
export type ValidationResult = {
  valid: boolean;
  errors?: string[];
}

// Base options that all validators can use
export type BaseValidationOptions = {
  required?: boolean;
  messages?: {
    required?: string;
    [key: string]: string | undefined;
  };
}

export type UsernameValidationOptions = BaseValidationOptions & {
  min?: number;
  max?: number;
  allowSpecialChars?: string;
  caseSensitive?: boolean;
  bannedWords?: string[];
};

export type UserValidationOptions = BaseValidationOptions & {
  min?: number;
  max?: number;
  allowSpecialChars?: string;
  caseSensitive?: boolean;
  bannedWords?: string[];
};

export type EmailValidationOptions = BaseValidationOptions & {
  allowedDomains?: string[];
};

export type PasswordValidationOptions = BaseValidationOptions & {
  min?: number;
  max?: number;
  allowSpecialChars?: string;
  bannedWords?: string[];
};

export type AgeValidationOptions = BaseValidationOptions & {
  min?: number;
  max?: number;
};


