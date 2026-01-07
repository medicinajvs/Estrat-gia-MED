// src/views/DashboardView.jsx
import React from 'react';

const DashboardView = ({ onNavigate }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 animate-in fade-in zoom-in-95">
      <h1 className="text-4xl font-bold text-center">Bem-vindo à Plataforma</h1>
      <button onClick={onNavigate} className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-xl shadow-lg shadow-blue-900/40 transition hover:scale-105">
        Ir para Aula (Demo)
      </button>
  </div>
);

export default DashboardView;