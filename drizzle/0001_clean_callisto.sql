ALTER TABLE `authors` MODIFY COLUMN `name` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `authors` MODIFY COLUMN `password` text NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` MODIFY COLUMN `body` text NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` MODIFY COLUMN `title` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `stocks` MODIFY COLUMN `pageTitle` text NOT NULL;--> statement-breakpoint
ALTER TABLE `stocks` MODIFY COLUMN `url` text NOT NULL;