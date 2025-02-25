import { describe, test, expect } from "vitest";
import { vboxSchema, validator } from "../src/schemas";

describe("vboxSchema Validation", () => {
  const testSchema = new vboxSchema({
    username: validator.username({ min: 5, bannedWords: ["admin", "root"] }),
    email: validator.email({ allowedDomains: ["gmail.com", "outlook.com"] }),
    password: validator.password({ min: 8, allowSpecialChars: "!@#$%^&*" }),
    age: validator.age({ min: 18, max: 40 }),
  });

  const testCases = [
    {
      input: { username: "validUser", email: "user@gmail.com", password: "StrongPass@123!", age: 25 },
      expected: { username: true, email: true, password: true, age: true },
    },
    {
      input: { username: "adm", email: "user@outlook.com", password: "short1!", age: 17 },
      expected: { username: false, email: true, password: false, age: false },
    },
    {
      input: { username: "rootUser", email: "user@yahoo.com", password: "StrongPass@123!", age: 41 },
      expected: { username: false, email: false, password: true, age: false },
    },
    {
      input: { username: "otoniel", email: "example@gmail.com", password: "NoSpecialChar123", age: 30 },
      expected: { username: true, email: true, password: false, age: true },
    },
  ];

  testCases.forEach(({ input, expected }, index) => {
    test(`Test Case ${index + 1}: ${JSON.stringify(input)}`, () => {
      const result = testSchema.validate(input);
      expect(result).toEqual(expected);
    });
  });
});
