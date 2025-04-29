import logging
import os
import uuid
from openai import OpenAI
from diffusers import StableDiffusionPipeline
from transformers import pipeline
from utils.error_handler import handle_exceptions

logger = logging.getLogger(__name__)

class ImageGenerator:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        self.pipe = StableDiffusionPipeline.from_pretrained("stabilityai/stable-diffusion-xl-base-1.0")
        self.style_classifier = pipeline("text-classification", model="distilbert-base-uncased")

    @handle_exceptions
    async def run(self, topic, style):
        logger.info(f"Generating images for topic: {topic}, style: {style}")
        
        # Autonomously select style if 'auto'
        if style == "auto":
            style = self._recommend_style(topic)
        
        prompt = f"A {style} style image related to {topic}"
        
        # Generate thumbnail with DALL-E 3
        dalle_response = self.client.images.generate(prompt=prompt, n=1, size="1024x1024")
        thumbnail_path = f"assets/thumbnails/thumbnail_{uuid.uuid4()}.png"
        # Placeholder: Simulate saving DALL-E image
        with open(thumbnail_path, 'w') as f:
            f.write("Placeholder DALL-E image")
        
        # Generate background with Stable Diffusion XL
        background = self.pipe(prompt).images[0]
        background_path = f"assets/backgrounds/background_{uuid.uuid4()}.png"
        background.save(background_path)
        
        logger.info(f"Generated thumbnail: {thumbnail_path}, background: {background_path}")
        return thumbnail_path, background_path

    def _recommend_style(self, topic):
        # Simple style recommendation based on topic keywords
        styles = ["cyberpunk", "retro", "minimalist", "futuristic"]
        scores = self.style_classifier([f"{topic} {style}" for style in styles])
        best_style = styles[max(range(len(scores)), key=lambda i: scores[i]['score'])]
        logger.info(f"Recommended style for {topic}: {best_style}")
        return best_style