import React, { useState, useEffect, useRef, useMemo } from 'react';

// --- DADOS ---
const modulesData = [
  {
    id: 1,
    title: "Primeiros Passos",
    stats: { materials: 12, flashcards: 5 },
    submodules: Array.from({ length: 8 }).map((_, i) => ({
      title: i === 0 ? "O que é o STEP1?" : `Aula Introdutória ${i + 1}`,
      desc: "Fundamentos essenciais para iniciar sua preparação com o pé direito nos EUA.",
      duration: "15 min"
    }))
  },
  {
    id: 2,
    title: "Cardiologia",
    stats: { materials: 45, flashcards: 120 },
    submodules: Array.from({ length: 12 }).map((_, i) => ({
      title: `Cardiologia Clínica ${i + 1}`,
      desc: "Aprofundamento em patologias cardíacas, ECG e manejo clínico avançado.",
      duration: "45 min"
    }))
  },
  {
    id: 3,
    title: "Neurologia",
    stats: { materials: 30, flashcards: 80 },
    submodules: Array.from({ length: 10 }).map((_, i) => ({
      title: `Neuroanatomia ${i + 1}`,
      desc: "Estruturas do sistema nervoso central e periférico e suas correlações clínicas.",
      duration: "30 min"
    }))
  },
  {
    id: 4,
    title: "Pneumologia",
    stats: { materials: 25, flashcards: 60 },
    submodules: Array.from({ length: 6 }).map((_, i) => ({
      title: `Fisiologia Pulmonar ${i + 1}`,
      desc: "Mecânica ventilatória, trocas gasosas e interpretação de espirometria.",
      duration: "40 min"
    }))
  },
  {
    id: 5,
    title: "Gastroenterologia",
    stats: { materials: 35, flashcards: 90 },
    submodules: Array.from({ length: 8 }).map((_, i) => ({
      title: `Doenças do TGI ${i + 1}`,
      desc: "Abordagem completa das doenças esofágicas, gástricas e intestinais.",
      duration: "35 min"
    }))
  }
];

export default function App() {
  const [activeModuleId, setActiveModuleId] = useState(1);
  const [activeSubmoduleIndex, setActiveSubmoduleIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [animatedStats, setAnimatedStats] = useState({ materials: 0, flashcards: 0, classes: 0 });
  const swiperInstanceRef = useRef(null);

  // --- EFEITOS ---
  useEffect(() => {
    const linkDaisy = document.createElement('link');
    linkDaisy.href = "https://cdn.jsdelivr.net/npm/daisyui@4.7.2/dist/full.min.css";
    linkDaisy.rel = "stylesheet";
    document.head.appendChild(linkDaisy);

    const linkSwiperCSS = document.createElement('link');
    linkSwiperCSS.href = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css";
    linkSwiperCSS.rel = "stylesheet";
    document.head.appendChild(linkSwiperCSS);

    const linkFonts = document.createElement('link');
    linkFonts.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap";
    linkFonts.rel = "stylesheet";
    document.head.appendChild(linkFonts);

    const scriptPhosphor = document.createElement('script');
    scriptPhosphor.src = "https://unpkg.com/@phosphor-icons/web";
    document.head.appendChild(scriptPhosphor);

    const scriptSwiper = document.createElement('script');
    scriptSwiper.src = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
    scriptSwiper.onload = () => {
      if (window.Swiper) {
        swiperInstanceRef.current = new window.Swiper(".mySwiper", {
            slidesPerView: 1.5,
            spaceBetween: 20,
            centeredSlides: true,
            grabCursor: true,
            breakpoints: {
                640: { slidesPerView: 3, spaceBetween: 30 },
                1024: { slidesPerView: 5, spaceBetween: 40 },
            }
        });
      }
    };
    document.head.appendChild(scriptSwiper);

    return () => {
      if (swiperInstanceRef.current) swiperInstanceRef.current.destroy();
    };
  }, []);

  // --- LÓGICA ---
  const activeModule = useMemo(() => modulesData.find(m => m.id === activeModuleId) || modulesData[0], [activeModuleId]);
  const currentSubmodule = useMemo(() => activeModule.submodules[activeSubmoduleIndex] || activeModule.submodules[0], [activeModule, activeSubmoduleIndex]);

  const filteredSubmodules = useMemo(() => {
    if (searchQuery.length < 2) {
      return activeModule.submodules.map((sub, idx) => ({ ...sub, originalIdx: idx, moduleId: activeModule.id }));
    }
    let results = [];
    modulesData.forEach(mod => {
      mod.submodules.forEach((sub, idx) => {
        if (mod.title.toLowerCase().includes(searchQuery.toLowerCase()) || sub.title.toLowerCase().includes(searchQuery.toLowerCase())) {
          results.push({ ...sub, originalIdx: idx, moduleId: mod.id, modTitle: mod.title });
        }
      });
    });
    return results;
  }, [searchQuery, activeModule, activeModuleId]);

  useEffect(() => {
    const duration = 500;
    const startTime = Date.now();
    const startValues = animatedStats;
    const endValues = { materials: activeModule.stats.materials, flashcards: activeModule.stats.flashcards, classes: activeModule.submodules.length };
    
    let animationFrameId;
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      setAnimatedStats({
        materials: Math.floor(startValues.materials + (endValues.materials - startValues.materials) * progress),
        flashcards: Math.floor(startValues.flashcards + (endValues.flashcards - startValues.flashcards) * progress),
        classes: Math.floor(startValues.classes + (endValues.classes - startValues.classes) * progress),
      });
      if (progress < 1) animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [activeModuleId]);

  const handleModuleClick = (id, index) => {
    setActiveModuleId(id);
    setActiveSubmoduleIndex(0);
    setSearchQuery('');
    if (swiperInstanceRef.current) {
        swiperInstanceRef.current.slideTo(index);
    }
  };

  const handleSubmoduleClick = (moduleId, idx) => {
    setActiveModuleId(moduleId);
    setActiveSubmoduleIndex(idx);
    setTimeout(() => {
        const element = document.getElementById(`submodule-${moduleId}-${idx}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.classList.add('highlight-pulse');
            setTimeout(() => element.classList.remove('highlight-pulse'), 3000);
        }
    }, 100);
  };

  return (
    <div className="w-full min-h-screen flex flex-col relative bg-[#020617] text-slate-50 font-inter overflow-x-hidden">
      <style>{`
        body { font-family: 'Inter', sans-serif; background-color: #020617; overflow-x: hidden; color: #f8fafc; scroll-behavior: smooth; margin: 0; padding: 0; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #0f172a; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
        details > summary { list-style: none; }
        details > summary::-webkit-details-marker { display: none; }
        .robot-float { animation: bounce 3s infinite; }
        @keyframes bounce { 0%, 100% { transform: translateY(-5%); } 50% { transform: translateY(0); } }
        @keyframes highlight-card { 0%, 100% { border-color: #334155; box-shadow: none; } 50% { border-color: #3b82f6; box-shadow: 0 0 30px rgba(59, 130, 246, 0.6); } }
        .highlight-pulse { animation: highlight-card 1.5s ease-in-out 2; }

        /* Swiper Styles */
        .swiper { width: 100%; height: 280px; padding-top: 20px; }
        .swiper-slide { display: flex; align-items: flex-end; justify-content: center; overflow: visible; }
        .block-container { position: relative; z-index: 20; transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); width: 100%; display: flex; justify-content: center; }
        .block-content { background-color: rgba(30, 41, 59, 0.5); border: 1px solid #334155; color: #94a3b8; border-radius: 0.75rem; padding: 1rem; width: 100%; text-align: center; font-weight: 700; font-size: 0.9rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; min-height: 80px; line-height: 1.2; }
        .swiper-slide.is-active .block-container { transform: translateY(-110px); }
        .swiper-slide.is-active .block-content { background-color: #2563eb; border-color: #3b82f6; color: white; box-shadow: 0 0 25px rgba(37, 99, 235, 0.6); }
        .swiper-slide:not(.is-active):hover .block-content { border-color: #475569; color: #cbd5e1; transform: translateY(-4px); }
        .robot-wrapper { position: absolute; bottom: 0; left: 0; right: 0; height: 140px; display: flex; align-items: flex-end; justify-content: center; z-index: 10; pointer-events: none; opacity: 0; transform: translateY(100%); transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .swiper-slide.is-active .robot-wrapper { opacity: 1; transform: translateY(-10px); }
        .base-line { height: 4px; width: 100%; border-radius: 9999px; background-color: #1e293b; transition: all 0.3s ease; margin-top: 10px; position: relative; z-index: 30; }
        .swiper-slide.is-active .base-line { background-color: #3b82f6; box-shadow: 0 0 15px rgba(37, 99, 235, 0.5); }

        /* Card Styles */
        .submodule-card { background-color: #0f172a; border: 1px solid #1e293b; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); position: relative; overflow: hidden; aspect-ratio: 16 / 9; width: 100%; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2); }
        .card-bg-image { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; transition: transform 0.5s ease; }
        .card-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(2, 6, 23, 0.95) 0%, rgba(2, 6, 23, 0.5) 60%, rgba(2, 6, 23, 0.2) 100%); z-index: 1; transition: all 0.3s ease; }
        .submodule-card:hover { border-color: #3b82f6; transform: translateY(-6px) scale(1.02); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.1); }
        .submodule-card:hover .card-bg-image { transform: scale(1.1); }
        .submodule-card:hover .card-overlay { background: linear-gradient(to top, rgba(2, 6, 23, 0.95) 0%, rgba(37, 99, 235, 0.15) 100%); }
        .play-overlay { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.5); width: 56px; height: 56px; background: rgba(59, 130, 246, 0.9); border-radius: 50%; display: flex; align-items: center; justify-content: center; z-index: 10; opacity: 0; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); box-shadow: 0 0 30px rgba(59, 130, 246, 0.5); backdrop-filter: blur(4px); }
        .submodule-card:hover .play-overlay { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        .card-content-wrapper { position: relative; z-index: 2; height: 100%; display: flex; flex-direction: column; justify-content: space-between; }
      `}</style>

      {/* --- HEADER FIXO --- */}
      <header className="bg-[#0b1121] border-b border-slate-800 px-6 py-3 z-50 sticky top-0">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
                <div className="text-blue-500 hover:text-white transition cursor-pointer">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/>
                    </svg>
                </div>
                <nav className="hidden lg:flex gap-6 text-sm font-medium text-slate-400">
                    <a href="#" className="text-white font-semibold">Home</a>
                    <a href="#" className="hover:text-white transition">Acompanhamento</a>
                    <a href="#" className="hover:text-white transition">Cronograma</a>
                    <a href="#" className="hover:text-white transition">Material de Apoio</a>
                    <a href="#" className="hover:text-white transition">QBank</a>
                </nav>
            </div>
            <div className="flex-1 flex justify-end md:justify-end gap-4">
                <details id="course-dropdown" className="dropdown dropdown-end w-full md:w-auto">
                    <summary className="btn btn-ghost bg-slate-800/50 border border-slate-700 hover:bg-slate-700 text-white normal-case font-medium min-w-[280px] justify-between flex items-center rounded-xl">
                        <div className="flex items-center gap-2 pointer-events-none">
                            <div className="w-6 h-6 rounded-lg bg-white flex items-center justify-center">
                                <span className="text-blue-600 text-xs font-bold">MC</span>
                            </div>
                            <span>MedCof USA 2025</span>
                        </div>
                        <svg className="w-4 h-4 ml-2 opacity-70 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </summary>
                    <ul className="dropdown-content z-[100] menu p-0 shadow-2xl bg-[#0f172a] border border-slate-700 rounded-xl w-[350px] mt-2 custom-scrollbar max-h-[80vh] overflow-y-auto block">
                        <div className="p-2">
                            <li><a href="#" className="bg-slate-800 border border-slate-600 text-white hover:bg-slate-700 mb-2 rounded-lg flex gap-3 py-3 items-center"><div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center flex-shrink-0"><span className="text-blue-600 text-xs font-bold">MC</span></div><div className="flex flex-col"><span className="font-bold text-sm text-white">MedCof USA 2025</span><span className="text-[11px] text-slate-400">Selecionado</span></div></a></li>
                            <li><a href="#" className="hover:bg-slate-800/50 text-slate-300 mb-1 rounded-lg flex gap-3 py-3 items-center"><div className="w-9 h-9 rounded-lg bg-slate-700 flex items-center justify-center flex-shrink-0"><span className="text-white text-xs font-bold">EX</span></div><div className="flex flex-col"><span className="font-bold text-sm">Extensivo 2025 - R1</span><span className="text-[11px] opacity-60">Disponível</span></div></a></li>
                        </div>
                    </ul>
                </details>
                <div className="flex items-center gap-3 border-l border-slate-700 pl-4">
                    <button className="btn btn-ghost btn-circle btn-sm text-slate-400 hover:bg-slate-800"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg></button>
                    <div className="avatar placeholder"><div className="bg-slate-700 text-slate-200 rounded-full w-9 h-9 text-xs cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"><span>US</span></div></div>
                </div>
            </div>
        </div>
      </header>

      {/* --- BARRA DE AÇÕES (FIXA JUNTO AO HEADER) --- */}
      <div className="w-full bg-[#020617] px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 z-40 border-b border-slate-800/50 relative shadow-sm sticky top-[64px]">
        <div className="relative w-full md:w-[400px]">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </span>
            <input 
                type="text" 
                placeholder="Pesquisar Módulos, Aulas, Questões..." 
                className="input input-sm w-full bg-[#0b1121] border border-blue-900/30 focus:border-blue-500 text-white rounded-2xl pl-12 pr-12 h-11 shadow-inner transition-all" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto py-1">
            <button onClick={() => handleSubmoduleClick(activeModuleId, activeSubmoduleIndex)} className="btn btn-sm bg-blue-600 hover:bg-blue-500 border-none text-white gap-2 h-10 px-5 normal-case font-medium rounded-full shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all">
                Continuar de onde parei
            </button>
            <button className="btn btn-sm bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 border-none text-white gap-2 h-10 px-5 normal-case font-medium rounded-full shadow-lg shadow-fuchsia-600/20 hover:shadow-fuchsia-600/40 transition-all">
                Customizar a página
            </button>
        </div>
      </div>

      {/* --- PRÓXIMA SESSÃO --- */}
      <div className="w-full bg-black/40 backdrop-blur-sm border-b border-white/5 px-6 py-2.5 flex flex-col md:flex-row items-center justify-center text-sm gap-2 z-30 relative">
        <span className="text-slate-400 font-light">Sua próxima sessão de estudos:</span>
        <a href="#" onClick={(e) => { e.preventDefault(); handleSubmoduleClick(activeModuleId, activeSubmoduleIndex); }} className="text-blue-500 font-bold hover:underline">
          {activeModule.title}: {currentSubmodule.title}
        </a>
        <button onClick={() => handleSubmoduleClick(activeModuleId, activeSubmoduleIndex)} className="btn btn-xs btn-outline rounded-full !normal-case text-blue-500 border-blue-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 ml-2 gap-1 px-4 transition-all">
          Fazer agora 
        </button>
      </div>

      {/* --- HERO DASHBOARD --- */}
      <section className="relative w-full overflow-hidden group border-b border-slate-800 pb-0">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-500 transform group-hover:scale-105"
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')" }}>
             <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent"></div>
             <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#020617] to-transparent"></div>
        </div>

        <div className="relative z-10 w-full h-full flex items-center px-6 lg:px-12 pt-12 pb-6">
          <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center h-full">
            <div className="flex flex-col gap-6 w-full lg:w-3/4 transition-all duration-500 items-center text-center">
              <div>
                <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-2xl">
                  {activeModule.title}
                </h1>
                <p className="text-slate-400 mt-2 text-lg">
                  Explore os {animatedStats.classes} submódulos essenciais.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition cursor-pointer group/card hover:-translate-y-1">
                  <div className="flex items-center justify-center gap-3 mb-4 text-slate-300 group-hover/card:text-white">
                    <span className="text-xs font-semibold uppercase tracking-wider">Materiais</span>
                  </div>
                  <div className="text-4xl font-bold text-white">{animatedStats.materials}</div>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition cursor-pointer group/card hover:-translate-y-1">
                  <div className="flex items-center justify-center gap-3 mb-4 text-slate-300 group-hover/card:text-white">
                    <span className="text-xs font-semibold uppercase tracking-wider">Flashcards</span>
                  </div>
                  <div className="text-4xl font-bold text-white">{animatedStats.flashcards}</div>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition cursor-pointer group/card hover:-translate-y-1">
                  <div className="flex items-center justify-center gap-3 mb-4 text-blue-400 group-hover/card:text-blue-300">
                    <span className="text-xs font-semibold uppercase tracking-wider">Submódulos</span>
                  </div>
                  <div className="text-4xl font-bold text-white">{animatedStats.classes}</div>
                </div>
              </div>
            </div>
            <div className="hidden lg:w-1/3 h-full flex flex-col justify-end lg:justify-center items-center pointer-events-none mt-6 lg:mt-0">
              <div className="relative robot-float pointer-events-auto">
                <img src="https://placehold.co/150x150/png?text=Robo+Img" className="w-64 h-auto object-contain drop-shadow-2xl" alt="Robô" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full bg-[#0b1121]/90 backdrop-blur-md border-t border-white/10 py-3 z-20">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-4 text-sm">
            <span className="font-semibold text-white">Estudando: {currentSubmodule.title}</span>
            <div className="w-64 h-3 bg-slate-700/50 rounded-full overflow-hidden shadow-inner relative">
              <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full relative transition-all duration-1000 w-[45%]">
                 <div className="absolute right-0 top-0 h-full w-2 bg-white/30 blur-[2px]"></div> 
              </div>
            </div>
            <span className="text-slate-300">Faltam {activeModule.submodules.length} sessões para concluir</span>
          </div>
        </div>
      </section>

      {/* --- SELEÇÃO DE MÓDULOS (FIXA/STICKY NO TOPO) --- */}
      {/* ADICIONADO: sticky e top-[140px] (aprox. header + action bar) para travar no topo */}
      <div className="w-full bg-[#020617] pt-0 pb-12 relative z-40 sticky top-[130px] border-b border-slate-800 shadow-xl">
        <div className="w-full max-w-7xl mx-auto px-4">
            <div className="swiper mySwiper">
                <div className="swiper-wrapper">
                    {modulesData.map((mod, index) => {
                        const isActive = activeModuleId === mod.id;
                        return (
                            <div 
                                key={mod.id} 
                                className={`swiper-slide ${isActive ? 'is-active' : ''}`}
                                onClick={() => handleModuleClick(mod.id, index)}
                            >
                                <div className="relative w-[180px] h-full flex flex-col justify-end cursor-pointer group">
                                    <div className="relative w-full pb-2">
                                        <div className="block-container">
                                            <div className="block-content">
                                                {mod.title}
                                            </div>
                                        </div>
                                        <div className="robot-wrapper">
                                            <img src="https://placehold.co/150x150/png?text=Robo+Img" className="robot-img" alt="Robo" />
                                        </div>
                                    </div>
                                    <div className="base-line"></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
      </div>

      <div className="w-full bg-slate-900/50 border-t border-slate-800 min-h-[400px] py-12 relative z-30 mt-0">
          <div className="max-w-6xl mx-auto px-6" id="submodules-section">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-slate-800 pb-6">
                  <div>
                      <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                          {searchQuery.length >= 2 ? (
                              <i className="ph-fill ph-magnifying-glass text-blue-500"></i>
                          ) : (
                              <i className="ph-fill ph-circles-three-plus text-blue-500"></i>
                          )}
                          <span>{searchQuery.length >= 2 ? "Resultados da Busca" : activeModule.title}</span>
                      </h3>
                      {searchQuery.length < 2 && (
                          <p className="text-slate-400 mt-2 text-sm">Conteúdo programático completo.</p>
                      )}
                  </div>
                  <div className="mt-4 md:mt-0 px-4 py-2 bg-blue-900/30 text-blue-400 rounded-full text-xs font-semibold border border-blue-900/50">
                      <span>{filteredSubmodules.length}</span> {searchQuery.length >= 2 ? "Resultados" : "Submódulos Disponíveis"}
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSubmodules.length === 0 ? (
                      <div className="col-span-full text-center text-slate-500 py-10">
                          Nenhum resultado encontrado para "{searchQuery}"
                      </div>
                  ) : (
                      filteredSubmodules.map((sub, idx) => (
                          <div 
                              key={`${sub.moduleId}-${sub.originalIdx}`}
                              id={`submodule-${sub.moduleId}-${sub.originalIdx}`}
                              className="submodule-card rounded-xl p-5 relative overflow-hidden group cursor-pointer"
                              onClick={() => handleSubmoduleClick(sub.moduleId, sub.originalIdx)}
                          >
                              <img 
                                  src={`https://source.unsplash.com/featured/?medical,abstract&sig=${sub.moduleId}${sub.originalIdx}`}
                                  onError={(e) => { e.target.src=`https://source.unsplash.com/featured/?medical,abstract&sig=${sub.moduleId}${sub.originalIdx}`; }} 
                                  className="card-bg-image" 
                                  alt="Background" 
                              />
                              <div className="card-overlay"></div>
                              <div className="card-content-wrapper">
                                  <div className="flex items-start justify-between mb-3 relative z-10">
                                      <span className="text-[10px] font-bold text-white bg-blue-600/80 px-2 py-0.5 rounded uppercase tracking-wider">
                                          {sub.modTitle ? sub.modTitle : `SUBMÓDULO ${sub.originalIdx + 1}`}
                                      </span>
                                  </div>
                                  <div className="play-overlay">
                                      <i className="ph-fill ph-play text-white text-3xl ml-1"></i>
                                  </div>
                                  <div className="mt-auto relative z-10">
                                      <h4 className="text-lg font-bold text-white mb-1 leading-tight drop-shadow-md group-hover:text-blue-400 transition-colors">
                                          {sub.title}
                                      </h4>
                                      <div className="flex items-center justify-between mt-2">
                                          <p className="text-slate-300 text-xs line-clamp-1 opacity-80 w-2/3">{sub.desc}</p>
                                          <span className="text-xs font-medium text-white flex items-center gap-1 bg-black/60 px-2 py-1 rounded backdrop-blur-md">
                                              <i className="ph-fill ph-clock"></i> {sub.duration}
                                          </span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      ))
                  )}
              </div>
          </div>
      </div>

      {/* --- RODAPÉ --- */}
      <footer className="w-full bg-[#0b1121] border-t border-slate-800 pt-10 pb-10 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Suporte</a>
              <a href="#" className="hover:text-white transition-colors">Termos</a>
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            </div>
            <div className="text-center">
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Medicina JVS
              </span>
              <p className="text-xs text-slate-500 mt-1">Excelência em Preparação Médica</p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                <i className="ph-fill ph-instagram-logo text-xl"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                <i className="ph-fill ph-youtube-logo text-xl"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                <i className="ph-fill ph-linkedin-logo text-xl"></i>
              </a>
            </div>
          </div>
          <div className="border-t border-slate-800/50 mt-8 pt-4 text-center text-xs text-slate-600">
            &copy; 2025 MedCof USA. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}