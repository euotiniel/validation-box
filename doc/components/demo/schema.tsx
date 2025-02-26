import { vboxSchema, validator } from "validation-box"

export default function schema() {
  const userSchema = new vboxSchema({
    username: validator.username({ min: 5, bannedWords: ["admin", "root"] }),
    email: validator.email({ allowedDomains: ["gmail.com", "outlook.com"] }),
    password: validator.password({ max: 8, allowSpecialChars: "!@#$%^&*" }),
  });

  return (
    <div>schema</div>
  )
}
