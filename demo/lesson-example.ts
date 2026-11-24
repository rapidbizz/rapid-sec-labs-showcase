// Demo example — a small, self-contained password-strength lesson.
// This is an illustrative teaching example only. It is NOT part of the
// Rapid Sec Labs product code, which stays in a private repository.

export type Strength = "weak" | "fair" | "strong";

export interface PasswordCheck {
  length: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
  strength: Strength;
}

/** Score a password the way the lesson teaches: length + character variety. */
export function checkPassword(password: string): PasswordCheck {
  const length = password.length >= 12;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  const score = [length, hasUppercase, hasNumber, hasSymbol].filter(Boolean).length;
  const strength: Strength = score >= 4 ? "strong" : score >= 2 ? "fair" : "weak";

  return { length, hasUppercase, hasNumber, hasSymbol, strength };
}

export function feedback(check: PasswordCheck): string {
  if (check.strength === "strong") return "Strong password — good length and variety.";
  const missing: string[] = [];
  if (!check.length) missing.push("at least 12 characters");
  if (!check.hasUppercase) missing.push("an uppercase letter");
  if (!check.hasNumber) missing.push("a number");
  if (!check.hasSymbol) missing.push("a symbol");
  return `Add ${missing.join(", ")}.`;
}
