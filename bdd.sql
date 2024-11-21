-- Créer la base de données avec utf8mb4
CREATE DATABASE IF NOT EXISTS `mannheim` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `mannheim`;

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS `users` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL
);

-- Table des relations amicales
CREATE TABLE IF NOT EXISTS `friends` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `friend_id1` BIGINT UNSIGNED NOT NULL,
    `friend_id2` BIGINT UNSIGNED NOT NULL,
    INDEX `idx_friend_id1` (`friend_id1`),
    INDEX `idx_friend_id2` (`friend_id2`),
    FOREIGN KEY (`friend_id1`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`friend_id2`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- Table des personnages
CREATE TABLE IF NOT EXISTS `characters` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `character_data` JSON NOT NULL,
    `image` VARCHAR(255),
    INDEX `idx_user_id` (`user_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- Table des sessions
CREATE TABLE IF NOT EXISTS `sessions` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `gamemaster_id` BIGINT UNSIGNED NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `ended` BOOLEAN NOT NULL DEFAULT FALSE,
    INDEX `idx_gamemaster_id` (`gamemaster_id`),
    FOREIGN KEY (`gamemaster_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- Table des entités
CREATE TABLE IF NOT EXISTS `entities` (
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

-- Table des personnages joués
CREATE TABLE IF NOT EXISTS `characters_played` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `character_id` BIGINT UNSIGNED NOT NULL,
    `session_id` BIGINT UNSIGNED NOT NULL,
    INDEX `idx_character_id` (`character_id`),
    INDEX `idx_session_id` (`session_id`),
    FOREIGN KEY (`character_id`) REFERENCES `characters`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON DELETE CASCADE
);

-- Table des points d'expérience
CREATE TABLE IF NOT EXISTS `xp` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `character_id` BIGINT UNSIGNED NOT NULL,
    `session_id` BIGINT UNSIGNED NOT NULL,
    `quantity` BIGINT NOT NULL,
    INDEX `idx_character_id` (`character_id`),
    INDEX `idx_session_id` (`session_id`),
    FOREIGN KEY (`character_id`) REFERENCES `characters`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON DELETE CASCADE
);

-- -----------------------------------------------------------------
-- -----------------------------------------------------------------
-- REQUETES
-- -----------------------------------------------------------------
-- -----------------------------------------------------------------

-- Table des demandes d'amis
CREATE TABLE IF NOT EXISTS `friend_requests` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `sender_id` BIGINT UNSIGNED NOT NULL,
    `receiver_id` BIGINT UNSIGNED NOT NULL,
    `status` ENUM('pending', 'accepted', 'refused') NOT NULL,
    INDEX `idx_sender_id` (`sender_id`),
    INDEX `idx_receiver_id` (`receiver_id`),
    FOREIGN KEY (`sender_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`receiver_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `sessions_requests` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `sender_id` BIGINT UNSIGNED NOT NULL,
    `session_id` BIGINT UNSIGNED NOT NULL,
    `status` ENUM('pending', 'accepted', 'refused') NOT NULL,
    INDEX `idx_sender_id` (`sender_id`),
    INDEX `idx_session_id` (`session_id`),
    FOREIGN KEY (`sender_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `characters_requests` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `sender_id` BIGINT UNSIGNED NOT NULL,
    `session_id` BIGINT UNSIGNED NOT NULL,
    `character_id` BIGINT UNSIGNED NOT NULL,
    `status` ENUM('pending', 'accepted', 'refused') NOT NULL,
    INDEX `idx_sender_id` (`sender_id`),
    INDEX `idx_session_id` (`session_id`),
    INDEX `idx_character_id` (`character_id`),
    FOREIGN KEY (`sender_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`character_id`) REFERENCES `characters`(`id`) ON DELETE CASCADE
);

-- -----------------------------------------------------------------
-- -----------------------------------------------------------------
-- REQUETES
-- -----------------------------------------------------------------
-- -----------------------------------------------------------------

-- Table des histoires
CREATE TABLE IF NOT EXISTS `lore_story` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `path` VARCHAR(255) NOT NULL,
    `short_description` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255)
);

-- Table des personnages liés à une histoire
CREATE TABLE IF NOT EXISTS `lore_character` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `short_description` VARCHAR(255) NOT NULL,
    `path` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255)
);

-- Table des liens entre personnages et histoires
CREATE TABLE IF NOT EXISTS `lore_entity_link` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `lore_chara_id` BIGINT UNSIGNED NOT NULL,
    `lore_story_id` BIGINT UNSIGNED NOT NULL,
    INDEX `idx_lore_chara_id` (`lore_chara_id`),
    INDEX `idx_lore_story_id` (`lore_story_id`),
    FOREIGN KEY (`lore_chara_id`) REFERENCES `lore_character`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`lore_story_id`) REFERENCES `lore_story`(`id`) ON DELETE CASCADE
);

-- Insertions initiales
INSERT IGNORE INTO `lore_story` (`id`, `title`, `path`, `short_description`, `image`) VALUES
(1, "Le commencement", "./server/public/lore/the_beginning.md", "Comment tout a commencé", NULL),
(2, "Préambule", "./server/public/lore/the_end.md", "Ul et la différence entre chouette et hibou", NULL);
