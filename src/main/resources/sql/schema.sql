CREATE DATABASE IF NOT EXISTS smods;
USE `smods`;

CREATE TABLE IF NOT EXISTS `users` (
    `id` BIGINT NOT NULL AUTO_INCREMENT UNIQUE,
    `username` VARCHAR(16) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(45) NOT NULL UNIQUE,
    `role` VARCHAR(45) NOT NULL,
    `email_verified` BOOLEAN NOT NULL DEFAULT FALSE,
    `verification_code` VARCHAR(255),
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
SELECT * FROM `users`;
-- Delete FROM `users`;

-- reset id to 1
-- ALTER TABLE `users` AUTO_INCREMENT = 1;
