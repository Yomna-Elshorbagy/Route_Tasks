CREATE DATABASE node_db;

CREATE TABLE `customer`(
    id int PRIMARY KEY,
    first_name varchar(100),
    last_name varchar(100),
    email varchar(100),
    phone varchar(12) 
);

CREATE TABLE `product`(
    id int PRIMARY KEY,
    product_name varchar(100),
    category varchar(100),
    unit_price DECIMAL(10, 2)
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    order_date DATETIME NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customer(id)
);


 CREATE TABLE orderitem (
     id INT AUTO_INCREMENT PRIMARY KEY,
     order_id INT,
     product_id INT,
     quantity INT,
     unit_price DECIMAL(10, 2),
     FOREIGN KEY (order_id) REFERENCES `order`(id),
     FOREIGN KEY (product_id) REFERENCES `product`(id)
 );

 SELECT p.category, SUM(oi.quantity * oi.unit_price) AS total_revenue
        FROM orderitem oi
        JOIN product p ON oi.product_id = p.id
        GROUP BY p.category;