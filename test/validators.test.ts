import { describe, test, expect } from "vitest";

import {
    validateUsername,
    validateUser,
    validateEmail,
    validatePassword,
    validateBirthDate,
    validateAge,
    ValidationOptions
  } from "../src/validators/generics.js";
  
  describe("Username Validation", () => {
    test.each([
      ["valid username", "validUser", true],
      ["too short", "ab", false],
      ["too long", "thisusernameistoolonggggg", false],
      ["contains invalid characters", "user!@#", false],
      ["contains spaces", "user name", false],
      ["only numbers", "123456", false],
      ["mix of letters and numbers", "user123", true],
    ])("should return %s when testing '%s'", (_, value, expected) => {
      expect(validateUsername(value)).toBe(expected);
    });
  });
  
  describe("User (Basic Name) Validation", () => {
    test.each([
      ["valid name", "John", {}, true], // Sem palavras banidas
      ["too short", "J", {}, false], // Sem palavras banidas
      ["contains banned word", "admin", { bannedWords: ["admin"] }, false], // Passando a lista de palavras banidas
      ["contains numbers", "John1", {}, false], // Sem palavras banidas
      ["special characters allowed", "O’Connor", {}, true], // Sem palavras banidas
      ["only spaces", "      ", {}, false], // Sem palavras banidas
      ["long but valid", "Maximillian", {}, true], // Sem palavras banidas
    ])("should return %s when testing '%s'", (_, value, options, expected) => {
      expect(validateUser(value, options)).toBe(expected);
    });
  });
  
  describe("Email Validation", () => {
    test.each([
      ["valid email", "user@example.com", true],
      ["missing @", "userexample.com", false],
      ["missing domain", "user@", false],
      ["contains spaces", "user @example.com", false],
      ["only domain", "@example.com", false],
      ["missing username", " @example.com", false],
      ["valid subdomain", "user@mail.example.com", true],
    ])("should return %s when testing '%s'", (_, value, expected) => {
      expect(validateEmail(value)).toBe(expected);
    });
  });
  
  describe("Password Validation", () => {
    test.each([
      ["valid password", "P@ssw0rd123", true],
      ["too short", "Abc1!", false],
      ["too long", "A".repeat(51), false],
      ["missing uppercase", "password123!", false],
      ["missing lowercase", "PASSWORD123!", false],
      ["missing number", "Password!", false],
      ["missing special char", "Password123", false],
      ["contains spaces", "Pass word123!", false],
    ])("should return %s when testing '%s'", (_, value, expected) => {
      expect(validatePassword(value)).toBe(expected);
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
    ])("should return %s when testing '%s'", (_, value, expected) => {
      expect(validateBirthDate(value)).toBe(expected);
    });
  });
  
  describe("Age Validation", () => {
    test.each([
      ["valid age", 25, true],
      ["too young", 10, false],
      ["negative age", -5, false],
      ["extremely old", 150, false],
      ["minimum valid age (18)", 18, true],
      ["borderline case (17)", 17, false],
    ])("should return %s when testing '%s'", (_, value, expected) => {
      expect(validateAge(value)).toBe(expected);
    });
  });
  