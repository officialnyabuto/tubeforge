import React from 'react';

const LogViewer = ({ logs }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Agent Logs</h2>
      <div className="h-96 overflow-y-auto bg-gray-50 p-4 rounded">
        {logs.map((log, index) => (
          <p key={index} className="text-sm text-gray-700">{log}</p>
        ))}
      </div>
    </div>
  );
};

export default LogViewer;