import { Mail, Github, Instagram, MessageSquare, Code2, Share2 } from "lucide-react";
import { Card, CardContent } from "../components/components/ui/card";
import fundoCardSobre from "../assets/fundo-cardsobre.jpg";

function FaleConosco() {
  return (
    <main className="max-w-[800px] px-4 m-auto py-10">
      <Card
        className="w-full bg-cover bg-center bg-no-repeat border-none rounded-3xl overflow-hidden shadow-2xl"
        style={{ backgroundImage: `url(${fundoCardSobre})` }}
      >
        {/* Overlay Dark com Desfoque */}
        <CardContent className="p-10 text-center bg-slate-950/80 backdrop-blur-md">

          <div className="flex flex-col items-center gap-2 mb-8">
            <div className="bg-purple-600 p-3 rounded-full mb-2">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight uppercase">
              Central de <span className="text-purple-500">Suporte</span>
            </h2>
          </div>

          <p className="text-slate-300 font-light mb-8 leading-relaxed">
            Teve algum problema com um bug, quer sugerir um novo jogo para a base ou apenas quer bater um papo sobre o último lançamento?
            Nossa equipe de suporte está pronta para te ouvir. Escolha seu canal de comunicação:
          </p>

          {/* Grid de Redes Sociais */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
              <Mail className="w-6 h-6 text-purple-500 group-hover:scale-110 transition-transform" />
              <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">E-mail</span>
              <span className="text-sm text-white">suporte@gameportal.com</span>
            </div>

            <a
              href="https://github.com/gameportal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
            >
              <Github className="w-6 h-6 text-purple-500 group-hover:scale-110 transition-transform" />
              <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">GitHub</span>
              <span className="text-sm text-white">/gameportal</span>
            </a>

            <a
              href="https://instagram.com/gameportal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
            >
              <Instagram className="w-6 h-6 text-purple-500 group-hover:scale-110 transition-transform" />
              <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">Instagram</span>
              <span className="text-sm text-white">@gameportal</span>
            </a>
          </div>

          <div className="space-y-6 pt-6 border-t border-white/10">
            <h3 className="text-xl font-bold text-white flex items-center justify-center gap-2">
              <Code2 className="w-5 h-5 text-purple-500" /> Dev Team
            </h3>
            <p className="text-slate-400 font-light text-sm">
              Curioso sobre os bastidores? Nossa equipe de desenvolvedores está sempre aberta a feedbacks técnicos e parcerias.
              Siga os perfis individuais para acompanhar as atualizações do sistema e novos módulos que estão por vir.
            </p>

            <div className="flex items-center justify-center gap-2 text-purple-400 font-bold uppercase text-xs tracking-[0.2em] animate-pulse">
              <Share2 className="w-4 h-4" /> Conecte-se com a gente
            </div>
          </div>

          <p className="text-white font-medium mt-8 italic text-sm">
            Prepare seu setup e mande sua mensagem! 🎮
          </p>
        </CardContent>
      </Card>
    </main>
  );
}

export default FaleConosco;