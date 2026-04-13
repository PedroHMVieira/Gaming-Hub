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

        const response = await api.put(
          `/users/${userId}`,
          {
            name: form.name,
            password: form.password,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSuccess("Dados atualizados com sucesso!");
        console.log("Dados atualizados:", response.data);
      } catch (error: unknown) {
        console.error("Erro ao atualizar os dados:", error);
        if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
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

      if (!userId || !token) {
        setError("Usuário não autenticado.");
        return;
      }

      await api.delete(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess("Conta deletada com sucesso!");
      logout();

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Erro ao deletar a conta:", error);
      setError("Erro ao deletar a conta. Tente novamente.");
    }
  };

  return (
    <div className="mx-auto mt-10 rounded-3xl shadow-2xl bg-white w-lg">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Minha Conta</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nome Completo"
              type="text"
              id="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <div className="relative">
              <Input
                label="Nova Senha"
                type={showPassword ? "text" : "password"}
                id="password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>

            <div className="relative">
              <Input
                label="Confirmar Senha"
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>

            <Button type="submit" className="w-full">
              Atualizar Dados
            </Button>
          </form>

          <h1 className="text-center text-lg font-semibold text-gray-700 my-6">
            Deseja deletar sua conta? Clique no botão abaixo. Essa ação é irreversível.
          </h1>

          <Button
            type="button"
            className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white"
            onClick={() => setShowDeleteModal(true)}
          >
            Deletar Conta
          </Button>

          {showDeleteModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-2xl w-full max-w-md">
                <h2 className="text-xl font-bold text-center text-red-600 mb-4">
                  Confirmação de Exclusão
                </h2>
                <p className="text-center text-gray-700 mb-4">
                  Para confirmar a exclusão da conta, digite <strong>"DELETAR"</strong> abaixo:
                </p>
                <Input
                  type="text"
                  value={deleteInput}
                  onChange={(e) => setDeleteInput(e.target.value)}
                  placeholder="Digite DELETAR"
                />
                <div className="flex justify-between mt-6">
                  <Button
                    className="bg-gray-300 hover:bg-gray-400 text-black"
                    onClick={() => {
                      setShowDeleteModal(false);
                      setDeleteInput("");
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="bg-red-500 hover:bg-red-600 text-white"
                    onClick={handleDeleteAccount}
                  >
                    Confirmar Exclusão
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