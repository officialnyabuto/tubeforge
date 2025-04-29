import logging
import uuid
import json
from utils.error_handler import handle_exceptions

logger = logging.getLogger(__name__)

class YouTubeUploader:
    @handle_exceptions
    async def run(self, topic, script, interaction_data=None):
        logger.info(f"Preparing YouTube metadata for topic: {topic}")
        metadata = {
            "title": f"Exploring {topic}",
            "description": script[:200] + "...",
            "tags": [topic, "YouTube", "trending"],
            "interaction": interaction_data or {}
        }
        metadata_path = f"assets/metadata/metadata_{uuid.uuid4()}.json"
        with open(metadata_path, 'w') as f:
            json.dump(metadata, f)
        logger.info(f"Metadata saved: {metadata_path}")
        return metadata_path