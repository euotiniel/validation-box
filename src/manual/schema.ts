import { vboxSchema, validator } from "../schemas";

const userSchema = new vboxSchema({
  username: validator.username({
    required: true,
    min: 5,
    messages: {
      required: "Username is required",
      min: "Username must be at least 5 characters"
    }
  }),
  email: validator.email({
    required: true,
    allowedDomains: ["gmail.com"],
    messages: {
      required: "Email is required",
      domain: "Only Gmail addresses are allowed"
    }
  })
}, // {
//   validateAll: true,
//   showErrors: true
// }
);

const testData = [
  { 
    input: { 
      username: "admin", 
      email: "user@gmail.com", 
      password: "Secure@12345678901234" 
    } // ❌ Username "admin" is banned
  },
  { 
    input: { 
      username: "test_123", 
      email: "example@outlook.com", 
      password: "Strong!P@ss4567890" 
    } // ✅ All valid
  },
  { 
    input: { 
      username: "valid_user", 
      email: "test@hotmail.com", 
      password: "Valid@123" 
    } // ❌ Invalid email domain
  },
  { 
    input: { 
      username: "ab", 
      email: "test@gmail.com", 
      password: "short" 
    } // ❌ Username too short, weak password
  }
];

console.log("\n📌 Running Schema Tests...\n");

let passedTests = 0;
const totalTests = testData.length;

testData.forEach(({ input }, index) => {
  const result = userSchema.validate(input);
  
  console.log(`🔹 Test ${index + 1}:`);
  console.log("🔸 Input:", JSON.stringify(input, null, 2));
  console.log("🔸 Result:", JSON.stringify(result, null, 2));

  const expectedSuccess = Object.values(result.errors || {}).length === 0;
  const expected = expectedSuccess 
    ? { success: true, data: input } 
    : { success: false, errors: result.errors };

  console.log("🔸 Expected:", JSON.stringify(expected, null, 2));

  const testPassed = JSON.stringify(result) === JSON.stringify(expected);
  if (testPassed) passedTests++;

  console.log(testPassed ? "✅ Test Passed!\n" : "❌ Test Failed!\n");
});

// Test Summary
console.log("📊 Test Summary");
console.log(`✅ Passed: ${passedTests}/${totalTests}`);
console.log(`❌ Failed: ${totalTests - passedTests}/${totalTests}\n`);