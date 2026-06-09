<?php
require_once __DIR__ . '/db.php';

header('Content-Type: application/json');

try {
    $pdo = getPDO();
    $results = [];

    $tables = ['reservations', 'barbers', 'pricing_categories', 'pricing_items', 'settings', 'login_attempts', 'admin_logs', 'admin_otp'];

    foreach ($tables as $table) {
        try {
            $stmt = $pdo->query("SELECT 1 FROM `$table` LIMIT 1");
            $results[$table] = "Exists";
        } catch (PDOException $e) {
            $results[$table] = "Missing or error: " . $e->getMessage();
        }
    }

    echo json_encode([
        'status' => 'success',
        'database' => DB_NAME,
        'user' => DB_USER,
        'tables' => $results,
        'php_version' => PHP_VERSION,
        'openssl' => extension_loaded('openssl') ? 'Enabled' : 'Disabled'
    ]);

} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
