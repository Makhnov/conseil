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

<main>
    <?php afficher_personnages(10) ?>
</main>

<?php
get_footer($class);
?>