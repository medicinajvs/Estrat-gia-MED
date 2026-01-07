import React, { useState } from 'react';
import Header from './components/layout/Header';
import DashboardView from './views/DashboardView';
import LessonView from './views/LessonView';

const App = () => {
  const [currentView, setCurrentView] = useState('lesson'); 
  
  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-purple-500 selection:text-white pb-20">
      <Header onViewChange={setCurrentView} currentView={currentView} />
      
      <main className="max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8">
        {currentView === 'dashboard' ? (
          <DashboardView onNavigate={() => setCurrentView('lesson')} />
        ) : (
          <LessonView onBack={() => setCurrentView('dashboard')} />
        )}
      </main>
    </div>
  );
};

export default App;