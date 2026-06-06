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

-- Valeurs par défaut
INSERT IGNORE INTO `settings` (`key`, `value`) VALUES
  ('whatsapp_phone', '212659659715'),
  ('display_phone',  '05 28 32 63 64'),
  ('admin_password', 'aviator2024');
