CREATE DATABASE Node_Db;

CREATE TABLE `customer`(
    id int PRIMARY KEY,
    first_name varchar(100),
    last_name varchar(100),
    email varchar(100),
    phone varchar(12) 
);

CREATE TABLE `Product`(
    id int PRIMARY KEY,
    product_name varchar(100),
    category varchar(100),
    unit_price DECIMAL(10, 2)
);

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES (3, 'yara', 'yara@yahoo.com', '123456');
SELECT users.id, users.name, posts.id as posts_id, posts.tittle FROM users JOIN posts oN users.id = posts.user_id;
SELECT users.id, users.name, posts.id as posts_id, posts.tittle FROM users JOIN posts ON users.id = posts.user_id WHERE users.id=2;

