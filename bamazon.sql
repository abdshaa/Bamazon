DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;
USE bamazon;

CREATE TABLE products
(
    item_id INT(4) NOT NULL	,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(20) NOT NULL,
    PRIMARY KEY (item_id)
)

Select *
From products;

INSERT INTO products
    (item_id, product_name, department_name, price, stock_quantity)
VALUES
    (1, "xbox", "video games", 70, 90, 20),
    (420, "shorts", "soccer", 19, 99, 10)