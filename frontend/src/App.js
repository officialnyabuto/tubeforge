import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import ControlPanel from './components/ControlPanel';
import LogViewer from './components/LogViewer';
import AssetViewer from './components/AssetViewer';

const App = () => {
  const [workflowInput, setWorkflowInput] = useState({
    niche: '',
    style: 'auto',
    lang: 'en',
    enable_interaction: true,
  });
  const [taskId, setTaskId] = useState(null);
  const [logs, setLogs] = useState([]);
  const [assets, setAssets] = useState({});

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">TubeForge AI Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        <ControlPanel
          workflowInput={workflowInput}
          setWorkflowInput={setWorkflowInput}
          setTaskId={setTaskId}
          setLogs={setLogs}
        />
        <LogViewer logs={logs} />
        <AssetViewer assets={assets} taskId={taskId} setAssets={setAssets} />
      </div>
      <Dashboard />
    </div>
  );
};

export default App;