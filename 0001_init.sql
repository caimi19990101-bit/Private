CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS content (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  category TEXT DEFAULT '',
  poster_url TEXT DEFAULT '',
  video_url TEXT DEFAULT '',
  language TEXT DEFAULT 'en',
  sort_order INTEGER DEFAULT 0,
  published INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_type TEXT NOT NULL,
  content_id TEXT DEFAULT '',
  country TEXT DEFAULT '',
  user_agent TEXT DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO settings(key,value) VALUES
('site','{"brand":"ikantv","headline":"Small stories. Big drama.","subheadline":"Discover your next obsession. Watch every episode free in the app.","downloadUrl":"#","previewSeconds":59,"languages":["en","hi","ar"]}');

INSERT OR IGNORE INTO content(id,type,title,description,category,poster_url,video_url,language,sort_order,published) VALUES
('demo-drama-1','drama','A Story to Remember','A dramatic story full of unexpected turns.','Romance / Family','/assets/poster-romance.svg','','en',1,1),
('demo-drama-2','drama','The Hidden Promise','A secret changes everything.','Mystery / Romance','/assets/poster-mystery.svg','','en',2,1),
('demo-anime-1','anime','Beyond the Stars','An animated adventure begins.','Adventure / Fantasy','/assets/poster-anime.svg','','en',1,1);
