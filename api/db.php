<?php
// ─── Connexion MySQL (Hostinger) ──────────────────────────────────────────────
// Modifiez ces 4 valeurs avec vos identifiants Hostinger (phpMyAdmin)

define('DB_HOST', 'localhost');
define('DB_NAME', 'aviator_barbershop');  // ← nom de votre BDD dans phpMyAdmin
define('DB_USER', 'root');                // ← XAMPP: root | Hostinger: votre user
define('DB_PASS', '');                    // ← XAMPP: vide | Hostinger: votre mdp
define('DB_CHARSET', 'utf8mb4');

// ─── Sécurité JWT ────────────────────────────────────────────────────────────
// CHANGEZ CETTE CLÉ en production pour une chaîne longue et aléatoire !
define('JWT_SECRET', 'aviator_secret_key_2024_change_me_in_production');
define('JWT_EXPIRY', 3600 * 24); // 24 heures

function getPDO(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        try {
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Connexion base de données échouée']);
            exit;
        }
    }
    return $pdo;
}

// ─── Headers de Sécurité ──────────────────────────────────────────────────────
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');
header('Referrer-Policy: strict-origin-when-cross-origin');
// Note: Content-Security-Policy peut être restrictif, à adapter selon vos besoins
// header("Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;");

// ─── Headers CORS (pour que React puisse contacter l'API) ─────────────────────
header('Access-Control-Allow-Origin: *'); // En production, mettez votre domaine exact
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Répondre directement aux requêtes preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
