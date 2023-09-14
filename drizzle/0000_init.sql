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