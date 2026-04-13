import { useState } from "react";
import { useNavigate } from "react-router";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/components/ui/tabs";
import { Input } from "../components/components/ui/input";
import { validateEmail } from "../utils/validations";
import { maskJs } from "mask-js";
import api from "../services/api";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    cpf: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "cpf") {
      const cleanedValue = value.replace(/\D/g, "");
      const formattedValue = maskJs("999.999.999-99", cleanedValue);
      setForm({ ...form, [id]: formattedValue });
    } else {
      setForm({ ...form, [id]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (tab === "signup") {

      if (!form.fullName.trim()) return setError("O nome completo é obrigatório!");
      if (!validateEmail(form.email)) return setError("E-mail inválido!");
      if (form.password !== form.confirmPassword) return setError("As senhas não coincidem!");

      try {
        const response = await api.post("/users", {
          name: form.fullName,
          email: form.email,
          password: form.password,
          cpf: form.cpf.replace(/\D/g, ""),
        });
        setSuccess(response.data.message || "Conta criada com sucesso!");
        setForm({ fullName: "", email: "", password: "", confirmPassword: "", cpf: "" });
      } catch (err) {
        setError(axios.isAxiosError(err) ? err.response?.data?.error || "Erro ao criar conta." : "Erro desconhecido.");
      }
    } else {
      // Login
      if (!form.email || !form.password) return setError("E-mail e senha são obrigatórios!");

      try {
        const response = await api.post("/login", {
          email: form.email,
          password: form.password,
        });
        const token = response.data.token;
        const userId = response.data.userId;

        login(token);
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);

        console.log("Login bem-sucedido, redirecionando para a página inicial...");
        navigate("/");
      } catch (err) {
        setError(axios.isAxiosError(err) ? err.response?.data?.error || "Erro ao fazer login." : "Erro desconhecido.");
      }
    }
  };

  return (
    <div className="mx-auto mt-10 p-6 border rounded-3xl shadow-2xl bg-white w-lg">
      <Tabs defaultValue="login" onValueChange={setTab}>
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="login">Entrar</TabsTrigger>
          <TabsTrigger value="signup">Criar Conta</TabsTrigger>
        </TabsList>

        <TabsContent value={tab}>
          <h2 className="text-2xl font-bold mb-4">{tab === "login" ? "Login" : "Criar Conta"}</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          <form onSubmit={handleSubmit}>
            {tab === "signup" && (
              <Input label="Nome Completo" type="text" id="fullName" value={form.fullName} onChange={handleChange} required />
            )}
            <Input label="E-mail" type="email" id="email" value={form.email} onChange={handleChange} required />
            {tab === "signup" && (
              <Input label="CPF" type="text" id="cpf" value={form.cpf} onChange={handleChange} required />
            )}
            <div className="relative">
              <Input
                label="Senha"
                type={showPassword ? "text" : "password"}
                id="password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-9 transform translate-y-1 flex items-center"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {tab === "signup" && (
              <Input
                label="Confirmar Senha"
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            )}
            <button type="submit" className="bg-black text-white py-2 px-4 rounded mt-4 w-full">
              {tab === "login" ? "Entrar" : "Criar Conta"}
            </button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
