CREATE TABLE waiters(
 id serial PRIMARY KEY,
 username VARCHAR (15)
);

CREATE TABLE days(
    id serial PRIMARY KEY,
    weekday VARCHAR (15)
);

CREATE TABLE shifts(
    waiterid INTEGER,
    weekdayid INTEGER, 
    FOREIGN KEY(waiterid) REFERENCES waiters(id),
    FOREIGN KEY(weekdayid) REFERENCES days(id)
);


