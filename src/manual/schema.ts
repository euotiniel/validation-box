import { vboxSchema, validator } from "../schemas";

const testSchema = new vboxSchema({
  username: validator.username({ min: 5, bannedWords: ["admin", "root"] }),
  email: validator.email(),
  password: validator.password({ max: 20 }),
});

const testData = [
    {
      input: { username: "admin", email: "user@gmail.com", password: "Secure@12345678901234" }, // ✅ 20 caracteres
      expected: { username: false, email: true, password: true }, 
    },
    {
      input: { username: "test_123", email: "example@outlook.com", password: "Strong!P@ss4567890" }, // ✅ 20 caracteres
      expected: { username: true, email: true, password: true }, 
    },
  ];
  
testData.forEach(({ input, expected }, index) => {
  const result = testSchema.validate(input);
  console.log(`Test ${index + 1}:`, result);
  console.log("Expected:", expected);
  console.log(
    result.username === expected.username &&
    result.email === expected.email &&
    result.password === expected.password
      ? "✅ Test Passed!\n"
      : "❌ Test Failed!\n"
  );
});

// npm run build
// node dist/manual/schema.js
