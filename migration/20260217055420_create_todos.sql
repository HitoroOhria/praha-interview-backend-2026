CREATE TABLE `todos` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` varchar(5000),
	CONSTRAINT `todos_id` PRIMARY KEY(`id`)
);
