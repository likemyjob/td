-- Valentina Studio --
-- MySQL dump --
-- ---------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
-- ---------------------------------------------------------


-- CREATE TABLE "barrel" -----------------------------------
CREATE TABLE `barrel` ( 
	`id` Int( 255 ) AUTO_INCREMENT NOT NULL,
	`radius` Int( 255 ) NOT NULL,
	`world_id` Int( 255 ) NOT NULL,
	`recipe_id` Int( 255 ) NOT NULL,
	`position` VarChar( 255 ) NOT NULL,
	CONSTRAINT `unique_id` UNIQUE( `id` ) )
ENGINE = InnoDB
AUTO_INCREMENT = 3;
-- ---------------------------------------------------------


-- CREATE TABLE "craft" ------------------------------------
CREATE TABLE `craft` ( 
	`id` Int( 255 ) AUTO_INCREMENT NOT NULL,
	`ingredient_id` Int( 255 ) NOT NULL,
	`recipe_id` Int( 255 ) NOT NULL,
	`amount` Int( 255 ) NOT NULL,
	CONSTRAINT `unique_id` UNIQUE( `id` ) )
ENGINE = InnoDB
AUTO_INCREMENT = 3;
-- ---------------------------------------------------------


-- CREATE TABLE "house" ------------------------------------
CREATE TABLE `house` ( 
	`id` Int( 255 ) AUTO_INCREMENT NOT NULL,
	`recipe_id` Int( 255 ) NOT NULL,
	`world_id` Int( 255 ) NOT NULL,
	CONSTRAINT `unique_id` UNIQUE( `id` ),
	CONSTRAINT `unique_recipe_id` UNIQUE( `recipe_id` ) )
ENGINE = InnoDB
AUTO_INCREMENT = 1;
-- ---------------------------------------------------------


-- CREATE TABLE "ingredient" -------------------------------
CREATE TABLE `ingredient` ( 
	`id` Int( 255 ) AUTO_INCREMENT NOT NULL,
	`name` VarChar( 255 ) NOT NULL,
	CONSTRAINT `unique_id` UNIQUE( `id` ),
	CONSTRAINT `unique_name` UNIQUE( `name` ) )
ENGINE = InnoDB
AUTO_INCREMENT = 3;
-- ---------------------------------------------------------


-- CREATE TABLE "inventory" --------------------------------
CREATE TABLE `inventory` ( 
	`id` Int( 255 ) AUTO_INCREMENT NOT NULL,
	`user_id` Int( 255 ) NOT NULL,
	`ingredient_id` Int( 255 ) NOT NULL,
	`count` Int( 255 ) NOT NULL,
	CONSTRAINT `unique_id` UNIQUE( `id` ) )
ENGINE = InnoDB
AUTO_INCREMENT = 3;
-- ---------------------------------------------------------


-- CREATE TABLE "recipe" -----------------------------------
CREATE TABLE `recipe` ( 
	`id` Int( 255 ) AUTO_INCREMENT NOT NULL,
	`name` VarChar( 255 ) NOT NULL,
	CONSTRAINT `unique_id` UNIQUE( `id` ),
	CONSTRAINT `unique_name` UNIQUE( `name` ) )
ENGINE = InnoDB
AUTO_INCREMENT = 3;
-- ---------------------------------------------------------


-- CREATE TABLE "user" -------------------------------------
CREATE TABLE `user` ( 
	`id` Int( 255 ) AUTO_INCREMENT NOT NULL,
	`username` VarChar( 255 ) NOT NULL,
	`email` VarChar( 255 ) NOT NULL,
	`password` VarChar( 255 ) NOT NULL,
	`position` VarChar( 255 ) NOT NULL,
	`radius` Int( 255 ) NOT NULL,
	CONSTRAINT `unique_email` UNIQUE( `email` ),
	CONSTRAINT `unique_id` UNIQUE( `id` ),
	CONSTRAINT `unique_position` UNIQUE( `position` ) )
ENGINE = InnoDB
AUTO_INCREMENT = 3;
-- ---------------------------------------------------------


-- CREATE TABLE "wall" -------------------------------------
CREATE TABLE `wall` ( 
	`id` Int( 255 ) AUTO_INCREMENT NOT NULL,
	`width` VarChar( 255 ) NOT NULL,
	`height` VarChar( 255 ) NOT NULL,
	`world_id` Int( 255 ) NOT NULL,
	`recipe_id` Int( 255 ) NOT NULL,
	`position` VarChar( 255 ) NOT NULL,
	CONSTRAINT `unique_id` UNIQUE( `id` ) )
ENGINE = InnoDB
AUTO_INCREMENT = 10;
-- ---------------------------------------------------------


-- CREATE TABLE "world" ------------------------------------
CREATE TABLE `world` ( 
	`id` Int( 255 ) AUTO_INCREMENT NOT NULL,
	`name` VarChar( 255 ) NOT NULL,
	`position` VarChar( 255 ) NOT NULL,
	CONSTRAINT `unique_id` UNIQUE( `id` ),
	CONSTRAINT `unique_position1` UNIQUE( `position` ) )
ENGINE = InnoDB
AUTO_INCREMENT = 3;
-- ---------------------------------------------------------


-- Dump data of "barrel" -----------------------------------
INSERT INTO `barrel`(`id`,`radius`,`world_id`,`recipe_id`,`position`) VALUES ( '1', '100', '1', '1', '{"x":"190.19","y":"-86.76"}' );
INSERT INTO `barrel`(`id`,`radius`,`world_id`,`recipe_id`,`position`) VALUES ( '2', '50', '1', '1', '{"x":"242.64","y":"53.70"}' );
-- ---------------------------------------------------------


-- Dump data of "craft" ------------------------------------
INSERT INTO `craft`(`id`,`ingredient_id`,`recipe_id`,`amount`) VALUES ( '1', '1', '1', '10' );
INSERT INTO `craft`(`id`,`ingredient_id`,`recipe_id`,`amount`) VALUES ( '2', '2', '2', '10' );
-- ---------------------------------------------------------


-- Dump data of "house" ------------------------------------
-- ---------------------------------------------------------


-- Dump data of "ingredient" -------------------------------
INSERT INTO `ingredient`(`id`,`name`) VALUES ( '1', 'Stone' );
INSERT INTO `ingredient`(`id`,`name`) VALUES ( '2', 'Wood' );
-- ---------------------------------------------------------


-- Dump data of "inventory" --------------------------------
INSERT INTO `inventory`(`id`,`user_id`,`ingredient_id`,`count`) VALUES ( '1', '1', '1', '200' );
INSERT INTO `inventory`(`id`,`user_id`,`ingredient_id`,`count`) VALUES ( '2', '1', '2', '300' );
-- ---------------------------------------------------------


-- Dump data of "recipe" -----------------------------------
INSERT INTO `recipe`(`id`,`name`) VALUES ( '2', 'Barrel' );
INSERT INTO `recipe`(`id`,`name`) VALUES ( '1', 'Wall' );
-- ---------------------------------------------------------


-- Dump data of "user" -------------------------------------
INSERT INTO `user`(`id`,`username`,`email`,`password`,`position`,`radius`) VALUES ( '1', 'korolariya', 'test', 'test', '{"x":"522.31","y":"299.86"}', '15' );
INSERT INTO `user`(`id`,`username`,`email`,`password`,`position`,`radius`) VALUES ( '2', 'other', 'test1', 'test', '{"x":"-327.26","y":"355.75"}', '15' );
-- ---------------------------------------------------------


-- Dump data of "wall" -------------------------------------
INSERT INTO `wall`(`id`,`width`,`height`,`world_id`,`recipe_id`,`position`) VALUES ( '8', '100', '10', '1', '1', '{"x":700,"y":200}' );
INSERT INTO `wall`(`id`,`width`,`height`,`world_id`,`recipe_id`,`position`) VALUES ( '9', '100', '10', '1', '1', '{"x":400,"y":400}' );
-- ---------------------------------------------------------


-- Dump data of "world" ------------------------------------
INSERT INTO `world`(`id`,`name`,`position`) VALUES ( '1', 'wall', '{x:0,y:150}' );
INSERT INTO `world`(`id`,`name`,`position`) VALUES ( '2', 'barrel', '{x:0,y:250}' );
-- ---------------------------------------------------------


-- CREATE INDEX "lnk_ingredient_craft" ---------------------
CREATE INDEX `lnk_ingredient_craft` USING BTREE ON `craft`( `ingredient_id` );
-- ---------------------------------------------------------


-- CREATE INDEX "lnk_recipe_craft" -------------------------
CREATE INDEX `lnk_recipe_craft` USING BTREE ON `craft`( `recipe_id` );
-- ---------------------------------------------------------


-- CREATE INDEX "lnk_world_house" --------------------------
CREATE INDEX `lnk_world_house` USING BTREE ON `house`( `world_id` );
-- ---------------------------------------------------------


-- CREATE INDEX "index" ------------------------------------
CREATE INDEX `index` USING BTREE ON `inventory`( `user_id`, `ingredient_id` );
-- ---------------------------------------------------------


-- CREATE INDEX "lnk_ingredient_inventory" -----------------
CREATE INDEX `lnk_ingredient_inventory` USING BTREE ON `inventory`( `ingredient_id` );
-- ---------------------------------------------------------


-- CREATE INDEX "lnk_recipe_wall" --------------------------
CREATE INDEX `lnk_recipe_wall` USING BTREE ON `wall`( `recipe_id` );
-- ---------------------------------------------------------


-- CREATE INDEX "lnk_world_wall" ---------------------------
CREATE INDEX `lnk_world_wall` USING BTREE ON `wall`( `world_id` );
-- ---------------------------------------------------------


-- CREATE LINK "lnk_ingredient_craft" ----------------------
ALTER TABLE `craft`
	ADD CONSTRAINT `lnk_ingredient_craft` FOREIGN KEY ( `ingredient_id` )
	REFERENCES `ingredient`( `id` )
	ON DELETE Cascade
	ON UPDATE Cascade;
-- ---------------------------------------------------------


-- CREATE LINK "lnk_recipe_craft" --------------------------
ALTER TABLE `craft`
	ADD CONSTRAINT `lnk_recipe_craft` FOREIGN KEY ( `recipe_id` )
	REFERENCES `recipe`( `id` )
	ON DELETE Cascade
	ON UPDATE Cascade;
-- ---------------------------------------------------------


-- CREATE LINK "lnk_recipe_house" --------------------------
ALTER TABLE `house`
	ADD CONSTRAINT `lnk_recipe_house` FOREIGN KEY ( `recipe_id` )
	REFERENCES `recipe`( `id` )
	ON DELETE Cascade
	ON UPDATE Cascade;
-- ---------------------------------------------------------


-- CREATE LINK "lnk_world_house" ---------------------------
ALTER TABLE `house`
	ADD CONSTRAINT `lnk_world_house` FOREIGN KEY ( `world_id` )
	REFERENCES `world`( `id` )
	ON DELETE Cascade
	ON UPDATE Cascade;
-- ---------------------------------------------------------


-- CREATE LINK "lnk_ingredient_inventory" ------------------
ALTER TABLE `inventory`
	ADD CONSTRAINT `lnk_ingredient_inventory` FOREIGN KEY ( `ingredient_id` )
	REFERENCES `ingredient`( `id` )
	ON DELETE Cascade
	ON UPDATE Cascade;
-- ---------------------------------------------------------


-- CREATE LINK "lnk_user_inventory" ------------------------
ALTER TABLE `inventory`
	ADD CONSTRAINT `lnk_user_inventory` FOREIGN KEY ( `user_id` )
	REFERENCES `user`( `id` )
	ON DELETE Cascade
	ON UPDATE Cascade;
-- ---------------------------------------------------------


-- CREATE LINK "lnk_recipe_wall" ---------------------------
ALTER TABLE `wall`
	ADD CONSTRAINT `lnk_recipe_wall` FOREIGN KEY ( `recipe_id` )
	REFERENCES `recipe`( `id` )
	ON DELETE Cascade
	ON UPDATE Cascade;
-- ---------------------------------------------------------


-- CREATE LINK "lnk_world_wall" ----------------------------
ALTER TABLE `wall`
	ADD CONSTRAINT `lnk_world_wall` FOREIGN KEY ( `world_id` )
	REFERENCES `world`( `id` )
	ON DELETE Cascade
	ON UPDATE Cascade;
-- ---------------------------------------------------------


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- ---------------------------------------------------------


