import { validateCPF } from "../services/UserService";

describe("validateCPF", () => {
  test("Deve validar um CPF válido", () => {
    expect(validateCPF("541.163.700-70")).toBe(true);
  });

  test("Deve lançar erro para um CPF inválido", () => {
    expect(() => validateCPF("123.456.789-00")).toThrow("CPF inválido.");
  });

  test("Deve lançar erro para um CPF com caracteres inválidos", () => {
    expect(() => validateCPF("abc.def.ghi-jk")).toThrow("CPF inválido.");
  });

  test("Deve lançar erro para um CPF vazio", () => {
    expect(() => validateCPF("")).toThrow("CPF inválido.");
  });
});