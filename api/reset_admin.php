<?php
require_once __DIR__ . '/auth_utils.php';

$pdo = getPDO();
$newPassword = 'aviator2024';
$hash = hashPassword($newPassword);

try {
    $stmt = $pdo->prepare("UPDATE settings SET value = :hash WHERE `key` = 'admin_password'");
    $stmt->execute([':hash' => $hash]);
    
    if ($stmt->rowCount() > 0) {
        echo "Succès : Le mot de passe a été réinitialisé à 'aviator2024'.";
    } else {
        // Si la clé n'existe pas encore
        $stmt = $pdo->prepare("INSERT INTO settings (`key`, value) VALUES ('admin_password', :hash)");
        $stmt->execute([':hash' => $hash]);
        echo "Succès : La clé admin_password a été créée avec 'aviator2024'.";
    }
} catch (Exception $e) {
    echo "Erreur : " . $e->getMessage();
}
