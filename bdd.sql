-- Créer la base de données avec utf8mb4
CREATE DATABASE IF NOT EXISTS `mannheim` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `mannheim`;

ALTER DATABASE `mannheim` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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



-- Connection entre les participant d'une session et la session elle-meme
CREATE TABLE IF NOT EXISTS `session_participants` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `session_id` BIGINT UNSIGNED NOT NULL,
    INDEX `idx_user_id` (`user_id`),
    INDEX `idx_session_id` (`session_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON DELETE CASCADE
);



-- Table des personnages
CREATE TABLE IF NOT EXISTS `characters` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `character_data` JSON NOT NULL,
    `image` VARCHAR(255),
    `type` enum('chara', 'monster') NOT NULL DEFAULT 'chara',
    INDEX `idx_user_id` (`user_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);



CREATE TABLE IF NOT EXISTS `characters_access` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `character_id` BIGINT UNSIGNED NOT NULL,
    `player_id` BIGINT UNSIGNED NOT NULL,
    INDEX `idx_character_id` (`character_id`),
    INDEX `idx_player_id` (`player_id`),
    FOREIGN KEY (`character_id`) REFERENCES `characters`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`player_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);




CREATE TABLE IF NOT EXISTS `session_notes` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `session_id` BIGINT UNSIGNED NOT NULL,
    `note` TEXT NOT NULL,
    `public` BOOLEAN NOT NULL DEFAULT FALSE,
    INDEX `idx_session_id` (`session_id`),
    FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON DELETE CASCADE
);


-- Table des entités
CREATE TABLE IF NOT EXISTS `entities` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,   -- 0
    `name` VARCHAR(255) NOT NULL,                               -- 1
    `owner_id` BIGINT UNSIGNED NOT NULL,                        -- 2
    `session_id` BIGINT UNSIGNED NOT NULL,                      -- 3
    `current_physical_health` BIGINT NOT NULL,                  -- 4
    `current_path_health` BIGINT NOT NULL,                      -- 5
    `current_mental_health` BIGINT NOT NULL,                    -- 6
    `current_endurance` BIGINT NOT NULL,                        -- 7
    `current_mana` BIGINT NOT NULL,                             -- 8
    `max_physical_health` BIGINT NOT NULL,                      -- 9
    `max_mental_health` BIGINT NOT NULL,                        -- 10
    `max_path_health` BIGINT NOT NULL,                          -- 11
    `max_endurance` BIGINT NOT NULL,                            -- 12
    `max_mana` BIGINT NOT NULL,                                 -- 13
    `character_id` BIGINT UNSIGNED NOT NULL,                    -- 14
    `side_camp` INT UNSIGNED NOT NULL DEFAULT 0,                -- 15
    `hidden` ENUM('partially', 'totally') DEFAULT NULL,         -- 16
    INDEX `idx_owner_id` (`owner_id`),
    INDEX `idx_session_id` (`session_id`),
    INDEX `idx_character_id` (`character_id`),
    FOREIGN KEY (`character_id`) REFERENCES `characters`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
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
    `receiver_id` BIGINT UNSIGNED NOT NULL,
    `session_id` BIGINT UNSIGNED NOT NULL,
    `status` ENUM('pending', 'accepted', 'refused') NOT NULL,
    INDEX `idx_receiver_id` (`receiver_id`),
    INDEX `idx_session_id` (`session_id`),
    FOREIGN KEY (`receiver_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `characters_requests` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `sender_id` BIGINT UNSIGNED NOT NULL,
    `receiver_id` BIGINT UNSIGNED NOT NULL,
    `session_id` BIGINT UNSIGNED NOT NULL,
    `character_id` BIGINT UNSIGNED NOT NULL,
    `status` ENUM('pending', 'accepted', 'refused') NOT NULL,
    INDEX `idx_sender_id` (`sender_id`),
    INDEX `idx_session_id` (`session_id`),
    INDEX `idx_character_id` (`character_id`),
    INDEX `idx_receiver_id` (`receiver_id`),
    FOREIGN KEY (`sender_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`character_id`) REFERENCES `characters`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`receiver_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
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
CREATE TABLE IF NOT EXISTS `lore_character_story_link` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `lore_story_id` BIGINT UNSIGNED NOT NULL,
    `lore_chara_id` BIGINT UNSIGNED NOT NULL,
    INDEX `idx_lore_story_id` (`lore_story_id`),
    INDEX `idx_lore_chara_id` (`lore_chara_id`),
    FOREIGN KEY (`lore_story_id`) REFERENCES `lore_story`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`lore_chara_id`) REFERENCES `lore_character`(`id`) ON DELETE CASCADE
);


-- Table des liens entre histoires
CREATE TABLE IF NOT EXISTS `lore_story_link` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `lore_story_id2` BIGINT UNSIGNED NOT NULL,
    `lore_story_id1` BIGINT UNSIGNED NOT NULL,
    INDEX `idx_lore_story_id2` (`lore_story_id2`),
    INDEX `idx_lore_story_id1` (`lore_story_id1`),
    FOREIGN KEY (`lore_story_id2`) REFERENCES `lore_story`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`lore_story_id1`) REFERENCES `lore_story`(`id`) ON DELETE CASCADE
);


-- Table des liens entre personnages
CREATE TABLE IF NOT EXISTS `lore_character_link` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `lore_chara_id1` BIGINT UNSIGNED NOT NULL,
    `lore_chara_id2` BIGINT UNSIGNED NOT NULL,
    INDEX `idx_lore_chara_id1` (`lore_chara_id1`),
    INDEX `idx_lore_chara_id2` (`lore_chara_id2`),
    FOREIGN KEY (`lore_chara_id1`) REFERENCES `lore_character`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`lore_chara_id2`) REFERENCES `lore_character`(`id`) ON DELETE CASCADE
);

-- Insertions initiales
INSERT IGNORE INTO `lore_story` (`id`, `title`, `path`, `short_description`, `image`) VALUES
(1, "Le commencement", "./server/public/lore/the_beginning.md", "Comment tout a commencé", NULL),
(2, "Préambule", "./server/public/lore/the_end.md", "Ul et la différence entre chouette et hibou", NULL);
