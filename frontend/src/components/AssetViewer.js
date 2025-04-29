import React, { useEffect } from 'react';

const AssetViewer = ({ assets, taskId, setAssets }) => {
  useEffect(() => {
    if (taskId) {
      const checkStatus = async () => {
        const response = await fetch(`http://localhost:8000/task_status/${taskId}`);
        const data = await response.json();
        if (data.status === 'success') {
          setAssets(data.result);
        }
      };
      const interval = setInterval(checkStatus, 5000);
      return () => clearInterval(interval);
    }
  }, [taskId, setAssets]);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Generated Assets</h2>
      <div className="space-y-4">
        {assets.script && (
          <div>
            <h3 className="text-lg font-medium">Script</h3>
            <p className="text-sm text-gray-600">{assets.script}</p>
          </div>
        )}
        {assets.thumbnail && (
          <div>
            <h3 className="text-lg font-medium">Thumbnail</h3>
            <p className="text-sm text-gray-600">{assets.thumbnail}</p>
          </div>
        )}
        {assets.video && (
          <div>
            <h3 className="text-lg font-medium">Video</h3>
            <p className="text-sm text-gray-600">{assets.video}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetViewer;