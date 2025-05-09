# TubeForge AI

TubeForge AI is an autonomous multi-agent system for YouTube content creation, featuring real-time trend analysis, sentiment-aware scripts, and adaptive image generation. It includes an interactive React frontend for monitoring workflows.

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/officialnyabuto/TubeForgeAI.git
   cd TubeForgeAI
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Configure environment variables in `backend/.env`:
   ```plaintext
   OPENAI_API_KEY=your_openai_key
   YOUTUBE_API_KEY=your_youtube_key
   X_API_KEY=your_x_key
   ```

5. Start Redis and backend with Docker:
   ```bash
   docker-compose up
   ```

6. Start the frontend:
   ```bash
   cd frontend
   npm start
   ```

7. Access the dashboard at `http://localhost:1234`.

## Usage

1. Open the dashboard in your browser.
2. Enter a niche (e.g., "AI Tutorials"), select a style (or use "auto"), and choose a language.
3. Click "Start Workflow" to initiate the process.
4. Monitor logs and view generated assets in real-time.

## Features
- **Autonomous Agents**: Dynamically adapt to new trend sources, art styles, and interaction elements.
- **Interactive Dashboard**: Real-time monitoring of agent activities and outputs.
- **Scalable**: Uses Celery for asynchronous task execution.
- **Customizable**: High-level inputs via the frontend, no code changes needed.

## Requirements
- Python 3.9+
- Node.js 16+
- Docker
- GPU (recommended for Stable Diffusion XL)
- API keys for OpenAI, YouTube Data API, X API

## License
MIT
