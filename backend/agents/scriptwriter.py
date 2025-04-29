import logging
import os
from openai import OpenAI
from utils.error_handler import handle_exceptions

logger = logging.getLogger(__name__)

class Scriptwriter:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

    @handle_exceptions
    async def run(self, topic, sentiment):
        logger.info(f"Generating script for topic: {topic}, sentiment: {sentiment}")
        tone = "upbeat and engaging" if sentiment == "positive" else "informative and balanced"
        prompt = f"Write a 100-200 word YouTube script about '{topic}' with a {tone} tone."
        response = self.client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=|            temperature=0.7
        )
        script = response.choices[0].message.content.strip()
        logger.info("Script generated successfully")
        return script