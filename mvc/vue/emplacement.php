<?php
$class = 'emplacement';

include(__DIR__ . '/../model/data.php');
include(__DIR__ . '/../model/connect.php');
include(__DIR__ . '/../model/constructeur.php');
include(__DIR__ . '/../model/getters.php');
include(__DIR__ . '/../controller/functions.php');
include(__DIR__ . '/vues.php');

$localite = $_GET['localite'];
$emplacement = $_GET['emplacement'];
?>

<?php
get_header($class);
?>

<main>
    <?php 
        echo '<div id="scene">';
        echo '<div id="salleDuConseil">';
        afficher_personnages(1011,'emplacement');
        echo '</div>';
        echo '<div>'; 
        ?>
</main>

<?php
get_footer($class);
?>
