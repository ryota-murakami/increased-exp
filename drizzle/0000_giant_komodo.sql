-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `SequelizeMeta` (
	`name` varchar(255) NOT NULL,
	CONSTRAINT `SequelizeMeta_name` PRIMARY KEY(`name`),
	CONSTRAINT `name` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `authors` (
	`createdAt` datetime NOT NULL,
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`password` text,
	`updatedAt` datetime NOT NULL,
	CONSTRAINT `authors_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`body` text,
	`createdAt` datetime NOT NULL,
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255),
	`updatedAt` datetime NOT NULL,
	CONSTRAINT `posts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `stocks` (
	`createdAt` datetime NOT NULL,
	`id` int AUTO_INCREMENT NOT NULL,
	`pageTitle` text,
	`updatedAt` datetime NOT NULL,
	`url` text,
	CONSTRAINT `stocks_id` PRIMARY KEY(`id`)
);

*/