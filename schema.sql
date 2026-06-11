CREATE TABLE IF NOT EXISTS meetings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  meeting_time TEXT NOT NULL,
  meeting_end_time TEXT,
  location TEXT NOT NULL,
  meeting_type TEXT DEFAULT '本地会',
  department TEXT,
  leader TEXT,
  status TEXT DEFAULT '市级',
  notes TEXT,
  owner_username TEXT DEFAULT 'legacy',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
