// Demo example — plain JavaScript version of the password lesson.
// Illustrative example only, not product code.

function checkPassword(password) {
  const checks = {
    length: password.length >= 12,
    hasUppercase: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSymbol: /[^A-Za-z0-9]/.test(password),
  };
  const score = Object.values(checks).filter(Boolean).length;
  const strength = score >= 4 ? "strong" : score >= 2 ? "fair" : "weak";
  return { ...checks, strength };
}

module.exports = { checkPassword };
