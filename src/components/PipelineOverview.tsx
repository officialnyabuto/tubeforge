import React from 'react';
import { 
  TrendingUp, 
  FileText, 
  Video, 
  Edit, 
  Share2, 
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const PipelineOverview: React.FC = () => {
  const pipelineStages = [
    {
      id: 1,
      title: 'Trend Discovery',
      description: 'AI scans global trends, hashtags, and viral topics',
      icon: TrendingUp,
      status: 'active',
      progress: 85,
      lastUpdate: '2 minutes ago',
      metrics: { discovered: 12, processed: 8, selected: 3 }
    },
    {
      id: 2,
      title: 'Script Generation',
      description: 'GPT-4 creates engaging 30-60 second scripts',
      icon: FileText,
      status: 'active',
      progress: 72,
      lastUpdate: '5 minutes ago',
      metrics: { generated: 15, approved: 12, pending: 3 }
    },
    {
      id: 3,
      title: 'Avatar & Voice',
      description: 'AI avatars with synchronized voiceovers',
      icon: Video,
      status: 'processing',
      progress: 45,
      lastUpdate: '8 minutes ago',
      metrics: { rendered: 5, processing: 3, queue: 4 }
    },
    {
      id: 4,
      title: 'Post-Production',
      description: 'Automated editing, captions, and optimization',
      icon: Edit,
      status: 'pending',
      progress: 20,
      lastUpdate: '12 minutes ago',
      metrics: { edited: 2, processing: 1, pending: 9 }
    },
    {
      id: 5,
      title: 'Multi-Platform Publishing',
      description: 'Scheduled posting across all social channels',
      icon: Share2,
      status: 'scheduled',
      progress: 100,
      lastUpdate: '15 minutes ago',
      metrics: { published: 8, scheduled: 4, failed: 0 }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-success-500 bg-success-500/20';
      case 'processing': return 'text-warning-500 bg-warning-500/20';
      case 'pending': return 'text-gray-400 bg-gray-500/20';
      case 'scheduled': return 'text-secondary-500 bg-secondary-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'processing': return Clock;
      case 'pending': return AlertCircle;
      case 'scheduled': return CheckCircle;
      default: return AlertCircle;
    }
  };

  return (
    <div className="space-y-6 lg:space-y-8 animate-fade-in">
      {/* Header Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {[
          { label: 'Daily Videos Generated', value: '24', change: '+18%', color: 'success' },
          { label: 'Active AI Agents', value: '5', change: '100%', color: 'secondary' },
          { label: 'Platform Reach', value: '2.8M', change: '+32%', color: 'primary' },
          { label: 'Engagement Rate', value: '8.4%', change: '+15%', color: 'warning' }
        ].map((stat, index) => (
          <div key={index} className="backdrop-blur-xl bg-white/10 rounded-xl p-4 lg:p-6 border border-white/20">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-2 lg:mb-0">
                <p className="text-gray-300 text-xs lg:text-sm">{stat.label}</p>
                <p className="text-xl lg:text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className={`text-${stat.color}-500 bg-${stat.color}-500/20 px-2 py-1 rounded-lg text-xs font-medium self-start lg:self-auto`}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pipeline Flow */}
      <div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 lg:p-8 border border-white/20">
        <h2 className="text-xl lg:text-2xl font-bold text-white mb-6 lg:mb-8">Content Pipeline Flow</h2>
        
        <div className="space-y-4 lg:space-y-6">
          {pipelineStages.map((stage, index) => {
            const StatusIcon = getStatusIcon(stage.status);
            const Icon = stage.icon;
            
            return (
              <div key={stage.id} className="relative">
                <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                  {/* Stage Icon */}
                  <div className="flex-shrink-0 flex items-center space-x-4 lg:space-x-0">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                    </div>
                    
                    {/* Mobile Status */}
                    <div className={`lg:hidden flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(stage.status)}`}>
                      <StatusIcon className="w-3 h-3" />
                      <span className="text-xs font-medium capitalize">{stage.status}</span>
                    </div>
                  </div>

                  {/* Stage Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-2">
                      <h3 className="text-lg font-semibold text-white mb-1 lg:mb-0">{stage.title}</h3>
                      
                      {/* Desktop Status */}
                      <div className={`hidden lg:flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(stage.status)}`}>
                        <StatusIcon className="w-4 h-4" />
                        <span className="text-sm font-medium capitalize">{stage.status}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-sm lg:text-base mb-3">{stage.description}</p>
                    
                    {/* Progress Bar */}
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${stage.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-300 font-medium">{stage.progress}%</span>
                    </div>

                    {/* Metrics */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="grid grid-cols-3 gap-4 lg:flex lg:space-x-6 mb-2 lg:mb-0">
                        {Object.entries(stage.metrics).map(([key, value]) => (
                          <div key={key} className="text-center lg:text-left">
                            <p className="text-xs lg:text-sm text-gray-400 capitalize">{key}</p>
                            <p className="text-sm lg:text-lg font-semibold text-white">{value}</p>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs lg:text-sm text-gray-400">Updated {stage.lastUpdate}</p>
                    </div>
                  </div>

                  {/* Arrow - Desktop Only */}
                  {index < pipelineStages.length - 1 && (
                    <div className="hidden lg:flex flex-shrink-0">
                      <ArrowRight className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Connecting Line - Mobile */}
                {index < pipelineStages.length - 1 && (
                  <div className="lg:hidden absolute left-6 top-12 w-px h-8 bg-gradient-to-b from-primary-500 to-transparent"></div>
                )}

                {/* Connecting Line - Desktop */}
                {index < pipelineStages.length - 1 && (
                  <div className="hidden lg:block absolute left-8 top-16 w-px h-12 bg-gradient-to-b from-primary-500 to-transparent"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 lg:p-6 border border-white/20">
        <h3 className="text-lg lg:text-xl font-semibold text-white mb-4">Recent Pipeline Activity</h3>
        <div className="space-y-3">
          {[
            { time: '2 min ago', action: 'New trending topic detected: "AI Revolution 2025"', status: 'success' },
            { time: '5 min ago', action: 'Script generated for "Tech Predictions" topic', status: 'success' },
            { time: '8 min ago', action: 'Avatar video rendering started for 3 scripts', status: 'processing' },
            { time: '12 min ago', action: 'Content scheduled for publishing at 3:00 PM EST', status: 'scheduled' },
            { time: '15 min ago', action: 'Published 2 videos to YouTube Shorts successfully', status: 'success' }
          ].map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5">
              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                activity.status === 'success' ? 'bg-success-500' :
                activity.status === 'processing' ? 'bg-warning-500' :
                'bg-secondary-500'
              }`}></div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm">{activity.action}</p>
                <p className="text-gray-400 text-xs">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PipelineOverview;