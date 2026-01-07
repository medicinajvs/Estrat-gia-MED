import React from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

const CarouselSection = ({ items, activeIndex, setActiveIndex, colorTheme }) => {
  // Proteção: Se não houver itens, não renderiza nada para evitar erros
  if (!items || items.length === 0) return null;

  const len = items.length;
  const prevIndex = (activeIndex - 1 + len) % len;
  const nextIndex = (activeIndex + 1) % len;
  const isBlue = colorTheme === 'blue';

  const activeClasses = isBlue
    ? "bg-gradient-to-t border-blue-800 from-blue-600 to-blue-500 !shadow-[0px_-3px_19px_-5px_#2b56d6]"
    : "bg-gradient-to-t border-purple-800 from-purple-600 to-purple-500 !shadow-[0px_-3px_19px_-5px_#a855f7]";

  const inactiveClasses = "bg-gradient-to-tr dark:border-slate-800 border-slate-500 from-slate-400 to-slate-300 dark:from-slate-600 dark:to-slate-500 !shadow-[0px_-3px_19px_-5px_#c9c9c9] dark:!shadow-[0px_-3px_19px_-5px_#616161]";
  const indicatorActiveColor = isBlue ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]' : 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]';
  const arrowColor = isBlue ? 'text-blue-500 drop-shadow-[0px_0px_10px_#7abef5]' : 'text-purple-500 drop-shadow-[0px_0px_10px_#cb2bd6]';

  const handlePrev = () => setActiveIndex(prevIndex);
  const handleNext = () => setActiveIndex(nextIndex);

  // --- NOVA FUNÇÃO DE SEGURANÇA ---
  // Se 'label' não existir no dado, usa o 'title'. Se 'title' não existir, usa texto genérico.
  const getItemLabel = (item) => {
    if (!item) return "";
    return item.label || item.title || "Sem Título";
  };

  return (
    <div className="flex w-full flex-col gap-y-2 lg:max-w-none mb-6">
      <div className="flex w-full items-center justify-center gap-1.5 mb-2">
        {items.map((_, index) => (
          <div key={index} className={`h-1.5 rounded-full transition-all duration-300 ${index === activeIndex ? `w-8 ${indicatorActiveColor}` : 'w-4 bg-slate-700'}`} />
        ))}
      </div>
      <div className="relative w-full flex justify-center">
        <button onClick={handlePrev} className="absolute -left-2 lg:-left-6 top-1/2 -translate-y-1/2 z-20 hover:scale-110 transition-transform">
          <ChevronLeft className={`h-10 w-10 lg:h-14 lg:w-14 ${arrowColor}`} strokeWidth={1.5} />
        </button>
        <div className="flex items-center gap-2">
          
          {/* Item Anterior */}
          <div onClick={handlePrev} className="cursor-pointer transition-transform hover:scale-105 hidden sm:block">
            <button className={`w-28 min-w-[7rem] h-16 min-h-[4rem] rounded-xl py-2 px-4 relative flex items-center justify-center text-sm font-medium text-slate-200 transition-all duration-500 ${inactiveClasses}`}>
              <span className="break-words text-center leading-tight line-clamp-2">
                {getItemLabel(items[prevIndex])}
              </span>
              {items[prevIndex].hasClock && <Clock className="absolute top-1 right-1 w-3 h-3 text-slate-400" />}
            </button>
          </div>

          {/* Item Ativo */}
          <div className="z-10">
            <button className={`w-32 min-w-[8rem] h-20 min-h-[5rem] rounded-xl py-2 px-4 relative flex items-center justify-center text-md font-bold text-white cursor-default transition-all duration-200 transform scale-105 ${activeClasses}`}>
              <span className="break-words text-center leading-tight line-clamp-2">
                {getItemLabel(items[activeIndex])}
              </span>
              {items[activeIndex].hasClock && <Clock className="absolute top-2 right-2 w-3 h-3 text-white/70" />}
            </button>
          </div>

          {/* Próximo Item */}
          <div onClick={handleNext} className="cursor-pointer transition-transform hover:scale-105 hidden sm:block">
            <button className={`w-28 min-w-[7rem] h-16 min-h-[4rem] rounded-xl py-2 px-4 relative flex items-center justify-center text-sm font-medium text-slate-200 transition-all duration-500 ${inactiveClasses}`}>
              <span className="break-words text-center leading-tight line-clamp-2">
                {getItemLabel(items[nextIndex])}
              </span>
              {items[nextIndex].hasClock && <Clock className="absolute top-1 right-1 w-3 h-3 text-slate-400" />}
            </button>
          </div>

        </div>
        <button onClick={handleNext} className="absolute -right-2 lg:-right-6 top-1/2 -translate-y-1/2 z-20 hover:scale-110 transition-transform">
          <ChevronRight className={`h-10 w-10 lg:h-14 lg:w-14 ${arrowColor}`} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
};
export default CarouselSection;