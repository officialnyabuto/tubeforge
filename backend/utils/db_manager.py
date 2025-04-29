import sqlite3
import logging

logger = logging.getLogger(__name__)

def init_db():
    conn = sqlite3.connect('tubeforge.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS trend_sources (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            url TEXT NOT NULL,
            api_key TEXT
        )
    ''')
    conn.commit()
    conn.close()
    logger.info("Database initialized")

def add_trend_source(name, url, api_key=None):
    conn = sqlite3.connect('tubeforge.db')
    cursor = conn.cursor()
    cursor.execute('INSERT OR REPLACE INTO trend_sources (name, url, api_key) VALUES (?, ?, ?)', (name, url, api_key))
    conn.commit()
    conn.close()
    logger.info(f"Added trend source: {name}")

def get_trend_sources():
    conn = sqlite3.connect('tubeforge.db')
    cursor = conn.cursor()
    cursor.execute('SELECT name, url, api_key FROM trend_sources')
    sources = [{"name": row[0], "url": row[1], "api_key": row[2]} for row in cursor.fetchall()]
    conn.close()
    return sources