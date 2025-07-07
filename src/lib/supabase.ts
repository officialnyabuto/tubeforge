import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Enhanced Database types with new fields
export interface TrendingTopic {
  id: string;
  topic: string;
  category: string;
  source: string;
  trend_score: number;
  keywords: string[];
  region: string;
  discovered_at: string;
  status: 'discovered' | 'selected' | 'processed';
  metadata: Record<string, any>;
  created_at: string;
}

export interface ContentScript {
  id: string;
  topic_id: string;
  title: string;
  script: string;
  platform: 'youtube' | 'tiktok' | 'instagram' | 'linkedin';
  tone: 'professional' | 'casual' | 'engaging' | 'educational' | 'humorous' | 'inspirational';
  duration_seconds: number;
  hooks: string[];
  call_to_action: string;
  hashtags: string[];
  quality_score: number;
  status: 'generated' | 'approved' | 'rejected';
  // Enhanced fields
  feedback_summary_score?: number;
  target_audience?: 'gen-z' | 'millennials' | 'gen-x' | 'professionals' | 'entrepreneurs';
  desired_emotion?: 'excitement' | 'curiosity' | 'urgency' | 'trust' | 'entertainment';
  content_style?: 'storytelling' | 'educational' | 'controversial' | 'trending' | 'personal';
  emotional_arc?: string[];
  key_moments?: Array<{ timestamp: number; description: string; emphasis: string }>;
  visual_cues?: string[];
  pacing?: 'fast' | 'medium' | 'slow';
  cultural_context?: string;
  linguistic_nuances?: string[];
  narrative_complexity?: 'simple' | 'moderate' | 'complex';
  created_at: string;
  updated_at: string;
}

export interface VideoContent {
  id: string;
  script_id: string;
  avatar_type: string;
  voice_id: string;
  video_url?: string;
  audio_url?: string;
  thumbnail_url?: string;
  duration_seconds?: number;
  processing_status: 'pending' | 'processing' | 'completed' | 'failed';
  synthesia_job_id?: string;
  playht_job_id?: string;
  quality_metrics: Record<string, any>;
  // Enhanced fields
  quality_metrics_detailed?: Record<string, any>;
  emotional_tone?: 'neutral' | 'excited' | 'calm' | 'authoritative' | 'friendly';
  pacing?: 'fast' | 'medium' | 'slow';
  visual_cues?: string[];
  key_moments?: Array<{ timestamp: number; description: string; emphasis: string }>;
  enhanced_elements?: string[];
  broll_suggestions?: string[];
  micro_expressions?: Array<{ timestamp: number; expression: string; intensity: number }>;
  voice_inflections?: Array<{ timestamp: number; inflection: string; degree: number }>;
  creative_decisions?: Array<{ timestamp: number; decision: string; reasoning: string; impact: string }>;
  // Post-production nuance fields
  post_production_settings?: {
    visualNuanceLevel?: number;
    audioNuanceLevel?: number;
    captionAdaptability?: number;
    editingSubtlety?: number;
    colorGradingMood?: string;
    transitionSmoothness?: number;
    musicSyncPrecision?: number;
    effectsIntensity?: number;
  };
  color_grading_timeline?: Array<{ timestamp: number; adjustment: string; intensity: number }>;
  transition_timeline?: Array<{ timestamp: number; type: string; duration: number; smoothness: number }>;
  effects_timeline?: Array<{ timestamp: number; effect: string; intensity: number; duration: number }>;
  audio_enhancements?: Array<{ timestamp: number; enhancement: string; level: number }>;
  caption_styling?: Array<{ timestamp: number; style: string; adaptability: number }>;
  created_at: string;
  completed_at?: string;
}

export interface PublishedContent {
  id: string;
  video_id: string;
  platform: string;
  platform_post_id?: string;
  title: string;
  description?: string;
  hashtags: string[];
  scheduled_for?: string;
  published_at?: string;
  status: 'scheduled' | 'published' | 'failed';
  engagement_metrics: Record<string, any>;
  // Enhanced fields
  actual_engagement_data?: Record<string, any>;
  optimization_applied?: string[];
  predicted_performance?: Record<string, any>;
  audience_targeting?: Record<string, any>;
  created_at: string;
}

export interface AgentMetric {
  id: string;
  agent_name: string;
  metric_type: string;
  metric_value: number;
  metadata: Record<string, any>;
  recorded_at: string;
}

export interface ProcessingTask {
  id: string;
  task_type: 'trend_discovery' | 'script_generation' | 'video_creation' | 'publishing';
  task_data: Record<string, any>;
  priority: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  assigned_agent?: string;
  attempts: number;
  max_attempts: number;
  error_message?: string;
  created_at: string;
  started_at?: string;
  completed_at?: string;
}

// New enhanced interfaces
export interface ScriptFeedbackDetailed {
  id: string;
  script_id: string;
  user_id?: string;
  feedback_type: 'line_level_tone' | 'overall_pacing' | 'cultural_sensitivity' | 'engagement_hook' | 'authenticity' | 'emotional_impact';
  rating: number; // 1-5
  comments?: string;
  timestamp_start?: number;
  timestamp_end?: number;
  suggested_change?: string;
  specific_line_reference?: string;
  emotional_impact_rating?: number; // 1-10
  authenticity_score?: number; // 1-10
  cultural_appropriateness?: number; // 1-10
  metadata?: Record<string, any>;
  created_at: string;
}

export interface VideoPerformanceMetrics {
  id: string;
  video_id: string;
  published_content_id: string;
  platform: string;
  audience_retention_data: Record<string, any>;
  ctr_data: Record<string, any>;
  sentiment_analysis_data: Record<string, any>;
  conversion_rate: number;
  watch_time_seconds: number;
  bounce_rate: number;
  demographic_breakdown: Record<string, any>;
  engagement_timeline: Record<string, any>;
  viral_coefficient: number;
  quality_perception_score: number;
  recorded_at: string;
  data_source: 'api' | 'manual' | 'estimated';
  confidence_score: number;
}

export interface CreativeDecisionLog {
  id: string;
  script_id?: string;
  video_id?: string;
  agent_name: 'content_generation' | 'avatar_voice' | 'post_production' | 'publishing';
  decision_type: string;
  decision_description: string;
  parameters_used: Record<string, any>;
  reasoning?: string;
  expected_impact?: string;
  actual_impact_score?: number;
  confidence_level: number;
  alternative_options?: Record<string, any>;
  cultural_context?: string;
  target_audience?: string;
  timestamp_in_content?: number;
  created_at: string;
}

export interface ThumbnailVariant {
  id: string;
  video_id: string;
  url: string;
  style: 'emotional' | 'text_overlay' | 'split_screen' | 'before_after' | 'reaction' | 'minimalist' | 'dramatic';
  elements: string[];
  predicted_ctr: number;
  actual_ctr?: number;
  a_b_test_group?: string;
  performance_metrics?: Record<string, any>;
  psychological_triggers: string[];
  color_palette?: string;
  text_overlay_content?: string;
  facial_expression_detected?: string;
  emotion_conveyed?: string;
  created_at: string;
  tested_until?: string;
}

export interface UserPreferences {
  id: string;
  user_id: string;
  preferred_platforms: string[];
  content_style_preferences: Record<string, any>;
  audience_targeting: Record<string, any>;
  posting_schedule: Record<string, any>;
  quality_thresholds: Record<string, any>;
  feedback_sensitivity: 'low' | 'medium' | 'high';
  cultural_preferences: Record<string, any>;
  language_preferences: string[];
  brand_voice_settings: Record<string, any>;
  created_at: string;
  updated_at: string;
}

// Enhanced helper functions for detailed feedback
export const createDetailedFeedback = async (feedback: Omit<ScriptFeedbackDetailed, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('script_feedback_detailed')
    .insert({
      ...feedback,
      created_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getDetailedFeedback = async (scriptId: string) => {
  const { data, error } = await supabase
    .from('script_feedback_detailed')
    .select('*')
    .eq('script_id', scriptId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const logCreativeDecision = async (decision: Omit<CreativeDecisionLog, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('creative_decision_log')
    .insert({
      ...decision,
      created_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getCreativeDecisions = async (scriptId?: string, videoId?: string) => {
  let query = supabase.from('creative_decision_log').select('*');
  
  if (scriptId) query = query.eq('script_id', scriptId);
  if (videoId) query = query.eq('video_id', videoId);
  
  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const recordVideoPerformance = async (metrics: Omit<VideoPerformanceMetrics, 'id' | 'recorded_at'>) => {
  const { data, error } = await supabase
    .from('video_performance_metrics')
    .insert({
      ...metrics,
      recorded_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getVideoPerformanceMetrics = async (videoId: string, platform?: string) => {
  let query = supabase
    .from('video_performance_metrics')
    .select('*')
    .eq('video_id', videoId);

  if (platform) {
    query = query.eq('platform', platform);
  }

  const { data, error } = await query.order('recorded_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const createThumbnailVariant = async (variant: Omit<ThumbnailVariant, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('thumbnail_variants')
    .insert({
      ...variant,
      created_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getThumbnailVariants = async (videoId: string) => {
  const { data, error } = await supabase
    .from('thumbnail_variants')
    .select('*')
    .eq('video_id', videoId)
    .order('predicted_ctr', { ascending: false });

  if (error) throw error;
  return data;
};

export const updateUserPreferences = async (userId: string, preferences: Partial<UserPreferences>) => {
  const { data, error } = await supabase
    .from('user_preferences')
    .upsert({
      user_id: userId,
      ...preferences,
      updated_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getUserPreferences = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_preferences')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "not found"
  return data;
};

// Enhanced analytics functions
export const analyzeFeedbackTrends = async (timeRange: string = '30d') => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - parseInt(timeRange.replace('d', '')));

  const { data, error } = await supabase
    .from('script_feedback_detailed')
    .select('feedback_type, rating, emotional_impact_rating, authenticity_score, cultural_appropriateness, created_at')
    .gte('created_at', startDate.toISOString());

  if (error) throw error;
  return data;
};

export const getPerformanceInsights = async (platform?: string) => {
  let query = supabase
    .from('video_performance_metrics')
    .select(`
      *,
      video_content!inner(
        script_id,
        content_scripts!inner(
          target_audience,
          content_style,
          emotional_arc
        )
      )
    `);

  if (platform) {
    query = query.eq('platform', platform);
  }

  const { data, error } = await query
    .order('recorded_at', { ascending: false })
    .limit(100);

  if (error) throw error;
  return data;
};

// Legacy functions (keeping for backward compatibility)
export const createScriptFeedback = async (feedback: any) => {
  return createDetailedFeedback(feedback);
};

export const getScriptFeedback = async (scriptId: string) => {
  return getDetailedFeedback(scriptId);
};

export const updateContentScript = async (scriptId: string, updates: Partial<ContentScript>) => {
  const { data, error } = await supabase
    .from('content_scripts')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', scriptId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getContentAnalytics = async (contentId: string, platform?: string) => {
  return getVideoPerformanceMetrics(contentId, platform);
};

export const getOptimalPostingTimes = async (platform: string, audience?: string) => {
  // This would typically query historical performance data
  // For now, return default optimal times
  const optimalTimes = {
    youtube: [
      { hour: 15, minute: 0, day: 'weekday' },
      { hour: 18, minute: 0, day: 'weekday' },
      { hour: 20, minute: 0, day: 'weekend' }
    ],
    tiktok: [
      { hour: 9, minute: 0, day: 'weekday' },
      { hour: 12, minute: 0, day: 'weekday' },
      { hour: 19, minute: 0, day: 'weekend' }
    ],
    instagram: [
      { hour: 11, minute: 0, day: 'weekday' },
      { hour: 14, minute: 0, day: 'weekday' },
      { hour: 17, minute: 0, day: 'weekend' }
    ],
    linkedin: [
      { hour: 8, minute: 0, day: 'weekday' },
      { hour: 12, minute: 0, day: 'weekday' },
      { hour: 17, minute: 0, day: 'weekday' }
    ]
  };

  return optimalTimes[platform as keyof typeof optimalTimes] || optimalTimes.youtube;
};

export const trackContentPerformance = async (contentId: string, metrics: Partial<VideoPerformanceMetrics>) => {
  return recordVideoPerformance(metrics as any);
};