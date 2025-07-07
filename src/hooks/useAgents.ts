import { useState, useEffect } from 'react';
import { AgentOrchestrator } from '../agents/AgentOrchestrator';
import { supabase } from '../lib/supabase';

interface AgentStatus {
  name: string;
  status: 'active' | 'idle' | 'processing' | 'error';
  health: number;
  tasksCompleted: number;
  currentTask: string;
  lastUpdate: string;
  performance: {
    accuracy: number;
    speed: number;
    efficiency: number;
  };
}

interface RegenerationParams {
  topicId: string;
  topic: string;
  category: string;
  nuanceParams: any;
}

export const useAgents = () => {
  const [agents, setAgents] = useState<AgentStatus[]>([]);
  const [orchestrator] = useState(() => new AgentOrchestrator());
  const [isLoading, setIsLoading] = useState(true);
  const [systemStatus, setSystemStatus] = useState<any>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);

  useEffect(() => {
    // Initialize agents and start monitoring
    initializeAgents();
    startMonitoring();

    // Start scheduled tasks
    orchestrator.startScheduledTasks();

    return () => {
      // Cleanup monitoring
    };
  }, []);

  const initializeAgents = async () => {
    try {
      const initialAgents: AgentStatus[] = [
        {
          name: 'Trend Discovery Agent',
          status: 'active',
          health: 98,
          tasksCompleted: 0,
          currentTask: 'Monitoring global trends...',
          lastUpdate: new Date().toISOString(),
          performance: { accuracy: 94, speed: 87, efficiency: 92 }
        },
        {
          name: 'Content Generation Agent',
          status: 'idle',
          health: 95,
          tasksCompleted: 0,
          currentTask: 'Waiting for trending topics...',
          lastUpdate: new Date().toISOString(),
          performance: { accuracy: 96, speed: 91, efficiency: 89 }
        },
        {
          name: 'Avatar & Voice Agent',
          status: 'idle',
          health: 92,
          tasksCompleted: 0,
          currentTask: 'Ready for video generation...',
          lastUpdate: new Date().toISOString(),
          performance: { accuracy: 93, speed: 76, efficiency: 84 }
        },
        {
          name: 'Post-Production Agent',
          status: 'idle',
          health: 100,
          tasksCompleted: 0,
          currentTask: 'Waiting for video content...',
          lastUpdate: new Date().toISOString(),
          performance: { accuracy: 98, speed: 95, efficiency: 97 }
        },
        {
          name: 'Publishing Agent',
          status: 'idle',
          health: 97,
          tasksCompleted: 0,
          currentTask: 'Ready for content publishing...',
          lastUpdate: new Date().toISOString(),
          performance: { accuracy: 99, speed: 88, efficiency: 95 }
        }
      ];

      setAgents(initialAgents);
      setIsLoading(false);
    } catch (error) {
      console.error('Error initializing agents:', error);
      setIsLoading(false);
    }
  };

  const startMonitoring = () => {
    // Update agent status every 30 seconds
    const interval = setInterval(async () => {
      try {
        const status = await orchestrator.getSystemStatus();
        setSystemStatus(status);
        
        if (status) {
          updateAgentStatuses(status);
        }
      } catch (error) {
        console.error('Error updating agent status:', error);
      }
    }, 30000);

    return () => clearInterval(interval);
  };

  const updateAgentStatuses = (status: any) => {
    setAgents(prevAgents => {
      return prevAgents.map(agent => {
        // Find relevant metrics for this agent
        const agentMetrics = status.metrics.filter((m: any) => 
          m.agent_name === agent.name.toLowerCase().replace(/\s+/g, '_').replace('&', '').replace('agent', '').trim()
        );

        if (agentMetrics.length > 0) {
          const latestMetric = agentMetrics[0];
          const tasksCompleted = agentMetrics
            .filter((m: any) => m.metric_type.includes('completed') || m.metric_type.includes('generated'))
            .reduce((sum: number, m: any) => sum + m.metric_value, 0);

          return {
            ...agent,
            tasksCompleted,
            lastUpdate: latestMetric.recorded_at,
            currentTask: getCurrentTask(agent.name, status)
          };
        }

        return agent;
      });
    });
  };

  const getCurrentTask = (agentName: string, status: any): string => {
    const queueTasks = status.queueStatus.filter((task: any) => 
      task.status === 'processing' || task.status === 'pending'
    );

    switch (agentName) {
      case 'Trend Discovery Agent':
        return queueTasks.some((t: any) => t.task_type === 'trend_discovery') 
          ? 'Discovering trending topics...' 
          : 'Monitoring global trends...';
      
      case 'Content Generation Agent':
        return queueTasks.some((t: any) => t.task_type === 'script_generation')
          ? 'Generating content scripts...'
          : 'Waiting for trending topics...';
      
      case 'Avatar & Voice Agent':
        return queueTasks.some((t: any) => t.task_type === 'video_creation')
          ? 'Creating avatar videos...'
          : 'Ready for video generation...';
      
      case 'Post-Production Agent':
        return 'Processing video content...';
      
      case 'Publishing Agent':
        return queueTasks.some((t: any) => t.task_type === 'publishing')
          ? 'Publishing content...'
          : 'Ready for content publishing...';
      
      default:
        return 'Active';
    }
  };

  const runDailyPipeline = async () => {
    try {
      await orchestrator.runDailyPipeline();
    } catch (error) {
      console.error('Error running daily pipeline:', error);
    }
  };

  const processQueue = async () => {
    try {
      await orchestrator.processQueue();
    } catch (error) {
      console.error('Error processing queue:', error);
    }
  };

  const triggerContentRegeneration = async (params: RegenerationParams) => {
    try {
      setIsRegenerating(true);
      
      // Update agent status to show regeneration is starting
      setAgents(prevAgents => 
        prevAgents.map(agent => 
          agent.name === 'Content Generation Agent' 
            ? { ...agent, status: 'processing', currentTask: 'Regenerating content with enhanced nuance...' }
            : agent
        )
      );

      await orchestrator.regenerateContentWithNuance(
        params.topicId,
        params.topic,
        params.category,
        params.nuanceParams
      );

      // Trigger queue processing to handle the new regeneration task
      await orchestrator.processQueue();

      return { success: true, message: 'Content regeneration initiated successfully' };
    } catch (error) {
      console.error('Error triggering content regeneration:', error);
      return { success: false, message: 'Failed to initiate content regeneration' };
    } finally {
      setIsRegenerating(false);
    }
  };

  const getRegenerationStatus = async (taskId?: string) => {
    try {
      if (!taskId) return null;

      const { data, error } = await supabase
        .from('processing_queue')
        .select('*')
        .eq('id', taskId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting regeneration status:', error);
      return null;
    }
  };

  return {
    agents,
    isLoading,
    systemStatus,
    isRegenerating,
    runDailyPipeline,
    processQueue,
    triggerContentRegeneration,
    getRegenerationStatus,
    orchestrator
  };
};