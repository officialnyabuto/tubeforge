import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share2,
  Calendar,
  Filter,
  Download,
  Target,
  DollarSign,
  Zap
} from 'lucide-react';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  const platformData = [
    { name: 'YouTube Shorts', videos: 45, views: '2.8M', engagement: '8.4%', revenue: '$1,240', color: 'bg-red-500' },
    { name: 'Instagram Reels', videos: 38, views: '1.9M', engagement: '12.1%', revenue: '$890', color: 'bg-pink-500' },
    { name: 'TikTok', videos: 52, views: '3.2M', engagement: '15.8%', revenue: '$650', color: 'bg-black' },
    { name: 'LinkedIn', videos: 15, views: '456K', engagement: '6.2%', revenue: '$320', color: 'bg-blue-600' },
  ];

  const topPerformingContent = [
    {
      title: "AI Revolution 2025: What's Coming Next",
      platform: 'TikTok',
      views: '1.2M',
      engagement: '18.5%',
      revenue: '$340',
      thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      title: "Crypto Market Prediction: Bull Run Incoming?",
      platform: 'YouTube Shorts',
      views: '890K',
      engagement: '14.2%',
      revenue: '$280',
      thumbnail: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      title: "Productivity Hack: The 2-Minute Rule",
      platform: 'Instagram Reels',
      views: '765K',
      engagement: '16.8%',
      revenue: '$195',
      thumbnail: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
  ];

  const performanceMetrics = [
    { label: 'Total Views', value: '8.4M', change: '+24%', icon: Eye, color: 'primary' },
    { label: 'Total Engagement', value: '1.2M', change: '+18%', icon: Heart, color: 'success' },
    { label: 'New Subscribers', value: '45.2K', change: '+32%', icon: Users, color: 'secondary' },
    { label: 'Revenue Generated', value: '$3,100', change: '+28%', icon: DollarSign, color: 'warning' },
  ];

  const trendingTopics = [
    { topic: 'AI & Technology', posts: 15, avgViews: '1.2M', growth: '+45%' },
    { topic: 'Cryptocurrency', posts: 12, avgViews: '890K', growth: '+32%' },
    { topic: 'Productivity Tips', posts: 18, avgViews: '650K', growth: '+28%' },
    { topic: 'Health & Wellness', posts: 8, avgViews: '420K', growth: '+15%' },
    { topic: 'Finance & Investment', posts: 10, avgViews: '380K', growth: '+22%' },
  ];

  return (
    <div className="space-y-6 lg:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-gray-300 mt-2">Track performance across all platforms and optimize your content strategy</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-white/10 border border-white/20 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          
          <button className="flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {performanceMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="backdrop-blur-xl bg-white/10 rounded-xl p-4 lg:p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 lg:w-12 lg:h-12 bg-${metric.color}-500/20 rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 lg:w-6 lg:h-6 text-${metric.color}-500`} />
                </div>
                <div className={`text-${metric.color === 'warning' ? 'warning' : 'success'}-500 bg-${metric.color === 'warning' ? 'warning' : 'success'}-500/20 px-2 py-1 rounded-lg text-xs lg:text-sm font-medium`}>
                  {metric.change}
                </div>
              </div>
              <div>
                <p className="text-gray-300 text-xs lg:text-sm">{metric.label}</p>
                <p className="text-lg lg:text-2xl font-bold text-white mt-1">{metric.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {/* Platform Performance */}
        <div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 lg:p-6 border border-white/20">
          <h2 className="text-lg lg:text-xl font-semibold text-white mb-6">Platform Performance</h2>
          <div className="space-y-4">
            {platformData.map((platform, index) => (
              <div key={index} className="flex items-center justify-between p-3 lg:p-4 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3 lg:space-x-4 flex-1 min-w-0">
                  <div className={`w-3 h-3 lg:w-4 lg:h-4 ${platform.color} rounded-full flex-shrink-0`}></div>
                  <div className="min-w-0 flex-1">
                    <p className="text-white font-medium text-sm lg:text-base truncate">{platform.name}</p>
                    <p className="text-gray-400 text-xs lg:text-sm">{platform.videos} videos published</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-white font-semibold text-sm lg:text-base">{platform.views}</p>
                  <p className="text-gray-400 text-xs lg:text-sm">{platform.engagement} engagement</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 lg:p-6 border border-white/20">
          <h2 className="text-lg lg:text-xl font-semibold text-white mb-6">Revenue Breakdown</h2>
          <div className="space-y-4">
            {platformData.map((platform, index) => (
              <div key={index} className="flex items-center justify-between p-3 lg:p-4 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3 lg:space-x-4 flex-1 min-w-0">
                  <div className={`w-3 h-3 lg:w-4 lg:h-4 ${platform.color} rounded-full flex-shrink-0`}></div>
                  <span className="text-white text-sm lg:text-base truncate">{platform.name}</span>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-white font-semibold text-sm lg:text-base">{platform.revenue}</p>
                  <p className="text-gray-400 text-xs lg:text-sm">RPM: ${(parseFloat(platform.revenue.slice(1)) / parseFloat(platform.views.slice(0, -1)) * 1000).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Content */}
      <div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 lg:p-6 border border-white/20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-2 lg:space-y-0">
          <h2 className="text-lg lg:text-xl font-semibold text-white">Top Performing Content</h2>
          <button className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors self-start lg:self-auto">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-400 text-sm border-b border-white/10">
                <th className="text-left py-3">Content</th>
                <th className="text-left py-3 hidden sm:table-cell">Platform</th>
                <th className="text-right py-3">Views</th>
                <th className="text-right py-3 hidden lg:table-cell">Engagement</th>
                <th className="text-right py-3">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topPerformingContent.map((content, index) => (
                <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={content.thumbnail} 
                        alt={content.title}
                        className="w-10 h-10 lg:w-12 lg:h-12 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-white font-medium text-sm truncate">{content.title}</p>
                        <p className="text-primary-300 text-xs sm:hidden">{content.platform}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 hidden sm:table-cell">
                    <span className="bg-primary-500/20 text-primary-300 px-2 py-1 rounded text-xs">
                      {content.platform}
                    </span>
                  </td>
                  <td className="py-4 text-right text-white text-sm lg:text-base">{content.views}</td>
                  <td className="py-4 text-right text-success-500 text-sm hidden lg:table-cell">{content.engagement}</td>
                  <td className="py-4 text-right text-white font-semibold text-sm lg:text-base">{content.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {/* Trending Topics */}
        <div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 lg:p-6 border border-white/20">
          <h2 className="text-lg lg:text-xl font-semibold text-white mb-6">Trending Topics Performance</h2>
          <div className="space-y-4">
            {trendingTopics.map((topic, index) => (
              <div key={index} className="flex items-center justify-between p-3 lg:p-4 bg-white/5 rounded-lg">
                <div className="flex-1 min-w-0 mr-4">
                  <p className="text-white font-medium text-sm lg:text-base truncate">{topic.topic}</p>
                  <p className="text-gray-400 text-xs lg:text-sm">{topic.posts} posts • {topic.avgViews} avg views</p>
                </div>
                <div className="text-success-500 bg-success-500/20 px-2 lg:px-3 py-1 rounded-lg text-xs lg:text-sm font-medium flex-shrink-0">
                  {topic.growth}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 lg:p-6 border border-white/20">
          <div className="flex items-center space-x-2 mb-6">
            <Zap className="w-5 h-5 text-primary-500" />
            <h2 className="text-lg lg:text-xl font-semibold text-white">AI Insights & Recommendations</h2>
          </div>
          
          <div className="space-y-4">
            <div className="p-3 lg:p-4 bg-primary-500/10 border border-primary-500/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <Target className="w-4 h-4 lg:w-5 lg:h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-white font-medium mb-1 text-sm lg:text-base">Optimal Posting Time</p>
                  <p className="text-gray-300 text-xs lg:text-sm">Post TikTok content at 3-5 PM EST for 23% higher engagement</p>
                </div>
              </div>
            </div>
            
            <div className="p-3 lg:p-4 bg-success-500/10 border border-success-500/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-success-500 mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-white font-medium mb-1 text-sm lg:text-base">Content Opportunity</p>
                  <p className="text-gray-300 text-xs lg:text-sm">"AI in Healthcare" trending up 45% - create content soon</p>
                </div>
              </div>
            </div>
            
            <div className="p-3 lg:p-4 bg-warning-500/10 border border-warning-500/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <Calendar className="w-4 h-4 lg:w-5 lg:h-5 text-warning-500 mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-white font-medium mb-1 text-sm lg:text-base">Schedule Optimization</p>
                  <p className="text-gray-300 text-xs lg:text-sm">Reduce LinkedIn posting frequency to 3x/week for better results</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;