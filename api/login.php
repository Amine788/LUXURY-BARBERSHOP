<?php
require_once __DIR__ . '/auth_utils.php';

$method = $_SERVER['REQUEST_METHOD'];
$pdo = getPDO();

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $password = $data['password'] ?? '';

    if (empty($password)) {
        http_response_code(400);
        echo json_encode(['error' => 'Mot de passe requis']);
        exit;
    }

    // Récupérer le mot de passe hashé
    $stmt = $pdo->prepare("SELECT value FROM settings WHERE `key` = 'admin_password'");
    $stmt->execute();
    $row = $stmt->fetch();

    if (!$row) {
        http_response_code(500);
        echo json_encode(['error' => 'Erreur de configuration serveur']);
        exit;
    }

    $storedHash = $row['value'];

    // Si le mot de passe en base n'est pas encore hashé (ancienne version), on le fait maintenant
    // Note: On vérifie si ça commence par le préfixe habituel de password_hash ($2y$)
    if (substr($storedHash, 0, 4) !== '$2y$') {
        if ($password === $storedHash) {
            // Premier login avec l'ancien mot de passe : on le hashe !
            $newHash = hashPassword($password);
            $stmt = $pdo->prepare("UPDATE settings SET value = :hash WHERE `key` = 'admin_password'");
            $stmt->execute([':hash' => $newHash]);
            $storedHash = $newHash;
        }
    }

    if (verifyPassword($password, $storedHash)) {
        $token = encodeJWT([
            'role' => 'admin',
            'exp'  => time() + (isset(JWT_EXPIRY) ? JWT_EXPIRY : 86400)
        ]);
        echo json_encode([
            'success' => true,
            'token'   => $token
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Mot de passe incorrect']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Méthode non autorisée']);
}
