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
    <div className="w-full p-6 md:p-10">
      <Card className="w-full bg-slate-900 border-none rounded-2xl mb-12 overflow-hidden relative shadow-2xl">
        <CardContent className="p-12 md:p-20 relative z-10 bg-gradient-to-r from-blue-900/80 via-blue-900/40 to-transparent">
          <h2 className="text-4xl md:text-5xl text-white mb-4 font-black flex items-center gap-4 tracking-tighter">
            <Tag className="w-12 h-12 text-blue-400" /> GÊNEROS E CATEGORIAS
          </h2>
          <p className="text-slate-200 text-lg md:text-xl max-w-3xl font-light leading-relaxed">
            Defina a alma dos seus projetos. Organize sua biblioteca por gêneros como RPG, FPS ou Indie
            para facilitar a navegação e o gerenciamento das suas mecânicas.
          </p>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 px-2">
        <h1 className="text-3xl font-black text-white flex items-center gap-3 tracking-tight uppercase">
          <span className="text-blue-500">🏷️</span> Categorias Disponíveis
        </h1>
        <Dialog open={open} onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            setEditingId(null);
            setForm({ name: "" });
          }
        }}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 h-14 px-10 text-lg font-bold shadow-xl shadow-blue-900/30 transition-all hover:-translate-y-1">
              <Plus className="w-5 h-5 mr-2" /> Novo Gênero
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[450px] bg-slate-900 border-slate-800 text-white">
            <DialogTitle className="text-2xl font-black border-b border-slate-800 pb-4">
              {editingId ? "AJUSTAR CATEGORIA" : "NOVA CATEGORIA"}
            </DialogTitle>

            <div className="py-6 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-400 ml-1">Nome do Gênero</label>
                <Input
                  placeholder="Ex: Metroidvania, Roguelike..."
                  value={form.name}
                  className="h-14 bg-slate-800 text-white text-lg border-slate-700 focus:border-blue-500 placeholder:text-slate-500"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <Button onClick={handleSubmit} className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-lg font-black uppercase tracking-widest">
                {editingId ? "SALVAR ALTERAÇÕES" : "CONFIRMAR REGISTRO"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {generos.length === 0 ? (
        <div className="text-center py-32 bg-slate-900/20 rounded-3xl border-4 border-dashed border-slate-800">
          <p className="text-slate-500 text-2xl font-light">Nenhuma categoria mapeada no sistema.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {generos.map((genero) => (
            <div
              key={genero.id}
              className="group p-6 rounded-2xl bg-slate-800/50 border-2 border-slate-800 hover:border-blue-500/50 transition-all hover:-translate-y-1 flex flex-col justify-between gap-4 shadow-lg shadow-black/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                    <Gamepad className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white truncate group-hover:text-blue-300 transition-colors">
                      {genero.name}
                    </h3>
                    <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">ID: #{genero.id}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-700/50">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(genero)}
                  className="h-10 w-10 text-slate-400 hover:text-white hover:bg-slate-700"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(genero.id)}
                  className="h-10 w-10 text-red-400 hover:text-red-500 hover:bg-red-500/10"
                >
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

export default Generos;