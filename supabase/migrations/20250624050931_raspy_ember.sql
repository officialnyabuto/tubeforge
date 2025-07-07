/*
  # Enhanced Feedback and Performance Tracking Tables

  1. New Tables
    - `script_feedback_detailed` - Granular feedback on specific script elements
    - `video_performance_metrics` - Detailed performance data for published videos
    - `creative_decision_log` - Log of AI-driven creative choices
    - `thumbnail_variants` - Multiple thumbnail options with A/B testing
    - `user_preferences` - User content preferences and settings

  2. Enhanced Columns
    - Add new fields to existing tables for better tracking

  3. Security
    - Enable RLS on all new tables
    - Add policies for authenticated users
*/

-- Script Feedback Detailed Table
CREATE TABLE IF NOT EXISTS script_feedback_detailed (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  script_id uuid REFERENCES content_scripts(id) ON DELETE CASCADE,
  user_id uuid,
  feedback_type text NOT NULL, -- 'line_level_tone', 'overall_pacing', 'cultural_sensitivity', 'engagement_hook'
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comments text,
  timestamp_start numeric, -- Start time in seconds for video/audio feedback
  timestamp_end numeric, -- End time in seconds for video/audio feedback
  suggested_change text,
  specific_line_reference text, -- Reference to specific script line
  emotional_impact_rating integer CHECK (emotional_impact_rating >= 1 AND emotional_impact_rating <= 10),
  authenticity_score integer CHECK (authenticity_score >= 1 AND authenticity_score <= 10),
  cultural_appropriateness integer CHECK (cultural_appropriateness >= 1 AND cultural_appropriateness <= 10),
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Video Performance Metrics Table
CREATE TABLE IF NOT EXISTS video_performance_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES video_content(id) ON DELETE CASCADE,
  published_content_id uuid REFERENCES published_content(id) ON DELETE CASCADE,
  platform text NOT NULL,
  audience_retention_data jsonb DEFAULT '{}'::jsonb, -- Detailed retention curve data
  ctr_data jsonb DEFAULT '{}'::jsonb, -- Click-through rate data by time segments
  sentiment_analysis_data jsonb DEFAULT '{}'::jsonb, -- Comment sentiment analysis
  conversion_rate numeric DEFAULT 0,
  watch_time_seconds integer DEFAULT 0,
  bounce_rate numeric DEFAULT 0,
  demographic_breakdown jsonb DEFAULT '{}'::jsonb, -- Age, gender, location breakdown
  engagement_timeline jsonb DEFAULT '{}'::jsonb, -- Engagement over time
  viral_coefficient numeric DEFAULT 0, -- How much content is shared
  quality_perception_score numeric DEFAULT 0, -- Perceived quality from comments/reactions
  recorded_at timestamptz DEFAULT now(),
  data_source text DEFAULT 'api', -- 'api', 'manual', 'estimated'
  confidence_score numeric DEFAULT 1.0 -- Confidence in the data accuracy
);

-- Creative Decision Log Table
CREATE TABLE IF NOT EXISTS creative_decision_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  script_id uuid REFERENCES content_scripts(id) ON DELETE CASCADE,
  video_id uuid REFERENCES video_content(id) ON DELETE CASCADE,
  agent_name text NOT NULL, -- 'content_generation', 'avatar_voice', 'post_production'
  decision_type text NOT NULL, -- 'narrative_structure', 'emotional_tone', 'visual_style', 'voice_inflection'
  decision_description text NOT NULL,
  parameters_used jsonb DEFAULT '{}'::jsonb,
  reasoning text,
  expected_impact text,
  actual_impact_score numeric, -- To be filled after performance data is available
  confidence_level numeric DEFAULT 0.5 CHECK (confidence_level >= 0 AND confidence_level <= 1),
  alternative_options jsonb DEFAULT '{}'::jsonb, -- Other options that were considered
  cultural_context text,
  target_audience text,
  timestamp_in_content numeric, -- When in the content this decision applies
  created_at timestamptz DEFAULT now()
);

-- Thumbnail Variants Table
CREATE TABLE IF NOT EXISTS thumbnail_variants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES video_content(id) ON DELETE CASCADE,
  url text NOT NULL,
  style text NOT NULL, -- 'emotional', 'text_overlay', 'split_screen', 'before_after', 'reaction'
  elements text[] DEFAULT '{}', -- Visual elements included
  predicted_ctr numeric DEFAULT 0,
  actual_ctr numeric,
  a_b_test_group text, -- 'A', 'B', 'C', etc.
  performance_metrics jsonb DEFAULT '{}'::jsonb,
  psychological_triggers text[] DEFAULT '{}', -- 'curiosity_gap', 'FOMO', 'social_proof'
  color_palette text,
  text_overlay_content text,
  facial_expression_detected text,
  emotion_conveyed text,
  created_at timestamptz DEFAULT now(),
  tested_until timestamptz
);

-- User Preferences Table
CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE NOT NULL,
  preferred_platforms text[] DEFAULT '{}',
  content_style_preferences jsonb DEFAULT '{}'::jsonb,
  audience_targeting jsonb DEFAULT '{}'::jsonb,
  posting_schedule jsonb DEFAULT '{}'::jsonb,
  quality_thresholds jsonb DEFAULT '{}'::jsonb,
  feedback_sensitivity text DEFAULT 'medium', -- 'low', 'medium', 'high'
  cultural_preferences jsonb DEFAULT '{}'::jsonb,
  language_preferences text[] DEFAULT '{}',
  brand_voice_settings jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add new columns to existing tables
ALTER TABLE content_scripts 
ADD COLUMN IF NOT EXISTS feedback_summary_score numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS target_audience text,
ADD COLUMN IF NOT EXISTS desired_emotion text,
ADD COLUMN IF NOT EXISTS content_style text,
ADD COLUMN IF NOT EXISTS emotional_arc text[],
ADD COLUMN IF NOT EXISTS key_moments jsonb DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS visual_cues text[],
ADD COLUMN IF NOT EXISTS pacing text,
ADD COLUMN IF NOT EXISTS cultural_context text,
ADD COLUMN IF NOT EXISTS linguistic_nuances text[],
ADD COLUMN IF NOT EXISTS narrative_complexity text DEFAULT 'moderate';

ALTER TABLE video_content 
ADD COLUMN IF NOT EXISTS quality_metrics_detailed jsonb DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS emotional_tone text,
ADD COLUMN IF NOT EXISTS visual_cues text[],
ADD COLUMN IF NOT EXISTS key_moments jsonb DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS enhanced_elements text[],
ADD COLUMN IF NOT EXISTS broll_suggestions text[],
ADD COLUMN IF NOT EXISTS micro_expressions jsonb DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS voice_inflections jsonb DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS creative_decisions jsonb DEFAULT '{}'::jsonb;

ALTER TABLE published_content 
ADD COLUMN IF NOT EXISTS actual_engagement_data jsonb DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS optimization_applied text[],
ADD COLUMN IF NOT EXISTS predicted_performance jsonb DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS audience_targeting jsonb DEFAULT '{}'::jsonb;

-- Enable Row Level Security
ALTER TABLE script_feedback_detailed ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE creative_decision_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE thumbnail_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Users can manage their feedback"
  ON script_feedback_detailed
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Users can read performance metrics"
  ON video_performance_metrics
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can read creative decisions"
  ON creative_decision_log
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage thumbnail variants"
  ON thumbnail_variants
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage their preferences"
  ON user_preferences
  FOR ALL
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX idx_script_feedback_detailed_script_id ON script_feedback_detailed(script_id);
CREATE INDEX idx_script_feedback_detailed_feedback_type ON script_feedback_detailed(feedback_type);
CREATE INDEX idx_video_performance_metrics_video_id ON video_performance_metrics(video_id);
CREATE INDEX idx_video_performance_metrics_platform ON video_performance_metrics(platform);
CREATE INDEX idx_creative_decision_log_script_id ON creative_decision_log(script_id);
CREATE INDEX idx_creative_decision_log_video_id ON creative_decision_log(video_id);
CREATE INDEX idx_creative_decision_log_agent_name ON creative_decision_log(agent_name);
CREATE INDEX idx_thumbnail_variants_video_id ON thumbnail_variants(video_id);
CREATE INDEX idx_user_preferences_user_id ON user_preferences(user_id);