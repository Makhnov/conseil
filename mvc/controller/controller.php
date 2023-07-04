<?php
    header ("Access-Control-Allow-Origin: *");
    include __DIR__ . '/../model/connect.php';
    include __DIR__ . '/../model/constructeur.php';

    // Connexion à la base de données
try {
    $PDO = connect();
} catch (PDOException $e) {
    print "Erreur !: " . $e->getMessage() . "<br/>";
    die();
}

// Récupération des données de la table Personnage
$personnages = array();
$requete = $PDO->prepare("SELECT * FROM personnage");
$requete->execute();
while ($row = $requete->fetch(PDO::FETCH_ASSOC)) {
    $personnage = array(
        'id' => $row['id'],
        'nom' => $row['nom'],
        'titre' => $row['titre'],
        'role' => $row['role'],
        'description' => $row['description'],
        'position_id' => $row['position_id']
    );
    array_push($personnages, $personnage);
}

// Récupération des données de la table Position
$positions = array();
$requete = $PDO->prepare("SELECT * FROM position");
$requete->execute();
while ($row = $requete->fetch(PDO::FETCH_ASSOC)) {
    $position = array(
        'id' => $row['id'],
        'top' => $row['top'],
        'left' => $row['left'],
        'height' => $row['height'],
        'width' => $row['width'],
        'scaling' => $row['scaling'],
        'zIndex' => $row['zIndex'],
        'image' => $row['image']
    );
    array_push($positions, $position);
}

// Combinaison des données des deux tableaux
$resultat = array();
foreach ($personnages as $personnage) {
    foreach ($positions as $position) {
        if ($personnage['position_id'] == $position['id']) {
            $personnage['position'] = $position;
            array_push($resultat, $personnage);
            break;
        }
    }
}

// Conversion des données en JSON et envoi de la réponse
echo json_encode($resultat);
?>

<?php
/*
    if (isset($_GET['id']) AND isset($_GET['description'])) {
        $id = $_GET['id'];
        $description = $_GET['description'];
        descriptionEdit($bdd, $description, $id);
        header('location: '.$_SERVER['HTTP_REFERER'].'');
    }

    $data = showAllArticle($bdd);
    echo json_encode($data);

    function showAllArticle($bdd){
            try {
                $requete = "SELECT * from personnages";
                $req = $bdd->prepare($requete);
                $req->execute();
                $data = $req->fetchAll(PDO::FETCH_ASSOC);
                return $data;
            }    
            catch (Exception $e) 
            {
                //affichage d'une exception en cas d’erreur
                die('Erreur : '.$e->getMessage());
            }
        }

    function descriptionEdit($bdd, $description, $id) {
        try {
            $requete = "UPDATE personnages set description = '$description' where id = '$id'";
            $req = $bdd->prepare($requete);
            $req->execute();
            $data = $req->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        }    
        catch (Exception $e) 
        {
            //affichage d'une exception en cas d’erreur
            die('Erreur : '.$e->getMessage());
        }
    }
*/
?>