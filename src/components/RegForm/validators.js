export const isValidPassword = (password) => {
  // Проверка: минимум 6 символов, есть буква и есть цифра
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  return password.length >= 6 && hasLetter && hasDigit;
};

export const isValidEmail = (email) => {
  // Простая проверка на наличие @ и точки
  return email.includes("@") && email.includes(".");
};
