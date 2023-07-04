<?php
    function get_personnages($id = null, $attr = null) {
        // Connexion à la base de données
        try {
            $PDO = connect();
        } catch (PDOException $e) {
            print "Erreur !: " . $e->getMessage() . "<br/>";
            die();
        }

        // Récupération des données de la table Personnage
        $personnages = array();

        if ($attr === 'localite') {
            // Récupération des personnages liés à l'id_localite donné
            $requete = $PDO->prepare("SELECT personnage.*, position.* FROM personnage LEFT JOIN position ON personnage.id = position.id_personnage WHERE personnage.id_localite = :id");
            $requete->bindParam(':id', $id, PDO::PARAM_INT);
            $requete->execute();
        } elseif ($attr === 'emplacement') {
            // Récupération des personnages liés à l'id_emplacement donné
            $requete = $PDO->prepare("SELECT personnage.*, position.* FROM personnage LEFT JOIN position ON personnage.id = position.id_personnage WHERE personnage.id_emplacement = :id");
            $requete->bindParam(':id', $id, PDO::PARAM_INT);
            $requete->execute();
        } elseif ($id !== null) {
            // Récupération du personnage avec l'id donné
            $requete = $PDO->prepare("SELECT personnage.*, position.* FROM personnage LEFT JOIN position ON personnage.id = position.id_personnage WHERE personnage.id = :id");
            $requete->bindParam(':id', $id, PDO::PARAM_INT);
            $requete->execute();
        } else {
            // Récupération de tous les personnages
            $requete = $PDO->prepare("SELECT personnage.*, position.* FROM personnage LEFT JOIN position ON personnage.id = position.id_personnage");
            $requete->execute();
        }

        while ($row = $requete->fetch(PDO::FETCH_ASSOC)) {
            $personnage = array(
                'id' => $row['id'],
                'nom' => $row['nom'],
                'titre' => $row['titre'],
                'role' => $row['role'],
                'description' => $row['description'],
                'positionId' => $row['id'],
                'position' => array(
                    'id' => $row['id'],
                    'top' => $row['top'],
                    'left' => $row['left'],
                    'height' => $row['height'],
                    'width' => $row['width'],
                    'scaling' => $row['scaling'],
                    'zIndex' => $row['zIndex'],
                    'image' => $row['image']
                )
            );
            array_push($personnages, $personnage);
        }

        // Retourner le tableau des personnages
        return $personnages;
    }

    function get_regions() {
        $db = connect();

        // requête pour obtenir les régions
        $stmt = $db->prepare("SELECT * FROM region WHERE id BETWEEN 2 AND 52");
        $stmt->execute();
        $regions = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // requête pour obtenir les positions
        $stmt = $db->prepare("SELECT * FROM position WHERE id_region BETWEEN 2 AND 52");
        $stmt->execute();
        $positions = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Indexer les régions et les positions par id pour faciliter l'accès
        $region_id = array_column($regions, null, 'id');
        $position_id = array_column($positions, null, 'id_region');

        return array($regions, $position_id, $region_id);
    }
?>
