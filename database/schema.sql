CREATE TABLE users(
    id serial PRIMARY KEY,
    username VARCHAR(15),
    userRole VARCHAR(10)
);

CREATE TABLE shifts(
    employeeId int, 
    FOREIGN KEY (employeeId) REFERENCES users(id),
    
);