import { useEffect, useState } from "react";
import CustomCard from "../components/custom/Card";
import { Card, CardContent } from "../components/components/ui/card";
import { Rocket, LayoutGrid, Gamepad2 } from "lucide-react";

import fundoCardSobre from "../assets/fundo-cardsobre.jpg";
import logoPortal from "../assets/logo-portal.png";

type Game = {
  id: number;
  title: string;
  description: string;
  coverImage?: string;
  developer?: { name: string };
  genre?: { name: string };
};

function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {

        const token = localStorage.getItem("token");


        const response = await fetch("http://localhost:3000/games", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        const data = await response.json();

        const gamesList = data.data || data;

        setGames(Array.isArray(gamesList) ? gamesList.slice(0, 3) : []);
      } catch (error) {
        console.error("Erro ao buscar jogos da home:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return (
    <>
      <main className="w-full px-6 py-10">

        <div className="flex flex-col items-center justify-center gap-4 pb-12">
          <img src={logoPortal} alt="GamePortal Logo" className="h-32 w-auto animate-pulse" />
          <h1 className="text-4xl font-black text-center text-white tracking-widest">
            GAME<span className="text-purple-500">PORTAL</span> ONLINE
          </h1>
          <p className="text-slate-400 text-center max-w-xl font-light">
            Sua central de análises e reviews de jogos. Explore, avalie e compartilhe suas experiências épicas.
          </p>
        </div>

        <Card
          className="w-full bg-cover bg-center border-none rounded-3xl my-10 shadow-2xl overflow-hidden"
          style={{ backgroundImage: `url(${fundoCardSobre})` }}
        >
          <CardContent className="p-10 text-center md:text-left bg-black/60 backdrop-blur-sm">
            <h2 className="text-3xl text-white mb-4 font-bold flex items-center gap-2">
              <Rocket className="text-purple-400" /> Hub de Reviews
            </h2>
            <p className="text-white mb-4 leading-relaxed font-light">
              🕹️ Bem-vindo ao GamePortal! Este é um espaço feito para entusiastas de games.
              Aqui você pode registrar suas experiências, avaliar suas gameplays e guardar memórias de suas jornadas virtuais.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-6">
          {loading ? (
            <p className="text-white text-center col-span-3">Carregando destaques...</p>
          ) : games.length > 0 ? (
            games.map((game) => (
              <CustomCard
                key={game.id}
                image={game.coverImage || fundoCardSobre}
                title={`🕹️ ${game.title}`}
                author={`Dev: ${game.developer?.name || "Independente"}`}
                genre={game.genre?.name || "Geral"}
                description={game.description}
              />
            ))
          ) : (
            <div className="col-span-3 text-center py-10 bg-slate-900/40 rounded-2xl border border-dashed border-slate-700">
              <Gamepad2 className="w-12 h-12 text-slate-600 mx-auto mb-2" />
              <p className="text-slate-500">Nenhum jogo cadastrado no banco de dados.</p>
            </div>
          )}
        </div>

        <Card
          className="w-full bg-cover bg-center border-none rounded-3xl my-16 shadow-2xl overflow-hidden"
          style={{ backgroundImage: `url(${fundoCardSobre})` }}
        >
          <CardContent className="p-10 bg-black/70 backdrop-blur-md">
            <h3 className="text-2xl text-white mb-6 font-bold flex items-center gap-2">
              <LayoutGrid className="text-purple-400" /> Explore o Portal:
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white mb-6 font-light">
              <li className="flex items-center gap-2">
                <span className="text-purple-400 font-bold">● Jogos:</span> Cadastre e avalie seus games favoritos.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400 font-bold">● Devs:</span> Gerencie os estúdios e criadores.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400 font-bold">● Gêneros:</span> Organize sua biblioteca por categorias.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400 font-bold">● Perfil:</span> Mantenha seus dados de jogador atualizados.
              </li>
            </ul>
            <p className="text-purple-300 font-medium italic text-center border-t border-white/20 pt-4">
              Prepare seu setup e boa jornada! 🎮
            </p>
          </CardContent>
        </Card>
      </main>
    </>
  );
}

export default Home;