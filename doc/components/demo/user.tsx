"use client";
import { useState } from "react";
import { validateUser } from "validation-box";

export default function User() {
  const [user, setUser] = useState("");
  const [isValid, setIsValid] = useState<null | boolean>(null);

  const handleValidation = () => {
    setIsValid(
      validateUser(user, {
        min: 5,
        max: 15,
        allowSpecialChars: "'’\\s",
        bannedWords: ["admin", "root"],
      })
    );
  };

  return (
    <div className="flex flex-col gap-2 items-center pt-20 pb-16">
      <input
        className="w-[300px] h-8 bg-transparent border text-neutral-200 border-neutral-700/35 rounded-md text-sm px-2 py-[7px] outline-none placeholder:text-neutral-500/40 "
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="Enter user"
      />
      <button
        className="w-[300px] h-7 bg-gradient-to-t text-neutral-200 text-sm to-blue-600 from-blue-700 border border-blue-500 rounded-md transition-all duration-200 ease-in opacity-90"
        onClick={handleValidation}
      >
        Validate
      </button>
      {isValid !== null && (
        isValid ? <p className="text-sm text-neutral-400">✅ Valid User</p> : <p className="text-sm text-neutral-400">❌ Invalid User</p>
      )}
    </div>
  );
}