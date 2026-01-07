import React from 'react';
import LogoIcon from '../ui/LogoIcon'; 
import CarouselSection from '../ui/CarouselSection';

// Note: Recebe tudo via props agora (Controlado pela LessonView)
const SidebarContent = ({ 
  modules, 
  activeModuleIndex, 
  setActiveModuleIndex, 
  activeSubModuleIndex, 
  setActiveSubModuleIndex 
}) => {
  
  // Pega os dados atuais baseados nos índices recebidos
  const currentModule = modules[activeModuleIndex];
  const currentSubModule = currentModule?.subModules[activeSubModuleIndex];
  const subModulesList = currentModule?.subModules || [];

  return (
    <div className="w-full">
      {/* Cabeçalho da Sidebar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
           <LogoIcon />
        </div>
        <div>
          {/* TÍTULO COMPLETO DINÂMICO AQUI */}
          <h1 className="text-xl font-bold text-white line-clamp-1" title={currentModule.title}>
            {currentModule.title}
          </h1>
          <p className="text-slate-400 flex items-center gap-2 text-sm line-clamp-1" title={currentSubModule?.title}>
            <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0"></span>
            {currentSubModule?.title}
          </p>
        </div>
      </div>

      {/* Carrosséis */}
      <div className="flex flex-col gap-10">
        
        {/* Carrossel de Módulos (Mostra "Módulo 1", etc) */}
        <CarouselSection 
          items={modules}
          activeIndex={activeModuleIndex}
          setActiveIndex={setActiveModuleIndex}
          colorTheme="blue"
        />

        {/* Carrossel de Sub-Módulos (Mostra "Sub-Módulo 1", etc) */}
        {subModulesList.length > 0 && (
          <CarouselSection 
            items={subModulesList}
            activeIndex={activeSubModuleIndex}
            setActiveIndex={setActiveSubModuleIndex}
            colorTheme="purple"
          />
        )}
      </div>
    </div>
  );
};

export default SidebarContent;