import React, { useState } from 'react';
import { Zap, Check, Play, CirclePlay } from 'lucide-react';

const ToggleSwitch = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div 
      onClick={() => setChecked(!checked)}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${checked ? 'bg-blue-600' : 'bg-slate-600'}`}
    >
      <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
    </div>
  );
};

const PlaylistItem = ({ item, isActive, onSelect }) => {
  const isExpress = item.type === 'express';
  // Se o item tiver 'isCompleted: true' nos dados, mostra o check
  const isCompleted = item.isCompleted; 

  return (
    <div 
      onClick={() => onSelect(item.id)}
      className={`flex items-center gap-3 p-3 rounded-xl mb-2 cursor-pointer transition-all border ${isActive ? 'bg-[#1e293b] border-blue-500/40 shadow-md' : 'hover:bg-slate-800/50 border-transparent'}`}
    >
      
      {/* THUMBNAIL */}
      <div className="shrink-0">
        {isExpress ? (
          <div className="w-12 h-12 rounded-lg bg-[#172033] flex items-center justify-center border border-blue-500/20">
            <Zap className="w-6 h-6 text-blue-400" fill="currentColor" />
          </div>
        ) : (
          <div className="w-16 h-12 rounded-lg overflow-hidden relative border border-white/5">
             <img 
               src={item.thumbnail || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=200"} 
               alt="Thumb" 
               className="w-full h-full object-cover opacity-80"
             />
             {isActive && <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><Play size={12} fill="white" className="text-white"/></div>}
          </div>
        )}
      </div>

      {/* TEXTO */}
      <div className="flex-1 min-w-0">
        <h4 className={`text-sm font-semibold leading-tight mb-1 line-clamp-2 ${isActive ? 'text-blue-400' : 'text-slate-200'}`}>
          {item.title}
        </h4>
        <div className="flex items-center gap-2">
           <span className="text-xs text-slate-500 font-medium">{item.duration}</span>
           {isActive && <span className="text-[10px] text-green-500 font-bold animate-pulse">• Assistindo</span>}
        </div>
      </div>

      {/* ÍCONE DIREITA (CHECK OU PLAY) */}
      <div className="shrink-0 flex items-center justify-end pl-2">
        {isCompleted ? (
           <div className="w-6 h-6 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
             <Check size={12} className="text-green-500" strokeWidth={3} />
           </div>
        ) : (
           <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${isActive ? 'border-blue-500' : 'border-slate-600'}`}>
             <Play size={8} className={isActive ? 'text-blue-500' : 'text-slate-500'} fill="currentColor" />
           </div>
        )}
      </div>

    </div>
  );
};

const PlaylistSection = ({ title, cofExpressItems = [], aulasItems = [], currentLessonId, onSelectLesson }) => {
  return (
    <div className="w-full bg-[#0f172a] rounded-2xl border border-white/5 p-5 shadow-xl">
      
      <div className="flex items-center justify-end gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Zap size={16} className="text-blue-400 fill-blue-400" />
          <span className="text-sm font-bold text-white">CofExpress</span>
        </div>
        <ToggleSwitch />
      </div>

      <h2 className="text-base font-bold text-white mb-4 leading-snug line-clamp-2">
        {title || "Selecione um módulo"}
      </h2>

      <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl mb-6 transition-colors shadow-lg shadow-blue-900/20">
        Playlist
      </button>

      {/* LISTA COFEXPRESS */}
      {cofExpressItems.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase mb-3 tracking-wider">CofExpress:</h3>
          <div className="flex flex-col">
            {cofExpressItems.map((item) => (
              <PlaylistItem 
                key={`cof-${item.id}`} 
                item={item} 
                isActive={item.id === currentLessonId}
                onSelect={onSelectLesson}
              />
            ))}
          </div>
        </div>
      )}

      {/* LISTA AULAS */}
      {aulasItems.length > 0 && (
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase mb-3 tracking-wider">Aulas:</h3>
          <div className="flex flex-col">
            {aulasItems.map((item) => (
              <PlaylistItem 
                key={`aula-${item.id}`} 
                item={item} 
                isActive={item.id === currentLessonId}
                onSelect={onSelectLesson}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default PlaylistSection;