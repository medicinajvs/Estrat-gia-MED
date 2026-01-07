import React from 'react';

const StatBox = ({ value, label, accentColor, icon }) => {
  // Cores dinâmicas baseadas no acento (Amarelo ou Verde)
  const isYellow = accentColor === 'yellow';
  
  const iconColor = isYellow ? 'text-[#FECB29]' : 'text-green-500';
  const borderColor = "border-white/25";
  
  // Gradiente de fundo sutil
  const radialGradient = isYellow 
    ? 'radial-gradient(circle, rgba(254, 203, 41, 0.125) 0%, rgba(254, 203, 41, 0.063) 30%, transparent 70%)'
    : 'radial-gradient(circle, rgba(34, 197, 94, 0.125) 0%, rgba(34, 197, 94, 0.063) 30%, transparent 70%)';

  // Escolha do ícone SVG correto
  const renderIcon = () => {
    if (icon === 'play') return <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />;
    if (icon === 'clipboard') return <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />;
    return <path d="M9.71429 1.04348V10.9565C9.58938 11.5093 9.24786 11.8571 8.68973 12H1.02455C0.479074 11.8649 0.140718 11.5264 0 10.9938V1.00621C0.140718 0.473602 0.477493 0.13354 1.02455 0H8.68973C9.24944 0.141304 9.5878 0.492236 9.71429 1.04348ZM8.86998 6.00621C8.86998 4.45342 8.86998 2.90217 8.86998 1.34938C8.86998 0.948758 8.74507 0.822981 8.34031 0.822981C6.01925 0.822981 3.69978 0.822981 1.37872 0.822981C0.958147 0.822981 0.837984 0.942546 0.837984 1.35559C0.837984 4.45342 0.837984 7.55279 0.837984 10.6506C0.837984 11.0528 0.962891 11.177 1.36765 11.177C3.69503 11.177 6.02083 11.177 8.34821 11.177C8.74033 11.177 8.86998 11.0481 8.86998 10.6615C8.86998 9.1087 8.86998 7.55745 8.86998 6.00466V6.00621Z" />;
  };

  return (
    <div className="relative col-span-1 flex h-full items-center justify-center p-1 font-bold">
      {/* Bordas nos cantos (Superior Esquerdo e Inferior Direito) */}
      <div className={`pointer-events-none absolute left-0 top-1 z-10 size-5 rounded-tl-lg border-2 border-b-0 border-r-0 transition-all duration-500 group-hover:size-3/5 ${borderColor}`} />
      <div className={`pointer-events-none absolute bottom-1 right-0 z-10 size-5 rounded-br-lg border-2 border-l-0 border-t-0 transition-all duration-500 group-hover:size-3/5 ${borderColor}`} />
      
      {/* Ícone de Fundo (Grande e Transparente) */}
      <div className={`${iconColor} absolute inset-0`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute h-full w-full opacity-5">
           {renderIcon()}
        </svg>
      </div>

      {/* Conteúdo: Número e Texto */}
      <div 
        className="flex h-full w-full flex-col items-center justify-center rounded-sm z-10"
        style={{ background: radialGradient }}
      >
        <div className="flex flex-col items-center justify-center text-slate-300 leading-tight">
          <p className="w-full text-center text-base mb-0.5">{value}</p>
          <p className="w-full text-center text-[9px] uppercase tracking-wide opacity-80">{label}</p>
        </div>
      </div>
    </div>
  );
};

export default StatBox;