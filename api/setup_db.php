<?php
require_once __DIR__ . '/db.php';

header('Content-Type: application/json');

try {
    $pdo = getPDO();
    
    // Chemin vers le fichier SQL
    $sqlFile = __DIR__ . '/schema_mysql.sql';
    
    if (!file_exists($sqlFile)) {
        throw new Exception("Fichier SQL non trouvé : " . $sqlFile);
    }

    $sql = file_get_contents($sqlFile);
    
    // Supprimer les commentaires et séparer par point-virgule
    // Note: cette approche est simpliste mais devrait fonctionner pour ce schéma
    $queries = explode(';', $sql);

    $executed = 0;
    foreach ($queries as $query) {
        $query = trim($query);
        if (empty($query)) continue;
        
        try {
            $pdo->exec($query);
            $executed++;
        } catch (PDOException $e) {
            // On continue même si une requête échoue (ex: table déjà existante)
        }
    }

    echo json_encode([
        'status' => 'success',
        'message' => "Base de données mise à jour ($executed requêtes exécutées)",
        'database' => DB_NAME
    ]);

} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
