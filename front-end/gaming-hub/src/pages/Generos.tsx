import { useEffect, useState } from "react";
import { Button } from "../components/components/ui/button";
import { Input } from "../components/components/ui/input";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "../components/components/ui/dialog";
import { Card, CardContent } from "../components/components/ui/card";
import { Tag, Plus, Pencil, Trash2, Gamepad } from "lucide-react";

type Genero = {
  id: number;
  name: string;
};

const API_URL = "http://localhost:3000/genres";

const Generos = () => {
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [form, setForm] = useState<Omit<Genero, "id">>({ name: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchGeneros();
  }, []);

  const fetchGeneros = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Erro ao buscar gêneros");

      const data = await response.json();
      setGeneros(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao carregar lista:", error);
    }
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) return alert("O nome do gênero é obrigatório");

    try {
      const token = localStorage.getItem("token");
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;
      const method = editingId ? "PUT" : "POST";

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
        throw new Error(errorData.message || "Erro ao salvar no servidor");
      }

      setForm({ name: "" });
      setEditingId(null);
      setOpen(false);
      fetchGeneros();
    } catch (error: any) {
      alert(`Erro: ${error.message}`);
      console.error("Erro ao salvar gênero:", error);
    }
  };

  const handleEdit = (genero: Genero) => {
    setForm({ name: genero.name });
    setEditingId(genero.id);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Excluir este gênero? Isso pode afetar os jogos vinculados.")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Não foi possível excluir");

      fetchGeneros();
    } catch (error) {
      console.error("Erro ao excluir:", error);
      alert("Erro ao excluir gênero.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full bg-slate-800 border-none rounded-lg mb-10 overflow-hidden">
        <CardContent className="p-8 text-center md:text-left rounded-lg bg-gradient-to-r from-blue-900/40 to-transparent">
          <h2 className="text-2xl text-white mb-4 font-bold flex items-center gap-2">
            <Tag className="w-6 h-6 text-blue-400" /> Gêneros e Categorias
          </h2>
          <p className="text-slate-200 mb-4 font-light">
            Defina os gêneros dos seus jogos (RPG, FPS, Plataforma, Indie).
            As categorias ajudam a organizar sua biblioteca e facilitam a busca por mecânicas específicas.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          Categorias de Jogo
        </h1>
        <Dialog open={open} onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            setEditingId(null);
            setForm({ name: "" });
          }
        }}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" /> Novo Gênero
            </Button>
          </DialogTrigger>
          <DialogContent className="space-y-4">
            <DialogTitle className="text-lg font-semibold text-black">
              {editingId ? "Editar Gênero" : "Adicionar Gênero"}
            </DialogTitle>

            <Input
              placeholder="Ex: RPG, Ação, Metroidvania..."
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Button onClick={handleSubmit} className="w-full bg-blue-600 hover:bg-blue-700">
              {editingId ? "Salvar Alterações" : "Cadastrar Gênero"}
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      {generos.length === 0 ? (
        <div className="text-center py-10 bg-slate-900/50 rounded-lg border border-dashed border-slate-700">
          <p className="text-slate-500">Nenhum gênero cadastrado. Que tal "Souls-like"?</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {generos.map((genero) => (
            <div
              key={genero.id}
              className="group p-4 rounded-xl bg-slate-800 border border-slate-700 hover:border-blue-500/50 transition-all flex flex-col gap-3 justify-between"
            >
              <div className="flex items-center gap-2">
                <Gamepad className="w-4 h-4 text-blue-400 opacity-50" />
                <h3 className="text-lg font-medium text-white truncate">{genero.name}</h3>
                <span className="text-[10px] text-slate-500 font-mono">#{genero.id}</span>
              </div>

              <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(genero)}
                  className="h-8 w-8 text-slate-400 hover:text-white"
                >
                  <Pencil className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(genero.id)}
                  className="h-8 w-8 text-red-400 hover:text-red-500 hover:bg-red-500/10"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Generos;