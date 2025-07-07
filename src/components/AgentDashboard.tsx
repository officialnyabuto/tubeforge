import React from 'react';
import { 
  Search, 
  PenTool, 
  Mic, 
  Scissors, 
  Upload,
  Activity,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Zap,
  AlertTriangle
} from 'lucide-react';
import { useAgents } from '../hooks/useAgents';

const AgentDashboard: React.FC = () => {
  const { agents, isLoading, systemStatus, runDailyPipeline, processQueue } = useAgents();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-success-500 bg-success-500/20';
      case 'processing': return 'text-warning-500 bg-warning-500/20';
      case 'idle': return 'text-gray-400 bg-gray-500/20';
      case 'error': return 'text-error-500 bg-error-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 95) return 'text-success-500';
    if (health >= 85) return 'text-warning-500';
    return 'text-error-500';
  };

  const getAgentIcon = (name: string) => {
    if (name.includes('Trend')) return Search;
    if (name.includes('Content')) return PenTool;
    if (name.includes('Avatar')) return Mic;
    if (name.includes('Production')) return Scissors;
    if (name.includes('Publishing')) return Upload;
    return Activity;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 lg:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">AI Agent Control Center</h1>
          <p className="text-gray-300 mt-2">Monitor and manage your autonomous content creation agents</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <button 
            onClick={runDailyPipeline}
            className="flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Zap className="w-4 h-4" />
            <span>Run Pipeline</span>
          </button>
          <button 
            onClick={processQueue}
            className="flex items-center justify-center space-x-2 bg-secondary-600 hover:bg-secondary-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Play className="w-4 h-4" />
            <span>Process Queue</span>
          </button>
        </div>
      </div>

      {/* System Status Alert */}
      {systemStatus && (
        <div className="backdrop-blur-xl bg-primary-500/10 border border-primary-500/20 rounded-xl p-4 lg:p-6">
          <div className="flex items-start space-x-3">
            <Zap className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-2">System Status</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Queue Tasks: </span>
                  <span className="text-white font-medium">
                    {systemStatus.queueStatus?.length || 0} pending
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Content Published: </span>
                  <span className="text-white font-medium">
                    {systemStatus.recentContent?.length || 0} today
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Last Updated: </span>
                  <span className="text-white font-medium">
                    {systemStatus.lastUpdated ? new Date(systemStatus.lastUpdated).toLocaleTimeString() : 'Never'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Agent Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        {agents.map((agent, index) => {
          const Icon = getAgentIcon(agent.name);
          
          return (
            <div key={index} className="backdrop-blur-xl bg-white/10 rounded-xl p-4 lg:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              {/* Agent Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base lg:text-lg font-semibold text-white truncate">{agent.name}</h3>
                    <div className={`flex items-center space-x-2 px-2 py-1 rounded-full ${getStatusColor(agent.status)} mt-1 w-fit`}>
                      <Activity className="w-3 h-3" />
                      <span className="text-xs font-medium capitalize">{agent.status}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 flex-shrink-0">
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <Settings className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <RotateCcw className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Health & Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">System Health</span>
                    <span className={`text-sm font-semibold ${getHealthColor(agent.health)}`}>
                      {agent.health}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        agent.health >= 95 ? 'bg-success-500' :
                        agent.health >= 85 ? 'bg-warning-500' : 'bg-error-500'
                      }`}
                      style={{ width: `${agent.health}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-3">
                  <span className="text-gray-400 text-sm">Tasks Completed</span>
                  <p className="text-lg lg:text-xl font-bold text-white">{agent.tasksCompleted.toLocaleString()}</p>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="mb-4">
                <h4 className="text-white font-medium mb-3">Performance Metrics</h4>
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(agent.performance).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <p className="text-gray-400 text-xs capitalize">{key}</p>
                      <p className="text-sm lg:text-lg font-semibold text-white">{value}%</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current Task */}
              <div className="mb-4">
                <h4 className="text-white font-medium mb-2">Current Task</h4>
                <p className="text-gray-300 text-sm bg-white/5 rounded-lg p-3">{agent.currentTask}</p>
              </div>

              {/* Last Update */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm space-y-1 sm:space-y-0">
                <span className="text-gray-400">
                  Last Update: {new Date(agent.lastUpdate).toLocaleTimeString()}
                </span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                  <span className="text-success-500">Live</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 lg:p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">System Resources</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">CPU Usage</span>
                <span className="text-white">67%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-secondary-500 h-2 rounded-full" style={{ width: '67%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Memory</span>
                <span className="text-white">45%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Storage</span>
                <span className="text-white">23%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-success-500 h-2 rounded-full" style={{ width: '23%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 lg:p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">API Status</h3>
          <div className="space-y-3">
            {['OpenAI GPT-4', 'Synthesia', 'Play.ht', 'Opus Clip'].map((api) => (
              <div key={api} className="flex items-center justify-between">
                <span className="text-gray-300 text-sm truncate mr-2">{api}</span>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                  <span className="text-success-500 text-xs">Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 lg:p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">Today's Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Videos Generated</span>
              <span className="text-white font-semibold">{systemStatus?.recentContent?.length || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Scripts Created</span>
              <span className="text-white font-semibold">
                {systemStatus?.metrics?.filter((m: any) => m.metric_type === 'scripts_generated').length || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Posts Published</span>
              <span className="text-white font-semibold">
                {systemStatus?.recentContent?.filter((c: any) => c.status === 'published').length || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Trends Analyzed</span>
              <span className="text-white font-semibold">
                {systemStatus?.metrics?.filter((m: any) => m.metric_type === 'trends_discovered').reduce((sum: number, m: any) => sum + m.metric_value, 0) || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;