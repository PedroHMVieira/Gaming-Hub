import { useState } from "react";

interface CustomCardProps {
  image: string;
  title: string;
  developer: string;
  genre: string;
  description: string;
}

export function CustomCard({ image, title, developer, genre, description }: CustomCardProps) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const handleViewClick = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <div
      className="w-full h-[400px] bg-cover bg-center rounded-2xl shadow-xl px-6 py-8 relative overflow-hidden group transition-all duration-500 hover:shadow-purple-500/20"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

      <div className="relative z-10 flex justify-end items-start h-full">
        <button
          className="bg-purple-600/90 backdrop-blur-md text-white px-6 py-2 rounded-full flex items-center gap-2 font-bold hover:bg-purple-500 transition-all shadow-lg"
          onClick={handleViewClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M3 4.5h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM1 2a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 2m0 12a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 14" />
          </svg>
          {isAccordionOpen ? "Fechar" : "Detalhes"}
        </button>
      </div>

      {isAccordionOpen && (
        <div className="absolute inset-x-4 bottom-4 z-20 bg-slate-900/90 backdrop-blur-xl shadow-2xl border border-white/20 p-6 rounded-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-1">{title}</h2>
          <div className="flex gap-3 mb-3">
            <span className="text-xs font-bold px-2 py-1 bg-purple-500 text-white rounded uppercase">{genre}</span>
            <span className="text-xs font-bold px-2 py-1 bg-slate-700 text-slate-300 rounded uppercase">Dev: {developer}</span>
          </div>
          <p className="text-slate-200 text-sm leading-relaxed line-clamp-3">{description}</p>

          <button
            className="mt-4 w-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2 rounded uppercase tracking-widest transition-colors"
            onClick={handleViewClick}
          >
            Fechar Info
          </button>
        </div>
      )}
    </div>
  );
}

export default CustomCard;