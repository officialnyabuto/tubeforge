/*
  # AI Content Pipeline Database Schema

  1. New Tables
    - `trending_topics` - Stores discovered trending topics
    - `content_scripts` - Generated scripts for videos
    - `video_content` - Avatar videos and voiceovers
    - `published_content` - Published content across platforms
    - `agent_metrics` - Performance metrics for each agent
    - `api_configurations` - API keys and settings
    - `content_analytics` - Performance analytics
    - `processing_queue` - Task queue for content pipeline

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Trending Topics Table
CREATE TABLE IF NOT EXISTS trending_topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic text NOT NULL,
  category text NOT NULL,
  source text NOT NULL, -- 'perplexity', 'google_trends', 'twitter'
  trend_score integer DEFAULT 0,
  keywords text[] DEFAULT '{}',
  region text DEFAULT 'global',
  discovered_at timestamptz DEFAULT now(),
  status text DEFAULT 'discovered', -- 'discovered', 'selected', 'processed'
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Content Scripts Table
CREATE TABLE IF NOT EXISTS content_scripts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id uuid REFERENCES trending_topics(id),
  title text NOT NULL,
  script text NOT NULL,
  platform text NOT NULL, -- 'youtube', 'tiktok', 'instagram', 'linkedin'
  tone text DEFAULT 'engaging', -- 'professional', 'casual', 'engaging', 'educational'
  duration_seconds integer DEFAULT 60,
  hooks text[] DEFAULT '{}',
  call_to_action text,
  hashtags text[] DEFAULT '{}',
  quality_score integer DEFAULT 0,
  status text DEFAULT 'generated', -- 'generated', 'approved', 'rejected'
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Video Content Table
CREATE TABLE IF NOT EXISTS video_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  script_id uuid REFERENCES content_scripts(id),
  avatar_type text NOT NULL, -- 'male_professional', 'female_casual', etc.
  voice_id text NOT NULL,
  video_url text,
  audio_url text,
  thumbnail_url text,
  duration_seconds integer,
  processing_status text DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  synthesia_job_id text,
  playht_job_id text,
  quality_metrics jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

-- Published Content Table
CREATE TABLE IF NOT EXISTS published_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES video_content(id),
  platform text NOT NULL,
  platform_post_id text,
  title text NOT NULL,
  description text,
  hashtags text[] DEFAULT '{}',
  scheduled_for timestamptz,
  published_at timestamptz,
  status text DEFAULT 'scheduled', -- 'scheduled', 'published', 'failed'
  engagement_metrics jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Agent Metrics Table
CREATE TABLE IF NOT EXISTS agent_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_name text NOT NULL,
  metric_type text NOT NULL, -- 'performance', 'health', 'tasks_completed'
  metric_value numeric NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  recorded_at timestamptz DEFAULT now()
);

-- API Configurations Table
CREATE TABLE IF NOT EXISTS api_configurations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_name text UNIQUE NOT NULL,
  api_key_encrypted text,
  configuration jsonb DEFAULT '{}'::jsonb,
  is_active boolean DEFAULT true,
  last_tested timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Content Analytics Table
CREATE TABLE IF NOT EXISTS content_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id uuid REFERENCES published_content(id),
  platform text NOT NULL,
  views integer DEFAULT 0,
  likes integer DEFAULT 0,
  comments integer DEFAULT 0,
  shares integer DEFAULT 0,
  engagement_rate numeric DEFAULT 0,
  revenue numeric DEFAULT 0,
  recorded_at timestamptz DEFAULT now()
);

-- Processing Queue Table
CREATE TABLE IF NOT EXISTS processing_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_type text NOT NULL, -- 'trend_discovery', 'script_generation', 'video_creation', 'publishing'
  task_data jsonb NOT NULL,
  priority integer DEFAULT 5,
  status text DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  assigned_agent text,
  attempts integer DEFAULT 0,
  max_attempts integer DEFAULT 3,
  error_message text,
  created_at timestamptz DEFAULT now(),
  started_at timestamptz,
  completed_at timestamptz
);

-- Enable Row Level Security
ALTER TABLE trending_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_scripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE published_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE processing_queue ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Users can read all trending topics"
  ON trending_topics
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage content scripts"
  ON content_scripts
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage video content"
  ON video_content
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage published content"
  ON published_content
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Users can read agent metrics"
  ON agent_metrics
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage API configurations"
  ON api_configurations
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Users can read content analytics"
  ON content_analytics
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage processing queue"
  ON processing_queue
  FOR ALL
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX idx_trending_topics_status ON trending_topics(status);
CREATE INDEX idx_trending_topics_discovered_at ON trending_topics(discovered_at);
CREATE INDEX idx_content_scripts_status ON content_scripts(status);
CREATE INDEX idx_video_content_status ON video_content(processing_status);
CREATE INDEX idx_published_content_platform ON published_content(platform);
CREATE INDEX idx_published_content_status ON published_content(status);
CREATE INDEX idx_processing_queue_status ON processing_queue(status);
CREATE INDEX idx_processing_queue_task_type ON processing_queue(task_type);