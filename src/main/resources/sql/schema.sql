DROP DATABASE `SMODS`;
CREATE DATABASE IF NOT EXISTS `smods`;
USE `smods`;
	
-- Drop tables if they exist (in reverse order of dependencies)
DROP TABLE IF EXISTS `MUTUALLY_EXCLUSIVE`;
DROP TABLE IF EXISTS `CO_REQUISITE`;
DROP TABLE IF EXISTS `PRE_REQUISITE`;
DROP TABLE IF EXISTS `GRAD_REQUIREMENTS`;
DROP TABLE IF EXISTS `PLAN_MODULE_PREASSIGNED_GPA`;
DROP TABLE IF EXISTS `PLAN_MODULE_GPA`;
DROP TABLE IF EXISTS `USERS`;
DROP TABLE IF EXISTS `PLAN`;
DROP TABLE IF EXISTS `MODULE`;

-- Create PLAN table
CREATE TABLE `PLAN` (
    `PID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `PName` VARCHAR(100) DEFAULT NULL,
    `Degree` VARCHAR(100) DEFAULT NULL,
    `Track` VARCHAR(100) DEFAULT NULL
);

-- Create USERS table
CREATE TABLE `USERS` (
    `ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Username` VARCHAR(255) NOT NULL,
    `Password` VARCHAR(100) NOT NULL,
    `Email` VARCHAR(255) NOT NULL,
    `Role` VARCHAR(50) NOT NULL,
    `EmailVerified` BOOLEAN NOT NULL,
    `VerificationCode` VARCHAR(255) NOT NULL,
    `PID` INT,
    FOREIGN KEY (`PID`) REFERENCES `PLAN` (`PID`)
);

-- Create MODULE table
CREATE TABLE `MODULE` (
    `CID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `CName` VARCHAR(100) DEFAULT NULL,
    `CU` INT DEFAULT NULL
);

-- Create PLAN_MODULE_GPA table
CREATE TABLE `PLAN_MODULE_GPA` (
    `PID` INT NOT NULL,
    `CID` INT NOT NULL,
    `GPA` FLOAT,
    PRIMARY KEY (`PID`, `CID`),
    FOREIGN KEY (`PID`) REFERENCES `PLAN` (`PID`),
    FOREIGN KEY (`CID`) REFERENCES `MODULE` (`CID`)
);

-- Create PLAN_MODULE_PREASSIGNED_GPA table
CREATE TABLE `PLAN_MODULE_PREASSIGNED_GPA` (
    `PID` INT NOT NULL,
    `CID` INT NOT NULL,
    `GPA` FLOAT,
    `Term` VARCHAR(100),
    PRIMARY KEY (`PID`, `CID`),
    FOREIGN KEY (`PID`) REFERENCES `PLAN` (`PID`),
    FOREIGN KEY (`CID`) REFERENCES `MODULE` (`CID`)
);

-- Create GRAD_REQUIREMENTS table
CREATE TABLE `GRAD_REQUIREMENTS` (
    `CID` INT NOT NULL,
    `Requirements` VARCHAR(100),
    PRIMARY KEY (`CID`),
    FOREIGN KEY (`CID`) REFERENCES `MODULE` (`CID`)
);

-- Create PRE_REQUISITE table
CREATE TABLE `PRE_REQUISITE` (
    `CID` INT NOT NULL,
    `CID2` INT NOT NULL,
    PRIMARY KEY (`CID`, `CID2`),
    FOREIGN KEY (`CID`) REFERENCES `MODULE` (`CID`),
    FOREIGN KEY (`CID2`) REFERENCES `MODULE` (`CID`)
);

-- Create CO_REQUISITE table
CREATE TABLE `CO_REQUISITE` (
    `CID` INT NOT NULL,
    `CID2` INT NOT NULL,
    PRIMARY KEY (`CID`, `CID2`),
    FOREIGN KEY (`CID`) REFERENCES `MODULE` (`CID`),
    FOREIGN KEY (`CID2`) REFERENCES `MODULE` (`CID`)
);

-- Create MUTUALLY_EXCLUSIVE table
CREATE TABLE `MUTUALLY_EXCLUSIVE` (
    `CID` INT NOT NULL,
    `CID2` INT NOT NULL,
    PRIMARY KEY (`CID`, `CID2`),
    FOREIGN KEY (`CID`) REFERENCES `MODULE` (`CID`),
    FOREIGN KEY (`CID2`) REFERENCES `MODULE` (`CID`)
);
DROP TABLE IF EXISTS `PLAN`;
DROP TABLE IF EXISTS `MUTUALLY_EXCLUSIVE`;
DROP TABLE IF EXISTS `CO_REQUISITE`;
DROP TABLE IF EXISTS `PRE_REQUISITE`;
DROP TABLE IF EXISTS `GRAD_REQUIREMENT`;
DROP TABLE IF EXISTS `PLAN_MODULE_PREASSIGNED_GPA`;
DROP TABLE IF EXISTS `PLAN_MODULE_GPA`;
DROP TABLE IF EXISTS `USERS`;
DROP TABLE IF EXISTS `MODULE`;

CREATE TABLE co_requisite (
    module_id VARCHAR(255) NOT NULL,
    module_id2 VARCHAR(255) NOT NULL,
    PRIMARY KEY (module_id, module_id2)
) ENGINE=InnoDB;

CREATE TABLE grad_requirement (
    module_id VARCHAR(255) NOT NULL,
    requirement VARCHAR(255)
) ENGINE=InnoDB;

CREATE TABLE module (
    module_id VARCHAR(255) NOT NULL,
    course_unit FLOAT,
    module_name VARCHAR(255),
    PRIMARY KEY (module_id)
) ENGINE=InnoDB;

CREATE TABLE mutually_exclusive (
    module_id VARCHAR(255) NOT NULL,
    module_id2 VARCHAR(255) NOT NULL,
    PRIMARY KEY (module_id, module_id2)
) ENGINE=InnoDB;

CREATE TABLE plan (
    plan_id BIGINT NOT NULL,
    degree VARCHAR(255),
    plan_name VARCHAR(255),
    track VARCHAR(255),
    user_id BIGINT NOT NULL,
    PRIMARY KEY (plan_id, user_id)
) ENGINE=InnoDB;

CREATE TABLE plan_module_gpa (
    gpa FLOAT,
    term INTEGER,
    plan_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    module_id VARCHAR(255) NOT NULL,
    PRIMARY KEY (module_id, plan_id, user_id)
) ENGINE=InnoDB;

CREATE TABLE plan_module_preassigned_gpa (
    gpa FLOAT,
    term INTEGER,
    plan_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    module_id VARCHAR(255) NOT NULL,
    PRIMARY KEY (module_id, plan_id, user_id)
) ENGINE=InnoDB;

CREATE TABLE pre_requisite (
    module_id VARCHAR(255) NOT NULL,
    module_id2 VARCHAR(255) NOT NULL,
    PRIMARY KEY (module_id, module_id2)
) ENGINE=InnoDB;

CREATE TABLE users (
    user_id BIGINT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    email_verified BIT NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    username VARCHAR(16) NOT NULL,
    verification_token varchar(255),
    token_expiry_date datetime(6),
    PRIMARY KEY (user_id)
) ENGINE=InnoDB;

# Testing purposes only
delete from users;
select * from users;

UPDATE USERS
SET role = 'ADMIN'
WHERE user_id = 2;

INSERT INTO users (user_id, email, email_verified, password, role, username, verification_token, verification_token_expiry_date)
VALUES (1, 'user@example.com', 1, '$2a$10$examplehashedpassword', 'USER', 'user1234', 'exampletoken', '2024-12-31 23:59:59');

INSERT INTO MODULE (module_id, module_name, course_unit)
VALUES ('CS101', 'Computer Science', 1.0);

INSERT INTO MODULE (module_id, module_name, course_unit)
VALUES ('CS102', 'Computer Science', 1.0);

insert into PRE_REQUISITE (module_id, module_id2)
VALUES ('CS102', 'CS101');

INSERT INTO MODULE (module_id, module_name, course_unit)
VALUES ('CS69', 'Computer Science', 1.0);

INSERT INTO MODULE (module_id, module_name, course_unit)
VALUES ('CS6969', 'Computer Science', 1.0);

insert into PRE_REQUISITE (module_id, module_id2)
VALUES ('CS69', 'CS6969');

INSERT INTO MODULE (module_id, module_name, course_unit)
VALUES ('CS1234', 'Computer Science', 1.0);

INSERT INTO MODULE (module_id, module_name, course_unit)
VALUES ('CS5678', 'Computer Science', 1.0);

insert into CO_REQUISITE (module_id, module_id2)
VALUES ('CS1234', 'CS5678');


INSERT INTO MODULE (module_id, module_name, course_unit)
VALUES ('IS111', 'Python', 1.0);

insert into MUTUALLY_EXCLUSIVE (module_id, module_id2)
VALUES ('IS111', 'CS101');

INSERT INTO MODULE (module_id, module_name, course_unit)
VALUES ('CS0', 'testing prereq', 1.0);

INSERT INTO MODULE (module_id, module_name, course_unit)
VALUES ('CS1', 'testing prereq', 1.0);

insert into pre_requisite (module_id, module_id2)
VALUES ('CS102', 'CS1');

SELECT * FROM `plan_module_gpa`;

SELECT * FROM `pre_requisite`;

DELETE FROM `plan_module_gpa`;

select * from `plan`;
delete from `plan`;

