import { ValidationResult, UsernameValidationOptions, UserValidationOptions, EmailValidationOptions, PasswordValidationOptions, AgeValidationOptions } from "../types";
import { containsBannedWords } from "../helpers";

export const validateUsername = (
  username: string,
  options: UsernameValidationOptions = {}
): ValidationResult => {
  const errors: string[] = [];
  
  const min = options.min ?? 3;
  const max = options.max ?? 20;
  const specialChars = options.allowSpecialChars ?? "_";

  if (username.length < min) {
    errors.push(options.messages?.min || `Username must be at least ${min} characters`);
  }

  if (username.length > max) {
    errors.push(options.messages?.max || `Username must be at most ${max} characters`);
  }

  if (containsBannedWords(username, options.bannedWords)) {
    errors.push(options.messages?.bannedWords || "Username contains banned words");
  }

  if (/^\d+$/.test(username)) {
    errors.push(options.messages?.onlyNumbers || "Username cannot contain only numbers");
  }

  const regex = new RegExp(`^[a-zA-Z0-9${specialChars}]+$`);
  if (!regex.test(username)) {
    errors.push(options.messages?.invalidFormat || `Username can only contain letters, numbers and ${specialChars}`);
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  };
};

export const validateUser = (
  user: string,
  options: UserValidationOptions = {}
): ValidationResult => {
  const errors: string[] = [];
  
  const min = options.min ?? 3;
  const max = options.max ?? 30;
  const specialChars = options.allowSpecialChars ?? "''\\s";

  if (user.length < min) {
    errors.push(options.messages?.min || `Name must be at least ${min} characters`);
  }

  if (user.length > max) {
    errors.push(options.messages?.max || `Name must be at most ${max} characters`);
  }

  if (containsBannedWords(user, options.bannedWords)) {
    errors.push(options.messages?.bannedWords || "Name contains banned words");
  }

  if (/^\s*$/.test(user)) {
    errors.push(options.messages?.emptySpace || "Name cannot be empty or contain only spaces");
  }

  const regex = new RegExp(`^[a-zA-ZÀ-ÖØ-öø-ÿ${specialChars}]+$`);
  if (!regex.test(user)) {
    errors.push(options.messages?.invalidFormat || `Name can only contain letters and ${specialChars}`);
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  };
};

export const validateEmail = (
  email: string,
  options: EmailValidationOptions = {}
): ValidationResult => {
  const errors: string[] = [];
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  const match = email.match(emailRegex);

  if (!match) {
    errors.push(options.messages?.invalidFormat || "Invalid email format");
  } else if (options.allowedDomains && !options.allowedDomains.includes(match[1])) {
    errors.push(options.messages?.allowedDomains || `Email domain must be one of: ${options.allowedDomains.join(', ')}`);
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  };
};

export const validatePassword = (
  password: string,
  options: PasswordValidationOptions = {}
): ValidationResult => {
  const errors: string[] = [];
  
  const min = options.min ?? 8;
  const max = options.max ?? 100;
  const specialChars = options.allowSpecialChars ?? "!@#$%^&*()_+";

  if (password.length < min) {
    errors.push(options.messages?.min || `Password must be at least ${min} characters`);
  }

  if (password.length > max) {
    errors.push(options.messages?.max || `Password must be at most ${max} characters`);
  }

  if (containsBannedWords(password, options.bannedWords)) {
    errors.push(options.messages?.bannedWords || "Password contains banned words");
  }

  const regex = new RegExp(
    `^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[${specialChars}])[A-Za-z\\d${specialChars}]+$`
  );
  
  if (!regex.test(password)) {
    errors.push(options.messages?.invalidFormat || "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character");
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  };
};

export const validateBirthDate = (
  date: string,
  options: { messages?: { invalidFormat?: string } } = {}
): ValidationResult => {
  const errors: string[] = [];
  
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    errors.push(options.messages?.invalidFormat || "Date must be in YYYY-MM-DD format");
  }

  const birthDate = new Date(date);
  if (isNaN(birthDate.getTime())) {
    errors.push(options.messages?.invalidFormat || "Invalid date");
  } else if (birthDate >= new Date()) {
    errors.push(options.messages?.invalidFormat || "Birth date must be in the past");
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  };
};

export const validateAge = (
  age: number,
  options: AgeValidationOptions = {}
): ValidationResult => {
  const errors: string[] = [];
  
  const min = options.min ?? 18;
  const max = options.max ?? 120;

  if (!Number.isInteger(age)) {
    errors.push(options.messages?.invalidFormat || "Age must be an integer");
  }

  if (age < min) {
    errors.push(options.messages?.min || `Age must be at least ${min} years`);
  }

  if (age > max) {
    errors.push(options.messages?.max || `Age must be at most ${max} years`);
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  };
};