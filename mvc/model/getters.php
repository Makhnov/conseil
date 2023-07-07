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
        $positions = array();
        
        if ($attr === 'localite') {
            // Récupération des personnages liés à l'id_localite donné
            $requete = $PDO->prepare("SELECT personnage.*, position.* FROM personnage LEFT JOIN position ON personnage.id = position.id_personnage WHERE personnage.id_localite = :id");
            $requete->bindParam(':id', $id, PDO::PARAM_INT);
            $requete->execute();
        } elseif ($attr === 'emplacement') {
            // Récupération des personnages liés à l'id_emplacement donné
            $requete = $PDO->prepare("
                SELECT 
                    personnage.id, 
                    personnage.nom, 
                    personnage.slug, 
                    personnage.titre, 
                    personnage.role, 
                    personnage.description, 
                    personnage.id_localite AS personnage_id_localite, 
                    personnage.id_emplacement AS personnage_id_emplacement,
                    position.id, 
                    position.top, 
                    position.left, 
                    position.height, 
                    position.width, 
                    position.scaling, 
                    position.zIndex, 
                    position.image,
                    position.id_localite AS position_id_localite,
                    position.id_personnage AS position_id_personnage,
                    position.id_region AS position_id_region,
                    position.id_emplacement AS position_id_emplacement
                FROM 
                    personnage 
                LEFT JOIN 
                    position 
                ON 
                    personnage.id = position.id_personnage 
                WHERE 
                    personnage.id_emplacement = :id
            ");
            $requete->bindParam(':id', $id, PDO::PARAM_INT);
            $requete->execute();
        } elseif ($id !== null) {
            if (is_numeric($id)) {
                // Recherche par ID
                $requete = $PDO->prepare("
                    SELECT 
                        personnage.id, 
                        personnage.nom, 
                        personnage.slug, 
                        personnage.titre, 
                        personnage.role, 
                        personnage.description, 
                        personnage.id_localite AS personnage_id_localite, 
                        personnage.id_emplacement AS personnage_id_emplacement,
                        position.id, 
                        position.top, 
                        position.left, 
                        position.height, 
                        position.width, 
                        position.scaling, 
                        position.zIndex, 
                        position.image,
                        position.id_localite AS position_id_localite,
                        position.id_personnage AS position_id_personnage,
                        position.id_region AS position_id_region,
                        position.id_emplacement AS position_id_emplacement
                    FROM 
                        personnage 
                    LEFT JOIN 
                        position 
                    ON 
                        personnage.id = position.id_personnage 
                    WHERE 
                        personnage.id = :id
                ");
            } else {
                // Recherche par slug
                $requete = $PDO->prepare("
                    SELECT 
                        personnage.id, 
                        personnage.nom, 
                        personnage.slug, 
                        personnage.titre, 
                        personnage.role, 
                        personnage.description, 
                        personnage.id_localite AS personnage_id_localite, 
                        personnage.id_emplacement AS personnage_id_emplacement,
                        position.id, 
                        position.top, 
                        position.left, 
                        position.height, 
                        position.width, 
                        position.scaling, 
                        position.zIndex, 
                        position.image,
                        position.id_localite AS position_id_localite,
                        position.id_personnage AS position_id_personnage,
                        position.id_region AS position_id_region,
                        position.id_emplacement AS position_id_emplacement
                    FROM 
                        personnage 
                    LEFT JOIN 
                        position 
                    ON 
                        personnage.id = position.id_personnage 
                    WHERE 
                        personnage.slug = :slug
                ");
                $requete->bindParam(':slug', $id, PDO::PARAM_STR);
            }
        
            $requete->execute();
        } else {
            // Récupération de tous les personnages
            $requete = $PDO->prepare("SELECT personnage.*, position.* FROM personnage LEFT JOIN position ON personnage.id = position.id_personnage");
            $requete->execute();
        }

        while ($row = $requete->fetch(PDO::FETCH_ASSOC)) {
            $personnage = new Personnage(
                intval($row['id']),
                $row['nom'],
                $row['slug'],
                $row['titre'],
                $row['role'],
                $row['description'],
                intval($row['personnage_id_localite']),
                intval($row['personnage_id_emplacement'])
            );      
        
            $position = new Position(
                intval($row['id']),
                floatval($row['top']),
                floatval($row['left']),
                floatval($row['height']),
                floatval($row['width']),
                $row['scaling'],
                $row['zIndex'],
                $row['image'],
                is_null($row['position_id_localite']) ? null : intval($row['position_id_localite']),
                is_null($row['position_id_personnage']) ? null : intval($row['position_id_personnage']),
                is_null($row['position_id_region']) ? null : intval($row['position_id_region']),
                is_null($row['position_id_emplacement']) ? null : intval($row['position_id_emplacement'])
            );
        
            array_push($personnages, $personnage);
            array_push($positions, $position);
        }
        
        return ['personnages' => $personnages, 'positions' => $positions];
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
