export const formatPhoneNumberRaw = (value: string): string => {
  return value.replace(/\D/g, '').substring(0, 10);
};

export const validatePhoneNumber = (value: string): boolean => {
  const clean = value.replace(/\D/g, '');
  
  // 1. Must be 10 digits
  if (clean.length !== 10) return false;
  
  // 2. Strict US/NANP Regex: /^[2-9]\d{2}[2-9]\d{6}$/
  // NXX-NXX-XXXX (N is 2-9, area code and exchange code cannot start with 0 or 1)
  if (!/^[2-9]\d{2}[2-9]\d{6}$/.test(clean)) return false;

  // 3. Frequency check: Reject if new Set(digits).size <= 3
  const digits = clean.split('');
  if (new Set(digits).size <= 3) return false;

  // 4. Block numbers where any single digit repeats 5 or more times
  const counts = digits.reduce((acc, digit) => {
    acc[digit] = (acc[digit] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  if (Object.values(counts).some(count => count >= 5)) return false;

  // 5. Block sequential numbers
  const sequentialPatterns = ['0123456789', '1234567890', '9876543210', '8765432109'];
  if (sequentialPatterns.some(pattern => clean.includes(pattern))) return false;
  
  return true;
};

export const formatZipCode = (value: string): string => {
  return value.replace(/\D/g, '').substring(0, 5);
};

export const validateZipCode = (value: string): boolean => {
  return value.replace(/\D/g, '').length === 5;
};

export const formatSSN = (value: string): string => {
  const digits = value.replace(/\D/g, '').substring(0, 9);
  if (digits.length === 0) return '';
  if (digits.length <= 3) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
};

export const validateSSN = (value: string): boolean => {
  return value.replace(/\D/g, '').length === 9;
};

export const formatName = (value: string): string => {
  return value.replace(/[^a-zA-Z\s]/g, '');
};

export const validateName = (value: string): boolean => {
  return value.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(value.trim());
};
