CREATE TABLE `users` (
  `user_id` integer PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255) UNIQUE,
  `password` varchar(255),
  `name` varchar(255),
  `role` ENUM ('admin', 'user'),
  `birthdate` date,
  `created_at` timestamp DEFAULT (now()),
  `updated_at` timestamp DEFAULT (now()),
  `deleted_at` timestamp
);

CREATE TABLE `movies` (
  `movie_id` integer PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `director` varchar(255),
  `release_date` date,
  `runtime` integer,
  `movie_status` ENUM ('showing', 'upcoming', 'postponed'),
  `created_at` timestamp DEFAULT (now()),
  `updated_at` timestamp DEFAULT (now()),
  `deleted_at` timestamp
);

CREATE TABLE `studios` (
  `studio_id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(15),
  `capacity` integer,
  `created_at` timestamp DEFAULT (now()),
  `updated_at` timestamp DEFAULT (now()),
  `deleted_at` timestamp
);

CREATE TABLE `schedules` (
  `schedule_id` integer PRIMARY KEY AUTO_INCREMENT,
  `movie_id` integer,
  `studio_id` integer,
  `showtime` time,
  `showdate` date,
  `created_at` timestamp DEFAULT (now()),
  `updated_at` timestamp DEFAULT (now()),
  `deleted_at` timestamp
);

CREATE TABLE `bookings` (
  `booking_id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer,
  `schedule_id` integer,
  `amount` integer,
  `created_at` timestamp DEFAULT (now()),
  `updated_at` timestamp DEFAULT (now()),
  `deleted_at` timestamp
);

ALTER TABLE `bookings` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `schedules` ADD FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`);

ALTER TABLE `schedules` ADD FOREIGN KEY (`studio_id`) REFERENCES `studios` (`studio_id`);

ALTER TABLE `bookings` ADD FOREIGN KEY (`schedule_id`) REFERENCES `schedules` (`schedule_id`);
