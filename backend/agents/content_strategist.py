import logging
from utils.error_handler import handle_exceptions

logger = logging.getLogger(__name__)

class ContentStrategist:
    @handle_exceptions
    async def run(self, trends):
        logger.info("Selecting content topic from trends")
        # Weight YouTube trends higher for relevance
        if trends.get("youtube"):
            topic = trends["youtube"][0]
        elif trends.get("x"):
            topic = trends["x"][0]
        else:
            topic = trends["niche"]
        logger.info(f"Selected topic: {topic}")
        return topic