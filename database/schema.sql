CREATE TABLE days(
    weekdays VARCHAR(15) PRIMARY KEY,

);

CREATE TABLE employee(
    employee VARCHAR(15), 
    therole VARCHAR(15),
);
CREATE TABLE employee(
    shift VARCHAR(15), 
    FOREIGN KEY (employee) REFERENCES users(username),
    MONDAY boolean,
    TUESDAY boolean,
    WEDNESDAY boolean,
    THURSDAY boolean,
    FRIDAY boolean,
    SATURDAY boolean
);


-- CREATE TABLE waiters (
--  id serial PRIMARY KEY,
--  username VARCHAR NOT NULL
-- );

-- CREATE TABLE weekdays (
--     id serial PRIMARY KEY,
--     weekday VARCHAR NOT NULL
-- );

CREATE TABLE schedule (
    id serial PRIMARY KEY,
    waiter_id INTEGER,
    weekday_id INTEGER, 
    FOREIGN KEY(waiter_id) REFERENCES waiters(id),
   FOREIGN KEY(weekday_id) REFERENCES weekdays(id)
)