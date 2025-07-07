import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Edit, 
  Trash2, 
  Play, 
  Pause,
  CheckCircle,
  AlertCircle,
  Filter,
  Search,
  Globe,
  Users
} from 'lucide-react';

const ScheduleManager: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [filterPlatform, setFilterPlatform] = useState('all');

  const scheduledContent = [
    {
      id: 1,
      title: "AI Revolution 2025: What's Coming Next",
      platforms: ['YouTube Shorts', 'Instagram Reels', 'TikTok'],
      scheduledTime: '2025-01-20T15:00:00',
      status: 'scheduled',
      thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=100',
      estimatedReach: '2.4M',
      timezone: 'EST'
    },
    {
      id: 2,
      title: "Crypto Market Prediction: Bull Run Incoming?",
      platforms: ['YouTube Shorts', 'Instagram Reels'],
      scheduledTime: '2025-01-20T18:00:00',
      status: 'scheduled',
      thumbnail: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=100',
      estimatedReach: '1.8M',
      timezone: 'EST'
    },
    {
      id: 3,
      title: "Productivity Hack: The 2-Minute Rule",
      platforms: ['Instagram Reels', 'TikTok', 'LinkedIn'],
      scheduledTime: '2025-01-21T09:00:00',
      status: 'processing',
      thumbnail: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=100',
      estimatedReach: '1.2M',
      timezone: 'EST'
    },
    {
      id: 4,
      title: "5 Investment Mistakes to Avoid in 2025",
      platforms: ['YouTube Shorts', 'LinkedIn'],
      scheduledTime: '2025-01-21T14:00:00',
      status: 'draft',
      thumbnail: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=100',
      estimatedReach: '950K',
      timezone: 'EST'
    },
    {
      id: 5,
      title: "Morning Routine for Peak Performance",
      platforms: ['Instagram Reels', 'TikTok'],
      scheduledTime: '2025-01-22T07:00:00',
      status: 'scheduled',
      thumbnail: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=100',
      estimatedReach: '1.5M',
      timezone: 'EST'
    }
  ];

  const platforms = [
    { name: 'YouTube Shorts', color: 'bg-red-500', count: 12 },
    { name: 'Instagram Reels', color: 'bg-pink-500', count: 15 },
    { name: 'TikTok', color: 'bg-black', count: 18 },
    { name: 'LinkedIn', color: 'bg-blue-600', count: 8 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-success-500/20 text-success-500';
      case 'processing': return 'bg-warning-500/20 text-warning-500';
      case 'draft': return 'bg-gray-500/20 text-gray-400';
      case 'published': return 'bg-primary-500/20 text-primary-500';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return Clock;
      case 'processing': return AlertCircle;
      case 'draft': return Edit;
      case 'published': return CheckCircle;
      default: return AlertCircle;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="space-y-6 lg:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Schedule Manager</h1>
          <p className="text-gray-300 mt-2">Plan, schedule, and manage your content publishing across all platforms</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex bg-white/10 rounded-lg p-1">
            <button 
              onClick={() => setViewMode('calendar')}
              className={`px-3 lg:px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'calendar' ? 'bg-primary-500 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              Calendar
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`px-3 lg:px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              List
            </button>
          </div>
          
          <button className="flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors">
            <Plus className="w-4 h-4" />
            <span>Schedule Content</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 lg:p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-xs lg:text-sm">Scheduled Today</p>
              <p className="text-xl lg:text-2xl font-bold text-white mt-1">8</p>
            </div>
            <Calendar className="w-6 h-6 lg:w-8 lg:h-8 text-primary-500" />
          </div>
        </div>
        
        <div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 lg:p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-xs lg:text-sm">This Week</p>
              <p className="text-xl lg:text-2xl font-bold text-white mt-1">24</p>
            </div>
            <Clock className="w-6 h-6 lg:w-8 lg:h-8 text-secondary-500" />
          </div>
        </div>
        
        <div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 lg:p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-xs lg:text-sm">Estimated Reach</p>
              <p className="text-xl lg:text-2xl font-bold text-white mt-1">12.8M</p>
            </div>
            <Users className="w-6 h-6 lg:w-8 lg:h-8 text-success-500" />
          </div>
        </div>
        
        <div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 lg:p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-xs lg:text-sm">Active Platforms</p>
              <p className="text-xl lg:text-2xl font-bold text-white mt-1">4</p>
            </div>
            <Globe className="w-6 h-6 lg:w-8 lg:h-8 text-warning-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
        {/* Filters & Platform Stats */}
        <div className="xl:col-span-1 space-y-6">
          {/* Filters */}
          <div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 lg:p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-4">Filters</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Search Content</label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <input 
                    type="text"
                    placeholder="Search by title..."
                    className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Platform</label>
                <select 
                  value={filterPlatform}
                  onChange={(e) => setFilterPlatform(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All Platforms</option>
                  <option value="youtube">YouTube Shorts</option>
                  <option value="instagram">Instagram Reels</option>
                  <option value="tiktok">TikTok</option>
                  <option value="linkedin">LinkedIn</option>
                </select>
              </div>
              
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Status</label>
                <select className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option value="all">All Status</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="processing">Processing</option>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
          </div>

          {/* Platform Distribution */}
          <div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 lg:p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-4">Platform Distribution</h3>
            <div className="space-y-3">
              {platforms.map((platform) => (
                <div key={platform.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className={`w-3 h-3 ${platform.color} rounded-full flex-shrink-0`}></div>
                    <span className="text-gray-300 text-sm truncate">{platform.name}</span>
                  </div>
                  <span className="text-white font-semibold flex-shrink-0">{platform.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Schedule Content */}
        <div className="xl:col-span-3">
          <div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 lg:p-6 border border-white/20">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-2 lg:space-y-0">
              <h2 className="text-lg lg:text-xl font-semibold text-white">Scheduled Content</h2>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Filter className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {scheduledContent.map((content) => {
                const StatusIcon = getStatusIcon(content.status);
                
                return (
                  <div key={content.id} className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    {/* Thumbnail & Content Info */}
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      <img 
                        src={content.thumbnail} 
                        alt={content.title}
                        className="w-12 h-12 lg:w-16 lg:h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium text-sm lg:text-base truncate mb-1">{content.title}</h3>
                        
                        {/* Platforms */}
                        <div className="flex flex-wrap gap-1 mb-2">
                          {content.platforms.map((platform) => (
                            <span key={platform} className="bg-primary-500/20 text-primary-300 px-2 py-1 rounded text-xs">
                              {platform}
                            </span>
                          ))}
                        </div>
                        
                        {/* Schedule Info */}
                        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 text-xs lg:text-sm text-gray-300 space-y-1 lg:space-y-0">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3 lg:w-4 lg:h-4" />
                            <span>{formatDate(content.scheduledTime)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3 lg:w-4 lg:h-4" />
                            <span>{formatTime(content.scheduledTime)} {content.timezone}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-3 h-3 lg:w-4 lg:h-4" />
                            <span>{content.estimatedReach} reach</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Status & Actions */}
                    <div className="flex items-center justify-between lg:justify-end lg:space-x-3">
                      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(content.status)}`}>
                        <StatusIcon className="w-3 h-3 lg:w-4 lg:h-4" />
                        <span className="text-xs lg:text-sm font-medium capitalize">{content.status}</span>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center space-x-1">
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                          {content.status === 'scheduled' ? 
                            <Pause className="w-4 h-4 text-gray-400" /> :
                            <Play className="w-4 h-4 text-gray-400" />
                          }
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mt-6 pt-6 border-t border-white/10 space-y-4 lg:space-y-0">
              <p className="text-gray-400 text-sm">Showing 5 of 24 scheduled items</p>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors">
                  Previous
                </button>
                <button className="px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 lg:p-6 border border-white/20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h3 className="text-lg font-semibold text-white">Bulk Actions</h3>
            <p className="text-gray-300 text-sm mt-1">Manage multiple scheduled posts at once</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <button className="flex items-center justify-center space-x-2 bg-success-600 hover:bg-success-700 text-white px-4 py-2 rounded-lg transition-colors">
              <Play className="w-4 h-4" />
              <span>Publish Selected</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-warning-600 hover:bg-warning-700 text-white px-4 py-2 rounded-lg transition-colors">
              <Pause className="w-4 h-4" />
              <span>Pause Selected</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-error-600 hover:bg-error-700 text-white px-4 py-2 rounded-lg transition-colors">
              <Trash2 className="w-4 h-4" />
              <span>Delete Selected</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleManager;