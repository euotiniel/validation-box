# 📦 Valdation Box

> The only validation library - with flexible regex - you need. 

Validation Box is a **lightweight, zero-dependency** validation library fully written in TypeScript. Easily define **min and max limits**, restrict **banned words**, adjust **case sensitivity rules**, and gain full control over your inputs. 

And there’s more… with built-in support for **country-specific validations**, including Angola, Brazil, the USA, and...


| Feature                      | VBox | Yup       | Joi       | Zod       |
|----------------------------------|--------------------|---------------|---------------|---------------|
| Flexible Regex               | ✅             | ❌         | ❌         | ❌         |
| Zero Dependencies            | ✅             | ✅       | ❌         | ✅        |
| Country-Specific Validation  | ✅             | ❌         | ❌         | ❌         |

## Installation

You can install the package using:

```sh

npm i validation-box

```

## Usage

We aim to support as many frameworks and libraries as possible. Currently, Validation Box works with most JavaScript and TypeScript frameworks, including: [React.js](#reactnextjs) & [Vue.js](#vuenuxtjs)..

### React/Next.js

```tsx
"use client" // Next js
import { useState } from "react";
import { validateUsername } from "validation-box";

export default function UsernameValidator () {
  const [username, setUsername] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleValidation = () => {
    setIsValid(
      validateUsername(username, {
        minLength: 5,
        maxLength: 15,
        allowSpecialChars: "_-",
        bannedWords: ["admin", "root"]
      })
    );
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
      />
      <button onClick={handleValidation}>Validate</button>
      {isValid ? <p>✅ Valid Username</p> : <p>❌ Invalid Username</p>}
    </div>
  );
};
```

### Vue/Nuxt.js

```ts
<script setup>
import { ref } from "vue";
import { validateEmail } from "validation-box";

const email = ref("");
const message = ref("");

const handleValidation = () => {
  const isValid = validateEmail(email.value, {
    allowedDomains: ["gmail.com", "outlook.com"],
  });

  message.value = isValid ? "✅ Valid email." : "❌ Invalid email.";
};
</script>

<template>
  <div>
    <input v-model="email" placeholder="Enter your email" />
    <button @click="handleValidation">Validate</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>
```

### Validation Options Table

| **Validation**        | **Properties**          | **Type**             | **Default**           | **Description** |
|----------------------|-----------------------|---------------------|----------------------|---------------|
| `validateUsername`  | `minLength`           | `number`            | `3`                  | Minimum username length. |
|                      | `maxLength`           | `number`            | `20`                 | Maximum username length. |
|                      | `allowSpecialChars`   | `string`            | `"_"`                | Allowed special characters. |
|                      | `bannedWords`         | `string[]`          | `[]`                 | List of forbidden words. |
| `validateUser`      | `minLength`           | `number`            | `3`                  | Minimum name length. |
|                      | `maxLength`           | `number`            | `30`                 | Maximum name length. |
|                      | `allowSpecialChars`   | `string`            | `"'’\\s"`            | Allowed special characters. |
|                      | `bannedWords`         | `string[]`          | `[]`                 | List of forbidden words. |
| `validateEmail`     | `allowedDomains`      | `string[]`          | `[]`                 | Allowed domains (e.g., `["gmail.com"]`). |
| `validatePassword`  | `minLength`           | `number`            | `8`                  | Minimum password length. |
|                      | `maxLength`           | `number`            | `100`                | Maximum password length. |
|                      | `allowSpecialChars`   | `string`            | `"!@#$%^&*()_+"`     | Required special characters. |
|                      | `bannedWords`         | `string[]`          | `[]`                 | List of forbidden words. |
| `validateBirthDate` | `-`                   | `-`                 | `-`                  | Must be a valid date in the past (`YYYY-MM-DD`). |
| `validateAge`       | `minAge`              | `number`            | `18`                 | Minimum allowed age. |
|                      | `maxAge`              | `number`            | `120`                | Maximum allowed age. |

## Usage - Countries

```tsx
"use client" // Next js
import { useState } from "react";
import { validatePhoneAO } from "validation-box";

export default function PhoneValidatorAO () {
  const [phone, setPhone] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleValidation = () => {
    setIsValid(validatePhoneAO(phone));
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Enter phone (e.g., 923 456 789)" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)} 
      />
      <button onClick={handleValidation}>Validate</button>
      {isValid ? <p>✅ Valid Angolan Phone Number</p> : <p>❌ Invalid Phone Number</p>}
    </div>
  );
};
```

### Validation Options Table

| Country  | Validation Function  | Accepted Formats                          | Example Inputs              |
|----------|----------------------|-------------------------------------------|-----------------------------|
| 🇦🇴 **Angola** | `validatePhoneAO`    | `+244XXXXXXXXX` (international)          | `+244923456789`             |
|          |                      | `+244 XXX XXX XXX` (code + spaced)              | `+244 923 456 789`              |
|          |                      | `XXXXXXXXX` (without code)         | `923456789`                |
|          |                      | `923 456 789` (spaced)                    | `923 456 789`               |
| 🇧🇷 **Brazil** | `validatePhoneBR`    | `+55XXXXXXXXXXX` (international)         | `+559812345678`             |
|          |                      | `+55 XX XXXXX XXXX` (code + spaced)             | `+55 11 98765 4321`              |
|          |                      | `XXXXXXXXXXX` (without code)      | `11987654321`               |
|          |                      | `XX XXXXX XXXX` (spaced)              | `11 98765 4321`                |
| 🇺🇸 **USA**    | `validatePhoneUS`    | `+1XXXXXXXXXX` (international)           | `+11234567890`              |
|          |                      | `+1 XXX XXX XXXX` (code + spaced)               | `+1 123 456 7890`               |
|          |                      | `XXXXXXXXXX` (without cod)              | `1234567890`            |
|          |                      | `XXX XXX XXXX` (spaced)               | `123 456 7890`              |


## Running Tests

The package includes unit tests written in Jest. To run them:

```sh
npm test
```

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a feature branch.
3. Make your changes and write tests.
4. Submit a pull request.

## License

MIT License. See [LICENSE](LICENSE) for details.

## Supported Countries

- 🇦🇴 Angola
- 🇧🇷 Brazil
- 🇺🇸 USA

More countries will be added soon!

## ✉️ Contact

If you have any questions or suggestions, feel free to open an issue or contact us at [euotiniel.com](https://euotiniel.com).

