CREATE TABLE [IF NOT EXISTS] player_performance (
  player_id SERIAL PRIMARY KEY,
  power INT NOT NULL DEFAULT 0,
  speed INT NOT NULL DEFAULT 0,
  passes INT NOT NULL DEFAULT 0
);

CREATE TABLE [IF NOT EXISTS] training (
  id SERIAL PRIMARY KEY,
  training INT NOT NULL,
  week varchar(8) NOT NULL,
  player_id INT REFERENCES player_performance(player_id) ON DELETE CASCADE
);