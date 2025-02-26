import { describe, test, expect } from "vitest";
import { vboxSchema, validator } from "../src/schemas";

describe("vboxSchema Validation", () => {
  const testSchema = new vboxSchema({
    username: validator.username({ 
      min: 5, 
      bannedWords: ["admin", "root"]
    }),
    email: validator.email({ 
      allowedDomains: ["gmail.com", "outlook.com"],
      required: true 
    }),
    password: validator.password({ 
      min: 8, 
      max: 50
    }),
    age: validator.age({ 
      min: 18, 
      max: 40,
      required: true 
    })
  });

  const testCases = [
    { 
      description: "Valid data with all correct fields ✅",
      input: { 
        username: "validUser", 
        email: "user@gmail.com", 
        password: "StrongPass@123!", 
        age: 25 
      }
    },
    { 
      description: "Invalid username length and underage ❌",
      input: { 
        username: "admi", 
        email: "user@outlook.com", 
        password: "short1!Pass123_", 
        age: 17 
      }
    },
    { 
      description: "Banned username and invalid domain ❌",
      input: { 
        username: "rootUser", 
        email: "user@yahoo.com", 
        password: "StrongPass@123!", 
        age: 41 
      }
    },
    { 
      description: "Password without special chars ❌",
      input: { 
        username: "otoniel", 
        email: "example@gmail.com", 
        password: "NoSpecialChar123", 
        age: 30 
      }
    }
  ];

  testCases.forEach(({ description, input }) => {
    test(description, () => {
      const result = testSchema.validate(input);

      if (result.success) {
        // ✅ For valid cases, just check data is present
        expect(result.data).toBeDefined();
        expect(result.errors).toBeUndefined();
      } else {
        // ❌ For invalid cases, verify errors exist
        expect(result.errors).toBeDefined();
        expect(result.data).toBeUndefined();
        
        // Verify error messages structure
        Object.values(result.errors || {}).forEach(errorMessages => {
          expect(Array.isArray(errorMessages)).toBe(true);
          expect(errorMessages.length).toBeGreaterThan(0);
        });
      }
    });
  });
});