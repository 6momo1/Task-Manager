CREATE DATABASE tasks;

CREATE TABLE tasks(
  id SERIAL PRIMARY KEY,
  day VARCHAR(255),
  reminder bit,
  text VARCHAR(225)  
);