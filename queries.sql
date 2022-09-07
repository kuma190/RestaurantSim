CREATE TABLE IF NOT EXISTS main.Customer (
username varchar(100) PRIMARY KEY,
first_name VARCHAR(100) NOT NULL,
last_name VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL,
birthdate int not null,
birthmonth int not null,
birthyear int not null,
address varchar(100) not null,
city varchar(100),
state varchar (100),
zip int,
password varchar(100)

#city_id INT FOREIGN KEY REFERENCES city(id)
);

CREATE TABLE IF NOT EXISTS main.Worker(
username varchar(100) PRIMARY KEY,
first_name VARCHAR(100) NOT NULL,
last_name VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL,
birthdate int not null,
birthmonth int not null,
birthyear int not null,
address varchar(100) not null,
city varchar(100),
state varchar (100),
zip int,
password varchar(100),
restaurant_id int unsigned,
position varchar(100),
FOREIGN KEY (restaurant_id) REFERENCES main.restaurant_location(id)
);

CREATE TABLE IF NOT EXISTS main.Order(
order_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
customer_id varchar(100),
ts timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
restaurant_id int unsigned,
currentStatus varchar(100),
FOREIGN KEY (restaurant_id) REFERENCES main.restaurant_location(id),
FOREIGN KEY (customer_id) REFERENCES main.Customer(username)


);

CREATE TABLE IF NOT EXISTS main.Item(
item_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
FoodType varchar(100),
calories int,
price decimal,
cuisine varchar(100)
);

CREATE TABLE IF NOT EXISTS main.Order_Item(
order_id int unsigned,
item_id int unsigned,
FOREIGN KEY (order_id) REFERENCES main.Order(order_id),
FOREIGN KEY (item_id) REFERENCES main.Item(item_id)


);