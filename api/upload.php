<?php
require_once __DIR__ . '/auth_utils.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    checkAuth(); // Protection JWT

    if (!isset($_FILES['photo'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Aucun fichier reçu']);
        exit;
    }

    $file = $_FILES['photo'];
    $allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    
    if (!in_array($file['type'], $allowedTypes)) {
        http_response_code(400);
        echo json_encode(['error' => 'Format d\'image non supporté (JPG, PNG, WEBP uniquement)']);
        exit;
    }

    // Créer le dossier uploads s'il n'existe pas
    $uploadDir = __DIR__ . '/uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    // Générer un nom de fichier unique
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = uniqid('img_', true) . '.' . $extension;
    $targetPath = $uploadDir . $filename;

    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        // Retourner l'URL relative
        // Note: On assume que l'API est accessible via /api/ ou /luxury-barbershop/api/
        // On renvoie un chemin relatif que le front pourra utiliser
        echo json_encode([
            'success' => true,
            'url' => 'api/uploads/' . $filename
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Erreur lors de l\'enregistrement du fichier']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Méthode non autorisée']);
}
