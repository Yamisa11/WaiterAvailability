CREATE TABLE users(
    username VARCHAR(15) PRIMARY KEY,
    userRole VARCHAR(10)
);

CREATE TABLE shifts(
    employee VARCHAR(15), 
    FOREIGN KEY (employee) REFERENCES users(username),
    MONDAY boolean,
    TUESDAY boolean,
    WEDNESDAY boolean,
    THURSDAY boolean,
    FRIDAY boolean,
    SATURDAY boolean
);