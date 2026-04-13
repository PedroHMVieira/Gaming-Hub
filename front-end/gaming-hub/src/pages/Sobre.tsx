import { Card, CardContent } from "../components/components/ui/card";
import fundoCardSobre from "../assets/fundo-cardsobre.jpg";
import { Info, Target, Zap, Swords, Library } from "lucide-react";

function Sobre() {
  return (
    <main className="max-w-[1220px] px-4 m-auto py-10">
      <Card
        className="w-full bg-cover bg-center bg-no-repeat border-none rounded-3xl overflow-hidden shadow-2xl my-10"
        style={{ backgroundImage: `url(${fundoCardSobre})` }}
      >
        <CardContent className="p-8 md:p-16 text-center md:text-left bg-slate-950/70 backdrop-blur-md">

          <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
            <Info className="text-purple-500 w-8 h-8" />
            <h2 className="text-4xl font-black text-white tracking-tighter">
              SOBRE O <span className="text-purple-500">GAMEPORTAL</span>
            </h2>
          </div>

          <p className="text-slate-200 mb-8 text-lg font-light leading-relaxed">
            Seja bem-vindo ao <strong>GamePortal</strong>, a central definitiva para jogadores que amam explorar, organizar e analisar suas jornadas virtuais.
            Aqui, você não apenas lista títulos; você constrói seu legado gamer, registrando estúdios, categorias e suas impressões mais sinceras sobre cada gameplay.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-bold text-purple-400 mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5" /> Nossa Missão
                </h3>
                <p className="text-slate-300 font-light">
                  Acreditamos que cada jogo é uma obra de arte interativa. Nossa plataforma foi desenhada para dar voz aos jogadores, permitindo que cada review ajude a comunidade a filtrar os verdadeiros "GOTYs" dos lançamentos genéricos.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-purple-400 mb-3 flex items-center gap-2">
                  <Swords className="w-5 h-5" /> O Que Você Pode Fazer
                </h3>
                <ul className="space-y-2 text-slate-300 font-light">
                  <li className="flex items-center gap-2">🔹 Cadastrar <strong>Games, Devs e Gêneros</strong>.</li>
                  <li className="flex items-center gap-2">🔹 Atribuir notas e registrar comentários técnicos.</li>
                  <li className="flex items-center gap-2">🔹 Gerenciar sua biblioteca pessoal de forma intuitiva.</li>
                </ul>
              </section>
            </div>

            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-bold text-purple-400 mb-3 flex items-center gap-2">
                  <Library className="w-5 h-5" /> Categorias em Expansão
                </h3>
                <p className="text-slate-300 font-light mb-4">
                  Nosso banco de dados abraça todos os estilos:
                </p>
                <div className="flex flex-wrap gap-2">
                  {["RPG", "Action", "Horror", "Indie", "FPS", "Soulslike"].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-purple-600/30 border border-purple-500/50 rounded-full text-xs text-purple-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold text-purple-400 mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5" /> Experiência Next-Gen
                </h3>
                <p className="text-slate-300 font-light">
                  Desenvolvemos uma interface rápida e responsiva para que você possa registrar seu progresso entre uma partida e outra, seja no PC ou no Mobile.
                </p>
              </section>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-white text-xl font-medium italic">
              "De jogadores, para jogadores. Registre sua história."
            </p>
            <h3 className="text-2xl font-black text-purple-500 mt-4 uppercase tracking-widest animate-pulse">
              GG WP & Bons Reviews!
            </h3>
          </div>

        </CardContent>
      </Card>
    </main>
  );
}

export default Sobre;