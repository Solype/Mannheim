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

CREATE TABLE IF NOT EXISTS entities (
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
    `character_id` BIGINT UNSIGNED NOT NULL,
    INDEX `idx_owner_id` (`owner_id`),
    INDEX `idx_session_id` (`session_id`),
    INDEX `idx_character_id` (`character_id`),
    FOREIGN KEY (`character_id`) REFERENCES `characters`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS characters_played (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `character_id` BIGINT UNSIGNED NOT NULL,
    `session_id` BIGINT UNSIGNED NOT NULL,
    INDEX `idx_character_id` (`character_id`),
    INDEX `idx_session_id` (`session_id`),
    FOREIGN KEY (`character_id`) REFERENCES `characters`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`session_id`) REFERENCES sessions(`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS xp (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `character_id` BIGINT UNSIGNED NOT NULL,
    `session_id` BIGINT UNSIGNED NOT NULL,
    `quantity` BIGINT NOT NULL,
    INDEX `idx_character_id` (`character_id`),
    INDEX `idx_session_id` (`session_id`),
    FOREIGN KEY (`character_id`) REFERENCES characters(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`session_id`) REFERENCES sessions(`id`) ON DELETE CASCADE
);

-- ----------------------------
-- ----------------------------
-- Lore, Rules and anecdotes
-- ----------------------------
-- ----------------------------


CREATE TABLE IF NOT EXISTS lore_story (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `path` VARCHAR(255) NOT NULL,
    `short_description` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS lore_story_link (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `lore_id1` BIGINT UNSIGNED NOT NULL,
    `lore_id2` BIGINT UNSIGNED NOT NULL,
    INDEX `idx_lore_id1` (`lore_id1`),
    INDEX `idx_lore_id2` (`lore_id2`),
    FOREIGN KEY (`lore_id1`) REFERENCES `lore_story`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`lore_id2`) REFERENCES `lore_story`(`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS lore_character (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `short_description` VARCHAR(255) NOT NULL,
    `path` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS lore_entity_link (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `lore_id1` BIGINT UNSIGNED NOT NULL,
    `lore_id2` BIGINT UNSIGNED NOT NULL,
    INDEX `idx_lore_id1` (`lore_id1`),
    INDEX `idx_lore_id2` (`lore_id2`),
    FOREIGN KEY (`lore_id1`) REFERENCES `lore_character`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`lore_id2`) REFERENCES `lore_story`(`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS lore_story_entity_link (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `lore_entity_id` BIGINT UNSIGNED NOT NULL,
    `lore_story_id` BIGINT UNSIGNED NOT NULL,
    INDEX `idx_lore_entity_id` (`lore_entity_id`),
    INDEX `idx_lore_story_id` (`lore_story_id`),
    FOREIGN KEY (`lore_entity_id`) REFERENCES `lore_character`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`lore_story_id`) REFERENCES `lore_story`(`id`) ON DELETE CASCADE
)
