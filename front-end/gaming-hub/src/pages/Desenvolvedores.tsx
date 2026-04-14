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
    /* Mudança aqui: w-full e removido o container mx-auto */
    <div className="w-full p-6 md:p-10">
      <Card className="w-full bg-slate-800 border-none rounded-lg mb-10 overflow-hidden shadow-2xl">
        <CardContent className="p-10 md:p-16 text-center md:text-left rounded-lg bg-gradient-to-r from-purple-900/80 via-purple-900/40 to-transparent">
          <h2 className="text-3xl md:text-4xl text-white mb-4 font-bold flex items-center gap-3">
            <Users className="w-10 h-10 text-purple-400" /> Cadastro de Desenvolvedores
          </h2>
          <p className="text-slate-200 text-lg max-w-4xl font-light leading-relaxed">
            Registre os talentos por trás dos projetos. Adicione criadores, programadores ou estúdios
            para vinculá-los às suas ideias de jogos e organizar sua rede de colaboração.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center mb-8 px-2">
        <h1 className="text-3xl font-bold flex items-center gap-2 text-white tracking-tight">
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
            <Button className="bg-purple-600 hover:bg-purple-700 h-12 px-6 text-lg font-semibold shadow-lg shadow-purple-900/20">
              <UserPlus className="w-5 h-5 mr-2" /> Novo Desenvolvedor
            </Button>
          </DialogTrigger>
          <DialogContent className="space-y-4">
            <h2 className="text-xl font-bold text-black border-b pb-2">
              {editingId ? "Editar Nome" : "Registrar Desenvolvedor"}
            </h2>
            <div className="py-4">
              <label className="text-sm text-slate-500 mb-1 block font-medium">Nome da Identidade</label>
              <Input
                placeholder="Ex: Rockstar North ou Hideo Kojima"
                value={form.name}
                className="h-12 text-black"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <Button onClick={handleSubmit} className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-lg">
              {editingId ? "Salvar Alterações" : "Confirmar Cadastro"}
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      {desenvolvedores.length === 0 ? (
        <div className="text-center py-24 bg-slate-900/30 rounded-2xl border-2 border-dashed border-slate-800">
          <p className="text-slate-500 text-xl">Ainda não há talentos registrados na sua rede.</p>
        </div>
      ) : (
        /* Grid ajustado para aproveitar o espaço total */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {desenvolvedores.map((dev) => (
            <div
              key={dev.id}
              className="group p-6 rounded-xl shadow-lg flex justify-between items-center gap-4 bg-slate-800/80 border border-slate-700 hover:border-purple-500/50 transition-all hover:-translate-y-1"
            >
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">{dev.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-slate-700 rounded text-[10px] text-slate-400 font-mono">ID: #{dev.id}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(dev)} className="text-slate-400 hover:text-white hover:bg-slate-700">
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(dev.id)} className="text-slate-500 hover:text-red-400 hover:bg-red-500/10">
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