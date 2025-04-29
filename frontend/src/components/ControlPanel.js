import React, { useState, useEffect } from 'react';

const ControlPanel = ({ workflowInput, setWorkflowInput, setTaskId, setLogs }) => {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8000/ws');
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'log') {
        setLogs((prev) => [...prev, data.message]);
      }
    };
    setWs(websocket);
    return () => websocket.close();
  }, [setLogs]);

  const handleStartWorkflow = async () => {
    const response = await fetch('http://localhost:8000/start_workflow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workflowInput),
    });
    const result = await response.json();
    setTaskId(result.task_id);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Control Panel</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Niche</label>
          <input
            type="text"
            value={workflowInput.niche}
            onChange={(e) => setWorkflowInput({ ...workflowInput, niche: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Style</label>
          <select
            value={workflowInput.style}
            onChange={(e) => setWorkflowInput({ ...workflowInput, style: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="auto">Auto</option>
            <option value="cyberpunk">Cyberpunk</option>
            <option value="retro">Retro</option>
            <option value="minimalist">Minimalist</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Language</label>
          <input
            type="text"
            value={workflowInput.lang}
            onChange={(e) => setWorkflowInput({ ...workflowInput, lang: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={workflowInput.enable_interaction}
              onChange={(e) => setWorkflowInput({ ...workflowInput, enable_interaction: e.target.checked })}
              className="mr-2"
            />
            Enable Interaction Agent
          </label>
        </div>
        <button
          onClick={handleStartWorkflow}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Start Workflow
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;