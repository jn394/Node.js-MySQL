DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT(10) NOT NULL AUTO_INCREMENT,
product_name VARCHAR(20),
department_name VARCHAR(20),
price DECIMAL(10,2),
stock_quantity INT(10),
product_sales DECIMAL(10,2),
PRIMARY KEY (item_id)
);

CREATE TABLE departments (
department_id INT(10) NOT NULL AUTO_INCREMENT,
department_name VARCHAR(20),
over_head_costs INT(10),
profits DECIMAL(10,2),
PRIMARY KEY (department_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Toothbrush","Toiletries",2.99,20,0);

INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Bicycle","Sports & Outdoors",199.99,5,0);

INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Television","Electronics",650,10,0);

INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Chair","Furniture",50,5,0);

INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Coffee Table","Furniture",65,13,0);

INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Sneakers","Sports & Outdoors",54.49,25,0);

INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Yogurt","Food",0.99,23,0);

INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Razor","Toiletries",9.89,19,0);

INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Book","Literature",20.99,3,0);

INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Laptop","Electronics",899.89,12,0);

SELECT * FROM products;

INSERT INTO departments(department_name, over_head_costs, profits)
VALUES ("Toiletries", 300, 0);

INSERT INTO departments(department_name, over_head_costs, profits)
VALUES ("Sports & Outdoors", 450, 0);

INSERT INTO departments(department_name, over_head_costs, profits)
VALUES ("Electronics", 1200, 0);

INSERT INTO departments(department_name, over_head_costs, profits)
VALUES ("Furniture", 200, 0);

INSERT INTO departments(department_name, over_head_costs, profits)
VALUES ("Food", 50, 0);

INSERT INTO departments(department_name, over_head_costs, profits)
VALUES ("Literature", 100, 0);

SELECT * FROM departments;

SELECT departments.department_id, departments.department_name, SUM(departments.over_head_costs) AS over_head_costs, products.product_sales, departments.profits AS total_profit
FROM departments
INNER JOIN products ON departments.department_name = products.department_name
GROUP BY department_name;