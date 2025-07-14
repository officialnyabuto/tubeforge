# TubeForge - AI Content Pipeline Dashboard

![TubeForge Banner](https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200)

**TubeForge** is an advanced AI-powered content creation pipeline that autonomously discovers trending topics, generates engaging scripts, creates avatar videos with voiceovers, applies sophisticated post-production editing, and publishes content across multiple social media platforms.

## 🚀 Features

### 🔍 **Intelligent Trend Discovery**
- Real-time monitoring of global trends across multiple sources
- Integration with Perplexity AI, Google Trends, and Twitter API
- Advanced sentiment analysis and trend scoring
- Cultural context awareness and regional adaptation

### ✍️ **Sophisticated Content Generation**
- GPT-4 powered script generation with nuanced storytelling
- Platform-specific optimization (YouTube Shorts, TikTok, Instagram Reels, LinkedIn)
- Advanced linguistic complexity controls
- Emotional arc mapping and micro-moment timing
- Cultural nuance integration and implicit messaging

### 🎭 **Enhanced Avatar & Voice Synthesis**
- Synthesia AI avatar generation with micro-expression control
- Play.ht voice synthesis with advanced inflection variability
- Non-verbal cue frequency adjustment
- Emotional authenticity calibration
- Gesture complexity and eye contact pattern optimization

### 🎬 **Advanced Post-Production**
- Opus Clip integration for intelligent video editing
- Nuanced color grading with mood-based presets
- Transition smoothness and editing subtlety controls
- Music synchronization with precision timing
- Effects intensity and visual nuance level adjustment
- Adaptive caption styling for platform optimization

### 📱 **Multi-Platform Publishing**
- Automated publishing to YouTube Shorts, TikTok, Instagram Reels, LinkedIn
- Optimal posting time analysis and scheduling
- Platform-specific content optimization
- Engagement prediction and viral potential scoring
- A/B testing for thumbnails and content variations

### 📊 **Comprehensive Analytics**
- Real-time performance tracking across all platforms
- Detailed engagement metrics and audience insights
- AI-driven content optimization recommendations
- Creative decision logging and impact analysis
- Revenue tracking and ROI calculation

## 🏗️ Architecture

### **Agent-Based System**
TubeForge uses a sophisticated multi-agent architecture:

1. **Trend Discovery Agent** - Monitors and analyzes global trends
2. **Content Generation Agent** - Creates nuanced, platform-optimized scripts
3. **Avatar & Voice Agent** - Generates realistic avatar videos with voiceovers
4. **Post-Production Agent** - Applies advanced editing and optimization
5. **Publishing Agent** - Manages multi-platform content distribution

### **Technology Stack**
- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Real-time subscriptions, Edge Functions)
- **AI Services**: OpenAI GPT-4, Synthesia, Play.ht, Opus Clip, Fliki
- **Social APIs**: YouTube API, TikTok API, Instagram Graph API, LinkedIn API
- **Build Tool**: Vite
- **Deployment**: Netlify (Frontend), Supabase (Backend)

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- API keys for AI services (OpenAI, Synthesia, Play.ht, etc.)
- Social media platform API credentials

### 1. Clone the Repository
```bash
git clone https://github.com/officialnyabuto/tubeforge.git
cd tubeforge
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory and configure your API keys:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# AI Services
OPENAI_API_KEY=your_openai_api_key
PERPLEXITY_API_KEY=your_perplexity_api_key

# Social Media APIs
TWITTERAPI_IO_API_KEY=your_twitterapi_io_api_key

# Video Generation APIs
SYNTHESIA_API_KEY=your_synthesia_api_key
PLAYHT_API_KEY=your_playht_api_key
PLAYHT_USER_ID=your_playht_user_id
FLIKI_API_KEY=your_fliki_api_key
OPUS_CLIP_API_KEY=your_opus_clip_api_key

# Publishing APIs
YOUTUBE_API_KEY=your_youtube_api_key
YOUTUBE_CLIENT_ID=your_youtube_client_id
YOUTUBE_CLIENT_SECRET=your_youtube_client_secret
TIKTOK_CLIENT_KEY=your_tiktok_client_key
TIKTOK_CLIENT_SECRET=your_tiktok_client_secret
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret

# Additional APIs
PEXELS_API_KEY=your_pexels_api_key
```

### 4. Database Setup
1. Create a new Supabase project
2. Run the provided migrations to set up the database schema:
   - `supabase/migrations/20250608072217_fragrant_lagoon.sql`
   - `supabase/migrations/20250624050931_raspy_ember.sql`

### 5. Start the Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🎮 Usage

### **Dashboard Overview**
The main dashboard provides a comprehensive view of your content pipeline:
- **Pipeline Overview**: Real-time status of all agents and processing stages
- **Agent Dashboard**: Individual agent performance and health monitoring
- **Content Preview**: Review and edit generated content with advanced nuance controls
- **Analytics**: Detailed performance metrics and optimization insights
- **Schedule Manager**: Content scheduling and publishing management

### **Advanced Nuance Controls**
TubeForge features sophisticated nuance parameters for fine-tuning content:

#### Content Generation
- **Humor Style**: Dry wit, sarcastic, ironic, observational, playful
- **Emotional Subtlety**: Explicit, implicit, layered, understated
- **Linguistic Complexity**: Simple, moderate, advanced, sophisticated
- **Cultural Nuance**: Universal, western, tech culture, business culture
- **Subtext Level**: None, light, moderate, heavy

#### Avatar & Voice
- **Micro-expression Intensity**: Control facial expression subtlety
- **Voice Inflection Variability**: Adjust vocal dynamics and emphasis
- **Emotional Authenticity**: Calibrate genuine emotional expression
- **Gesture Complexity**: Fine-tune hand and body movement sophistication
- **Eye Contact Patterns**: Direct, natural, thoughtful, engaging

#### Post-Production
- **Visual Nuance Level**: Control overall visual processing sophistication
- **Color Grading Mood**: Warm, cool, cinematic, vibrant, neutral
- **Transition Smoothness**: Adjust cut timing and flow between scenes
- **Music Sync Precision**: Control beat alignment and audio synchronization
- **Effects Intensity**: Manage visual effects application and strength

### **Content Regeneration**
Use the enhanced regeneration feature to recreate content with different nuance parameters:
1. Select content in the Content Preview section
2. Click "Advanced Controls" to access nuance parameters
3. Adjust settings according to your preferences
4. Click "Apply & Regenerate" to create new content with enhanced nuance

## 📊 Monitoring & Analytics

### **Real-time Metrics**
- Agent health and performance monitoring
- Processing queue status and task completion
- Content generation and publishing statistics
- Platform-specific engagement tracking

### **Performance Insights**
- Trend discovery accuracy and relevance scoring
- Content quality metrics and audience feedback
- Publishing optimization and engagement prediction
- Revenue tracking and ROI analysis

## 🔧 API Configuration

### **Required API Keys**

1. **OpenAI**: For GPT-4 content generation
2. **Synthesia**: For AI avatar video creation
3. **Play.ht**: For advanced voice synthesis
4. **Opus Clip**: For intelligent video editing
5. **Perplexity**: For trend discovery and analysis
6. **Social Platform APIs**: For content publishing and analytics

### **Optional Integrations**
- **Pexels**: For stock imagery and visual assets
- **Fliki**: Additional video generation capabilities
- **TwitterAPI.io**: Enhanced social media trend monitoring

## 🚀 Deployment

### **Frontend Deployment (Netlify)**
```bash
npm run build
# Deploy the dist/ folder to Netlify
```

### **Backend Deployment (Supabase)**
The backend is automatically deployed through Supabase. Ensure your:
- Database migrations are applied
- Edge functions are deployed
- Environment variables are configured

## 🤝 Contributing

We welcome contributions to TubeForge! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Development Guidelines**
- Follow TypeScript best practices
- Maintain component modularity (max 200 lines per file)
- Use proper error handling and logging
- Write comprehensive tests for new features
- Document API changes and new functionality

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for GPT-4 language model
- **Synthesia** for AI avatar technology
- **Play.ht** for voice synthesis capabilities
- **Supabase** for backend infrastructure
- **Tailwind CSS** for styling framework
- **Lucide React** for icon components

## 📞 Support

For support, questions, or feature requests:
- **GitHub Issues**: [Create an issue](https://github.com/officialnyabuto/tubeforge/issues)
- **Email**: [Contact the maintainer](mailto:ronnyabuto@gmail.com)
- **Documentation**: [Wiki](https://github.com/officialnyabuto/tubeforge/wiki)

## 🔮 Roadmap

### **Phase 1: Core Pipeline** ✅
- Basic trend discovery and content generation
- Simple avatar video creation
- Multi-platform publishing

### **Phase 2: Enhanced Nuance** ✅
- Advanced content generation with linguistic sophistication
- Micro-expression and voice inflection controls
- Sophisticated post-production editing

### **Phase 3: AI Optimization** 🚧
- Machine learning-based content optimization
- Predictive analytics and performance forecasting
- Advanced A/B testing and content variants

### **Phase 4: Enterprise Features** 📋
- Team collaboration and workflow management
- Advanced analytics and reporting
- Custom branding and white-label solutions

---

**Built with ❤️ by [officialnyabuto](https://github.com/officialnyabuto)**

*TubeForge - Transforming content creation through AI innovation*