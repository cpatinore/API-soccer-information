CREATE TABLE player_performance (
  id int4 NOT NULL DEFAULT nextval('player_performance_player_id_seq' :: regclass),
  power int4 NOT NULL DEFAULT 0,
  speed int4 NOT NULL DEFAULT 0,
  passes int4 NOT NULL DEFAULT 0,
  CONSTRAINT player_performance_pkey PRIMARY KEY (id),
  CONSTRAINT unique_power_speed_passes UNIQUE (power, speed, passes)
);

CREATE TABLE training (
  id serial4 NOT NULL,
  week varchar(8) NOT NULL,
  performance int4 NOT NULL,
  player varchar NULL,
  training int4 NOT NULL,
  CONSTRAINT training_pkey PRIMARY KEY (id),
  CONSTRAINT training_player_id_fkey FOREIGN KEY (performance) REFERENCES player_performance(id) ON DELETE CASCADE
);