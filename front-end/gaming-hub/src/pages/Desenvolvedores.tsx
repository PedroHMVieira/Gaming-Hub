import { useEffect, useState } from "react";
import { Button } from "../components/components/ui/button";
import { Input } from "../components/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "../components/components/ui/dialog";
import { Card, CardContent } from "../components/components/ui/card";
import { Users, UserPlus, Pencil, Trash2 } from "lucide-react";

type Desenvolvedor = {
  id: number;
  name: string;
};

const API_URL = "http://localhost:3000/developers";

const Desenvolvedores = () => {
  const [desenvolvedores, setDesenvolvedores] = useState<Desenvolvedor[]>([]);
  const [form, setForm] = useState<Omit<Desenvolvedor, "id">>({ name: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDesenvolvedores();
  }, []);

  const fetchDesenvolvedores = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Erro ao buscar desenvolvedores");

      const data = await response.json();
      setDesenvolvedores(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro na busca:", error);
      setDesenvolvedores([]);
    }
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) return alert("O nome é obrigatório");

    const method = editingId !== null ? "PUT" : "POST";
    const url = editingId !== null ? `${API_URL}/${editingId}` : API_URL;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao salvar");
      }


      setForm({ name: "" });
      setEditingId(null);
      setOpen(false);
      fetchDesenvolvedores();

    } catch (error: any) {
      alert(`Erro: ${error.message}`);
      console.error(error);
    }
  };

  const handleEdit = (dev: Desenvolvedor) => {
    setForm({ name: dev.name });
    setEditingId(dev.id);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Deseja remover este desenvolvedor?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Erro ao deletar");

      fetchDesenvolvedores();
    } catch (error) {
      alert("Não foi possível excluir o desenvolvedor.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full bg-slate-800 border-none rounded-lg mb-10 overflow-hidden">
        <CardContent className="p-8 text-center md:text-left rounded-lg bg-gradient-to-r from-purple-900/50 to-transparent">
          <h2 className="text-2xl text-white mb-4 font-bold flex items-center gap-2">
            <Users className="w-6 h-6 text-purple-400" /> Cadastro de Desenvolvedores
          </h2>
          <p className="text-slate-200 mb-4 font-light">
            Registre os talentos por trás dos projetos. Adicione criadores, programadores ou estúdios
            para vinculá-los às suas ideias de jogos.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-white">
          Lista de Equipes
        </h1>
        <Dialog open={open} onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            setEditingId(null);
            setForm({ name: "" });
          }
        }}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <UserPlus className="w-4 h-4 mr-2" /> Novo Desenvolvedor
            </Button>
          </DialogTrigger>
          <DialogContent className="space-y-4">
            <h2 className="text-lg font-semibold text-black">
              {editingId ? "Editar Nome" : "Registrar Desenvolvedor"}
            </h2>
            <Input
              placeholder="Nome do Dev ou Estúdio"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Button onClick={handleSubmit} className="w-full bg-purple-600 hover:bg-purple-700">
              {editingId ? "Atualizar" : "Cadastrar"}
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      {desenvolvedores.length === 0 ? (
        <div className="text-center py-10 bg-slate-900/50 rounded-lg border border-dashed border-slate-700">
          <p className="text-slate-500 text-lg">Nenhum desenvolvedor cadastrado ainda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {desenvolvedores.map((dev) => (
            <div
              key={dev.id}
              className="p-4 rounded-lg shadow-sm flex justify-between items-center gap-4 bg-slate-800 border border-slate-700"
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white">{dev.name}</h3>
                <span className="text-xs text-purple-400 font-mono">ID: #{dev.id}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(dev)} className="text-slate-300 hover:text-white">
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(dev.id)} className="text-red-400 hover:text-red-500 hover:bg-red-500/10">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Desenvolvedores;