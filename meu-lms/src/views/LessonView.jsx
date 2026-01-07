import React, { useState, useEffect } from 'react';
import { Star, FileText, Mic, PenTool, Send } from 'lucide-react';
import VideoPlayerComponent from '../components/lesson/VideoPlayer';
import PdfViewerComponent from '../components/lesson/PdfViewer';
import MaterialsDropdown from '../components/lesson/MaterialsDropdown';
import PlaylistSection from '../components/lesson/PlaylistSection';
import SidebarContent from '../components/lesson/SidebarContent';
import AulaCard from '../components/ui/AulaCard';

import { courseData } from '../data/courseData';

const LessonView = ({ onBack }) => {
  const [contentMode, setContentMode] = useState('video');
  const [noteMode, setNoteMode] = useState('none'); 
  const [notes, setNotes] = useState('');

  // --- NAVEGAÇÃO ---
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [activeSubModuleIdx, setActiveSubModuleIdx] = useState(0);
  // Novo estado: Qual aula dentro do sub-módulo está tocando? (0 = primeira)
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    // 1. Pega o ID do Módulo (ex: ?modulo=5)
    const moduloIdParam = params.get('modulo');
    
    if (moduloIdParam) {
      // Converte o ID para o Índice do array (ex: ID 5 -> Index 4)
      const modIndex = courseData.findIndex(m => m.id === parseInt(moduloIdParam));
      
      if (modIndex !== -1) {
        setActiveModuleIdx(modIndex);

        // 2. Pega o Índice do Submódulo (ex: &submodulo=2)
        const subModuloIndexParam = params.get('submodulo');
        
        if (subModuloIndexParam) {
          const subIndex = parseInt(subModuloIndexParam);
          // Verifica se o índice é válido para este módulo
          const moduleSubModules = courseData[modIndex]?.subModules || [];
          
          if (!isNaN(subIndex) && subIndex >= 0 && subIndex < moduleSubModules.length) {
            setActiveSubModuleIdx(subIndex);
            
            // Opcional: Rolar suavemente para o topo para garantir a visão
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }
      }
    }
  }, []); // O array vazio [] garante que rode apenas 1 vez ao abrir a página

  // --- DADOS ATUAIS ---
  const currentModule = courseData[activeModuleIdx] || courseData[0];
  const allSubModules = currentModule.subModules || [];
  
  const safeSubModIdx = (activeSubModuleIdx >= 0 && activeSubModuleIdx < allSubModules.length) ? activeSubModuleIdx : 0;
  const currentSubModule = allSubModules[safeSubModIdx];
  
  const currentLessons = currentSubModule?.lessons || [];
  const currentMaterial = currentSubModule?.materials?.[0];
  
  // Aula Ativa (Para exibir o título e link)
  const activeLesson = currentLessons[activeLessonIdx] || currentLessons[0] || { title: "Selecione uma aula" };

  // Separação para Playlist
  const cofExpressItems = currentLessons.filter(l => l.type === 'express');
  const aulasItems = currentLessons.filter(l => l.type !== 'express');

  // Cards Visíveis
  const visibleSubModules = allSubModules.slice(safeSubModIdx, safeSubModIdx + 3);

  // --- HANDLERS ---
  const handleModuleChange = (newIndex) => {
    setActiveModuleIdx(newIndex);
    setActiveSubModuleIdx(0);
    setActiveLessonIdx(0);
  };

  const handleSubModuleSelect = (subModId) => {
    const index = allSubModules.findIndex(sm => sm.id === subModId);
    if (index !== -1) {
      setActiveSubModuleIdx(index);
      setActiveLessonIdx(0); // Reseta para a primeira aula do novo sub-módulo
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Função chamada ao clicar na Playlist
  const handleLessonSelect = (lessonId) => {
    const index = currentLessons.findIndex(l => l.id === lessonId);
    if (index !== -1) {
      setActiveLessonIdx(index);
      setContentMode('video');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenPdf = () => {
    setContentMode('pdf');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in zoom-in-95 duration-500">
      
      {/* COLUNA ESQUERDA */}
      <div className="lg:col-span-8 space-y-8">
        
        {/* PLAYER */}
        <div className="relative aspect-video bg-[#0f172a] rounded-2xl overflow-hidden shadow-2xl border border-white/5">
          {/* Aqui passamos o link do drive da aula ativa para o player (futuramente) */}
          {contentMode === 'video' 
            ? <VideoPlayerComponent videoLink={activeLesson.videoLink} /> 
            : <PdfViewerComponent onClose={() => setContentMode('video')} />
          }
        </div>

        {/* TÍTULO DA AULA E CONTEXTO */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div>
            {/* Título da Aula que está passando */}
            <h1 className="text-2xl font-bold text-white mb-1 leading-tight">
              {activeLesson.title}
            </h1>
            {/* Caminho (Breadcrumb) */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
               <span className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_5px_rgba(34,197,94,0.8)]"></span>
               <span className="font-semibold text-gray-300">{currentModule.label}</span> 
               <span className="text-gray-600">/</span>
               <span>{currentSubModule?.title}</span>
            </div>
          </div>
          
          <button className="flex items-center gap-2 bg-[#1e293b] hover:bg-[#334155] border border-blue-500/30 text-blue-400 hover:text-white px-5 py-2.5 rounded-xl font-bold text-sm transition group">
            <Star size={16} className="group-hover:fill-current" /> Avaliar Aula
          </button>
        </div>

        {/* NOTAS */}
        <div className="bg-[#0f172a] rounded-2xl p-6 border border-white/5 shadow-lg">
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-2 text-lg font-bold text-white">
                  <FileText className="text-orange-400" /> Anotações
               </div>
               {noteMode !== 'none' && <button onClick={() => setNoteMode('none')} className="text-xs text-gray-500 underline hover:text-white">Cancelar</button>}
            </div>
            {noteMode === 'none' ? (
              <div className="flex gap-4">
                <button onClick={() => setNoteMode('record')} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl flex gap-2 justify-center items-center transition hover:scale-[1.02] shadow-lg shadow-blue-900/20"><Mic size={20}/> Gravar</button>
                <button onClick={() => setNoteMode('write')} className="flex-1 bg-[#1e293b] hover:bg-[#334155] text-white font-bold py-4 rounded-xl flex gap-2 justify-center items-center transition hover:scale-[1.02] border border-white/10"><PenTool size={20}/> Escrever</button>
              </div>
            ) : (
              <textarea className="w-full h-32 bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500/50 transition resize-none" placeholder="Escreva aqui..." value={notes} onChange={e => setNotes(e.target.value)} />
            )}
        </div>

        <MaterialsDropdown material={currentMaterial} />
        
        {/* COMENTÁRIOS (Sem borda de foco) */}
        <div className="space-y-6 pt-4 border-t border-gray-800/50">
           <div><h3 className="font-bold text-xl text-white">Comentários</h3><p className="text-gray-500 text-sm mt-1">0 comentários</p></div>
           
           {/* Aqui removemos o 'focus-within:border-blue-500' e adicionamos 'focus-within:ring-0' */}
           <div className="bg-[#0f172a] border border-white/5 border-dashed rounded-2xl p-6 flex gap-4 items-center transition group">
              <div className="w-10 h-10 rounded-full bg-yellow-600 flex items-center justify-center text-white font-bold shadow-md">L</div>
              <input 
                type="text" 
                placeholder="Escrever comentário" 
                className="w-full bg-transparent border-none text-gray-300 placeholder-gray-600 focus:ring-0 focus:outline-none h-full" 
              />
              <button className="text-gray-600 hover:text-blue-500 transition">
                <Send size={20} />
              </button>
           </div>
        </div>
      </div>

      {/* COLUNA DIREITA */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* PLAYLIST (Clicável) */}
        <PlaylistSection
          title={currentSubModule?.title}
          cofExpressItems={cofExpressItems}
          aulasItems={aulasItems}
          currentLessonId={activeLesson.id}
          onSelectLesson={handleLessonSelect}
        />

        <SidebarContent 
           modules={courseData}
           activeModuleIndex={activeModuleIdx}
           setActiveModuleIndex={handleModuleChange}
           activeSubModuleIndex={safeSubModIdx}
           setActiveSubModuleIndex={setActiveSubModuleIdx}
        />

        <div className="space-y-4">
          {visibleSubModules.map((subModule, index) => {
            const isWatching = index === 0;
            const totalLessons = subModule.lessons?.length || 0;
            
            return (
              <div key={subModule.id || index} onClick={() => handleSubModuleSelect(subModule.id)} className="cursor-pointer">
                <AulaCard
                  title={subModule.title} 
                  duration={`${totalLessons} aulas`}
                  imageUrl={subModule.imageUrl}
                  aulasCount={totalLessons}
                  questoesCount={10} 
                  flashcardsCount={5} 
                  isWatching={isWatching}
                  accentColor={isWatching ? 'yellow' : 'green'}
                />
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default LessonView;