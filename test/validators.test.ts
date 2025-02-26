import { describe, test, expect } from "vitest";

import {
  validateUsername,
  validateUser,
  validateEmail,
  validatePassword,
  validateBirthDate,
  validateAge,
} from "../src/validators/generics.js";

import {
  validateNIFAO,
  validatePhoneAO,
} from "../src/validators/countries/angola.js";

import {
  validateCPF,
  validateCNPJ,
  validatePhoneBR,
} from "../src/validators/countries/brasil";

import {
  validateSSN,
  validatePhoneUS,
  validateZIPCode,
} from "../src/validators/countries/usa";

describe("Username Validation", () => {
  test.each([
    ["valid username", "validUser", true],
    ["too short", "ab", false],
    ["too long", "thisusernameistoolonggggg", false],
    ["contains invalid characters", "user!@#", false],
    ["contains spaces", "user name", false],
    ["only numbers", "123456", false],
    ["mix of letters and numbers", "user123", true],
  ])("should validate when %s testing '%s'", (_, value, expected) => {
    const result = validateUsername(value);
    expect(result.valid).toBe(expected);
    if (!expected) {
      expect(result.errors).toBeDefined();
      expect(Array.isArray(result.errors)).toBe(true);
    }
  });
});

describe("User (Basic Name) Validation", () => {
  test.each([
    ["valid name", "John", {}, true],
    ["too short", "J", {}, false],
    ["contains banned word", "admin", { bannedWords: ["admin"] }, false],
    ["contains numbers", "John1", {}, false],
    ["special characters allowed", "O'Connor", { allowSpecialChars: "'" }, true],
    ["only spaces", "      ", {}, false],
    ["long but valid", "Maximillian", {}, true],
  ])("should validate when %s testing '%s'", (_, value, options, expected) => {
    const result = validateUser(value, options);
    expect(result.valid).toBe(expected);
    if (!expected) {
      expect(result.errors).toBeDefined();
      expect(Array.isArray(result.errors)).toBe(true);
    }
  });
});

describe("Email Validation", () => {
  test.each([
    ["valid email", "user@example.com", {}, true],
    ["missing @", "userexample.com", {}, false],
    ["missing domain", "user@", {}, false],
    ["contains spaces", "user @example.com", {}, false],
    ["only domain", "@example.com", {}, false],
    ["missing username", " @example.com", {}, false],
    ["valid subdomain", "user@mail.example.com", {}, true],
    ["domain restriction", "user@gmail.com", { allowedDomains: ["gmail.com"] }, true],
    ["invalid domain", "user@yahoo.com", { allowedDomains: ["gmail.com"] }, false],
  ])("should validate when %s testing '%s'", (_, value, options, expected) => {
    const result = validateEmail(value, options);
    expect(result.valid).toBe(expected);
    if (!expected) {
      expect(result.errors).toBeDefined();
      expect(Array.isArray(result.errors)).toBe(true);
    }
  });
});

describe("Password Validation", () => {
  test.each([
    ["valid password", "P@ssw0rd123", {}, true],
    ["too short", "Abc1!", { min: 8 }, false],
    ["too long", "A".repeat(51), { max: 50 }, false],
    ["missing uppercase", "password123!", {}, false],
    ["missing lowercase", "PASSWORD123!", {}, false],
    ["missing number", "Password!", {}, false],
    ["missing special char", "Password123", {}, false],
    ["contains spaces", "Pass word123!", {}, false],
  ])("should validate when %s testing '%s'", (_, value, options, expected) => {
    const result = validatePassword(value, options);
    expect(result.valid).toBe(expected);
    if (!expected) {
      expect(result.errors).toBeDefined();
      expect(Array.isArray(result.errors)).toBe(true);
    }
  });
});

describe("Birth Date Validation", () => {
  test.each([
    ["valid birth date", "2000-05-15", true],
    ["future date", "2050-01-01", false],
    ["invalid format", "15/05/2000", false],
    ["not a date", "abcd-ef-gh", false],
    ["missing year", "--05-15", false],
    ["missing month", "2000--15", false],
    ["missing day", "2000-05-", false],
  ])("should validate when %s testing '%s'", (_, value, expected) => {
    const result = validateBirthDate(value);
    expect(result.valid).toBe(expected);
    if (!expected) {
      expect(result.errors).toBeDefined();
      expect(Array.isArray(result.errors)).toBe(true);
    }
  });
});

describe("Age Validation", () => {
  test.each([
    ["valid age", 25, {}, true],
    ["too young", 10, { min: 18 }, false],
    ["negative age", -5, {}, false],
    ["extremely old", 150, { max: 120 }, false],
    ["minimum valid age", 18, { min: 18 }, true],
    ["borderline case", 17, { min: 18 }, false],
  ])("should validate when %s testing '%s'", (_, value, options, expected) => {
    const result = validateAge(value, options);
    expect(result.valid).toBe(expected);
    if (!expected) {
      expect(result.errors).toBeDefined();
      expect(Array.isArray(result.errors)).toBe(true);
    }
  });
});

// Country-specific validations follow the same pattern
describe("Angola - NIF Validation", () => {
  test.each([
    ["valid NIF", "123456789", true],
    ["invalid NIF with letters", "ABC123456", false],
    ["too short NIF", "12345", false],
    ["too long NIF", "1234567890123", false],
  ])("should return %s when testing '%s'", (_, value, expected) => {
    expect(validateNIFAO(value)).toBe(expected);
  });
});

// Continue with the same pattern for other country-specific validations...

describe("Angola - Phone Validation", () => {
  test.each([
    ["valid phone number", "+244923456789", true],
    ["number without country code", "923456789", true],
    ["number with spaces", "+244 923 456 789", true],
    ["number with spaces no code", "923 456 789", true],
    ["number with dashes", "+244-923-456-789", false],
    ["number too long", "+244923456789123", false],
    ["number too short", "92345", false],
  ])("should return %s when testing '%s'", (_, value, expected) => {
    expect(validatePhoneAO(value)).toBe(expected);
  });
});

describe("Brazil - CPF Validation", () => {
  test.each([
    ["valid CPF", "123.456.789-09", true],
    ["invalid CPF with repeated digits", "111.111.111-11", false],
    ["CPF too short", "123.456.78", false],
    ["CPF with letters", "123.ABC.789-09", false],
  ])("should return %s when testing '%s'", (_, value, expected) => {
    expect(validateCPF(value)).toBe(expected);
  });
});

describe("Brazil - CNPJ Validation", () => {
  test.each([
    ["valid CNPJ", "12.345.678/0001-95", true],
    ["CNPJ too short", "12345", false],
    ["CNPJ with letters", "12.34A.678/0001-95", false],
  ])("should return %s when testing '%s'", (_, value, expected) => {
    expect(validateCNPJ(value)).toBe(expected);
  });
});

describe("Brasil - Phone Validation", () => {
  test.each([
    ["valid mobile number with country code", "+5511987654321", true],
    ["valid mobile number without country code", "11987654321", true],
    ["valid landline number without country code", "1122223333", true],
    ["number with spaces", "11 98765 4321", true],
    ["number with dashes", "11-98765-4321", false],
    ["number too long", "+551198765432123", false],
    ["number too short", "119876", false],
    ["invalid characters", "+55abc987654321", false],
    ["invalid country code", "+1212987654321", false],
  ])("should return %s when testing '%s'", (_, value, expected) => {
    expect(validatePhoneBR(value)).toBe(expected);
  });
});

describe("USA - SSN Validation", () => {
  test.each([
    ["valid SSN", "123-45-6789", true],
    ["SSN without dashes", "123456789", false],
    ["SSN too short", "123-45-678", false],
    ["SSN with letters", "ABC-45-6789", false],
  ])("should return %s when testing '%s'", (_, value, expected) => {
    expect(validateSSN(value)).toBe(expected);
  });
});

describe("USA - Phone Validation", () => {
  test.each([
    ["valid phone number", "+11234567890", true],
    ["number without country code", "1234567890", true],
    ["number with spaces", "+1 123 456 7890", true],
    ["number with spaces no code", "123 456 7890", true],
    ["number with dashes", "+1-123-456-7890", false],
    ["number too long", "+11234567890123", false],
  ])("should return %s when testing '%s'", (_, value, expected) => {
    expect(validatePhoneUS(value)).toBe(expected);
  });
});

describe("USA - ZIP Code Validation", () => {
  test.each([
    ["valid ZIP code", "12345", true],
    ["valid ZIP+4 format", "12345-6789", true],
    ["ZIP too short", "12", false],
    ["ZIP with letters", "123A5", false],
  ])("should return %s when testing '%s'", (_, value, expected) => {
    expect(validateZIPCode(value)).toBe(expected);
  });
});
