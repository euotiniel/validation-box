export type ValidationOptions = {
  minLength?: number;
  maxLength?: number;
  allowSpecialChars?: string;
  caseSensitive?: boolean;
  bannedWords?: string[];
  allowedDomains?: string[];
  minAge?: number;
  maxAge?: number;
};
