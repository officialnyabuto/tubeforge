import { TrendDiscoveryAgent } from './TrendDiscoveryAgent';
import { ContentGenerationAgent } from './ContentGenerationAgent';
import { AvatarVoiceAgent } from './AvatarVoiceAgent';
import { PostProductionAgent } from './PostProductionAgent';
import { PublishingAgent } from './PublishingAgent';
import { supabase } from '../lib/supabase';

export class AgentOrchestrator {
  private trendAgent: TrendDiscoveryAgent;
  private contentAgent: ContentGenerationAgent;
  private avatarAgent: AvatarVoiceAgent;
  private productionAgent: PostProductionAgent;
  private publishingAgent: PublishingAgent;

  constructor() {
    this.trendAgent = new TrendDiscoveryAgent();
    this.contentAgent = new ContentGenerationAgent();
    this.avatarAgent = new AvatarVoiceAgent();
    this.productionAgent = new PostProductionAgent();
    this.publishingAgent = new PublishingAgent();
  }

  async runDailyPipeline(): Promise<void> {
    try {
      console.log('🚀 Starting daily content pipeline...');

      // Step 1: Discover trending topics
      console.log('📈 Discovering trending topics...');
      const trends = await this.trendAgent.discoverTrends();
      
      if (trends.length === 0) {
        console.log('❌ No trends discovered, stopping pipeline');
        return;
      }

      // Step 2: Select top 3 trends for content creation
      const topTrends = trends
        .sort((a, b) => b.trend_score - a.trend_score)
        .slice(0, 3);

      console.log(`✅ Selected ${topTrends.length} trends for content creation`);

      // Step 3: Generate content for each trend
      for (const trend of topTrends) {
        try {
          await this.processContentPipeline(trend);
        } catch (error) {
          console.error(`Error processing trend "${trend.topic}":`, error);
          continue; // Continue with next trend
        }
      }

      console.log('🎉 Daily pipeline completed successfully!');
    } catch (error) {
      console.error('❌ Daily pipeline failed:', error);
      throw error;
    }
  }

  async regenerateContentWithNuance(
    topicId: string,
    topic: string,
    category: string,
    nuanceParams: any
  ): Promise<string> {
    try {
      console.log(`🔄 Initiating content regeneration for: ${topic}`);
      console.log('🎨 Nuance parameters:', nuanceParams);

      // Add regeneration task to processing queue with high priority
      const { data: task, error } = await supabase
        .from('processing_queue')
        .insert({
          task_type: 'script_generation',
          task_data: {
            topicId,
            topic,
            category,
            nuanceParams,
            regeneration: true,
            timestamp: new Date().toISOString()
          },
          priority: 1, // High priority for user-initiated regeneration
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      console.log(`✅ Regeneration task queued with ID: ${task.id}`);
      return task.id;
    } catch (error) {
      console.error('❌ Failed to queue regeneration task:', error);
      throw error;
    }
  }

  private async processContentPipeline(trend: any): Promise<void> {
    console.log(`🎬 Processing content for: ${trend.topic}`);

    // Step 1: Generate scripts for multiple platforms
    const scripts = await this.contentAgent.generateMultiPlatformScripts(
      trend.id,
      trend.topic,
      trend.category
    );

    if (scripts.length === 0) {
      console.log('❌ No scripts generated, skipping trend');
      return;
    }

    // Step 2: Process each script
    for (const script of scripts) {
      try {
        // Get script record from database
        const { data: scriptRecord } = await supabase
          .from('content_scripts')
          .select('*')
          .eq('topic_id', trend.id)
          .eq('script', script.script)
          .single();

        if (!scriptRecord) {
          console.log('❌ Script record not found, skipping');
          continue;
        }

        // Extract nuance parameters from script metadata
        const nuanceParams = scriptRecord.metadata?.nuanceParams || {};
        
        console.log(`🎨 Applying nuance parameters:`, nuanceParams);

        // Step 3: Generate avatar video and voiceover with enhanced nuance
        console.log(`🎭 Generating avatar video for ${scriptRecord.platform}...`);
        const videoResult = await this.avatarAgent.generateVideo({
          scriptId: scriptRecord.id,
          script: script.script,
          avatarType: this.selectAvatar(scriptRecord.platform),
          voiceId: this.selectVoice(scriptRecord.platform),
          platform: scriptRecord.platform,
          // Enhanced nuance parameters from content generation
          microExpressionIntensity: nuanceParams.microExpressionIntensity || 0.7,
          voiceInflectionVariability: nuanceParams.voiceInflectionVariability || 0.6,
          nonVerbalCueFrequency: nuanceParams.nonVerbalCueFrequency || 0.5,
          emotionalAuthenticity: nuanceParams.emotionalAuthenticity || 0.8,
          gestureComplexity: nuanceParams.gestureComplexity || 0.6,
          eyeContactPattern: nuanceParams.eyeContactPattern || 'natural',
          breathingPattern: nuanceParams.breathingPattern || 'calm',
          personalityProjection: nuanceParams.personalityProjection || 0.7,
          // Context from script
          emotionalArc: scriptRecord.emotional_arc,
          keyMoments: scriptRecord.key_moments,
          culturalContext: scriptRecord.cultural_context,
          targetAudience: scriptRecord.target_audience
        });

        // Step 4: Post-production editing with enhanced nuance
        console.log(`✂️ Processing video for ${scriptRecord.platform}...`);
        const editingResult = await this.productionAgent.processVideo({
          videoId: scriptRecord.id,
          videoUrl: videoResult.videoUrl || '',
          audioUrl: videoResult.audioUrl,
          script: script.script,
          platform: scriptRecord.platform,
          style: 'viral',
          // Enhanced post-production nuance parameters
          visualNuanceLevel: nuanceParams.visualNuanceLevel || 0.6,
          audioNuanceLevel: nuanceParams.audioNuanceLevel || 0.7,
          captionAdaptability: nuanceParams.captionAdaptability || 0.8,
          editingSubtlety: nuanceParams.editingSubtlety || 0.5,
          colorGradingMood: nuanceParams.colorGradingMood || 'warm',
          transitionSmoothness: nuanceParams.transitionSmoothness || 0.7,
          musicSyncPrecision: nuanceParams.musicSyncPrecision || 0.8,
          effectsIntensity: nuanceParams.effectsIntensity || 0.4,
          // Context from previous stages
          emotionalArc: scriptRecord.emotional_arc,
          keyMoments: scriptRecord.key_moments,
          visualCues: scriptRecord.visual_cues,
          creativeDirection: {
            mood: nuanceParams.colorGradingMood || 'warm',
            energy: scriptRecord.pacing || 'medium',
            visualStyle: 'modern',
            colorPalette: nuanceParams.colorGradingMood || 'warm'
          }
        });

        // Step 5: Schedule for publishing
        console.log(`📅 Scheduling content for ${scriptRecord.platform}...`);
        const optimalTimes = await this.publishingAgent.getOptimalPostingTimes(scriptRecord.platform);
        const scheduledTime = this.getNextOptimalTime(optimalTimes);

        await this.publishingAgent.scheduleContent({
          videoId: scriptRecord.id,
          videoUrl: editingResult.editedVideoUrl,
          title: script.title,
          description: script.script,
          hashtags: script.hashtags,
          platforms: [scriptRecord.platform],
          scheduledTime,
          thumbnailUrl: editingResult.thumbnailVariants[0],
          // Enhanced audience targeting from nuance analysis
          audienceTargeting: {
            demographics: [scriptRecord.target_audience || 'general'],
            interests: scriptRecord.metadata?.keyThemes || [],
            behaviors: [scriptRecord.content_style || 'general']
          },
          contentOptimization: {
            seoKeywords: scriptRecord.metadata?.seoKeywords || [],
            engagementHooks: script.hooks,
            callToActions: [script.callToAction]
          }
        }, scheduledTime);

        console.log(`✅ Content scheduled for ${scriptRecord.platform} at ${scheduledTime}`);

      } catch (error) {
        console.error(`Error processing script for ${trend.topic}:`, error);
        continue;
      }
    }
  }

  private selectAvatar(platform: string): string {
    const avatars = {
      youtube: 'anna_professional',
      tiktok: 'sarah_energetic',
      instagram: 'david_casual',
      linkedin: 'mike_authoritative'
    };

    return avatars[platform as keyof typeof avatars] || 'anna_professional';
  }

  private selectVoice(platform: string): string {
    const voices = {
      youtube: 'en-US-AriaNeural',
      tiktok: 'en-US-JennyNeural',
      instagram: 'en-US-AriaNeural',
      linkedin: 'en-US-DavisNeural'
    };

    return voices[platform as keyof typeof voices] || 'en-US-AriaNeural';
  }

  private getNextOptimalTime(optimalTimes: { hour: number; minute: number }[]): Date {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Find next optimal time today or tomorrow
    for (const time of optimalTimes) {
      const scheduledTime = new Date(today);
      scheduledTime.setHours(time.hour, time.minute, 0, 0);

      if (scheduledTime > now) {
        return scheduledTime;
      }
    }

    // If no time today, use first optimal time tomorrow
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(optimalTimes[0].hour, optimalTimes[0].minute, 0, 0);

    return tomorrow;
  }

  async processQueue(): Promise<void> {
    try {
      // Get pending tasks from queue
      const { data: tasks } = await supabase
        .from('processing_queue')
        .select('*')
        .eq('status', 'pending')
        .order('priority', { ascending: false })
        .order('created_at', { ascending: true })
        .limit(10);

      if (!tasks || tasks.length === 0) {
        return;
      }

      console.log(`📋 Processing ${tasks.length} queued tasks...`);

      for (const task of tasks) {
        try {
          // Mark task as processing
          await supabase
            .from('processing_queue')
            .update({
              status: 'processing',
              assigned_agent: 'orchestrator',
              started_at: new Date().toISOString()
            })
            .eq('id', task.id);

          // Process task based on type
          await this.processTask(task);

          // Mark task as completed
          await supabase
            .from('processing_queue')
            .update({
              status: 'completed',
              completed_at: new Date().toISOString()
            })
            .eq('id', task.id);

          console.log(`✅ Completed task: ${task.task_type}`);

        } catch (error) {
          console.error(`❌ Task failed: ${task.task_type}`, error);

          // Update task with error
          await supabase
            .from('processing_queue')
            .update({
              status: 'failed',
              error_message: error instanceof Error ? error.message : 'Unknown error',
              attempts: task.attempts + 1
            })
            .eq('id', task.id);
        }
      }
    } catch (error) {
      console.error('Error processing queue:', error);
    }
  }

  private async processTask(task: any): Promise<void> {
    switch (task.task_type) {
      case 'trend_discovery':
        await this.trendAgent.discoverTrends();
        break;

      case 'script_generation':
        const { topicId, topic, category, nuanceParams, regeneration } = task.task_data;
        
        console.log(`🎯 Processing script generation task for: ${topic}`);
        if (regeneration) {
          console.log('🔄 This is a regeneration request with enhanced nuance parameters');
        }

        // Pass nuance parameters to content generation
        await this.contentAgent.generateMultiPlatformScripts(
          topicId, 
          topic, 
          category,
          nuanceParams || {} // Pass nuance parameters if available
        );
        break;

      case 'video_creation':
        const videoRequest = task.task_data;
        await this.avatarAgent.generateVideo(videoRequest);
        break;

      case 'publishing':
        const publishRequest = task.task_data;
        await this.publishingAgent.publishContent(publishRequest);
        break;

      default:
        throw new Error(`Unknown task type: ${task.task_type}`);
    }
  }

  async getSystemStatus(): Promise<any> {
    try {
      // Get recent metrics for all agents
      const { data: metrics } = await supabase
        .from('agent_metrics')
        .select('*')
        .gte('recorded_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        .order('recorded_at', { ascending: false });

      // Get queue status
      const { data: queueStatus } = await supabase
        .from('processing_queue')
        .select('status, task_type')
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

      // Get recent content
      const { data: recentContent } = await supabase
        .from('published_content')
        .select('*')
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        .order('created_at', { ascending: false });

      return {
        metrics: metrics || [],
        queueStatus: queueStatus || [],
        recentContent: recentContent || [],
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error getting system status:', error);
      return null;
    }
  }

  async startScheduledTasks(): Promise<void> {
    // Set up daily trend discovery at 7 AM
    const scheduleDaily = () => {
      const now = new Date();
      const scheduledTime = new Date();
      scheduledTime.setHours(7, 0, 0, 0);

      if (scheduledTime <= now) {
        scheduledTime.setDate(scheduledTime.getDate() + 1);
      }

      const timeUntilRun = scheduledTime.getTime() - now.getTime();

      setTimeout(() => {
        this.runDailyPipeline();
        // Schedule next run
        setInterval(() => this.runDailyPipeline(), 24 * 60 * 60 * 1000);
      }, timeUntilRun);
    };

    // Set up queue processing every 5 minutes
    const scheduleQueueProcessing = () => {
      setInterval(() => this.processQueue(), 5 * 60 * 1000);
    };

    scheduleDaily();
    scheduleQueueProcessing();

    console.log('🕐 Scheduled tasks started');
  }
}