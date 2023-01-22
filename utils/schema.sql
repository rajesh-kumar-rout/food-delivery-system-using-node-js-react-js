CREATE TABLE `foodUsers` (
    `id` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(30) UNIQUE NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `email` VARCHAR(30) NOT NULL,
    `isAdmin` BOOLEAN DEFAULT FALSE,
    `isDeliveryAgent` BOOLEAN DEFAULT FALSE,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `foodTokens` (
    `id` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    `userId` BIGINT(20),
    `token` VARCHAR(100) NOT NULL,
    FOREIGN KEY (`userId`) REFERENCES `foodUsers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `foodCategories` (
    `id` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(30) UNIQUE NOT NULL,
    `imageUrl` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `foodSliders` (
    `id` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    `imageUrl` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `foodSettings` (
    `id` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    `deliveryFee` INT UNIQUE NOT NULL,
    `gstPercentage` INT NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `foodFoods` (
    `id` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(30) UNIQUE NOT NULL,
    `price` INT NOT NULL,
    `imageUrl` VARCHAR(255) NOT NULL,
    `isFeatured` BOOLEAN DEFAULT 1,
    `isVegan` BOOLEAN NOT NULL,
    `categoryId` BIGINT(20),
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`categoryId`) REFERENCES `foodCategories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `foodCart` (
    `id` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    `foodId` BIGINT(20) NOT NULL,
    `userId` BIGINT(20) NOT NULL,
    `qty` INT NOT NULL,
    FOREIGN KEY (`foodId`) REFERENCES `foodFoods`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`userId`) REFERENCES `foodUsers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE `foodOrders` (
    `id` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    `userId` BIGINT(20),
    `status` VARCHAR(20) NOT NULL,
    `deliveryAgentId` BIGINT(20),
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`userId`) REFERENCES `foodUsers`(`id`) ON DELETE SET NULL ON UPDATE SET NULL,
    FOREIGN KEY (`deliveryAgentId`) REFERENCES `foodUsers`(`id`) ON DELETE SET NULL ON UPDATE SET NULL
);

CREATE TABLE `foodOrderedFoods` (
    `id` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `qty` INT NOT NULL,
    `price` INT NOT NULL,
    `orderId` BIGINT(20),
    FOREIGN KEY (`orderId`) REFERENCES `foodOrders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `foodPaymentDetails` (
    `id` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    `foodPrice` INT NOT NULL,
    `deliveryFee` INT NOT NULL,
    `gstPercentage` INT NOT NULL,
    `orderId` BIGINT(20),
    FOREIGN KEY (`orderId`) REFERENCES `foodOrders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `foodDeliveryAddresses` (
    `id` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `mobile` BIGINT(10) NOT NULL,
    `street` VARCHAR(50) NOT NULL,
    `landmark` VARCHAR(50) NOT NULL,
    `instruction` VARCHAR(50) NOT NULL,
    `orderId` BIGINT(20),
    FOREIGN KEY (`orderId`) REFERENCES `foodOrders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO foodSettings (deliveryFee, gstPercentage) VALUES (60, 7);
INSERT INTO foodUsers (name, email, password, isAdmin) VALUES ('Admin', 'admin@admin.com', '$2b$10$BwVU5IHuzY1Fy4YSBhsU6us/2NB/QT06iC45ZHjv9SOy4ZhiFt6We', 1);
