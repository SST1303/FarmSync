CREATE DATABASE farmsync;

USE farmsync;

CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255),
    name VARCHAR(255),
    password VARCHAR(255),
    role VARCHAR(255)
);

CREATE TABLE crop (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    area DOUBLE,
    crop_name VARCHAR(255),
    expected_harvest_date DATE,
    start_date DATE,
    status VARCHAR(255),
    user_id BIGINT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE expense (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    amount DOUBLE,
    description VARCHAR(255),
    expense_date DATE,
    expense_type VARCHAR(255),
    crop_id BIGINT,
    FOREIGN KEY (crop_id) REFERENCES crop(id)
);

-- Crop + Expense details

SELECT
    c.id AS crop_id,
    c.crop_name,
    c.area,
    c.status,
    e.id AS expense_id,
    e.amount,
    e.description,
    e.expense_type,
    e.expense_date
FROM crop c
JOIN expense e
ON c.id = e.crop_id;


--User + Crop JOIN

SELECT
    u.id AS user_id,
    u.name,
    u.email,
    c.id AS crop_id,
    c.crop_name,
    c.area,
    c.status
FROM users u
JOIN crop c
ON u.id = c.user_id;


--Crop-wise Total Expense

SELECT
    c.id AS crop_id,
    c.crop_name,
    SUM(e.amount) AS total_expense
FROM crop c
JOIN expense e
ON c.id = e.crop_id
GROUP BY c.id, c.crop_name;

--User-wise Crops

SELECT
    u.name,
    u.email,
    COUNT(c.id) AS total_crops
FROM users u
LEFT JOIN crop c
ON u.id = c.user_id
GROUP BY u.id, u.name, u.email;


--Total Expense

SELECT SUM(amount) AS total_expense
FROM expense;

--Expense Type-wise Total

SELECT
    expense_type,
    SUM(amount) AS total_amount
FROM expense
GROUP BY expense_type;


--Check Foreign Keys

SHOW CREATE TABLE crop;
SHOW CREATE TABLE expense;