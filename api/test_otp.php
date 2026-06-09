<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/auth_utils.php';

header('Content-Type: text/plain');

echo "Testing OTP Generation and Email...\n";

try {
    $sent = generateAndSendOTP();
    if ($sent) {
        echo "SUCCESS: OTP email sent to " . ADMIN_EMAIL . "\n";
    } else {
        echo "FAILED: generateAndSendOTP returned false.\n";
        echo "Check your SMTP settings in .env or PHP error logs.\n";
    }
} catch (Throwable $e) {
    echo "EXCEPTION: " . $e->getMessage() . "\n";
    echo "In " . $e->getFile() . " on line " . $e->getLine() . "\n";
}
