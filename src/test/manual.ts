import { UsernameValidationOptions, UserValidationOptions, EmailValidationOptions, PasswordValidationOptions, AgeValidationOptions } from "../types";
import {
  validateUsername,
  validateUser,
  validateEmail,
  validatePassword,
  validateBirthDate,
  validateAge,
} from "../validators/generics.js";
import {
  validateNIFAO,
  validatePhoneAO,
} from "../validators/countries/angola.js";
import {
  validateCPF,
  validateCNPJ,
  validatePhoneBR,
} from "../validators/countries/brasil";
import {
  validateSSN,
  validatePhoneUS,
  validateZIPCode,
} from "../validators/countries/usa";

type TestCase<T> = {
  description: string;
  value: any;
  options?: T;
  expected: boolean;
  requireCountryCode?: boolean;
};

const runTest = <T>(
  label: string,
  testCases: TestCase<T>[],
  validator: (value: any, options?: T) => boolean
) => {
  console.log(`\n🔵 Testing ${label}:`);
  testCases.forEach(({ description, value, options, expected }) => {
    const result = validator(value, options);
    console.log(
      `${result ? "✅" : "❌"} ${description}: "${value}" → ${
        result ? "✅" : "❌"
      }`
    );
  });
};

const runTestCountries = (
  label: string,
  testCases: TestCase<undefined>[],
  validator: (value: any) => boolean
) => {
  console.log(`\n🔵 Testing ${label}:`);
  testCases.forEach(({ description, value, expected }) => {
    const result = validator(value);
    console.log(
      `${result ? "✅" : "❌"} ${description}: "${value}" → ${
        result ? "✅" : "❌"
      }`
    );
  });
};

// Username Validation
runTest<UsernameValidationOptions>(
  "Username",
  [
    { description: "Valid username", value: "otoniel123", expected: true },
    { description: "Too short", value: "ot", expected: false },
    {
      description: "Too long",
      value: "otoniel_emanuel_luanda_dev",
      expected: false,
    },
    { description: "Invalid characters", value: "otoniel!@#", expected: false },
    {
      description: "Contains banned word",
      value: "badwordUser",
      options: { bannedWords: ["badword"] },
      expected: false,
    },
    {
      description: "Custom length (5-15)",
      value: "otoni123",
      options: { min: 5, max: 15 },
      expected: true,
    },
  ],
  validateUsername
);

// User Validation
runTest<UserValidationOptions>(
  "User",
  [
    { description: "Valid name", value: "Otoniel", expected: true },
    { description: "Too short", value: "O", expected: false },
    {
      description: "Banned word",
      value: "HackerMaster",
      options: { bannedWords: ["Hacker"] },
      expected: false,
    },
    {
      description: "Custom allowed special chars",
      value: "D'Angelo",
      options: { allowSpecialChars: "'-" },
      expected: true,
    },
  ],
  validateUser
);

// Email Validation
runTest<EmailValidationOptions>(
  "Email",
  [
    { description: "Valid email", value: "test@example.com", expected: true },
    { description: "Invalid format", value: "invalid-email", expected: false },
    {
      description: "Not in allowed domains",
      value: "user@gmail.com",
      options: { allowedDomains: ["outlook.com"] },
      expected: false,
    },
    {
      description: "Allowed domain",
      value: "user@outlook.com",
      options: { allowedDomains: ["outlook.com"] },
      expected: true,
    },
  ],
  validateEmail
);

// Password Validation
runTest<PasswordValidationOptions>(
  "Password",
  [
    { description: "Valid password", value: "Pass1234!", expected: true },
    { description: "Too short", value: "short1!", expected: false },
    {
      description: "Missing special character",
      value: "Password123",
      expected: false,
    },
    {
      description: "Contains banned word",
      value: "badpassword!",
      options: { bannedWords: ["badpassword"] },
      expected: false,
    },
    {
      description: "Custom length (12-50)",
      value: "StrongPass123!",
      options: { min: 12, max: 50 },
      expected: true,
    },
  ],
  validatePassword
);

// Birth Date Validation
runTest<undefined>(
  "Birth Date",
  [
    { description: "Valid birthdate", value: "2000-01-01", expected: true },
    { description: "Future date", value: "2050-01-01", expected: false },
    { description: "Invalid format", value: "not-a-date", expected: false },
  ],
  validateBirthDate
);

// Age Validation
runTest<AgeValidationOptions>(
  "Age",
  [
    { description: "Valid age", value: 25, expected: true },
    { description: "Too high", value: 150, expected: false },
    { description: "Negative age", value: -5, expected: false },
    {
      description: "Below minimum age",
      value: 18,
      options: { minAge: 21 },
      expected: false,
    },
    {
      description: "Above maximum age",
      value: 40,
      options: { maxAge: 35 },
      expected: false,
    },
  ],
  validateAge
);

// Tests for Angola
runTestCountries(
  "Angola - NIF",
  [
    { description: "Valid NIF", value: "123456789", expected: true },
    {
      description: "Invalid NIF (letters)",
      value: "ABC123456",
      expected: false,
    },
  ],
  validateNIFAO
);

runTestCountries(
  "Angola - Phone",
  [
    {
      description: "Valid number",
      value: "+244923456789",
      expected: true,
      requireCountryCode: true,
    },
    {
      description: "Invalid number (short)",
      value: "92345",
      expected: false,
      requireCountryCode: true,
    },
    {
      description: "Number with spaces",
      value: "+244 923 456 789",
      expected: true,
      requireCountryCode: true,
    },
    {
      description: "Number with separators",
      value: "+244-923-456-789",
      expected: false,
      requireCountryCode: true,
    },
    {
      description: "Number longer than expected",
      value: "+244923456789123",
      expected: false,
      requireCountryCode: true,
    },
    {
      description: "Number without country code",
      value: "923456789",
      expected: true,
      requireCountryCode: false,
    },
    {
      description: "Number without country code",
      value: "923 456 789",
      expected: true,
      requireCountryCode: false,
    },
    {
      description: "Number without country code (short)",
      value: "92345",
      expected: false,
      requireCountryCode: false,
    },
  ],
  validatePhoneAO
);

// Tests for Brazil
runTestCountries(
  "Brazil - CPF",
  [
    { description: "Valid CPF", value: "123.456.789-09", expected: true },
    {
      description: "Invalid CPF (repeated sequence)",
      value: "111.111.111-11",
      expected: false,
    },
  ],
  validateCPF
);

runTestCountries(
  "Brazil - CNPJ",
  [
    { description: "Valid CNPJ", value: "12.345.678/0001-95", expected: true },
    {
      description: "Invalid CNPJ (incorrect length)",
      value: "12345",
      expected: false,
    },
  ],
  validateCNPJ
);

runTestCountries(
  "Brazil - Phone",
  [
    {
      description: "Valid number",
      value: "+5511987654321",
      expected: true,
      requireCountryCode: true,
    },
    {
      description: "Invalid number (short)",
      value: "1198765",
      expected: false,
      requireCountryCode: true,
    },
    {
      description: "Number with spaces",
      value: "+55 11 98765 4321",
      expected: true,
      requireCountryCode: true,
    },
    {
      description: "Number with separators",
      value: "+55-11-98765-4321",
      expected: false,
      requireCountryCode: true,
    },
    {
      description: "Number longer than expected",
      value: "+5511987654321123",
      expected: false,
      requireCountryCode: true,
    },
    {
      description: "Number without country code",
      value: "11987654321",
      expected: true,
      requireCountryCode: false,
    },
    {
      description: "Number without country code",
      value: "11 98765 4321",
      expected: true,
      requireCountryCode: false,
    },
    {
      description: "Number without country code (short)",
      value: "1198765",
      expected: false,
      requireCountryCode: false,
    },
  ],
  validatePhoneBR
);

// Tests for USA
runTestCountries(
  "USA - SSN",
  [
    { description: "Valid SSN", value: "123-45-6789", expected: true },
    {
      description: "Invalid SSN (wrong format)",
      value: "123456789",
      expected: false,
    },
  ],
  validateSSN
);

runTestCountries(
  "USA - Phone",
  [
    {
      description: "Valid number",
      value: "+11234567890",
      expected: true,
      requireCountryCode: true,
    },
    {
      description: "Invalid number (short)",
      value: "12345",
      expected: false,
      requireCountryCode: true,
    },
    {
      description: "Number with spaces",
      value: "+1 123 456 7890",
      expected: true,
      requireCountryCode: true,
    },
    {
      description: "Number with separators",
      value: "+1-123-456-7890",
      expected: false,
      requireCountryCode: true,
    },
    {
      description: "Number longer than expected",
      value: "+11234567890123",
      expected: false,
      requireCountryCode: true,
    },
    {
      description: "Number without country code",
      value: "1234567890",
      expected: true,
      requireCountryCode: false,
    },
    {
      description: "Number without country code",
      value: "123 456 7890",
      expected: true,
      requireCountryCode: false,
    },
    {
      description: "Number without country code (short)",
      value: "12345",
      expected: false,
      requireCountryCode: false,
    },
  ],
  validatePhoneUS
);

runTestCountries(
  "USA - ZIP Code",
  [
    { description: "Valid ZIP", value: "12345", expected: true },
    { description: "Invalid ZIP (short)", value: "12", expected: false },
  ],
  validateZIPCode
);

// npm run build
// node dist/test/manual.js