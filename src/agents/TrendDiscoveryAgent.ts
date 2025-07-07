import axios from 'axios';
import { supabase } from '../lib/supabase';

interface TrendData {
  topic: string;
  category: string;
  source: string;
  trend_score: number;
  keywords: string[];
  region: string;
  metadata: Record<string, any>;
}

export class TrendDiscoveryAgent {
  private perplexityApiKey: string;
  private twitterApiIoKey: string;

  constructor() {
    this.perplexityApiKey = import.meta.env.VITE_PERPLEXITY_API_KEY || '';
    this.twitterApiIoKey = import.meta.env.VITE_TWITTERAPI_IO_API_KEY || '';
  }

  async discoverTrends(): Promise<TrendData[]> {
    const trends: TrendData[] = [];

    try {
      // Discover trends from multiple sources
      const [perplexityTrends, googleTrends, twitterTrends] = await Promise.allSettled([
        this.getPerplexityTrends(),
        this.getGoogleTrends(),
        this.getTwitterApiIoTrends()
      ]);

      // Process Perplexity trends
      if (perplexityTrends.status === 'fulfilled') {
        trends.push(...perplexityTrends.value);
      }

      // Process Google trends
      if (googleTrends.status === 'fulfilled') {
        trends.push(...googleTrends.value);
      }

      // Process Twitter trends
      if (twitterTrends.status === 'fulfilled') {
        trends.push(...twitterTrends.value);
      }

      // Store trends in database
      await this.storeTrends(trends);

      // Update agent metrics
      await this.updateMetrics('trends_discovered', trends.length);

      return trends;
    } catch (error) {
      console.error('Error discovering trends:', error);
      await this.updateMetrics('errors', 1);
      throw error;
    }
  }

  private async getPerplexityTrends(): Promise<TrendData[]> {
    if (!this.perplexityApiKey) {
      console.warn('Perplexity API key not configured');
      return [];
    }

    try {
      const response = await axios.post(
        'https://api.perplexity.ai/chat/completions',
        {
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'user',
              content: `Identify the top 5 trending topics globally right now across technology, finance, health, entertainment, and business. For each topic, provide:
              1. Topic title
              2. Category
              3. Trend score (1-100)
              4. 3-5 relevant keywords
              5. Brief explanation of why it's trending
              
              Format as JSON array with fields: topic, category, trend_score, keywords, explanation`
            }
          ],
          max_tokens: 1000,
          temperature: 0.3
        },
        {
          headers: {
            'Authorization': `Bearer ${this.perplexityApiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const content = response.data.choices[0]?.message?.content;
      if (!content) return [];

      // Parse JSON response
      const trendsData = JSON.parse(content);
      
      return trendsData.map((trend: any) => ({
        topic: trend.topic,
        category: trend.category,
        source: 'perplexity',
        trend_score: trend.trend_score,
        keywords: trend.keywords,
        region: 'global',
        metadata: { explanation: trend.explanation }
      }));
    } catch (error) {
      console.error('Perplexity API error:', error);
      return [];
    }
  }

  private async getGoogleTrends(): Promise<TrendData[]> {
    try {
      // Note: google-trends-api is a client-side library
      // In production, this should be handled by a backend service
      const googleTrends = await import('google-trends-api');
      
      const categories = ['technology', 'finance', 'health', 'entertainment', 'business'];
      const trends: TrendData[] = [];

      for (const category of categories) {
        try {
          const results = await googleTrends.dailyTrends({
            trendDate: new Date(),
            geo: 'US',
            category: category
          });

          const data = JSON.parse(results);
          const trendingSearches = data.default?.trendingSearchesDays?.[0]?.trendingSearches || [];

          trendingSearches.slice(0, 2).forEach((search: any) => {
            trends.push({
              topic: search.title?.query || '',
              category: category,
              source: 'google_trends',
              trend_score: Math.floor(Math.random() * 40) + 60, // Simulate score
              keywords: search.relatedQueries?.map((q: any) => q.query) || [],
              region: 'US',
              metadata: {
                traffic: search.formattedTraffic,
                articles: search.articles?.length || 0
              }
            });
          });
        } catch (categoryError) {
          console.warn(`Google Trends error for ${category}:`, categoryError);
        }
      }

      return trends;
    } catch (error) {
      console.error('Google Trends API error:', error);
      return [];
    }
  }

  private async getTwitterApiIoTrends(): Promise<TrendData[]> {
    if (!this.twitterApiIoKey) {
      console.warn('TwitterAPI.io API key not configured');
      return [];
    }

    try {
      // Get trending topics using TwitterAPI.io
      const response = await axios.get(
        'https://api.twitterapi.io/v1/trends/worldwide',
        {
          headers: {
            'X-API-Key': this.twitterApiIoKey,
            'Content-Type': 'application/json'
          }
        }
      );

      const trends = response.data?.trends || [];
      
      return trends.slice(0, 10).map((trend: any) => ({
        topic: trend.name,
        category: 'social',
        source: 'twitterapi_io',
        trend_score: trend.tweet_volume ? Math.min(100, Math.floor(trend.tweet_volume / 1000)) : 50,
        keywords: [trend.name],
        region: 'global',
        metadata: {
          tweet_volume: trend.tweet_volume,
          url: trend.url,
          promoted_content: trend.promoted_content || null
        }
      }));
    } catch (error) {
      console.error('TwitterAPI.io error:', error);
      
      // Fallback to search endpoint if trends endpoint fails
      try {
        const searchResponse = await axios.get(
          'https://api.twitterapi.io/v1/search',
          {
            params: {
              q: 'trending OR viral OR breaking',
              result_type: 'popular',
              count: 10
            },
            headers: {
              'X-API-Key': this.twitterApiIoKey,
              'Content-Type': 'application/json'
            }
          }
        );

        const tweets = searchResponse.data?.statuses || [];
        const trendTopics = new Map<string, number>();

        // Extract trending topics from popular tweets
        tweets.forEach((tweet: any) => {
          const hashtags = tweet.entities?.hashtags || [];
          hashtags.forEach((hashtag: any) => {
            const tag = hashtag.text.toLowerCase();
            trendTopics.set(tag, (trendTopics.get(tag) || 0) + 1);
          });
        });

        // Convert to trend data
        return Array.from(trendTopics.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([topic, count]) => ({
            topic: `#${topic}`,
            category: 'social',
            source: 'twitterapi_io_search',
            trend_score: Math.min(100, count * 10),
            keywords: [topic],
            region: 'global',
            metadata: {
              mention_count: count,
              source_method: 'hashtag_extraction'
            }
          }));
      } catch (fallbackError) {
        console.error('TwitterAPI.io fallback search error:', fallbackError);
        return [];
      }
    }
  }

  private async storeTrends(trends: TrendData[]): Promise<void> {
    if (trends.length === 0) return;

    const { error } = await supabase
      .from('trending_topics')
      .insert(trends);

    if (error) {
      console.error('Error storing trends:', error);
      throw error;
    }
  }

  private async updateMetrics(metricType: string, value: number): Promise<void> {
    await supabase
      .from('agent_metrics')
      .insert({
        agent_name: 'trend_discovery',
        metric_type: metricType,
        metric_value: value,
        metadata: { timestamp: new Date().toISOString() }
      });
  }

  async getTopTrends(limit: number = 5): Promise<any[]> {
    const { data, error } = await supabase
      .from('trending_topics')
      .select('*')
      .eq('status', 'discovered')
      .order('trend_score', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching trends:', error);
      return [];
    }

    return data || [];
  }

  async selectTrendForProcessing(topicId: string): Promise<void> {
    const { error } = await supabase
      .from('trending_topics')
      .update({ status: 'selected' })
      .eq('id', topicId);

    if (error) {
      console.error('Error selecting trend:', error);
      throw error;
    }
  }

  async analyzeTrendSentiment(topic: string): Promise<{ sentiment: string; confidence: number }> {
    if (!this.twitterApiIoKey) {
      return { sentiment: 'neutral', confidence: 0.5 };
    }

    try {
      const response = await axios.get(
        'https://api.twitterapi.io/v1/search',
        {
          params: {
            q: topic,
            result_type: 'recent',
            count: 20
          },
          headers: {
            'X-API-Key': this.twitterApiIoKey,
            'Content-Type': 'application/json'
          }
        }
      );

      const tweets = response.data?.statuses || [];
      
      // Simple sentiment analysis based on keywords
      let positiveCount = 0;
      let negativeCount = 0;
      
      const positiveWords = ['amazing', 'great', 'awesome', 'love', 'excellent', 'fantastic', 'wonderful'];
      const negativeWords = ['terrible', 'awful', 'hate', 'bad', 'horrible', 'disappointing', 'worst'];

      tweets.forEach((tweet: any) => {
        const text = tweet.text.toLowerCase();
        positiveWords.forEach(word => {
          if (text.includes(word)) positiveCount++;
        });
        negativeWords.forEach(word => {
          if (text.includes(word)) negativeCount++;
        });
      });

      const total = positiveCount + negativeCount;
      if (total === 0) {
        return { sentiment: 'neutral', confidence: 0.5 };
      }

      const positiveRatio = positiveCount / total;
      if (positiveRatio > 0.6) {
        return { sentiment: 'positive', confidence: positiveRatio };
      } else if (positiveRatio < 0.4) {
        return { sentiment: 'negative', confidence: 1 - positiveRatio };
      } else {
        return { sentiment: 'neutral', confidence: 0.5 };
      }
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      return { sentiment: 'neutral', confidence: 0.5 };
    }
  }
}