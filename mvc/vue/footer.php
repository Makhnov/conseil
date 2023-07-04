        <footer>     
        <?php
            switch ($class) {
                case 'accueil':
                    ?>
                        </footer>
                    <?php
                    assets('js', 'accueil');
                    break;
                case 'localite':
                    ?>
                        <p>FOOTER</p>
                        </footer>
                    <?php
                    assets('js', 'localite');
                    break;

                case 'emplacement':
                    ?>
                        <p>FOOTER</p>
                        </footer>
                    <?php
                    assets('js', 'emplacement');
                    break;

                case 'personnage':
                    ?>
                        <p>FOOTER</p>
                        </footer>
                    <?php
                    assets('js', 'personnage');
                    break;

                default:
                    // Aucun fichier JavaScript à charger pour cette classe
                    break;
            }
        ?>  
    </body>
</html>