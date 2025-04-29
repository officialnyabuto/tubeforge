import logging
import uuid
from gtts import gTTS
from utils.error_handler import handle_exceptions

logger = logging.getLogger(__name__)

class Voiceover:
    @handle_exceptions
    async def run(self, script, lang):
        logger.info(f"Generating voiceover for script in language: {lang}")
        tts = gTTS(text=script, lang=lang)
        audio_path = f"assets/audio/voiceover_{uuid.uuid4()}.mp3"
        tts.save(audio_path)
        logger.info(f"Voiceover saved: {audio_path}")
        return audio_path