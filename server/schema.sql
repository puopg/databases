CREATE DATABASE chat;

USE chat;






-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'messages'
--
-- ---

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `text` VARCHAR(140) NULL DEFAULT NULL,
  `roomname` VARCHAR(30) NULL DEFAULT NULL,
  `createdAt` DATETIME NULL DEFAULT NULL,
  `id_user` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'users'
--
-- ---

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `username` VARCHAR(30) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'friends'
--
-- ---

DROP TABLE IF EXISTS `friends`;

CREATE TABLE `friends` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `id_users1` INTEGER NULL DEFAULT NULL,
  `id_users2` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `messages` ADD FOREIGN KEY (id_user) REFERENCES `users` (`id`);
ALTER TABLE `friends` ADD FOREIGN KEY (id_users1) REFERENCES `users` (`id`);
ALTER TABLE `friends` ADD FOREIGN KEY (id_users2) REFERENCES `users` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `friends` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `messages` (`id`,`text`,`roomname`,`createdAt`,`id_user`) VALUES
-- ('','','','','');
-- INSERT INTO `users` (`id`,`username`) VALUES
-- ('','');
-- INSERT INTO `friends` (`id`,`id_users1`,`id_users2`) VALUES
-- ('','','');

