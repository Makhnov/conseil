<?php
    function get_header($class) {
        include(__DIR__ . '/header.php');
    }

    function get_footer($class) {
        include(__DIR__ . '/footer.php');
    }

    function get_monde() {
        $url = get_url('/');
        header('Location: ' . $url);
    }

    function get_localite($str) {
        $url = get_url('/localite/') . $str;
        header('Location: ' . $url);
        exit;
    }    

    function get_emplacement($str1, $str2) {
        $url = get_url('/localite/') . $str1 . '/emplacement/' .$str2;
        //print_r($url);
        //header('Location: ' . $url);
        return $url;
    }    
    
    function afficher_personnages($id = null, $attr = null) {        
        $data = get_personnages($id, $attr);
        $personnages = $data['personnages'];
        $positions = $data['positions'];
        echo '<script>';
        echo 'const personnages = ' . json_encode($personnages) . ';';
        echo 'const positions = ' . json_encode($positions) . ';';
        echo '</script>';
    
        // var_dump($personnages);
        // var_dump($positions);
    
        $stockageImages = '/jdr/img/personnages/';
        $imgDiv = get_url('base') . $stockageImages;

        switch ($attr) {
            case 'emplacement':            
                foreach ($personnages as $index => $personnage) {
                    $id = $personnage->getIdPersonnage();
                    $slug = $personnage->getSlugPersonnage();
                    $classes = get_css($personnage->getNomPersonnage());
            
                    $url = get_url('/personnage/' . $slug);
                    $position = $positions[$index];
                    $urlImage = $position->getImage();
                    $image = str_replace('../', $imgDiv, $urlImage);
                    $hover = str_replace('Min', 'Hover', $image);
                    $classes_css = str_replace(' ', '.', $classes);
            
                    $dataCSS = [
                        'classe' => $classes_css,
                        'image' => $image,
                        'imageHover' => $hover,
                        'top' => $position->getTop(),
                        'left' => $position->getLeft(),
                        'height' => $position->getHeight(),
                        'width' => $position->getWidth(),
                        'scaling' => $position->getScaling(),
                        'zIndex' => $position->getZIndex(),
                    ];
            
                    $codeCSS = "
                        .{$dataCSS['classe']} {
                            background-image: {$dataCSS['image']};
                            top: {$dataCSS['top']}%;
                            left: {$dataCSS['left']}%;
                            width: calc({$dataCSS['width']} * 50px);
                            height: calc({$dataCSS['height']} * 80px);
                            z-index: {$dataCSS['zIndex']};
                        }
            
                        .{$dataCSS['classe']}:hover {
                            background-image: {$dataCSS['imageHover']};
                            transform: scale({$dataCSS['scaling']});
                        }
                    ";
            
                    echo '<a href="' . $url . '">';
                    echo "<style>{$codeCSS}</style>";
                    echo '<div id="' . $id . '" class="' . $classes . '"></div>';
                    echo '</a>';
                }
                break;
                case null:
                    switch ($id) {
                        case is_int($id):
                            $personnage = $personnages[0];
                            $position = $positions[0];
                            echo '<h1>' . $personnage->getNomPersonnage() . '</h1>';
                            echo '<div id="fonctions">';
                            echo '<h2>' . $personnage->getTitrePersonnage() . '</h2>';
                            echo '<h3>' . $personnage->getRolePersonnage() . '</h3>';
                            echo '</div>';
                            echo '<p>' . $personnage->getDescriptionPersonnage() . '</p>';
                            echo '<img id="infosModif" src="../../divers/img/info.png" alt="informations">';
                            echo '<button id="modifier" type="button" data-id="' . $id . '">Modifier la description</button>';
                            echo '<div id="bgConseil"></div>';
                            echo '<div id="imageConseil" class="' . $personnage->getSlugPersonnage() . '" onclick="fullscreenCharacter()"></div>';
                            break;
                        case is_string($id):
                            $personnage = $personnages[0];
                            $position = $positions[0];
                            $classe = $personnage->getSlugPersonnage();

                            echo '<h1>' . $personnage->getNomPersonnage() . '</h1>';
                            echo '<div id="fonctions">';
                            echo '<h2>' . $personnage->getTitrePersonnage() . '</h2>';
                            echo '<h3>' . $personnage->getRolePersonnage() . '</h3>';
                            echo '</div>';
                            echo '<p>' . $personnage->getDescriptionPersonnage() . '</p>';
                            echo '<img id="infosModif" src="../../divers/img/info.png" alt="informations">';
                            echo '<button id="modifier" type="button" data-slug="' . $id . '">Modifier la description</button>';
                            echo '<div id="bgConseil"></div>';

                            echo '<div id="imageConseil" class="' . $classe . '">';
                            
                            $urlImage = $position->getImage();
                            $image = str_replace('../', $imgDiv, $urlImage);
                            $img = str_replace('Min', '', $image);
                    
                            $codeCSS = "
                                .{$classe} {
                                    background-image: {$img};
                                }
                            ";
                            echo "<style>{$codeCSS}</style></div>";
                            break;
                    }
                    break;
                break;
        }
    }
    
    
    

    function css_personnages() {

        /*
        foreach($persosDivs as $id => $div) {       

        
            $codeCSS = "
                .{$dataCSS['classe']} {
                    background-image: url('{$dataCSS['image']}');
                    top: {$dataCSS['top']}%;
                    left: {$dataCSS['left']}%;
                    width: calc({$dataCSS['width']} * 50px);
                    height: calc({$dataCSS['height']} * 80px);
                    z-index: {$dataCSS['zIndex']};
                }
        
                .{$dataCSS['classe']}:hover {
                    background-image: url('{$dataCSS['imageHover']}');
                    transform: scale({$dataCSS['scaling']});
                }
            ";
            
            echo "<style>{$codeCSS}</style>";
        }*/
    }  

    function afficher_region($region, $position_id, $children) {
        $position = $position_id[$region['id']];
        $scaling = json_decode($position['scaling']);
        $zIndex = json_decode($position['zIndex']);
        $image = json_decode($position['image']);
    
        echo '<g id="' . $region['nom'] . '" data-nom="' . $region['fr'] . '" data-capitale="' . $region['capitale'] . '" data-population="' . $region['population'] . '" data-description="' . $region['description'] . '">';
        for ($i = 0; $i < count($scaling); $i++) {
            echo '<path id="' . $scaling[$i] . '" class="' . $zIndex[$i] . '" d="' . $image[$i] . '"></path>';
        }
        
        if (array_key_exists($region['id'], $children)) {
            foreach ($children[$region['id']] as $child) {
                afficher_region($child, $position_id, $children);
            }
        }
        
        echo '</g>';
    }
    

    function afficher_regions() {
        list($regions, $position_id, $region_id) = get_regions();
    
        // Préparer un tableau pour stocker les enfants de chaque région
        $children = [];
        $regionsForJs = [];
        foreach ($regions as $region) {
            // Remplir le tableau avec les informations pour JavaScript
            $regionsForJs[] = [
                'id' => $region['id'],
                'nom' => $region['nom'],
                'fr' => $region['fr'],
                'description' => $region['description'],
                'coutumes' => $region['coutumes'],
                'id_region_mere' => $region['region_mere_id'],
            ];
            if ($region['region_mere_id'] != 1000) {
                $children[$region['region_mere_id']][] = $region;
            }
        }
    
        // Convertir le tableau en JSON
        $regionsJson = json_encode($regionsForJs);
        // Écrire le script JavaScript pour définir une variable avec les informations des régions
        echo "<script>const regions = $regionsJson;</script>";
    
        foreach ($regions as $region) {
            if ($region['region_mere_id'] == 1000) {
                afficher_region($region, $position_id, $children);
            }
        }
    }
     
?>
    