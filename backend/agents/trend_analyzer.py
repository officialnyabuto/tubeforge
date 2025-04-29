import logging
import os
from pytrends.request import TrendReq
from googleapiclient.discovery import build
from utils.db_manager import get_trend_sources
from utils.api_wrappers import fetch_x_posts
from utils.error_handler import handle_exceptions

logger = logging.getLogger(__name__)

class TrendAnalyzer:
    def __init__(self):
        self.pytrends = TrendReq(hl='en-US', tz=360)
        self.youtube = build('youtube', 'v3', developerKey=os.getenv('YOUTUBE_API_KEY'))

    @handle_exceptions
    async def run(self, niche):
        logger.info(f"Analyzing trends for niche: {niche}")
        trends = {"niche": niche, "google": [], "youtube": [], "x": [], "other": []}
        
        # Fetch dynamic trend sources from database
        sources = get_trend_sources()
        
        for source in sources:
            if source["name"] == "Google Trends":
                self.pytrends.build_payload([niche], timeframe='now 7-d')
                google_trends = self.pytrends.interest_over_time()
                trends["google"] = google_trends[niche].tolist() if niche in google_trends else []
            elif source["name"] == "YouTube Trends":
                request = self.youtube.videos().list(part="snippet", chart="mostPopular", regionCode="US", maxResults=5)
                response = request.execute()
                trends["youtube"] = [item['snippet']['title'] for item in response['items']]
            elif source["name"] == "X Trends":
                trends["x"] = fetch_x_posts(niche, source["api_key"])
            else:
                # Handle other sources (e.g., Reddit, TikTok) - simulated
                trends["other"].append(f"{source['name']} trend for {niche}")
        
        logger.info(f"Trends collected: {trends}")
        return trends