<?php
// On active l'affichage des erreurs pour le debug
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/auth_utils.php';

header('Content-Type: application/json');

try {
    echo "--- Debug Start ---\n";
    
    echo "Checking Database connection...\n";
    $pdo = getPDO();
    echo "DB OK.\n";

    echo "Checking settings table...\n";
    $stmt = $pdo->prepare("SELECT value FROM settings WHERE `key` = 'admin_password'");
    $stmt->execute();
    $row = $stmt->fetch();
    if ($row) {
        echo "Admin password hash found.\n";
    } else {
        echo "Admin password hash NOT found (will be created on first login).\n";
    }

    echo "Checking SMTP configuration...\n";
    echo "ADMIN_EMAIL: " . (defined('ADMIN_EMAIL') ? ADMIN_EMAIL : 'NOT DEFINED') . "\n";
    
    echo "--- Debug End ---\n";
    
} catch (Throwable $e) {
    echo "\nFATAL ERROR: " . $e->getMessage() . "\n";
    echo "In file: " . $e->getFile() . " on line " . $e->getLine() . "\n";
    echo "Stack trace:\n" . $e->getTraceAsString() . "\n";
}
