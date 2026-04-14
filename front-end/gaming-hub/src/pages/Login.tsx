import { useState } from "react";
import { useNavigate } from "react-router";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/components/ui/tabs";
import { Input } from "../components/components/ui/input";
import { validateEmail } from "../utils/validations";
import { maskJs } from "mask-js";
import api from "../services/api";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { Gamepad2, Mail, Lock, User, CreditCard, Eye, EyeOff } from "lucide-react";

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
        setTab("login");
      } catch (err) {
        setError(axios.isAxiosError(err) ? err.response?.data?.error || "Erro ao criar conta." : "Erro desconhecido.");
      }
    } else {
      if (!form.email || !form.password) return setError("E-mail e senha são obrigatórios!");
      try {
        const response = await api.post("/login", {
          email: form.email,
          password: form.password,
        });
        const { token, userId } = response.data;
        login(token);
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        navigate("/");
      } catch (err) {
        setError(axios.isAxiosError(err) ? err.response?.data?.error || "Erro ao fazer login." : "Erro desconhecido.");
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 relative overflow-hidden p-4">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />

      <div className="w-full max-w-[450px] z-10">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg shadow-purple-500/30 mb-4 transform hover:rotate-12 transition-transform">
            <Gamepad2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
            Game<span className="text-purple-500">Hub</span>
          </h1>
          <p className="text-slate-400 text-sm mt-2 font-medium">Sua biblioteca definitiva de projetos</p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative">
          <Tabs defaultValue="login" onValueChange={setTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-8 bg-slate-950/50 p-1 border border-slate-800 h-12 rounded-xl">
              <TabsTrigger value="login" className="rounded-lg data-[state=active]:bg-purple-600 data-[state=active]:text-white transition-all font-bold uppercase text-xs">Entrar</TabsTrigger>
              <TabsTrigger value="signup" className="rounded-lg data-[state=active]:bg-purple-600 data-[state=active]:text-white transition-all font-bold uppercase text-xs">Criar Conta</TabsTrigger>
            </TabsList>

            <TabsContent value={tab} className="mt-0 outline-none">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                {tab === "login" ? "Bem-vindo de volta, Jogador" : "Junte-se ao Esquadrão"}
              </h2>

              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-xl text-sm mb-6 animate-pulse">
                  ⚠️ {error}
                </div>
              )}
              {success && (
                <div className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-500 p-3 rounded-xl text-sm mb-6">
                  ✅ {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {tab === "signup" && (
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-purple-500 transition-colors" />
                    <Input id="fullName" placeholder="Nome Completo" value={form.fullName} onChange={handleChange}
                      className="pl-12 bg-slate-950/50 border-slate-800 text-white h-12 focus:ring-purple-500" required />
                  </div>
                )}

                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-purple-500 transition-colors" />
                  <Input id="email" type="email" placeholder="Seu E-mail" value={form.email} onChange={handleChange}
                    className="pl-12 bg-slate-950/50 border-slate-800 text-white h-12 focus:ring-purple-500" required />
                </div>

                {tab === "signup" && (
                  <div className="relative group">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-purple-500 transition-colors" />
                    <Input id="cpf" placeholder="Seu CPF" value={form.cpf} onChange={handleChange}
                      className="pl-12 bg-slate-950/50 border-slate-800 text-white h-12 focus:ring-purple-500" required />
                  </div>
                )}

                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-purple-500 transition-colors" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua Senha"
                    value={form.password}
                    onChange={handleChange}
                    className="pl-12 pr-12 bg-slate-950/50 border-slate-800 text-white h-12 focus:ring-purple-500"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {tab === "signup" && (
                  <div className="relative group animate-in slide-in-from-top-2 duration-300">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-purple-500 transition-colors" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirme a Senha"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      className="pl-12 bg-slate-950/50 border-slate-800 text-white h-12 focus:ring-purple-500"
                      required
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white py-3 rounded-xl font-black uppercase tracking-widest shadow-lg shadow-purple-600/20 transform active:scale-95 transition-all mt-6 h-14"
                >
                  {tab === "login" ? "Iniciar Jogo" : "Subir de Nível"}
                </button>
              </form>
            </TabsContent>
          </Tabs>
        </div>

        <p className="text-center text-slate-600 text-[10px] mt-8 uppercase tracking-[0.2em] font-bold">
          Protegido por Protocolo de Autenticação Segura v2.0
        </p>
      </div>
    </div>
  );
};

export default Login;