import React from 'react';
import { Play } from 'lucide-react';
import StatBox from './StatBox';

const AulaCard = ({ title, duration, imageUrl, aulasCount, questoesCount, flashcardsCount, isWatching = false, accentColor = 'green' }) => {
  const colors = {
    yellow: {
      border: 'border-[#FECB29]',
      shadow: 'shadow-[0_0_8px_-2px_rgba(254,203,41,0.5)]',
      dot: 'bg-[#FECB29]',
      gradient: 'linear-gradient(45deg, rgba(254, 203, 41, 0.52) 2px, rgba(254, 203, 41, 0.25) 1rem, rgba(254, 203, 41, 0.125) 25%, rgba(254, 203, 41, 0.02) 40%, transparent 100%)'
    },
    green: {
      border: 'border-green-500',
      shadow: 'shadow-[0_0_8px_-2px_rgba(34,197,94,0.5)]',
      dot: 'bg-green-500',
      gradient: 'linear-gradient(45deg, rgba(34, 197, 94, 0.52) 2px, rgba(34, 197, 94, 0.25) 1rem, rgba(34, 197, 94, 0.125) 25%, rgba(34, 197, 94, 0.02) 40%, transparent 100%)'
    }
  };

  const currentColor = colors[accentColor];

  return (
    <div className="w-full font-sans">
      {/* Texto 'Você está assistindo' apenas se for o card ativo */}
      {isWatching && <p className="text-lg font-bold text-white mb-2 pl-1">Você está assistindo</p>}
      
      <div className={`group relative rounded-xl bg-zinc-950/80 ${currentColor.border} ${currentColor.shadow} overflow-hidden transition-all duration-300 hover:scale-[1.01]`}>
        
        {/* Fundo Gradiente */}
        <div className="absolute left-0 top-0 z-[1] h-full w-full pointer-events-none opacity-60" style={{ background: currentColor.gradient }}></div>
        
        <div className="relative z-10 flex flex-col p-3 pb-1">
          
          {/* LINHA SUPERIOR: Imagem (Esquerda) + Estatísticas (Direita) */}
          <div className="flex h-20 gap-3 mb-2">
            
            {/* Imagem / Thumbnail */}
            <div className="relative w-40 shrink-0 rounded-lg overflow-hidden group-hover:shadow-lg transition-all cursor-pointer">
              <img src={imageUrl} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
              
              {/* Botão Play no Centro */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full border border-white/50 group-hover:scale-110 transition-transform">
                   <Play className="w-6 h-6 text-white fill-white" />
                </div>
              </div>
              
              {/* Badge de Tempo */}
              <div className="absolute top-2 right-2 bg-black/60 px-1.5 py-0.5 rounded text-[10px] font-bold text-white backdrop-blur-md">
                {duration}
              </div>
            </div>

            {/* Grid de Estatísticas (Ocupa o resto do espaço) */}
            <div className="flex-1 grid grid-cols-3 gap-2 pl-1 pr-2">
              <StatBox 
                value={aulasCount} 
                label="Aulas para assistir" 
                accentColor={accentColor} 
                icon="play" 
              />
              <StatBox 
                value={questoesCount} 
                label="Questões para responder" 
                accentColor={accentColor} 
                icon="clipboard" 
              />
              <StatBox 
                value={flashcardsCount} 
                label="Flashcards para realizar" 
                accentColor={accentColor} 
                icon="cards" 
              />
            </div>
          </div>

          {/* LINHA INFERIOR: Título e Bolinha */}
          <div className="flex items-center gap-2 mt-1 pb-2 pl-1">
             <div className={`w-3 h-3 rounded-full ${currentColor.dot}`}></div>
             <h4 className="text-sm font-medium text-white line-clamp-1">{title}</h4>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AulaCard;