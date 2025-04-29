import logging
import uuid
from moviepy.editor import VideoFileClip, AudioFileClip, ImageClip, concatenate_videoclips
from utils.error_handler import handle_exceptions

logger = logging.getLogger(__name__)

class VideoEditor:
    @handle_exceptions
    async def run(self, thumbnail_path, background_path, audio_path, script, sentiment):
        logger.info("Editing video with dynamic pacing")
        
        # Dynamic pacing based on sentiment
        clip_duration = 8 if sentiment == "positive" else 10
        
        # Load background image and set duration
        background = ImageClip(background_path).set_duration(clip_duration)
        
        # Load audio
        audio = AudioFileClip(audio_path)
        
        # Set video audio
        video = background.set_audio(audio)
        
        # Add thumbnail as intro
        thumbnail_clip = ImageClip(thumbnail_path).set_duration(3)
        
        # Concatenate clips
        final_video = concatenate_videoclips([thumbnail_clip, video], method="compose")
        
        # Save video
        video_path = f"assets/videos/video_{uuid.uuid4()}.mp4"
        final_video.write_videofile(video_path, codec="libx264", audio_codec="aac")
        
        logger.info(f"Video saved: {video_path}")
        return video_path