-- Créer la base de données avec utf8mb4
CREATE DATABASE IF NOT EXISTS `mannheim` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `mannheim`;


CREATE TABLE IF NOT EXISTS `users` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `characters` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `character_data` JSON NOT NULL,
    INDEX `idx_user_id` (`user_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `sessions` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `gamemaster_id` BIGINT UNSIGNED NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `ended` BOOLEAN NOT NULL,
    INDEX `idx_gamemaster_id` (`gamemaster_id`),
    FOREIGN KEY (`gamemaster_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

CREATE TABLE entities (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `owner_id` BIGINT UNSIGNED NOT NULL,
    `session_id` BIGINT UNSIGNED NOT NULL,
    `current_physical_health` BIGINT NOT NULL,
    `current_path_health` BIGINT NOT NULL,
    `current_mental_health` BIGINT NOT NULL,
    `current_endurance` BIGINT NOT NULL,
    `max_physical_health` BIGINT NOT NULL,
    `max_mental_health` BIGINT NOT NULL,
    `max_path_health` BIGINT NOT NULL,
    `max_endurance` BIGINT NOT NULL,
    INDEX `idx_owner_id` (`owner_id`),
    INDEX `idx_session_id` (`session_id`),
    FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON DELETE CASCADE
);

CREATE TABLE characters_played (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `character_id` BIGINT UNSIGNED NOT NULL,
    `session_id` BIGINT UNSIGNED NOT NULL,
    INDEX `idx_character_id` (`character_id`),
    INDEX `idx_session_id` (`session_id`),
    FOREIGN KEY (`character_id`) REFERENCES `characters`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`session_id`) REFERENCES sessions(`id`) ON DELETE CASCADE
);

CREATE TABLE xp (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `character_id` BIGINT UNSIGNED NOT NULL,
    `session_id` BIGINT UNSIGNED NOT NULL,
    `quantity` BIGINT NOT NULL,
    INDEX `idx_character_id` (`character_id`),
    INDEX `idx_session_id` (`session_id`),
    FOREIGN KEY (`character_id`) REFERENCES characters(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`session_id`) REFERENCES sessions(`id`) ON DELETE CASCADE
);
