CREATE SCHEMA IF NOT EXISTS `tin-s14940`;

CREATE TABLE IF NOT EXISTS `tin-s14940`.`Tournament` (
    `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `location` VARCHAR(50) NOT NULL,
    `price` INT NOT NULL,
    PRIMARY KEY (`_id`),
    UNIQUE INDEX `tournament_id_UNIQUE` (`_id` ASC)
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tin-s14940`.`Team` (
    `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `game` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`_id`),
    UNIQUE INDEX `team_id_UNIQUE` (`_id` ASC)
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tin-s14940`.`Player` (
    `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(50) NOT NULL,
    `lastName` VARCHAR(50) NOT NULL,
    `dateOfBirth` DATE NOT NULL,
    `game` VARCHAR(50) NOT NULL,
    `team_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`_id`),
    UNIQUE INDEX `player_id_UNIQUE` (`_id` ASC),
    CONSTRAINT `team_fk` FOREIGN KEY (`team_id`) REFERENCES `tin-s14940`.`Team` (`_id`)
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tin-s14940`.`Game` (
    `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `date` DATE NOT NULL,
    `turs` INT NOT NULL,
    `tournament_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`_id`),
    UNIQUE INDEX `game_id_UNIQUE` (`_id` ASC),
    CONSTRAINT `tournament_id` FOREIGN KEY (`tournament_id`) REFERENCES `tin-s14940`.`Tournament` (`_id`)
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;


CREATE TABLE IF NOT EXISTS `tin-s14940`.`User` (
    `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user` VARCHAR(50) NOT NULL,
    `password` VARCHAR(250) NOT NULL,
    PRIMARY KEY (`_id`),
    UNIQUE INDEX `user_id_UNIQUE` (`_id` ASC)
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;


CREATE TABLE IF NOT EXISTS `tin-s14940`.`Participate` (
    `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `tournament_id` INT UNSIGNED NOT NULL,
    `team_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`_id`),
    UNIQUE INDEX `contract_id_UNIQUE` (`_id` ASC),
    CONSTRAINT `tournament_fk` FOREIGN KEY (`tournament_id`) REFERENCES `tin-s14940`.`Tournament` (`_id`),
    CONSTRAINT `team1_fk` FOREIGN KEY (`team_id`) REFERENCES `tin-s14940`.`Team` (`_id`)
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

INSERT IGNORE INTO `tin-s14940`.`Tournament` (`_id`, `location`, `price`) VALUES
    (1, 'LA', 1000.00),
    (2, 'London', 5000.00),
    (3, 'Warszawa', 1500.00)
;

INSERT IGNORE INTO `tin-s14940`.`Team` (`_id`, `name`, `game`) VALUES
    (1, 'W2P', 'CS'),
    (2, 'chochliki', 'LOL'),
    (3, 'Pogromcy', 'Rocket League')
;

INSERT IGNORE INTO `tin-s14940`.`Player` (`_id`, `firstName`, `lastName`, `dateOfBirth`, `game`, `team_id`) VALUES
    (1, 'Jan', 'Kowalski', '1997-10-16', 'SC2', 1),
    (2, 'Adam', 'Zieliński', '1999-07-01', 'LOL', 2),
    (3, 'Marian', 'Nowak', '2000-01-07', 'CS-GO', 3)
;

INSERT IGNORE INTO `tin-s14940`.`Game` (`_id`, `name`, `date`, `turs`, `tournament_id`) VALUES
    (1, 'CUP 2012 - CS:GO', '2021-08-29', 5, 1),
    (2, 'WORLDS 2021', '2021-07-25', 3, 2),
    (3, 'Mistrzostwa gararzowe', '2021-10-31', 6, 3)
;

INSERT IGNORE INTO `tin-s14940`.`Participate` (`_id`,  `date`, `team_id`, `tournament_id`) VALUES
    (1, '2021-08-29', 1, 3),
    (2, '2021-07-25', 3, 1),
    (3, '2021-10-31', 2, 2)
;

INSERT IGNORE INTO `tin-s14940`.`User` (`_id`, `login`, `password`) VALUES
    (1, 'admin', '$2a$08$/KNMcZ9zvDlrkQwqnOByhuUvzsDt4k.cSpVdyNtt3fTCNnZNxnndm')