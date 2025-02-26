"use client";
import { useState } from "react";
import { validateUser } from "validation-box";

export default function User() {
  const [user, setUser] = useState("");
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    errors?: string[];
  } | null>(null);

  const handleValidation = () => {
    const result = validateUser(user, {
      min: 5,
      max: 15,
      allowSpecialChars: "''\\s",
      bannedWords: ["admin", "root"],
      messages: {
        minLength: "Name must be at least 5 characters",
        maxLength: "Name cannot exceed 15 characters",
        bannedWords: "This name is not allowed",
        invalidFormat: "Name can only contain letters, spaces and apostrophes"
      }
    });

    setValidationResult(result);
  };

  return (
    <div className="flex flex-col gap-2 items-center pt-20 pb-16">
      <input
        className="w-[300px] h-8 bg-transparent border text-neutral-200 border-neutral-700/35 rounded-md text-sm px-2 py-[7px] outline-none placeholder:text-neutral-500/40"
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
      {validationResult && (
        validationResult.valid ? (
          <p className="text-sm text-neutral-400">✅ Valid User</p>
        ) : (
          <p className="text-sm text-neutral-400">
            ❌ {validationResult.errors?.[0] || "Invalid User"}
          </p>
        )
      )}
    </div>
  );
}