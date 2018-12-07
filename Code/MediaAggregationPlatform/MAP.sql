CREATE DATABASE MAP;

CREATE TABLE MAP.users
(
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL, 
    webapp VARCHAR(100) NOT NULL,
    webkey INT NOT NULL,
PRIMARY KEY (id) 
);