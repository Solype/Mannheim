CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE temporarymonster (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sessionid INTEGER NOT NULL,
    curphyhealth INTEGER NOT NULL,
    curpathhealth INTEGER NOT NULL,
    curmenthealth INTEGER NOT NULL,
    curendurence INTEGER NOT NULL,
    maxphyhealth INTEGER NOT NULL,
    maxmenthealth INTEGER NOT NULL,
    maxpathhealth INTEGER NOT NULL,
    maxendurence INTEGER NOT NULL,
    FOREIGN KEY (sessionid) REFERENCES sessions(id)
);

CREATE TABLE characters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user INTEGER NOT NULL,
    path INTEGER NOT NULL,
    FOREIGN KEY (user) REFERENCES users(id)
);

CREATE TABLE sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    gamemaster INTEGER NOT NULL,
    FOREIGN KEY (gamemaster) REFERENCES users(id)
);

CREATE TABLE players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    characterid INTEGER NOT NULL,
    sessionid INTEGER NOT NULL,
    FOREIGN KEY (characterid) REFERENCES characters(id),
    FOREIGN KEY (sessionid) REFERENCES sessions(id)
);
