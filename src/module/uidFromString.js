export default (inputString) => {
  // Simple hash function to convert string to a number
  function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash &= hash; // Convert to 32-bit integer
    }
    return hash;
  }

  // Convert hash to a positive number
  function toPositiveNumber(num) {
    return num >>> 0;
  }

  // Pad the number to ensure it has exactly 12 digits
  function padTo12Digits(num) {
    return String(num).padStart(12, '0').slice(-12);
  }

  const hash = hashString(inputString);
  const positiveHash = toPositiveNumber(hash);
  const uniqueId = padTo12Digits(positiveHash);

  return uniqueId;
}
