DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INTEGER(10) NOT NULL AUTO_INCREMENT,
product_name VARCHAR(20),
department_name VARCHAR(20),
price INTEGER(10),
stock_quantity INTEGER(10),
PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Toothbrush","Toiletries",3,20);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Bicycle","Sports & Outdoors",200,50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Television","Electronics",1000,10);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Chair","Furniture",50,5);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Coffee Table","Furniture",65,13);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Sneakers","Sports & Outdoors",60,25);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Yogurt","Food",1,23);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Razor","Toiletries",10,19);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Book","Literature",20,65);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Laptop","Electronics",800,22);

SELECT * FROM products;

select * from products where item_id = 2;

select * from products where stock_quantity < 5;