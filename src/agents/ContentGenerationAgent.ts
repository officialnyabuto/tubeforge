import { OpenAI } from 'openai';
import { supabase } from '../lib/supabase';

interface ScriptGenerationRequest {
  topicId: string;
  topic: string;
  category: string;
  platform: 'youtube' | 'tiktok' | 'instagram' | 'linkedin';
  tone?: 'professional' | 'casual' | 'engaging' | 'educational' | 'humorous' | 'inspirational';
  targetAudience?: 'gen-z' | 'millennials' | 'gen-x' | 'professionals' | 'entrepreneurs';
  desiredEmotion?: 'excitement' | 'curiosity' | 'urgency' | 'trust' | 'entertainment';
  contentStyle?: 'storytelling' | 'educational' | 'controversial' | 'trending' | 'personal';
  duration?: number;
  
  // Enhanced nuance parameters
  humorStyle?: 'dry_wit' | 'sarcastic' | 'ironic' | 'playful' | 'observational' | 'self_deprecating' | 'none';
  emotionalSubtlety?: 'explicit' | 'implicit' | 'layered' | 'understated';
  linguisticComplexity?: 'simple' | 'moderate' | 'advanced' | 'sophisticated';
  pacingVariation?: 'uniform' | 'dynamic' | 'crescendo' | 'staccato';
  implicitMessaging?: boolean;
  culturalNuance?: 'universal' | 'western' | 'tech_culture' | 'business_culture' | 'youth_culture';
  rhetoricalDevices?: string[]; // 'metaphor', 'analogy', 'repetition', 'contrast', 'question'
  subtextLevel?: 'none' | 'light' | 'moderate' | 'heavy';
  conversationalStyle?: 'direct' | 'meandering' | 'stream_of_consciousness' | 'structured';
  emotionalArc?: string[];
  keyMoments?: Array<{ timestamp: number; description: string; emphasis: string; nuanceType?: string }>;
}

interface ScriptResult {
  script: string;
  title: string;
  hashtags: string[];
  hooks: string[];
  callToAction: string;
  qualityScore: number;
  nuanceMetrics: {
    subtletyScore: number;
    complexityScore: number;
    emotionalDepth: number;
    linguisticSophistication: number;
    implicitContentRatio: number;
  };
  creativeDecisions: Array<{
    element: string;
    choice: string;
    reasoning: string;
    nuanceLevel: number;
  }>;
}

export class ContentGenerationAgent {
  private openai: OpenAI;
  private humorPatterns: Map<string, any> = new Map();
  private linguisticStyles: Map<string, any> = new Map();
  private emotionalSubtletyTechniques: Map<string, any> = new Map();
  private rhetoricalDeviceLibrary: Map<string, any> = new Map();

  constructor() {
    this.openai = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });
    
    this.initializeNuanceLibraries();
  }

  private initializeNuanceLibraries(): void {
    // Humor style patterns
    this.humorPatterns.set('dry_wit', {
      characteristics: ['understated_delivery', 'deadpan_tone', 'subtle_irony'],
      techniques: ['matter_of_fact_absurdity', 'casual_profound_statements', 'minimal_emotional_expression'],
      examples: ['stating obvious with serious tone', 'casual mention of extraordinary things']
    });

    this.humorPatterns.set('sarcastic', {
      characteristics: ['verbal_irony', 'mock_praise', 'exaggerated_enthusiasm'],
      techniques: ['saying_opposite_of_meaning', 'over_the_top_positivity', 'fake_excitement'],
      examples: ['Oh great, another meeting', 'Wonderful, just what I needed']
    });

    this.humorPatterns.set('ironic', {
      characteristics: ['situational_contradiction', 'unexpected_outcomes', 'paradoxical_statements'],
      techniques: ['highlighting_contradictions', 'unexpected_juxtaposition', 'reverse_expectations'],
      examples: ['fire station burns down', 'life coach needs therapy']
    });

    this.humorPatterns.set('observational', {
      characteristics: ['everyday_absurdities', 'relatable_situations', 'common_experiences'],
      techniques: ['pointing_out_obvious', 'exaggerating_normal_behavior', 'finding_humor_in_mundane'],
      examples: ['why do we say after dark when its after light', 'elevator button pressing behavior']
    });

    // Linguistic complexity patterns
    this.linguisticStyles.set('simple', {
      vocabulary: 'common_words',
      sentence_structure: 'short_simple',
      concepts: 'concrete',
      metaphors: 'basic_familiar'
    });

    this.linguisticStyles.set('sophisticated', {
      vocabulary: 'varied_advanced',
      sentence_structure: 'complex_varied',
      concepts: 'abstract_nuanced',
      metaphors: 'layered_original'
    });

    // Emotional subtlety techniques
    this.emotionalSubtletyTechniques.set('implicit', {
      techniques: ['show_dont_tell', 'subtext_heavy', 'emotional_undertones'],
      indicators: ['body_language_cues', 'tone_implications', 'contextual_emotions']
    });

    this.emotionalSubtletyTechniques.set('layered', {
      techniques: ['multiple_emotional_levels', 'conflicting_emotions', 'emotional_complexity'],
      indicators: ['surface_vs_deep_emotion', 'emotional_contradictions', 'nuanced_feelings']
    });

    // Rhetorical devices library
    this.rhetoricalDeviceLibrary.set('metaphor', {
      purpose: 'create_vivid_imagery',
      technique: 'implicit_comparison',
      examples: ['life_is_a_journey', 'time_is_money', 'knowledge_is_power']
    });

    this.rhetoricalDeviceLibrary.set('analogy', {
      purpose: 'explain_complex_concepts',
      technique: 'explicit_comparison',
      examples: ['brain_like_computer', 'heart_like_pump', 'economy_like_ecosystem']
    });
  }

  async generateMultiPlatformScripts(
    topicId: string, 
    topic: string, 
    category: string,
    nuanceParams?: Partial<ScriptGenerationRequest>
  ): Promise<ScriptResult[]> {
    try {
      const platforms: Array<'youtube' | 'tiktok' | 'instagram' | 'linkedin'> = 
        ['youtube', 'tiktok', 'instagram', 'linkedin'];
      
      const scripts: ScriptResult[] = [];

      for (const platform of platforms) {
        const request: ScriptGenerationRequest = {
          topicId,
          topic,
          category,
          platform,
          tone: this.selectOptimalTone(platform, category),
          targetAudience: this.selectTargetAudience(platform),
          desiredEmotion: this.selectDesiredEmotion(category),
          contentStyle: this.selectContentStyle(platform, category),
          duration: this.getPlatformDuration(platform),
          // Apply nuance parameters with intelligent defaults
          humorStyle: nuanceParams?.humorStyle || this.selectOptimalHumor(platform, category),
          emotionalSubtlety: nuanceParams?.emotionalSubtlety || this.selectEmotionalSubtlety(platform),
          linguisticComplexity: nuanceParams?.linguisticComplexity || this.selectLinguisticComplexity(platform),
          pacingVariation: nuanceParams?.pacingVariation || this.selectPacingVariation(platform),
          implicitMessaging: nuanceParams?.implicitMessaging ?? this.shouldUseImplicitMessaging(platform),
          culturalNuance: nuanceParams?.culturalNuance || this.selectCulturalNuance(category),
          rhetoricalDevices: nuanceParams?.rhetoricalDevices || this.selectRhetoricalDevices(platform, category),
          subtextLevel: nuanceParams?.subtextLevel || this.selectSubtextLevel(platform),
          conversationalStyle: nuanceParams?.conversationalStyle || this.selectConversationalStyle(platform),
          ...nuanceParams
        };

        const script = await this.generateEnhancedScript(request);
        scripts.push(script);

        // Store script in database with enhanced metadata
        await this.storeEnhancedScript(script, request);
      }

      await this.updateMetrics('scripts_generated', scripts.length);
      return scripts;
    } catch (error) {
      console.error('Error generating multi-platform scripts:', error);
      await this.updateMetrics('errors', 1);
      throw error;
    }
  }

  private async generateEnhancedScript(request: ScriptGenerationRequest): Promise<ScriptResult> {
    const prompt = this.buildEnhancedNuancePrompt(request);
    
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: this.getEnhancedSystemPrompt(request)
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1500,
        temperature: this.calculateCreativeTemperature(request),
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No content generated from OpenAI');
      }

      const parsedResult = this.parseEnhancedScriptResponse(content, request);
      const enhancedResult = await this.applyNuanceEnhancements(parsedResult, request);
      
      return enhancedResult;
    } catch (error) {
      console.error('Error generating enhanced script:', error);
      throw error;
    }
  }

  private buildEnhancedNuancePrompt(request: ScriptGenerationRequest): string {
    const humorGuidance = this.getHumorStyleGuidance(request.humorStyle);
    const emotionalGuidance = this.getEmotionalSubtletyGuidance(request.emotionalSubtlety);
    const linguisticGuidance = this.getLinguisticComplexityGuidance(request.linguisticComplexity);
    const pacingGuidance = this.getPacingVariationGuidance(request.pacingVariation);
    const rhetoricalGuidance = this.getRhetoricalDeviceGuidance(request.rhetoricalDevices);

    return `
Create a ${request.duration}-second ${request.platform} script about "${request.topic}" with these nuanced specifications:

CONTENT FOUNDATION:
- Topic: ${request.topic}
- Category: ${request.category}
- Platform: ${request.platform}
- Target Audience: ${request.targetAudience}
- Desired Emotion: ${request.desiredEmotion}

NUANCE SPECIFICATIONS:
${humorGuidance}
${emotionalGuidance}
${linguisticGuidance}
${pacingGuidance}
${rhetoricalGuidance}

SUBTLETY REQUIREMENTS:
- Subtext Level: ${request.subtextLevel}
- Implicit Messaging: ${request.implicitMessaging ? 'Use layered meanings and implications' : 'Be direct and explicit'}
- Cultural Nuance: ${request.culturalNuance}
- Conversational Style: ${request.conversationalStyle}

CREATIVE CONSTRAINTS:
- Avoid clichés and overused phrases
- Layer multiple levels of meaning where appropriate
- Use sophisticated but accessible language
- Create natural, authentic dialogue
- Include subtle emotional transitions
- Embed implicit calls to action

FORMAT REQUIREMENTS:
Return a JSON object with:
{
  "script": "The complete script with [PAUSE] markers and nuanced delivery notes",
  "title": "Compelling, nuanced title",
  "hashtags": ["relevant", "hashtags"],
  "hooks": ["opening hooks that demonstrate subtlety"],
  "callToAction": "Subtle, implicit call to action",
  "nuanceAnalysis": {
    "subtletyElements": ["list of subtle elements used"],
    "emotionalLayers": ["emotional complexity demonstrated"],
    "linguisticDevices": ["sophisticated language techniques"],
    "implicitMessages": ["underlying messages conveyed"]
  }
}
    `;
  }

  private getEnhancedSystemPrompt(request: ScriptGenerationRequest): string {
    return `
You are an expert content creator specializing in nuanced, sophisticated social media content. Your expertise includes:

1. EMOTIONAL INTELLIGENCE: Understanding and conveying complex emotional states through subtle cues
2. LINGUISTIC SOPHISTICATION: Using advanced language techniques while maintaining accessibility
3. CULTURAL AWARENESS: Adapting content for specific cultural contexts and audiences
4. RHETORICAL MASTERY: Employing persuasive techniques that feel natural and authentic
5. SUBTEXT CREATION: Layering multiple meanings and implications within content

Your goal is to create content that:
- Demonstrates intellectual and emotional depth
- Uses sophisticated humor and wit appropriately
- Conveys complex ideas through accessible language
- Engages audiences on multiple levels simultaneously
- Feels authentic and conversational despite its sophistication

Platform-specific considerations for ${request.platform}:
${this.getPlatformNuanceGuidelines(request.platform)}

Always prioritize authenticity over cleverness, and ensure that nuanced elements enhance rather than obscure the core message.
    `;
  }

  private getHumorStyleGuidance(humorStyle?: string): string {
    if (!humorStyle || humorStyle === 'none') return '';
    
    const pattern = this.humorPatterns.get(humorStyle);
    if (!pattern) return '';

    return `
HUMOR STYLE - ${humorStyle.toUpperCase()}:
- Characteristics: ${pattern.characteristics.join(', ')}
- Techniques: ${pattern.techniques.join(', ')}
- Apply humor subtly, ensuring it enhances rather than dominates the message
- Use timing and delivery cues to maximize comedic impact
    `;
  }

  private getEmotionalSubtletyGuidance(emotionalSubtlety?: string): string {
    if (!emotionalSubtlety) return '';

    const technique = this.emotionalSubtletyTechniques.get(emotionalSubtlety);
    if (!technique) return '';

    return `
EMOTIONAL SUBTLETY - ${emotionalSubtlety.toUpperCase()}:
- Techniques: ${technique.techniques.join(', ')}
- Show emotions through context, tone, and implication
- Avoid stating emotions directly; let them emerge naturally
- Create emotional resonance through shared experiences and universal truths
    `;
  }

  private getLinguisticComplexityGuidance(linguisticComplexity?: string): string {
    if (!linguisticComplexity) return '';

    const style = this.linguisticStyles.get(linguisticComplexity);
    if (!style) return '';

    return `
LINGUISTIC COMPLEXITY - ${linguisticComplexity.toUpperCase()}:
- Vocabulary: ${style.vocabulary}
- Sentence Structure: ${style.sentence_structure}
- Concepts: ${style.concepts}
- Metaphors: ${style.metaphors}
- Balance sophistication with accessibility for the target audience
    `;
  }

  private getPacingVariationGuidance(pacingVariation?: string): string {
    const pacingStyles = {
      uniform: 'Maintain consistent rhythm and tempo throughout',
      dynamic: 'Vary pacing to match emotional intensity and content importance',
      crescendo: 'Build intensity and speed toward climactic moments',
      staccato: 'Use short, punchy segments with deliberate pauses for emphasis'
    };

    return pacingVariation ? `
PACING VARIATION - ${pacingVariation.toUpperCase()}:
- Style: ${pacingStyles[pacingVariation as keyof typeof pacingStyles]}
- Use [PAUSE] markers strategically to control rhythm
- Match pacing to emotional content and platform expectations
    ` : '';
  }

  private getRhetoricalDeviceGuidance(rhetoricalDevices?: string[]): string {
    if (!rhetoricalDevices || rhetoricalDevices.length === 0) return '';

    return `
RHETORICAL DEVICES:
${rhetoricalDevices.map(device => {
  const info = this.rhetoricalDeviceLibrary.get(device);
  return info ? `- ${device}: ${info.purpose} through ${info.technique}` : `- ${device}`;
}).join('\n')}
- Use these devices naturally within the narrative flow
- Ensure rhetorical elements enhance comprehension and engagement
    `;
  }

  private getPlatformNuanceGuidelines(platform: string): string {
    const guidelines = {
      youtube: 'Longer-form content allows for complex narrative arcs and detailed explanations. Use sophisticated storytelling techniques.',
      tiktok: 'Quick, punchy content requires concentrated nuance. Every word must carry multiple meanings.',
      instagram: 'Visual-first platform benefits from descriptive language and aesthetic considerations.',
      linkedin: 'Professional context allows for industry-specific sophistication and thought leadership positioning.'
    };

    return guidelines[platform as keyof typeof guidelines] || '';
  }

  private calculateCreativeTemperature(request: ScriptGenerationRequest): number {
    let temperature = 0.7; // Base temperature

    // Adjust based on nuance parameters
    if (request.humorStyle && request.humorStyle !== 'none') temperature += 0.1;
    if (request.emotionalSubtlety === 'layered') temperature += 0.1;
    if (request.linguisticComplexity === 'sophisticated') temperature += 0.05;
    if (request.implicitMessaging) temperature += 0.1;
    if (request.subtextLevel === 'heavy') temperature += 0.1;

    return Math.min(0.9, temperature); // Cap at 0.9
  }

  private parseEnhancedScriptResponse(content: string, request: ScriptGenerationRequest): any {
    try {
      // Try to parse as JSON first
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      // Fallback parsing if JSON is malformed
      return this.fallbackParseScript(content, request);
    } catch (error) {
      console.error('Error parsing script response:', error);
      return this.fallbackParseScript(content, request);
    }
  }

  private fallbackParseScript(content: string, request: ScriptGenerationRequest): any {
    const lines = content.split('\n').filter(line => line.trim());
    
    return {
      script: content,
      title: `${request.topic} - ${request.platform}`,
      hashtags: [`#${request.category}`, `#${request.platform}`, '#AI'],
      hooks: ['Hook extracted from content'],
      callToAction: 'Engage with this content',
      nuanceAnalysis: {
        subtletyElements: ['Parsed from content'],
        emotionalLayers: ['Detected emotional complexity'],
        linguisticDevices: ['Identified language techniques'],
        implicitMessages: ['Underlying themes']
      }
    };
  }

  private async applyNuanceEnhancements(parsedResult: any, request: ScriptGenerationRequest): Promise<ScriptResult> {
    // Calculate nuance metrics
    const nuanceMetrics = this.calculateNuanceMetrics(parsedResult, request);
    
    // Generate creative decisions log
    const creativeDecisions = this.generateCreativeDecisions(parsedResult, request);
    
    // Enhance script with delivery notes
    const enhancedScript = this.addDeliveryNotes(parsedResult.script, request);

    return {
      script: enhancedScript,
      title: parsedResult.title,
      hashtags: parsedResult.hashtags || [],
      hooks: parsedResult.hooks || [],
      callToAction: parsedResult.callToAction,
      qualityScore: this.calculateQualityScore(parsedResult, request),
      nuanceMetrics,
      creativeDecisions
    };
  }

  private calculateNuanceMetrics(parsedResult: any, request: ScriptGenerationRequest): any {
    const script = parsedResult.script || '';
    
    return {
      subtletyScore: this.calculateSubtletyScore(script, request),
      complexityScore: this.calculateComplexityScore(script, request),
      emotionalDepth: this.calculateEmotionalDepth(script, request),
      linguisticSophistication: this.calculateLinguisticSophistication(script, request),
      implicitContentRatio: this.calculateImplicitContentRatio(script, request)
    };
  }

  private calculateSubtletyScore(script: string, request: ScriptGenerationRequest): number {
    let score = 50; // Base score

    // Check for subtle indicators
    if (script.includes('...') || script.includes('[PAUSE]')) score += 10;
    if (request.emotionalSubtlety === 'implicit') score += 15;
    if (request.subtextLevel === 'heavy') score += 20;
    if (request.humorStyle === 'dry_wit' || request.humorStyle === 'ironic') score += 15;

    // Check for explicit emotional statements (reduces subtlety)
    const explicitEmotions = ['I feel', 'I am excited', 'I am sad', 'This makes me'];
    explicitEmotions.forEach(phrase => {
      if (script.toLowerCase().includes(phrase)) score -= 10;
    });

    return Math.max(0, Math.min(100, score));
  }

  private calculateComplexityScore(script: string, request: ScriptGenerationRequest): number {
    let score = 30; // Base score

    const words = script.split(' ');
    const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / words.length;
    
    if (avgWordLength > 5) score += 20;
    if (request.linguisticComplexity === 'sophisticated') score += 25;
    if (request.rhetoricalDevices && request.rhetoricalDevices.length > 0) score += 15;

    // Check for complex sentence structures
    const complexIndicators = [';', ':', '—', 'however', 'nevertheless', 'furthermore'];
    complexIndicators.forEach(indicator => {
      if (script.includes(indicator)) score += 5;
    });

    return Math.max(0, Math.min(100, score));
  }

  private calculateEmotionalDepth(script: string, request: ScriptGenerationRequest): number {
    let score = 40; // Base score

    if (request.emotionalSubtlety === 'layered') score += 20;
    if (request.desiredEmotion && script.toLowerCase().includes(request.desiredEmotion)) score += 15;
    
    // Check for emotional complexity indicators
    const emotionalIndicators = ['but', 'yet', 'still', 'despite', 'although'];
    emotionalIndicators.forEach(indicator => {
      if (script.toLowerCase().includes(indicator)) score += 5;
    });

    return Math.max(0, Math.min(100, score));
  }

  private calculateLinguisticSophistication(script: string, request: ScriptGenerationRequest): number {
    let score = 35; // Base score

    if (request.linguisticComplexity === 'sophisticated') score += 30;
    if (request.rhetoricalDevices && request.rhetoricalDevices.length > 2) score += 20;

    // Check for sophisticated vocabulary
    const sophisticatedWords = ['nuanced', 'paradigm', 'juxtaposition', 'dichotomy', 'synthesis'];
    sophisticatedWords.forEach(word => {
      if (script.toLowerCase().includes(word)) score += 5;
    });

    return Math.max(0, Math.min(100, score));
  }

  private calculateImplicitContentRatio(script: string, request: ScriptGenerationRequest): number {
    if (!request.implicitMessaging) return 0;

    let implicitIndicators = 0;
    const totalSentences = script.split(/[.!?]+/).length;

    // Count implicit messaging indicators
    const implicitPhrases = ['you know', 'of course', 'naturally', 'obviously', 'clearly'];
    implicitPhrases.forEach(phrase => {
      if (script.toLowerCase().includes(phrase)) implicitIndicators++;
    });

    return Math.min(100, (implicitIndicators / totalSentences) * 100);
  }

  private generateCreativeDecisions(parsedResult: any, request: ScriptGenerationRequest): any[] {
    const decisions = [];

    if (request.humorStyle && request.humorStyle !== 'none') {
      decisions.push({
        element: 'humor_integration',
        choice: request.humorStyle,
        reasoning: `Selected ${request.humorStyle} humor to match platform and audience expectations`,
        nuanceLevel: this.getHumorNuanceLevel(request.humorStyle)
      });
    }

    if (request.emotionalSubtlety) {
      decisions.push({
        element: 'emotional_expression',
        choice: request.emotionalSubtlety,
        reasoning: `Applied ${request.emotionalSubtlety} emotional delivery for sophisticated audience engagement`,
        nuanceLevel: this.getEmotionalNuanceLevel(request.emotionalSubtlety)
      });
    }

    if (request.linguisticComplexity) {
      decisions.push({
        element: 'language_sophistication',
        choice: request.linguisticComplexity,
        reasoning: `Calibrated language complexity to ${request.linguisticComplexity} level for optimal comprehension`,
        nuanceLevel: this.getLinguisticNuanceLevel(request.linguisticComplexity)
      });
    }

    return decisions;
  }

  private getHumorNuanceLevel(humorStyle: string): number {
    const levels = {
      'dry_wit': 0.9,
      'ironic': 0.8,
      'sarcastic': 0.6,
      'observational': 0.7,
      'playful': 0.4,
      'self_deprecating': 0.5
    };
    return levels[humorStyle as keyof typeof levels] || 0.5;
  }

  private getEmotionalNuanceLevel(emotionalSubtlety: string): number {
    const levels = {
      'explicit': 0.2,
      'implicit': 0.8,
      'layered': 0.9,
      'understated': 0.7
    };
    return levels[emotionalSubtlety as keyof typeof levels] || 0.5;
  }

  private getLinguisticNuanceLevel(linguisticComplexity: string): number {
    const levels = {
      'simple': 0.2,
      'moderate': 0.5,
      'advanced': 0.7,
      'sophisticated': 0.9
    };
    return levels[linguisticComplexity as keyof typeof levels] || 0.5;
  }

  private addDeliveryNotes(script: string, request: ScriptGenerationRequest): string {
    let enhancedScript = script;

    // Add pacing notes based on variation style
    if (request.pacingVariation === 'dynamic') {
      enhancedScript = enhancedScript.replace(/\./g, '. [DYNAMIC_PAUSE]');
    } else if (request.pacingVariation === 'staccato') {
      enhancedScript = enhancedScript.replace(/,/g, ', [QUICK_PAUSE]');
    }

    // Add emotional delivery notes
    if (request.emotionalSubtlety === 'implicit') {
      enhancedScript = enhancedScript.replace(/!/g, '! [UNDERSTATED_EMPHASIS]');
    }

    // Add humor delivery notes
    if (request.humorStyle === 'dry_wit') {
      enhancedScript = enhancedScript.replace(/\?/g, '? [DEADPAN_DELIVERY]');
    }

    return enhancedScript;
  }

  private calculateQualityScore(parsedResult: any, request: ScriptGenerationRequest): number {
    const baseScore = 70;
    let qualityScore = baseScore;

    // Bonus for nuanced elements
    if (request.humorStyle && request.humorStyle !== 'none') qualityScore += 5;
    if (request.emotionalSubtlety === 'layered') qualityScore += 8;
    if (request.linguisticComplexity === 'sophisticated') qualityScore += 7;
    if (request.implicitMessaging) qualityScore += 6;
    if (request.rhetoricalDevices && request.rhetoricalDevices.length > 0) qualityScore += 4;

    return Math.min(100, qualityScore);
  }

  // Helper methods for intelligent defaults
  private selectOptimalHumor(platform: string, category: string): string {
    const humorMap = {
      youtube: { tech: 'observational', business: 'dry_wit', lifestyle: 'playful' },
      tiktok: { tech: 'ironic', business: 'sarcastic', lifestyle: 'playful' },
      instagram: { tech: 'observational', business: 'self_deprecating', lifestyle: 'playful' },
      linkedin: { tech: 'dry_wit', business: 'observational', lifestyle: 'none' }
    };

    return humorMap[platform as keyof typeof humorMap]?.[category as keyof any] || 'none';
  }

  private selectEmotionalSubtlety(platform: string): string {
    const subtletyMap = {
      youtube: 'layered',
      tiktok: 'implicit',
      instagram: 'understated',
      linkedin: 'implicit'
    };

    return subtletyMap[platform as keyof typeof subtletyMap] || 'implicit';
  }

  private selectLinguisticComplexity(platform: string): string {
    const complexityMap = {
      youtube: 'advanced',
      tiktok: 'moderate',
      instagram: 'moderate',
      linkedin: 'sophisticated'
    };

    return complexityMap[platform as keyof typeof complexityMap] || 'moderate';
  }

  private selectPacingVariation(platform: string): string {
    const pacingMap = {
      youtube: 'dynamic',
      tiktok: 'staccato',
      instagram: 'dynamic',
      linkedin: 'uniform'
    };

    return pacingMap[platform as keyof typeof pacingMap] || 'dynamic';
  }

  private shouldUseImplicitMessaging(platform: string): boolean {
    return platform === 'linkedin' || platform === 'youtube';
  }

  private selectCulturalNuance(category: string): string {
    const cultureMap = {
      technology: 'tech_culture',
      business: 'business_culture',
      lifestyle: 'universal',
      entertainment: 'youth_culture'
    };

    return cultureMap[category as keyof typeof cultureMap] || 'universal';
  }

  private selectRhetoricalDevices(platform: string, category: string): string[] {
    const deviceMap = {
      youtube: ['metaphor', 'analogy', 'repetition'],
      tiktok: ['contrast', 'question'],
      instagram: ['metaphor', 'question'],
      linkedin: ['analogy', 'contrast', 'repetition']
    };

    return deviceMap[platform as keyof typeof deviceMap] || ['metaphor'];
  }

  private selectSubtextLevel(platform: string): string {
    const subtextMap = {
      youtube: 'moderate',
      tiktok: 'light',
      instagram: 'moderate',
      linkedin: 'heavy'
    };

    return subtextMap[platform as keyof typeof subtextMap] || 'moderate';
  }

  private selectConversationalStyle(platform: string): string {
    const styleMap = {
      youtube: 'structured',
      tiktok: 'stream_of_consciousness',
      instagram: 'meandering',
      linkedin: 'direct'
    };

    return styleMap[platform as keyof typeof styleMap] || 'structured';
  }

  // Existing helper methods (keeping for compatibility)
  private selectOptimalTone(platform: string, category: string): string {
    const toneMap = {
      youtube: { tech: 'educational', business: 'professional', lifestyle: 'engaging' },
      tiktok: { tech: 'engaging', business: 'humorous', lifestyle: 'casual' },
      instagram: { tech: 'inspirational', business: 'engaging', lifestyle: 'casual' },
      linkedin: { tech: 'professional', business: 'professional', lifestyle: 'inspirational' }
    };

    return toneMap[platform as keyof typeof toneMap]?.[category as keyof any] || 'engaging';
  }

  private selectTargetAudience(platform: string): string {
    const audienceMap = {
      youtube: 'millennials',
      tiktok: 'gen-z',
      instagram: 'millennials',
      linkedin: 'professionals'
    };

    return audienceMap[platform as keyof typeof audienceMap] || 'millennials';
  }

  private selectDesiredEmotion(category: string): string {
    const emotionMap = {
      technology: 'excitement',
      business: 'trust',
      lifestyle: 'entertainment',
      health: 'curiosity',
      finance: 'urgency'
    };

    return emotionMap[category as keyof typeof emotionMap] || 'curiosity';
  }

  private selectContentStyle(platform: string, category: string): string {
    const styleMap = {
      youtube: { tech: 'educational', business: 'storytelling' },
      tiktok: { tech: 'trending', business: 'controversial' },
      instagram: { tech: 'personal', business: 'storytelling' },
      linkedin: { tech: 'educational', business: 'educational' }
    };

    return styleMap[platform as keyof typeof styleMap]?.[category as keyof any] || 'storytelling';
  }

  private getPlatformDuration(platform: string): number {
    const durations = {
      youtube: 60,
      tiktok: 30,
      instagram: 45,
      linkedin: 90
    };

    return durations[platform as keyof typeof durations] || 60;
  }

  private async storeEnhancedScript(script: ScriptResult, request: ScriptGenerationRequest): Promise<void> {
    await supabase
      .from('content_scripts')
      .insert({
        topic_id: request.topicId,
        title: script.title,
        script: script.script,
        platform: request.platform,
        tone: request.tone,
        duration_seconds: request.duration,
        hooks: script.hooks,
        call_to_action: script.callToAction,
        hashtags: script.hashtags,
        quality_score: script.qualityScore,
        status: 'generated',
        // Enhanced nuance fields
        target_audience: request.targetAudience,
        desired_emotion: request.desiredEmotion,
        content_style: request.contentStyle,
        emotional_arc: request.emotionalArc,
        key_moments: request.keyMoments,
        visual_cues: [],
        pacing: request.pacingVariation,
        cultural_context: request.culturalNuance,
        linguistic_nuances: request.rhetoricalDevices,
        narrative_complexity: request.linguisticComplexity,
        feedback_summary_score: 0,
        // Store nuance parameters in metadata
        metadata: {
          nuanceParams: {
            humorStyle: request.humorStyle,
            emotionalSubtlety: request.emotionalSubtlety,
            linguisticComplexity: request.linguisticComplexity,
            pacingVariation: request.pacingVariation,
            implicitMessaging: request.implicitMessaging,
            subtextLevel: request.subtextLevel,
            conversationalStyle: request.conversationalStyle
          },
          nuanceMetrics: script.nuanceMetrics,
          creativeDecisions: script.creativeDecisions
        }
      });
  }

  private async updateMetrics(metricType: string, value: number): Promise<void> {
    await supabase
      .from('agent_metrics')
      .insert({
        agent_name: 'content_generation',
        metric_type: metricType,
        metric_value: value,
        metadata: { timestamp: new Date().toISOString() }
      });
  }
}