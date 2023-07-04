<?php
$class = 'localite';

include(__DIR__ . '/../model/data.php');
include(__DIR__ . '/../model/connect.php');
include(__DIR__ . '/../model/constructeur.php');
include(__DIR__ . '/../model/getters.php');
include(__DIR__ . '/../controller/functions.php');
include(__DIR__ . '/vues.php');

$localite = $_GET[$class];
$data = $localites[$localite];
?>

<?php
get_header($class);
?>

<main>
    <h1>Bienvenue dans <?php echo ucfirst($localite); ?></h1>
    <h3>Choisissez un emplacement</h3>
    <ul>
        <?php
        foreach ($data as $emplacement) {
            $slug = '/localite/' . $localite . '/emplacement/' . $emplacement[0] . '">'; 
            echo '<li><a href="' . get_url($slug) . $emplacement[1] . '</a></li>';
        }
        ?>
    </ul>
</main>

<?php
get_footer($class);
?>
