import { describe, expect, test } from "@jest/globals";
import { validatePassword } from "../services/UserService";

describe("PasswordValidator", () => {
  test("Weak password", () => {
    expect(() => validatePassword("abc123")).toThrow(Error);
  });

  test("Weak password - no special char", () => {
    expect(() => validatePassword("Abc12345")).toThrow(Error);
  });

  test("Strong password", () => {
    expect(() => validatePassword("Abc@12345")).not.toThrow();
  });
});
