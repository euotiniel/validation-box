import { UsernameValidationOptions, UserValidationOptions, EmailValidationOptions, PasswordValidationOptions, AgeValidationOptions } from "../types";
import { containsBannedWords } from "../helpers";

// Username validation (default: 3-20 characters)
export const validateUsername = (
  username: string,
  options: UsernameValidationOptions = {}
): boolean => {
  if (containsBannedWords(username, options.bannedWords)) return false;

  const min = options.min ?? 3;
  const max = options.max ?? 20;
  const specialChars = options.allowSpecialChars ?? "_";
  const regex = new RegExp(`^[a-zA-Z0-9${specialChars}]{${min},${max}}$`);

  // Rejeita usernames compostos apenas por números
  if (/^\d+$/.test(username)) return false;

  return regex.test(username);
};

// User validation (default: 3-30 characters)
export const validateUser = (
  user: string,
  options: UserValidationOptions = {}
): boolean => {
  if (containsBannedWords(user, options.bannedWords)) return false;
  if (/^\s*$/.test(user)) return false;
  const min = options.min ?? 3;
  const max = options.max ?? 30;
  const specialChars = options.allowSpecialChars ?? "'’\\s";
  const regex = new RegExp(`^[a-zA-ZÀ-ÖØ-öø-ÿ${specialChars}]{${min},${max}}$`);
  return regex.test(user);
};

// Email validation with domain restriction
export const validateEmail = (
  email: string,
  options: EmailValidationOptions = {}
): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  const match = email.match(emailRegex);

  if (!match) return false;

  if (options.allowedDomains && !options.allowedDomains.includes(match[1])) {
    return false;
  }

  return true;
};

// Password validation (default: 8-100 characters)
export const validatePassword = (
  password: string,
  options: PasswordValidationOptions = {}
): boolean => {
  if (containsBannedWords(password, options.bannedWords)) return false;

  const min = options.min ?? 8;
  const max = options.max ?? 100;
  const specialChars = options.allowSpecialChars ?? "!@#$%^&*()_+";
  const regex = new RegExp(
    `^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[${specialChars}])[A-Za-z\\d${specialChars}]{${min},${max}}$`
  );

  return regex.test(password);
};

// Birthdate validation (must be a valid date in the past)
export const validateBirthDate = (date: string): boolean => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) return false;

  const birthDate = new Date(date);
  return !isNaN(birthDate.getTime()) && birthDate < new Date();
};

// Age validation (must be an integer between minAge and maxAge)
export const validateAge = (
  age: number,
  options: AgeValidationOptions = {}
): boolean => {
  const minAge = options.minAge ?? 18; 
  const maxAge = options.maxAge ?? 120;

  return Number.isInteger(age) && age >= minAge && age <= maxAge;
};
