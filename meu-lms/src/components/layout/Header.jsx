import React from 'react';
import { Search, Bell } from 'lucide-react';

const Header = ({ onViewChange, currentView }) => (
  <header className="sticky top-0 z-50 bg-[#020617]/95 backdrop-blur-md border-b border-white/5 px-4 py-3 md:px-8 flex items-center justify-between">
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onViewChange('dashboard')}>
        <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg flex items-center justify-center font-bold italic group-hover:scale-110 transition">
          E
        </div>
        <span className="font-bold text-xl hidden md:block tracking-tight">Ensino<span className="text-blue-500">Med</span></span>
      </div>
      <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-400">
        <button onClick={() => onViewChange('dashboard')} className={`hover:text-white transition ${currentView === 'dashboard' ? 'text-white' : ''}`}>Home</button>
        {['Acompanhamento', 'Cronograma', 'QBank', 'Comunidade'].map((item) => (
          <a key={item} href="#" className="hover:text-white transition relative group">
            {item}
            <span className="absolute -bottom-4 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
          </a>
        ))}
      </nav>
    </div>
    <div className="flex items-center gap-4">
      <div className="hidden md:flex items-center bg-[#1e293b] rounded-lg px-3 py-1.5 w-64 border border-white/5 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition group">
        <Search size={16} className="text-gray-400 mr-2 group-focus-within:text-blue-500" />
        <input type="text" placeholder="Pesquisar" className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-500 text-white" />
      </div>
      <div className="flex items-center gap-4 border-l border-gray-800 pl-4">
        <div className="relative cursor-pointer hover:bg-white/5 p-2 rounded-full transition">
          <Bell size={20} className="text-gray-300" />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#020617]"></span>
        </div>
        <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-xs font-bold border-2 border-[#1e293b] cursor-pointer hover:scale-105 transition shadow-lg shadow-purple-500/20">
          NA
        </div>
      </div>
    </div>
  </header>
);
export default Header;