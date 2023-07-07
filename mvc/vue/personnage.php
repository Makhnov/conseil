<?php
$class = 'personnage';

include(__DIR__ . '/../model/data.php');
include(__DIR__ . '/../model/connect.php');
include(__DIR__ . '/../model/constructeur.php');
include(__DIR__ . '/../model/getters.php');
include(__DIR__ . '/../controller/functions.php');
include(__DIR__ . '/vues.php');

$personnage = $_GET['personnage'];
?>

<?php
get_header($class);
?>

<main class="bodyProfil">
    <form method="GET" action="../index2.php">
        <textarea id="inputText" name="description"></textarea>                
        <input type="text" name="id" value="14">
        <input id ="validationPhp" type="submit" value="Valider">
    </form>

    <div id="sceneProfil">
        
        <?php afficher_personnages($personnage) ?>

    </div>
</main>

<?php
get_footer($class);
?>