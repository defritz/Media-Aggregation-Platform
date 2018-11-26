CREATE DATABASE signup;

CREATE TABLE signup.users 
(
    id INT NOT NULL AUTO_INCREMENT,
    fname VARCHAR(30) NOT NULL,
    lname VARCHAR(30) NOT NULL,
    email VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
PRIMARY KEY (id) 
);
