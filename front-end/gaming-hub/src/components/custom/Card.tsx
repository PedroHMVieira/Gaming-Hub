import { useState } from "react";

interface CustomCardProps {
  image: string; 
  title: string; 
  author: string; 
  genre: string;
  description: string; 
}

export function CustomCard({ image, title, author, genre, description }: CustomCardProps) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const handleViewClick = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <div
      className="w-[33%] h-[300px] bg-cover bg-center rounded-lg shadow-lg px-4 py-8 relative"
      style={{ backgroundImage: `url(${image})` }} // Usa a imagem passada como propriedade
    >
      <div className="flex justify-between gap-5 items-center mt-4">
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded flex items-center gap-2"
          onClick={handleViewClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-view-list"
            viewBox="0 0 16 16"
          >
            <path d="M3 4.5h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM1 2a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 2m0 12a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 14" />
          </svg>{" "}
          {isAccordionOpen ? "Fechar" : "View"}
        </button>
      </div>
      {isAccordionOpen && (
        <div className="mt-4 bg-white/30 backdrop-blur-2xl shadow-lg border-b border-white p-4 rounded">
          <h2 className="text-lg font-bold">{title}</h2>
          <p className="text-sm font-semibold">Autor: {author}</p>
          <p className="text-sm font-semibold">Gênero: {genre}</p>
          <p className="text-sm mt-2">{description}</p>
          <button
            className="mt-4 bg-gray-400 text-white px-4 py-2 rounded"
            onClick={handleViewClick}
          >
            Fechar
          </button>
        </div>
      )}
    </div>
  );
}

export default CustomCard;
