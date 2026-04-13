export const validateEmail = (email: string): boolean => {
  return email.includes("@") && email.includes(".");
};

export const validateCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11) return false;
  return true;
};

export const validatePassword = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};
