CREATE TABLE `food_users` (
    `id` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(30) UNIQUE NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `email` VARCHAR(30) NOT NULL,
    `isAdmin` BOOLEAN DEFAULT FALSE,
    `isDeliveryBoy` BOOLEAN DEFAULT FALSE,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `food_categories` (
    `id` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(30) UNIQUE NOT NULL,
    `imgUrl` VARCHAR(100) NOT NULL,
    `imgId` VARCHAR(100) NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `food_sliders` (
    `id` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    `imgUrl` VARCHAR(100) NOT NULL,
    `imgId` VARCHAR(100) NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `food_settings` (
    `id` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    `deliveryFee` INT UNIQUE NOT NULL,
    `gstPercentage` INT NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `food_foods` (
    `id` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(30) UNIQUE NOT NULL,
    `price` INT NOT NULL,
    `imgUrl` VARCHAR(100) NOT NULL,
    `imgId` VARCHAR(100) NOT NULL,
    `isFeatured` BOOLEAN DEFAULT 1,
    `isVegan` BOOLEAN NOT NULL,
    `categoryId` BIGINT(20),
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`categoryId`) REFERENCES `food_categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `food_order_statuses` (
    `id` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL
);

CREATE TABLE `food_orders` (
    `id` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    `placedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `userId` BIGINT(20),
    `orderStatusId` BIGINT(20),
    `deliveryAgentId` BIGINT(20),
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`userId`) REFERENCES `food_users`(`id`),
    FOREIGN KEY (`orderStatusId`) REFERENCES `food_order_statuses`(`id`),
    FOREIGN KEY (`deliveryAgentId`) REFERENCES `food_users`(`id`)
);

CREATE TABLE `food_ordered_foods` (
    `id` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `qty` INT NOT NULL,
    `price` INT NOT NULL,
    `orderId` BIGINT(20),
    FOREIGN KEY (`orderId`) REFERENCES `food_orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `food_payment_details` (
    `id` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    `totalPrice` INT NOT NULL,
    `deliveryFee` INT NOT NULL,
    `gstPercentage` INT NOT NULL,
    `orderId` BIGINT(20),
    FOREIGN KEY (`orderId`) REFERENCES `food_orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `food_delivery_address` (
    `id` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `mobile` BIGINT(10) NOT NULL,
    `street` VARCHAR(50) NOT NULL,
    `landmark` VARCHAR(50) NOT NULL,
    `instruction` VARCHAR(50) NOT NULL,
    `orderId` BIGINT(20),
    FOREIGN KEY (`orderId`) REFERENCES `food_orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO food_settings (deliveryFee, gstPercentage) VALUES (60, 7);
INSERT INTO food_users (name, email, password, isAdmin) VALUES ('Admin', 'admin@admin.com', '$2b$10$BwVU5IHuzY1Fy4YSBhsU6us/2NB/QT06iC45ZHjv9SOy4ZhiFt6We', 1);
INSERT INTO food_order_statuses (name) VALUES ('Placed'), ('Rejected'), ('Accepted'), ('Prepared'), ('Ready'), ('Delivered');
