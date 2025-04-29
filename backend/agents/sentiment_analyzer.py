import logging
from transformers import pipeline
from utils.api_wrappers import fetch_x_posts
from utils.error_handler import handle_exceptions

logger = logging.getLogger(__name__)

class SentimentAnalyzer:
    def __init__(self):
        self.sentiment_pipeline = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")

    @handle_exceptions
    async def run(self, topic):
        logger.info(f"Analyzing sentiment for topic: {topic}")
        posts = fetch_x_posts(topic)  # Fetch from X
        # Add Reddit posts (simulated)
        posts += [f"Great discussion on {topic}!", f"{topic} needs improvement"]
        
        if not posts:
            logger.warning("No posts found for sentiment analysis")
            return "neutral"
        
        sentiments = self.sentiment_pipeline(posts)
        avg_score = sum([s['score'] if s['label'] == 'POSITIVE' else -s['score'] for s in sentiments]) / len(sentiments)
        sentiment = "positive" if avg_score > 0 else "neutral" if avg_score == 0 else "negative"
        logger.info(f"Sentiment detected: {sentiment}")
        return sentiment