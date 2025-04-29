import logging
from openai import OpenAI
import os
from utils.error_handler import handle_exceptions

logger = logging.getLogger(__name__)

class InteractionAgent:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

    @handle_exceptions
    async def run(self, topic):
        logger.info(f"Generating interaction elements for topic: {topic}")
        prompt = f"Generate a YouTube poll and CTA for a video about '{topic}'."
        response = self.client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=150
        )
        interaction_data = {
            "poll": response.choices[0].message.content.split("Poll: ")[1].split("\n")[0],
            "options": response.choices[0].message.content.split("Options: ")[1].split("\n")[0].split(", "),
            "cta": response.choices[0].message.content.split("CTA: ")[1].strip()
        }
        logger.info(f"Interaction elements generated: {interaction_data}")
        return interaction_data