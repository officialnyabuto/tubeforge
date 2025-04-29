import os
import logging
import json
import uuid
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from celery import Celery
from agents.trend_analyzer import TrendAnalyzer
from agents.sentiment_analyzer import SentimentAnalyzer
from agents.content_strategist import ContentStrategist
from agents.scriptwriter import Scriptwriter
from agents.image_generator import ImageGenerator
from agents.voiceover import Voiceover
from agents.video_editor import VideoEditor
from agents.youtube_uploader import YouTubeUploader
from agents.interaction_agent import InteractionAgent
from utils.error_handler import handle_exceptions
from utils.db_manager import init_db, add_trend_source, get_trend_sources

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# FastAPI app
app = FastAPI()

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Celery setup
celery = Celery('tasks', broker='redis://localhost:6379/0', backend='redis://localhost:6379/0')
celery.conf.update(task_track_started=True)

# WebSocket connections
active_websockets = []

class WorkflowInput(BaseModel):
    niche: str
    style: str = "auto"
    lang: str = "en"
    enable_interaction: bool = True

@app.on_event("startup")
async def startup_event():
    init_db()
    # Add default trend sources
    default_sources = [
        {"name": "Google Trends", "url": "https://trends.google.com", "api_key": None},
        {"name": "YouTube Trends", "url": "https://www.youtube.com", "api_key": os.getenv('YOUTUBE_API_KEY')}
    ]
    for source in default_sources:
        add_trend_source(source["name"], source["url"], source["api_key"])
    logger.info("Database initialized with default trend sources")

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    active_websockets.append(websocket)
    try:
        while True:
            await websocket.receive_text()
    except Exception:
        active_websockets.remove(websocket)

async def broadcast_log(message: str):
    for ws in active_websockets:
        await ws.send_text(json.dumps({"type": "log", "message": message}))

@celery.task
@handle_exceptions
def run_workflow(niche: str, style: str, lang: str, enable_interaction: bool):
    logger.info(f"Starting workflow for niche: {niche}, style: {style}, lang: {lang}")
    coordinator = Coordinator(niche, style, lang, enable_interaction)
    result = coordinator.run()
    return result

class Coordinator:
    def __init__(self, niche, style, lang, enable_interaction):
        self.niche = niche
        self.style = style
        self.lang = lang
        self.enable_interaction = enable_interaction
        self.trend_analyzer = TrendAnalyzer()
        self.sentiment_analyzer = SentimentAnalyzer()
        self.content_strategist = ContentStrategist()
        self.scriptwriter = Scriptwriter()
        self.image_generator = ImageGenerator()
        self.voiceover = Voiceover()
        self.video_editor = VideoEditor()
        self.youtube_uploader = YouTubeUploader()
        self.interaction_agent = InteractionAgent() if enable_interaction else None

    async def run(self):
        await broadcast_log(f"Starting workflow for niche: {self.niche}")
        
        # Step 1: Analyze trends
        trends = self.trend_analyzer.run(self.niche)
        await broadcast_log(f"Trends analyzed: {json.dumps(trends, indent=2)}")
        
        # Step 2: Select topic
        topic = self.content_strategist.run(trends)
        await broadcast_log(f"Selected topic: {topic}")
        
        # Step 3: Analyze sentiment
        sentiment = self.sentiment_analyzer.run(topic)
        await broadcast_log(f"Sentiment detected: {sentiment}")
        
        # Step 4: Generate script
        script = self.scriptwriter.run(topic, sentiment)
        await broadcast_log(f"Script generated: {script[:100]}...")
        
        # Step 5: Generate images
        thumbnail, background = self.image_generator.run(topic, self.style)
        await broadcast_log(f"Images generated: thumbnail={thumbnail}, background={background}")
        
        # Step 6: Generate voiceover
        audio = self.voiceover.run(script, self.lang)
        await broadcast_log(f"Voiceover generated: {audio}")
        
        # Step 7: Edit video
        video = self.video_editor.run(thumbnail, background, audio, script, sentiment)
        await broadcast_log(f"Video generated: {video}")
        
        # Step 8: Generate interaction elements
        interaction_data = self.interaction_agent.run(topic) if self.enable_interaction else None
        await broadcast_log(f"Interaction data: {interaction_data}")
        
        # Step 9: Prepare metadata
        metadata = self.youtube_uploader.run(topic, script, interaction_data)
        await broadcast_log(f"Metadata prepared: {metadata}")
        
        result = {
            "script": script,
            "thumbnail": thumbnail,
            "background": background,
            "audio": audio,
            "video": video,
            "metadata": metadata,
            "interaction": interaction_data
        }
        await broadcast_log(f"Workflow completed: {json.dumps(result, indent=2)}")
        return result

@app.post("/start_workflow")
async def start_workflow(input: WorkflowInput):
    task = run_workflow.delay(input.niche, input.style, input.lang, input.enable_interaction)
    return {"task_id": task.id}

@app.get("/task_status/{task_id}")
async def get_task_status(task_id: str):
    task = celery.AsyncResult(task_id)
    if task.state == 'PENDING':
        return {"status": "pending"}
    elif task.state == 'SUCCESS':
        return {"status": "success", "result": task.result}
    else:
        return {"status": task.state}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)