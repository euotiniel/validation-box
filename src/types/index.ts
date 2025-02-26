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
  messages?: {
    min?: string;
    max?: string;
    bannedWords?: string;
    invalidFormat?: string;
    onlyNumbers?: string;
    required?: string;
  };
};

export type UserValidationOptions = BaseValidationOptions & {
  min?: number;
  max?: number;
  allowSpecialChars?: string;
  caseSensitive?: boolean;
  bannedWords?: string[];
  messages?: {
    min?: string;
    max?: string;
    bannedWords?: string;
    invalidFormat?: string;
    emptySpace?: string;
    required?: string;
  };
};

export type EmailValidationOptions = BaseValidationOptions & {
  allowedDomains?: string[];
  messages?: {
    invalidFormat?: string;
    allowedDomains?: string;
    required?: string;
  };
};

export type PasswordValidationOptions = BaseValidationOptions & {
  min?: number;
  max?: number;
  allowSpecialChars?: string;
  bannedWords?: string[];
  messages?: {
    min?: string;
    max?: string;
    bannedWords?: string;
    invalidFormat?: string;
    required?: string;
  };
};

export type AgeValidationOptions = BaseValidationOptions & {
  min?: number;
  max?: number;
  messages?: {
    min?: string;
    max?: string;
    invalidFormat?: string;
    required?: string;
  };
};


