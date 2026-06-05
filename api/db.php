<?php
// ─── Connexion MySQL (Hostinger) ──────────────────────────────────────────────
// Modifiez ces 4 valeurs avec vos identifiants Hostinger (phpMyAdmin)

define('DB_HOST', 'localhost');
define('DB_NAME', 'votre_base_de_donnees');   // ← à changer
define('DB_USER', 'votre_utilisateur');        // ← à changer
define('DB_PASS', 'votre_mot_de_passe');       // ← à changer
define('DB_CHARSET', 'utf8mb4');

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

// ─── Headers CORS (pour que React puisse contacter l'API) ─────────────────────
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Répondre directement aux requêtes preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
