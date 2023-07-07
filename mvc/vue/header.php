<!DOCTYPE html>
<html>

    <head>
        <title>Feerune</title>

        <meta name="author" content="Nico M">
        <meta name="description" content="Aide pour campagne dans les royaumes oubliés">

        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <?php assets('css', 'header'); ?>
        <link rel="icon" type="image/x-icon" href="<?php echo get_url('/img/favdnd.ico') ?>">
        <?php echo '<'.'?xml version="1.0" encoding="utf-8"?'.'>';?>
    </head>
        <body class="<?php echo $class; ?>" <?php //if ($class === 'accueil') { [FINPHPHERE] onload="init()"<?php } ?>>
            <header>
                <?php
                switch ($class) {
                    case 'acceuil':
                        ?>
                            </header>
                        <?php
                        break;

                    case 'personnage':
                        ?>
                            <nav>
                                <a href="<?php echo get_url('') ?>" id="retour"></a>
                            </nav>
                            <nav>
                                <button id="validation" type="button" onclick="validation()">Valider</button>
                                <button id="edition" type="button" onclick="edition()">Editer</button>
                            </nav>
                            </header>
                        <?php
                        break;

                    default:
                        ?>
                            <p>HEADER</p>
                            </header>
                        <?php
                        break;
                }
                ?>

