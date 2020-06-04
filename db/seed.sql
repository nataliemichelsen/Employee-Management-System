-- // insert INTO
-- // values for tables





















-- // similar to 
DROP DATABASE IF EXISTS ice_creamDB;

CREATE DATABASE ice_creamDB;

USE ice_creamDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  flavor VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (flavor, price, quantity)
VALUES ("vanilla", 2.50, 100);

INSERT INTO products (flavor, price, quantity)
VALUES ("chocolate", 3.10, 120);

INSERT INTO products (flavor, price, quantity)
VALUES ("strawberry", 3.25, 75);

-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);



/* Seeds for SQL table. We haven't discussed this type of file yet */
USE boston;

/* Insert 3 Rows into your new table */
INSERT INTO colleges (name)
VALUES ("UMass");

INSERT INTO colleges (name)
VALUES ("Boston College");

INSERT INTO colleges (name)
VALUES ("Harvard");

/* OR */
INSERT INTO colleges (name)
VALUES ("Emerson"), ("Northeastern"), ("MIT");