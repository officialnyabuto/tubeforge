import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PipelineOverview from './components/PipelineOverview';
import AgentDashboard from './components/AgentDashboard';
import ContentPreview from './components/ContentPreview';
import Analytics from './components/Analytics';
import ScheduleManager from './components/ScheduleManager';

function App() {
  const [activeView, setActiveView] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 lg:h-16 lg:w-16 border-4 border-primary-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-white text-base lg:text-lg font-medium">Initializing AI Content Pipeline...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <Header activeView={activeView} setActiveView={setActiveView} />
      
      <main className="container mx-auto px-4 py-6 lg:py-8">
        {activeView === 'overview' && <PipelineOverview />}
        {activeView === 'agents' && <AgentDashboard />}
        {activeView === 'content' && <ContentPreview />}
        {activeView === 'analytics' && <Analytics />}
        {activeView === 'schedule' && <ScheduleManager />}
      </main>
    </div>
  );
}

export default App;