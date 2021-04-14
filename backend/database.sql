-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ibudget
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ibudget
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ibudget` DEFAULT CHARACTER SET utf8 ;
USE `ibudget` ;

-- -----------------------------------------------------
-- Table `ibudget`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ibudget`.`users` ;

CREATE TABLE IF NOT EXISTS `ibudget`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `password` CHAR(60) NOT NULL,
  `name` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) INVISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ibudget`.`transactions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ibudget`.`transactions` ;

CREATE TABLE IF NOT EXISTS `ibudget`.`transactions` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `date` TIMESTAMP NOT NULL,
  `category_id` TINYINT(1) NOT NULL,
  `type_id` TINYINT(1) NOT NULL,
  `notes` VARCHAR(100) NULL DEFAULT NULL,
  `amount` DECIMAL(13,4) UNSIGNED NOT NULL,
  `concept` VARCHAR(25) NULL DEFAULT NULL,
  `user_id` INT NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `USERDATE` (`user_id` DESC, `date` DESC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_transactions_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `ibudget`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
