import { useState } from "react";
import axios from "axios"; 
import { Input } from "../components/components/ui/input";
import { validateEmail, validateCPF, validatePassword } from "../utils/validations";

const Register = () => {
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password || !confirmPassword || !cpf) {
      setError("Todos os campos são obrigatórios!");
      return;
    }
    if (!validateEmail(email)) {
      setError("E-mail inválido!");
      return;
    }
    if (!validateCPF(cpf)) {
      setError("CPF inválido!");
      return;
    }
    if (!validatePassword(password, confirmPassword)) {
      setError("As senhas não coincidem!");
      return;
    }

    try {
      const response = await axios.post<{ message: string }>("http://localhost:3000/users", {
        name: "Usuário Teste",
        email,
        password,
        cpf,
      });

      setSuccess(response.data.message);
      setEmail("");
      setCpf("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || "Erro ao cadastrar usuário");
      } else {
        setError("Erro desconhecido ao cadastrar usuário");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Cadastro</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <Input label="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input label="CPF" type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
        <Input label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Input label="Confirmar Senha" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-4 w-full">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Register;
