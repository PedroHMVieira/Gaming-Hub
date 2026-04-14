import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/components/ui/card";
import { Input } from "../components/components/ui/input";
import { Button } from "../components/components/ui/button";
import api from "../services/api";
import axios from "axios";

const MinhaConta = () => {
  const [form, setForm] = useState({
    name: "Novo Nome",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");

  const navigate = useNavigate();
  const { logout, token } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      setError("O nome completo é obrigatório!");
      return false;
    }
    if (!form.password || form.password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres!");
      return false;
    }
    if (form.password !== form.confirmPassword) {
      setError("As senhas não coincidem!");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId || !token) {
          setError("Usuário não autenticado. Faça login novamente.");
          return;
        }
        await api.put(`/users/${userId}`, { name: form.name, password: form.password }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccess("Dados atualizados com sucesso!");
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.data?.message) {
          setError(error.response.data.message);
        } else {
          setError("Erro ao atualizar os dados. Tente novamente.");
        }
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteInput !== "DELETAR") {
      setError("Para deletar a conta, digite 'DELETAR' corretamente.");
      return;
    }
    try {
      const userId = localStorage.getItem("userId");
      if (!userId || !token) return;
      await api.delete(`/users/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
      setSuccess("Conta deletada com sucesso!");
      logout();
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setError("Erro ao deletar a conta. Tente novamente.");
    }
  };

  return (
    <div className="mx-auto mt-10 rounded-3xl shadow-2xl bg-slate-900 w-lg overflow-hidden border border-slate-800">
      <Card className="bg-slate-900 border-none">
        <CardHeader>
          <CardTitle className="text-white text-2xl font-bold">Minha Conta</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-400 mb-4 font-medium">{error}</p>}
          {success && <p className="text-emerald-400 mb-4 font-medium">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase text-slate-400 ml-1">Nome Completo</label>
              <Input
                type="text"
                id="name"
                value={form.name}
                onChange={handleChange}
                className="bg-slate-800 text-white border-slate-700 h-12 focus:ring-purple-500"
                required
              />
            </div>

            <div className="relative space-y-2">
              <label className="text-sm font-bold uppercase text-slate-400 ml-1">Nova Senha</label>
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                value={form.password}
                onChange={handleChange}
                className="bg-slate-800 text-white border-slate-700 h-12 pr-20"
                required
              />
              <button
                type="button"
                className="absolute right-3 bottom-3 text-xs font-bold text-purple-400 hover:text-purple-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "OCULTAR" : "MOSTRAR"}
              </button>
            </div>

            <div className="relative space-y-2">
              <label className="text-sm font-bold uppercase text-slate-400 ml-1">Confirmar Senha</label>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="bg-slate-800 text-white border-slate-700 h-12 pr-20"
                required
              />
              <button
                type="button"
                className="absolute right-3 bottom-3 text-xs font-bold text-purple-400 hover:text-purple-300"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "OCULTAR" : "MOSTRAR"}
              </button>
            </div>

            <Button type="submit" className="w-full h-12 bg-purple-600 hover:bg-purple-700 font-bold text-white uppercase tracking-widest">
              Atualizar Dados
            </Button>
          </form>

          <div className="mt-10 pt-6 border-t border-slate-800 text-center">
            <p className="text-slate-400 text-sm mb-4">
              Deseja deletar sua conta? Essa ação é <span className="text-red-500 font-bold">irreversível</span>.
            </p>
            <Button
              type="button"
              className="w-full bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold transition-all"
              onClick={() => setShowDeleteModal(true)}
            >
              Deletar Conta
            </Button>
          </div>

          {showDeleteModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50 p-4">
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl w-full max-w-md shadow-2xl">
                <h2 className="text-2xl font-black text-center text-red-500 mb-4 uppercase tracking-tighter">
                  Atenção Total
                </h2>
                <p className="text-center text-slate-300 mb-6">
                  Para confirmar a exclusão, digite <span className="text-white font-bold italic">"DELETAR"</span> no campo abaixo:
                </p>
                <Input
                  type="text"
                  value={deleteInput}
                  onChange={(e) => setDeleteInput(e.target.value)}
                  placeholder="DELETAR"
                  className="bg-slate-800 text-white border-slate-700 h-12 text-center font-bold"
                />
                <div className="flex gap-3 mt-8">
                  <Button
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold"
                    onClick={() => {
                      setShowDeleteModal(false);
                      setDeleteInput("");
                    }}
                  >
                    VOLTAR
                  </Button>
                  <Button
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold"
                    onClick={handleDeleteAccount}
                  >
                    EXCLUIR
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MinhaConta;