CREATE DATABASE chat;

USE chat;





-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'chat'
--
-- ---

DROP TABLE IF EXISTS `chat`;

CREATE TABLE `chat` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `user` VARCHAR(30) NULL DEFAULT NULL,
  `message` VARCHAR(140) NULL DEFAULT NULL,
  `room` VARCHAR(30) NULL DEFAULT NULL,
  `time` TIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---


-- ---
-- Table Properties
-- ---

-- ALTER TABLE `chat` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `chat` (`id`,`user`,`message`,`room`,`time`) VALUES
-- ('','','','','');

