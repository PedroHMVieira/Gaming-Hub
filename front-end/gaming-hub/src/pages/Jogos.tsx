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
import { Star, StarHalf, StarOff, Gamepad2, Users, Tag, Info, Image as ImageIcon } from "lucide-react";

type Jogo = {
  id: number;
  title: string;
  authorIds: number[];
  categoryIds: number[];
  comment: string;
  score: number;
  description: string;
  coverImage: string;
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
    coverImage: "",
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
      console.log("DADOS QUE CHEGARAM DO BACKEND:", data);
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
      coverImage: jogo.coverImage || "",
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
    setForm({ title: "", authorIds: [], categoryIds: [], comment: "", score: 0, description: "", coverImage: "" });
    setEditingId(null);
  };

  const renderStars = (score: number) => {
    const fullStars = Math.floor(score / 2);
    const halfStar = score % 2 >= 1 ? 1 : 0;
    const stars = [];
    for (let i = 0; i < fullStars; i++) stars.push(<Star key={`f-${i}`} className="text-yellow-500 w-4 h-4 inline" fill="currentColor" />);
    if (halfStar) stars.push(<StarHalf key="h" className="text-yellow-500 w-4 h-4 inline" fill="currentColor" />);
    for (let i = 0; i < (5 - fullStars - halfStar); i++) stars.push(<StarOff key={`e-${i}`} className="text-gray-300 w-4 h-4 inline" />);
    return stars;
  };

  return (
    <div className="w-full p-6 md:p-10">
      <Card className="w-full bg-slate-900 border-none rounded-2xl mb-12 overflow-hidden relative shadow-2xl">
        <div
          className="absolute inset-0 opacity-40 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: `url('${fundoCardSobre}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent" />

        <CardContent className="p-12 md:p-20 relative z-10">
          <h2 className="text-4xl md:text-5xl text-white mb-4 font-black flex items-center gap-4 tracking-tighter uppercase">
            <Gamepad2 className="w-12 h-12 text-purple-500" /> GAME HUB
          </h2>
          <p className="text-slate-300 text-lg md:text-xl max-w-3xl font-light leading-relaxed">
            Sua biblioteca pessoal de jogos, salve suas gameplays, organize seus jogos zerados e deixe registrado suas lembranças epicas.
          </p>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 px-2">
        <h1 className="text-3xl font-black flex items-center gap-3 text-white tracking-tight uppercase">
          <span className="text-purple-500">🕹️</span> Meus Projetos
        </h1>

        <Dialog open={open} onOpenChange={(val) => { setOpen(val); if (!val) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700 h-14 px-10 text-lg font-bold shadow-xl shadow-purple-900/30 transition-all hover:-translate-y-1">
              Novo Jogo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-800 text-white rounded-2xl">
            <DialogTitle className="text-2xl font-black border-b border-slate-800 pb-4 uppercase tracking-tighter">
              {editingId ? "AJUSTAR PROJETO" : "LANÇAR NOVA IDEIA"}
            </DialogTitle>

            <div className="grid gap-5 py-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-400 ml-1">Título do Projeto</label>
                <Input
                  placeholder="Nome do Jogo"
                  value={form.title}
                  className="h-12 bg-slate-800 text-white text-lg border-slate-700 focus:border-purple-500"
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-400 ml-1 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> URL da Capa do Jogo
                </label>
                <Input
                  placeholder="https://exemplo.com/imagem.jpg"
                  value={form.coverImage}
                  className="h-12 bg-slate-800 text-white text-sm border-slate-700 focus:border-purple-500 placeholder:text-slate-600"
                  onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                />
                {form.coverImage && (
                  <div className="mt-2 w-full h-32 rounded-lg bg-cover bg-center border border-slate-700" style={{ backgroundImage: `url('${form.coverImage}')` }} />
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-400 ml-1">Equipe/Dev</label>
                  <select
                    className="w-full h-12 p-2 border border-slate-700 rounded-md text-sm bg-slate-800 text-white focus:ring-2 focus:ring-purple-500"
                    value={form.authorIds?.[0] || ""}
                    onChange={(e) => setForm({ ...form, authorIds: [Number(e.target.value)] })}
                  >
                    <option value="">Selecionar...</option>
                    {desenvolvedores.map((dev) => (
                      <option key={dev.id} value={dev.id}>{dev.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-400 ml-1">Gênero Principal</label>
                  <select
                    className="w-full h-12 p-2 border border-slate-700 rounded-md text-sm bg-slate-800 text-white focus:ring-2 focus:ring-purple-500"
                    value={form.categoryIds?.[0] ?? ""}
                    onChange={(e) => setForm({ ...form, categoryIds: [Number(e.target.value)] })}
                  >
                    <option value="">Selecionar...</option>
                    {generos.map((gen) => (
                      <option key={gen.id} value={gen.id}>{gen.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-400 ml-1">Notas Rápidas</label>
                <textarea
                  placeholder="Resumo das mecânicas..."
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-sm min-h-[70px] text-white focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-400 ml-1">Rank de Qualidade (0-10)</label>
                <Input
                  type="number"
                  value={form.score}
                  className="h-12 bg-slate-800 text-white font-bold text-center text-xl border-slate-700"
                  onChange={(e) => setForm({ ...form, score: Number(e.target.value) })}
                  min={0} max={10}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-400 ml-1">Documentação/Descrição</label>
                <textarea
                  placeholder="Descreva o universo, história e gameplay..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-sm min-h-[100px] text-white focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              <Button onClick={handleSubmit} className="w-full h-14 bg-purple-600 hover:bg-purple-700 text-lg font-black tracking-widest uppercase mt-4">
                {editingId ? "ATUALIZAR PROJETO" : "SALVAR NO SISTEMA"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {jogos.length === 0 ? (
        <div className="text-center py-32 border-4 border-dashed border-slate-800 rounded-3xl bg-slate-900/20">
          <p className="text-slate-500 text-2xl font-light">Sua biblioteca está vazia no momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
          {jogos.map((jogo: any) => (
            <Card key={jogo.id} className="group hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-300 flex flex-col relative overflow-hidden bg-slate-900 border-slate-800 border-2 rounded-2xl hover:-translate-y-2">
              <div
                className="h-48 w-full bg-cover bg-center border-b-2 border-slate-800 relative"
                style={{
                  backgroundImage: jogo.coverImage ? `url('${jogo.coverImage}')` : `url('${fundoCardSobre}')`,
                  backgroundColor: '#1e293b'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-90" />
                <h3 className="absolute bottom-4 left-6 right-6 text-2xl font-black text-white uppercase leading-none tracking-tight truncate drop-shadow-md">
                  {jogo.title}
                </h3>
              </div>

              <CardContent className="p-6 flex flex-col h-full bg-slate-900">
                <div className="flex gap-1 mb-6 p-2 bg-slate-800 rounded-lg w-fit border border-slate-700">
                  {renderStars(jogo.score)}
                </div>

                <div className="space-y-4 mb-8 flex-grow text-slate-300">
                  <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl group-hover:bg-slate-800 transition-colors">
                    <Users className="w-5 h-5 text-purple-500" />
                    <span className="text-sm font-bold truncate">
                      {jogo.developers?.map((d: any) => d.name).join(", ") || "Sem desenvolvedor"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl group-hover:bg-slate-800 transition-colors">
                    <Tag className="w-5 h-5 text-purple-500" />
                    <span className="text-sm font-bold truncate">
                      {jogo.genres?.map((g: any) => g.name).join(", ") || "Sem categoria"}
                    </span>
                  </div>

                  {jogo.description && (
                    <div className="mt-4 p-4 bg-slate-800/30 rounded-2xl text-sm leading-relaxed text-slate-400 italic border-l-4 border-purple-500 relative">
                      <p className="line-clamp-3">{jogo.description}</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-6 border-t border-slate-800">
                  <Button onClick={() => handleEdit(jogo)} variant="outline" className="flex-1 h-12 border-slate-700 bg-slate-800 text-white font-black uppercase text-xs tracking-widest hover:bg-purple-600 hover:text-white transition-colors">
                    Editar
                  </Button>
                  <Button onClick={() => handleDelete(jogo.id)} variant="destructive" className="h-12 px-6 font-black uppercase text-xs tracking-widest bg-red-900/50 text-red-500 hover:bg-red-600 hover:text-white border border-red-900/50">
                    Remover
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