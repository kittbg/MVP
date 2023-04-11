DROP TABLE IF EXISTS cars;

CREATE TABLE cars (
    id serial PRIMARY KEY,
    make varchar(30),
    model varchar(30),
    year integer,
    color varchar(30),
    price integer,
    image text
);


