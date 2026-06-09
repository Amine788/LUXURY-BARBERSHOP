-- ============================================================
-- AVIATOR Barber Shop — Schéma MySQL (Hostinger / phpMyAdmin)
-- Importez ce fichier via phpMyAdmin : Onglet "Importer"
-- ============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';

-- ── Réservations ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `reservations` (
  `id`           VARCHAR(50)  NOT NULL,
  `submitted_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name`         VARCHAR(255) NOT NULL,
  `phone`        VARCHAR(50)  NOT NULL,
  `service`      VARCHAR(255) NOT NULL,
  `barber`       VARCHAR(255) NOT NULL DEFAULT '',
  `date`         VARCHAR(20)  NOT NULL,
  `time`         VARCHAR(10)  NOT NULL,
  `status`       ENUM('En attente','Confirmé','Annulé','Servi') NOT NULL DEFAULT 'En attente',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Barbiers ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `barbers` (
  `id`         INT          NOT NULL AUTO_INCREMENT,
  `sort_order` INT          NOT NULL DEFAULT 0,
  `name`       VARCHAR(255) NOT NULL,
  `title`      VARCHAR(255) NOT NULL DEFAULT 'Expert Barber',
  `specialty`  TEXT         NOT NULL,
  `experience` VARCHAR(50)  NOT NULL DEFAULT '5+ Ans',
  `photo`      TEXT         NOT NULL,
  `tag`        VARCHAR(100) NOT NULL DEFAULT 'Expert Barber',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Catégories de tarifs ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS `pricing_categories` (
  `id`         VARCHAR(50)  NOT NULL,
  `label`      VARCHAR(255) NOT NULL,
  `icon`       VARCHAR(10)  NOT NULL DEFAULT '',
  `sort_order` INT          NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Items de tarifs ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `pricing_items` (
  `id`          INT          NOT NULL AUTO_INCREMENT,
  `category_id` VARCHAR(50)  NOT NULL,
  `sort_order`  INT          NOT NULL DEFAULT 0,
  `name`        VARCHAR(255) NOT NULL,
  `price`       VARCHAR(50)  NOT NULL,
  `description` TEXT         NOT NULL,
  `popular`     TINYINT(1)   NOT NULL DEFAULT 0,
  `from_price`  TINYINT(1)   NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`category_id`) REFERENCES `pricing_categories`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Paramètres ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `settings` (
  `key`   VARCHAR(100) NOT NULL,
  `value` TEXT         NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Tentatives de connexion (Anti Brute Force) ────────────────
CREATE TABLE IF NOT EXISTS `login_attempts` (
  `ip`           VARCHAR(45)  NOT NULL,
  `attempts`     INT          NOT NULL DEFAULT 0,
  `last_attempt` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `locked_until` DATETIME     NULL DEFAULT NULL,
  PRIMARY KEY (`ip`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Logs d'activité Admin ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `admin_logs` (
  `id`         INT          NOT NULL AUTO_INCREMENT,
  `action`     VARCHAR(100) NOT NULL,
  `details`    TEXT         NOT NULL DEFAULT '',
  `ip`         VARCHAR(45)  NOT NULL,
  `user_agent` VARCHAR(255) NOT NULL DEFAULT '',
  `success`    TINYINT(1)   NOT NULL DEFAULT 1,
  `created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_action`     (`action`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── OTP 2FA par email ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `admin_otp` (
  `id`         INT          NOT NULL AUTO_INCREMENT,
  `code_hash`  VARCHAR(255) NOT NULL,
  `expires_at` DATETIME     NOT NULL,
  `attempts`   INT          NOT NULL DEFAULT 0,
  `used`       TINYINT(1)   NOT NULL DEFAULT 0,
  `created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Valeurs par défaut ────────────────────────────────────────────────────────
INSERT IGNORE INTO `settings` (`key`, `value`) VALUES
  ('whatsapp_phone', '212659659715'),
  ('display_phone',  '05 28 32 63 64');
-- NOTE : Le mot de passe admin sera hashé automatiquement par login.php
-- lors de la première connexion. Ne pas stocker de mot de passe en clair ici.

-- ── Nettoyage automatique des anciennes tentatives (événement optionnel) ─────
-- Décommentez si les événements MySQL sont activés sur votre serveur :
-- CREATE EVENT IF NOT EXISTS `cleanup_login_attempts`
--   ON SCHEDULE EVERY 1 DAY
--   DO DELETE FROM `login_attempts` WHERE `last_attempt` < DATE_SUB(NOW(), INTERVAL 7 DAY);
