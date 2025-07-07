import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Download, 
  Share2, 
  Edit, 
  RefreshCw,
  Settings,
  Eye,
  Heart,
  MessageCircle,
  TrendingUp,
  Clock,
  Target,
  Zap,
  Brain,
  Palette,
  Mic,
  Camera,
  X,
  Check,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useAgents } from '../hooks/useAgents';

const ContentPreview: React.FC = () => {
  const { triggerContentRegeneration, isRegenerating } = useAgents();
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showAdvancedControls, setShowAdvancedControls] = useState(false);
  const [showNuanceAnalysis, setShowNuanceAnalysis] = useState(false);
  const [regenerationStatus, setRegenerationStatus] = useState<{
    show: boolean;
    success?: boolean;
    message?: string;
  }>({ show: false });

  // Advanced nuance controls state with Phase 3 additions
  const [advancedControls, setAdvancedControls] = useState({
    // Content Generation Controls
    humorStyle: 'observational',
    emotionalSubtlety: 'implicit',
    linguisticComplexity: 'moderate',
    pacingVariation: 'dynamic',
    implicitMessaging: true,
    culturalNuance: 'universal', // Phase 3 addition
    subtextLevel: 'moderate', // Phase 3 addition
    conversationalStyle: 'structured', // Phase 3 addition
    rhetoricalDevices: ['metaphor', 'analogy'], // Phase 3 addition
    
    // Avatar & Voice Controls
    microExpressionIntensity: 0.7,
    voiceInflectionVariability: 0.6,
    nonVerbalCueFrequency: 0.5, // Phase 3 addition
    emotionalAuthenticity: 0.8,
    gestureComplexity: 0.6,
    eyeContactPattern: 'natural',
    breathingPattern: 'calm',
    personalityProjection: 0.7,
    
    // Post-Production Controls
    visualNuanceLevel: 0.6,
    audioNuanceLevel: 0.7,
    captionAdaptability: 0.8,
    editingSubtlety: 0.5,
    colorGradingMood: 'warm',
    transitionSmoothness: 0.7,
    musicSyncPrecision: 0.8, // Phase 3 addition
    effectsIntensity: 0.4
  });

  const videoContent = [
    {
      id: 1,
      title: "AI Revolution 2025: What's Coming Next",
      platform: 'YouTube Shorts',
      duration: '0:58',
      views: '2.4M',
      engagement: '8.2%',
      thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'published',
      nuanceScore: 87,
      creativeDecisions: [
        { timestamp: 3, decision: 'Emotional hook placement', reasoning: 'Maximize early engagement', impact: 'High' },
        { timestamp: 15, decision: 'Subtle humor integration', reasoning: 'Maintain viewer interest', impact: 'Medium' },
        { timestamp: 45, decision: 'Call-to-action timing', reasoning: 'Optimal conversion point', impact: 'High' }
      ]
    },
    {
      id: 2,
      title: "Crypto Market Prediction: Bull Run Incoming?",
      platform: 'Instagram Reels',
      duration: '0:45',
      views: '1.8M',
      engagement: '12.1%',
      thumbnail: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'scheduled',
      nuanceScore: 92,
      creativeDecisions: [
        { timestamp: 2, decision: 'Curiosity gap creation', reasoning: 'Hook viewer attention', impact: 'High' },
        { timestamp: 20, decision: 'Data visualization timing', reasoning: 'Support key claims', impact: 'Medium' },
        { timestamp: 40, decision: 'Emotional resolution', reasoning: 'Satisfying conclusion', impact: 'High' }
      ]
    },
    {
      id: 3,
      title: "Productivity Hack: The 2-Minute Rule",
      platform: 'TikTok',
      duration: '0:30',
      views: '3.2M',
      engagement: '15.8%',
      thumbnail: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'processing',
      nuanceScore: 94,
      creativeDecisions: [
        { timestamp: 1, decision: 'Pattern interrupt', reasoning: 'Break scroll behavior', impact: 'High' },
        { timestamp: 10, decision: 'Practical demonstration', reasoning: 'Increase relatability', impact: 'Medium' },
        { timestamp: 25, decision: 'Social proof integration', reasoning: 'Build credibility', impact: 'High' }
      ]
    }
  ];

  const currentVideo = videoContent[selectedVideo];

  const handleRegenerateWithControls = async () => {
    try {
      setRegenerationStatus({ show: false });
      
      const result = await triggerContentRegeneration({
        topicId: currentVideo.id.toString(),
        topic: currentVideo.title,
        category: 'technology', // You might want to derive this from the video data
        nuanceParams: advancedControls
      });

      setRegenerationStatus({
        show: true,
        success: result.success,
        message: result.message
      });

      // Hide status message after 5 seconds
      setTimeout(() => {
        setRegenerationStatus({ show: false });
      }, 5000);

    } catch (error) {
      console.error('Error regenerating content:', error);
      setRegenerationStatus({
        show: true,
        success: false,
        message: 'Failed to initiate content regeneration'
      });

      setTimeout(() => {
        setRegenerationStatus({ show: false });
      }, 5000);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-success-500/20 text-success-500';
      case 'scheduled': return 'bg-warning-500/20 text-warning-500';
      case 'processing': return 'bg-primary-500/20 text-primary-500';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getNuanceScoreColor = (score: number) => {
    if (score >= 90) return 'text-success-500';
    if (score >= 80) return 'text-warning-500';
    return 'text-error-500';
  };

  return (
    <div className="space-y-6 lg:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Content Preview</h1>
          <p className="text-gray-300 mt-2">Review, edit, and optimize your AI-generated content</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <button 
            onClick={() => setShowAdvancedControls(true)}
            className="flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>Advanced Controls</span>
          </button>
          <button 
            onClick={() => setShowNuanceAnalysis(true)}
            className="flex items-center justify-center space-x-2 bg-secondary-600 hover:bg-secondary-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Brain className="w-4 h-4" />
            <span>Nuance Analysis</span>
          </button>
        </div>
      </div>

      {/* Regeneration Status */}
      {regenerationStatus.show && (
        <div className={`backdrop-blur-xl rounded-xl p-4 border ${
          regenerationStatus.success 
            ? 'bg-success-500/10 border-success-500/20' 
            : 'bg-error-500/10 border-error-500/20'
        } animate-fade-in`}>
          <div className="flex items-center space-x-3">
            {regenerationStatus.success ? (
              <Check className="w-5 h-5 text-success-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-error-500" />
            )}
            <p className={`font-medium ${
              regenerationStatus.success ? 'text-success-500' : 'text-error-500'
            }`}>
              {regenerationStatus.message}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        {/* Video List */}
        <div className="xl:col-span-1">
          <div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 lg:p-6 border border-white/20">
            <h2 className="text-lg lg:text-xl font-semibold text-white mb-4">Generated Content</h2>
            <div className="space-y-3">
              {videoContent.map((video, index) => (
                <div 
                  key={video.id}
                  onClick={() => setSelectedVideo(index)}
                  className={`p-3 lg:p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedVideo === index 
                      ? 'bg-primary-500/20 border border-primary-500/30' 
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-12 h-12 lg:w-16 lg:h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium text-sm lg:text-base truncate mb-1">{video.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="bg-secondary-500/20 text-secondary-300 px-2 py-1 rounded text-xs">
                          {video.platform}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(video.status)}`}>
                          {video.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{video.duration}</span>
                        <span className={`font-semibold ${getNuanceScoreColor(video.nuanceScore)}`}>
                          {video.nuanceScore}% nuance
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Video Player & Details */}
        <div className="xl:col-span-2 space-y-6">
          {/* Video Player */}
          <div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 lg:p-6 border border-white/20">
            <div className="aspect-video bg-gray-900 rounded-lg mb-4 relative overflow-hidden">
              <img 
                src={currentVideo.thumbnail} 
                alt={currentVideo.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 lg:w-20 lg:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                  ) : (
                    <Play className="w-8 h-8 lg:w-10 lg:h-10 text-white ml-1" />
                  )}
                </button>
              </div>
              
              {/* Video Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-white" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-white" />
                    )}
                  </button>
                  <span className="text-white text-sm">{currentVideo.duration}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors">
                    <Download className="w-4 h-4 text-white" />
                  </button>
                  <button className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors">
                    <Share2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex-1 min-w-0">
                <h2 className="text-lg lg:text-xl font-semibold text-white mb-2">{currentVideo.title}</h2>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{currentVideo.views} views</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>{currentVideo.engagement} engagement</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Brain className="w-4 h-4" />
                    <span className={getNuanceScoreColor(currentVideo.nuanceScore)}>
                      {currentVideo.nuanceScore}% nuance score
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <button 
                  onClick={handleRegenerateWithControls}
                  disabled={isRegenerating}
                  className="flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-600/50 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  {isRegenerating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Zap className="w-4 h-4" />
                  )}
                  <span>{isRegenerating ? 'Regenerating...' : 'Regenerate Enhanced'}</span>
                </button>
                <button className="flex items-center justify-center space-x-2 bg-secondary-600 hover:bg-secondary-700 text-white px-4 py-2 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Views', value: currentVideo.views, icon: Eye, color: 'primary' },
              { label: 'Engagement', value: currentVideo.engagement, icon: Heart, color: 'success' },
              { label: 'Comments', value: '1.2K', icon: MessageCircle, color: 'secondary' },
              { label: 'Shares', value: '456', icon: Share2, color: 'warning' }
            ].map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="backdrop-blur-xl bg-white/10 rounded-xl p-4 border border-white/20">
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-5 h-5 text-${metric.color}-500`} />
                    <span className="text-xs text-gray-400">{metric.label}</span>
                  </div>
                  <p className="text-lg lg:text-xl font-bold text-white">{metric.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enhanced Nuance Controls Modal */}
      {showAdvancedControls && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Enhanced Nuance Controls</h2>
              <button 
                onClick={() => setShowAdvancedControls(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Content Generation Controls */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                  <PenTool className="w-5 h-5" />
                  <span>Content Generation</span>
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">Humor Style</label>
                    <select 
                      value={advancedControls.humorStyle}
                      onChange={(e) => setAdvancedControls(prev => ({ ...prev, humorStyle: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="dry_wit">Dry Wit</option>
                      <option value="sarcastic">Sarcastic</option>
                      <option value="ironic">Ironic</option>
                      <option value="observational">Observational</option>
                      <option value="playful">Playful</option>
                      <option value="none">None</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">Emotional Subtlety</label>
                    <select 
                      value={advancedControls.emotionalSubtlety}
                      onChange={(e) => setAdvancedControls(prev => ({ ...prev, emotionalSubtlety: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="explicit">Explicit</option>
                      <option value="implicit">Implicit</option>
                      <option value="layered">Layered</option>
                      <option value="understated">Understated</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">Linguistic Complexity</label>
                    <select 
                      value={advancedControls.linguisticComplexity}
                      onChange={(e) => setAdvancedControls(prev => ({ ...prev, linguisticComplexity: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="simple">Simple</option>
                      <option value="moderate">Moderate</option>
                      <option value="advanced">Advanced</option>
                      <option value="sophisticated">Sophisticated</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">Pacing Variation</label>
                    <select 
                      value={advancedControls.pacingVariation}
                      onChange={(e) => setAdvancedControls(prev => ({ ...prev, pacingVariation: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="uniform">Uniform</option>
                      <option value="dynamic">Dynamic</option>
                      <option value="crescendo">Crescendo</option>
                      <option value="staccato">Staccato</option>
                    </select>
                  </div>

                  {/* Phase 3 Additions */}
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">Cultural Nuance</label>
                    <select 
                      value={advancedControls.culturalNuance}
                      onChange={(e) => setAdvancedControls(prev => ({ ...prev, culturalNuance: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="universal">Universal</option>
                      <option value="western">Western</option>
                      <option value="tech_culture">Tech Culture</option>
                      <option value="business_culture">Business Culture</option>
                      <option value="youth_culture">Youth Culture</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">Subtext Level</label>
                    <select 
                      value={advancedControls.subtextLevel}
                      onChange={(e) => setAdvancedControls(prev => ({ ...prev, subtextLevel: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="none">None</option>
                      <option value="light">Light</option>
                      <option value="moderate">Moderate</option>
                      <option value="heavy">Heavy</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">Conversational Style</label>
                    <select 
                      value={advancedControls.conversationalStyle}
                      onChange={(e) => setAdvancedControls(prev => ({ ...prev, conversationalStyle: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="direct">Direct</option>
                      <option value="meandering">Meandering</option>
                      <option value="stream_of_consciousness">Stream of Consciousness</option>
                      <option value="structured">Structured</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox"
                      checked={advancedControls.implicitMessaging}
                      onChange={(e) => setAdvancedControls(prev => ({ ...prev, implicitMessaging: e.target.checked }))}
                      className="w-4 h-4 text-primary-600 bg-white/10 border-white/20 rounded focus:ring-primary-500"
                    />
                    <label className="text-gray-300 text-sm">Implicit Messaging</label>
                  </div>
                </div>
              </div>

              {/* Avatar & Voice Controls */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                  <Camera className="w-5 h-5" />
                  <span>Avatar & Voice</span>
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">
                      Micro-expression Intensity: {Math.round(advancedControls.microExpressionIntensity * 100)}%
                    </label>
                    <input 
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={advancedControls.microExpressionIntensity}
                      onChange={(e) => setAdvancedControls(prev => ({ ...prev, microExpressionIntensity: parseFloat(e.target.value) }))}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">
                      Voice Inflection Variability: {Math.round(advancedControls.voiceInflectionVariability * 100)}%
                    </label>
                    <input 
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={advancedControls.voiceInflectionVariability}
                      onChange={(e) => setAdvancedControls(prev => ({ ...prev, voiceInflectionVariability: parseFloat(e.target.value) }))}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Phase 3 Addition */}
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">
                      Non-Verbal Cue Frequency: {Math.round(advancedControls.nonVerbalCueFrequency * 100)}%
                    </label>
                    <input 
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={advancedControls.nonVerbalCueFrequency}
                      onChange={(e) => setAdvancedControls(prev => ({ ...prev, nonVerbalCueFrequency: parseFloat(e.target.value) }))}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">
                      Emotional Authenticity: {Math.round(advancedControls.emotionalAuthenticity * 100)}%
                    </label>
                    <input 
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={advancedControls.emotionalAuthenticity}
                      onChange={(e) => setAdvancedControls(prev => ({ ...prev, emotionalAuthenticity: parseFloat(e.target.value) }))}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">Eye Contact Pattern</label>
                    <select 
                      value={advancedControls.eyeContactPattern}
                      onChange={(e) => setAdvancedControls(prev => ({ ...prev, eyeContactPattern: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="direct">Direct</option>
                      <option value="natural">Natural</option>
                      <option value="thoughtful">Thoughtful</option>
                      <option value="engaging">Engaging</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">Breathing Pattern</label>
                    <select 
                      value={advancedControls.breathingPattern}
                      onChange={(e) => setAdvancedControls(prev => ({ ...prev, breathingPattern: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="calm">Calm</option>
                      <option value="excited">Excited</option>
                      <option value="focused">Focused</option>
                      <option value="relaxed">Relaxed</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Post-Production Controls */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                  <Palette className="w-5 h-5" />
                  <span>Post-Production</span>
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">
                      Visual Nuance Level: {Math.round(advancedControls.visualNuanceLevel * 100)}%
                    </label>
                    <input 
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={advancedControls.visualNuanceLevel}
                      onChange={(e) => setAdvancedControls(prev => ({ ...prev, visualNuanceLevel: parseFloat(e.target.value) }))}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">
                      Audio Nuance Level: {Math.round(advancedControls.audioNuanceLevel * 100)}%
                    </label>
                    <input 
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={advancedControls.audioNuanceLevel}
                      onChange={(e) => setAdvancedControls(prev => ({ ...prev, audioNuanceLevel: parseFloat(e.target.value) }))}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">Color Grading Mood</label>
                    <select 
                      value={advancedControls.colorGradingMood}
                      onChange={(e) => setAdvancedControls(prev => ({ ...prev, colorGradingMood: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="warm">Warm</option>
                      <option value="cool">Cool</option>
                      <option value="neutral">Neutral</option>
                      <option value="vibrant">Vibrant</option>
                      <option value="cinematic">Cinematic</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">
                      Transition Smoothness: {Math.round(advancedControls.transitionSmoothness * 100)}%
                    </label>
                    <input 
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={advancedControls.transitionSmoothness}
                      onChange={(e) => setAdvancedControls(prev => ({ ...prev, transitionSmoothness: parseFloat(e.target.value) }))}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Phase 3 Addition */}
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">
                      Music Sync Precision: {Math.round(advancedControls.musicSyncPrecision * 100)}%
                    </label>
                    <input 
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={advancedControls.musicSyncPrecision}
                      onChange={(e) => setAdvancedControls(prev => ({ ...prev, musicSyncPrecision: parseFloat(e.target.value) }))}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">
                      Effects Intensity: {Math.round(advancedControls.effectsIntensity * 100)}%
                    </label>
                    <input 
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={advancedControls.effectsIntensity}
                      onChange={(e) => setAdvancedControls(prev => ({ ...prev, effectsIntensity: parseFloat(e.target.value) }))}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-white/10">
              <button 
                onClick={() => setShowAdvancedControls(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowAdvancedControls(false);
                  handleRegenerateWithControls();
                }}
                disabled={isRegenerating}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-600/50 text-white rounded-lg transition-colors"
              >
                {isRegenerating ? 'Regenerating...' : 'Apply & Regenerate'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nuance Analysis Dashboard Modal */}
      {showNuanceAnalysis && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Nuance Analysis Dashboard</h2>
              <button 
                onClick={() => setShowNuanceAnalysis(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Micro-expressions Timeline */}
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-4">Micro-expressions Timeline</h3>
                <div className="space-y-3">
                  {[
                    { time: '0:03', expression: 'Slight eyebrow raise', intensity: 0.7 },
                    { time: '0:15', expression: 'Subtle smile', intensity: 0.8 },
                    { time: '0:28', expression: 'Thoughtful pause', intensity: 0.6 },
                    { time: '0:45', expression: 'Confident nod', intensity: 0.9 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <span className="text-primary-300 font-medium">{item.time}</span>
                        <p className="text-gray-300 text-sm">{item.expression}</p>
                      </div>
                      <div className="text-right">
                        <div className="w-16 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-primary-500 h-2 rounded-full"
                            style={{ width: `${item.intensity * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400">{Math.round(item.intensity * 100)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Voice Inflections */}
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-4">Voice Inflections</h3>
                <div className="space-y-3">
                  {[
                    { time: '0:05', inflection: 'Rising intonation', degree: 0.8 },
                    { time: '0:18', inflection: 'Emphasis on key word', degree: 0.9 },
                    { time: '0:32', inflection: 'Questioning tone', degree: 0.7 },
                    { time: '0:50', inflection: 'Confident conclusion', degree: 0.85 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <span className="text-secondary-300 font-medium">{item.time}</span>
                        <p className="text-gray-300 text-sm">{item.inflection}</p>
                      </div>
                      <div className="text-right">
                        <div className="w-16 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-secondary-500 h-2 rounded-full"
                            style={{ width: `${item.degree * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400">{Math.round(item.degree * 100)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Creative Decisions Log */}
              <div className="lg:col-span-2 bg-white/5 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-4">Creative Decisions Log</h3>
                <div className="space-y-3">
                  {currentVideo.creativeDecisions.map((decision, index) => (
                    <div key={index} className="p-4 bg-white/5 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <span className="text-warning-300 font-medium">{decision.timestamp}s</span>
                          <h4 className="text-white font-medium">{decision.decision}</h4>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          decision.impact === 'High' ? 'bg-success-500/20 text-success-300' :
                          decision.impact === 'Medium' ? 'bg-warning-500/20 text-warning-300' :
                          'bg-gray-500/20 text-gray-300'
                        }`}>
                          {decision.impact} Impact
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{decision.reasoning}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6 pt-6 border-t border-white/10">
              <button 
                onClick={() => setShowNuanceAnalysis(false)}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
              >
                Close Analysis
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentPreview;