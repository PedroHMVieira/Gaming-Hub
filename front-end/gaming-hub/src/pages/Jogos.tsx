import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../components/components/ui/button";
import { Input } from "../components/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "../components/components/ui/dialog";
import { Card, CardContent } from "../components/components/ui/card";
import fundoCardSobre from "../assets/fundo-cardsobre.jpg";
import { Star, StarHalf, StarOff, Gamepad2, Users, Tag, MessageSquare, Info } from "lucide-react";

type Jogo = {
  id: number;
  title: string;
  authorIds: number[];
  categoryIds: number[];
  comment: string;
  score: number;
  description: string;
  developers?: Desenvolvedor[];
  genres?: Genero[];
};

type Desenvolvedor = {
  id: number;
  name: string;
};

type Genero = {
  id: number;
  name: string;
};

const Jogos = () => {
  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [desenvolvedores, setDesenvolvedores] = useState<Desenvolvedor[]>([]);
  const [generos, setGeneros] = useState<Genero[]>([]);

  const [form, setForm] = useState<Omit<Jogo, "id">>({
    title: "",
    authorIds: [],
    categoryIds: [],
    comment: "",
    score: 0,
    description: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const API = "http://localhost:3000";

  useEffect(() => {
    fetchJogos();
    fetchDesenvolvedores();
    fetchGeneros();
  }, []);

  const fetchJogos = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${API}/games`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data.data || res.data;
      setJogos(Array.isArray(data) ? data : []);
    } catch (error: any) {
      console.error("Erro ao buscar jogos:", error.message);
      setJogos([]);
    }
  };

  const fetchDesenvolvedores = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${API}/developers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDesenvolvedores(Array.isArray(res.data) ? res.data : (res.data.data || []));
    } catch (error: any) {
      console.error("Erro ao buscar desenvolvedores:", error.message);
    }
  };

  const fetchGeneros = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${API}/genres`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGeneros(Array.isArray(res.data) ? res.data : (res.data.data || []));
    } catch (error: any) {
      console.error("Erro ao buscar gêneros:", error.message);
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    try {
      if (editingId !== null) {
        await axios.put(`${API}/games/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${API}/games`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchJogos();
      resetForm();
      setOpen(false);
    } catch (error: any) {
      alert("Erro ao salvar projeto: " + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (jogo: Jogo) => {
    setForm({
      title: jogo.title,
      authorIds: jogo.authorIds?.length ? jogo.authorIds : (jogo.developers?.map(d => d.id) || []),
      categoryIds: jogo.categoryIds?.length ? jogo.categoryIds : (jogo.genres?.map(g => g.id) || []),
      comment: jogo.comment || "",
      score: jogo.score || 0,
      description: jogo.description || "",
    });
    setEditingId(jogo.id);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!confirm("Deseja realmente excluir este projeto?")) return;
    try {
      await axios.delete(`${API}/games/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchJogos();
    } catch (error: any) {
      console.error("Erro ao deletar:", error.message);
    }
  };

  const resetForm = () => {
    setForm({ title: "", authorIds: [], categoryIds: [], comment: "", score: 0, description: "" });
    setEditingId(null);
  };

  const renderStars = (score: number) => {
    const fullStars = Math.floor(score / 2);
    const halfStar = score % 2 >= 1 ? 1 : 0;
    const stars = [];
    for (let i = 0; i < fullStars; i++) stars.push(<Star key={`f-${i}`} className="text-yellow-500 w-4 h-4 inline" fill="currentColor" />);
    if (halfStar) stars.push(<StarHalf key="h" className="text-yellow-500 w-4 h-4 inline" fill="currentColor" />);
    for (let i = 0; i < (5 - fullStars - halfStar); i++) stars.push(<StarOff key={`e-${i}`} className="text-gray-400 w-4 h-4 inline" />);
    return stars;
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full bg-slate-900 border-none rounded-lg mb-10 overflow-hidden relative">
        <div
          className="absolute inset-0 opacity-30 bg-cover bg-center"
          style={{ backgroundImage: `url(${fundoCardSobre})` }}
        />
        <CardContent className="p-8 relative z-10">
          <h2 className="text-3xl text-white mb-2 font-bold flex items-center gap-2">
            <Gamepad2 className="w-8 h-8 text-purple-400" /> Game Hub
          </h2>
          <p className="text-slate-300 max-w-2xl font-light">
            Registre seus jogos. Documente mecânicas e organize sua biblioteca.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">🕹️ Meus Projetos</h1>
        <Dialog open={open} onOpenChange={(val) => { setOpen(val); if (!val) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">Novo Jogo</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogTitle className="text-lg font-semibold text-black">
              {editingId ? "Editar Projeto" : "Lançar Nova Ideia"}
            </DialogTitle>

            <div className="grid gap-4 py-4">
              <Input
                placeholder="Nome do Jogo"
                value={form.title}
                className="text-black"
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />

              <select
                className="w-full p-2 border rounded text-sm bg-white text-black"
                value={form.authorIds?.[0] || ""}
                onChange={(e) => setForm({ ...form, authorIds: [Number(e.target.value)] })}
              >
                <option value="">Responsável / Desenvolvedor</option>
                {desenvolvedores.map((dev) => (
                  <option key={dev.id} value={dev.id}>{dev.name}</option>
                ))}
              </select>

              <select
                className="w-full p-2 border rounded text-sm bg-white text-black"
                value={form.categoryIds?.[0] ?? ""}
                onChange={(e) => setForm({ ...form, categoryIds: [Number(e.target.value)] })}
              >
                <option value="">Gênero / Categoria</option>
                {generos.map((gen) => (
                  <option key={gen.id} value={gen.id}>{gen.name}</option>
                ))}
              </select>

              <textarea
                placeholder="Notas de desenvolvimento"
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                className="w-full border rounded-md p-2 text-sm min-h-[80px] text-black"
              />

              <div className="space-y-1">
                <label className="text-xs text-gray-500">Avaliação (0-10)</label>
                <Input
                  type="number"
                  value={form.score}
                  className="text-black"
                  onChange={(e) => setForm({ ...form, score: Number(e.target.value) })}
                  min={0}
                  max={10}
                />
              </div>

              <textarea
                placeholder="Descrição completa..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border rounded-md p-2 text-sm min-h-[100px] text-black"
              />

              <Button onClick={handleSubmit} className="w-full bg-purple-600">
                {editingId ? "Salvar Alterações" : "Registrar Projeto"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {jogos.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-xl">
          <p className="text-gray-500">Nenhum projeto encontrado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jogos.map((jogo: any) => (
            <Card key={jogo.id} className="hover:shadow-md transition-shadow flex flex-col">
              <CardContent className="p-5 flex flex-col h-full">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-800 uppercase tracking-tight">{jogo.title}</h3>
                  <div className="flex">{renderStars(jogo.score)}</div>
                </div>

                <div className="space-y-2 mb-4 flex-grow text-black">
                  <p className="text-sm text-slate-600 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {jogo.developers?.map((d: any) => d.name).join(", ") || "Sem dev"}
                  </p>
                  <p className="text-sm text-slate-600 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    {jogo.genres?.map((g: any) => g.name).join(", ") || "Sem gênero"}
                  </p>

                  {jogo.description && (
                    <div className="mt-3 p-3 bg-slate-50 rounded text-sm text-slate-700 italic border-l-4 border-purple-400">
                      <Info className="w-3 h-3 mb-1 inline mr-1" /> {jogo.description}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <Button onClick={() => handleEdit(jogo)} variant="outline" size="sm" className="flex-1">
                    Editar
                  </Button>
                  <Button onClick={() => handleDelete(jogo.id)} variant="destructive" size="sm">
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jogos;