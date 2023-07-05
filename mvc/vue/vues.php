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
        $personnages = get_personnages($id, $attr);
        $stockageImages = '/jdr/img/personnages/';
        $imgDiv = get_url('base') . $stockageImages;

        echo '<script>';
        echo 'const personnages = ' . json_encode($personnages) . ';';
        echo '</script>';

        foreach ($personnages as $personnage) {
            $id = $personnage['id'];
            $nom = $personnage['nom'];
            $classes = get_css($nom);

            $url = get_url('/personnage/' . urlencode(strtolower($nom)));
            //var_dump($personnages);
            //echo '<br>';
            $data = $personnage['position'];
            //var_dump($data);
            //echo '<br>';
            $urlImage = $data['image'];
            //print_r($classes);
            //echo '<br>';
            $image = str_replace('../', $imgDiv, $urlImage);
            //print_r($image);
            //echo '<br>';
            $hover = str_replace('Min', 'Hover', $image);
            //print_r($hover);
            //echo '<br>';
            $classes_css = str_replace(' ', '.', $classes);
            //print_r($classes_css);
            //echo '<br>';

            $dataCSS = [
                'classe' => $classes_css,
                'image' => $image,
                'imageHover' => $hover,
                'top' => $data['top'],
                'left' => $data['left'],
                'height' => $data['height'],
                'width' => $data['width'],
                'scaling' => $data['scaling'],
                'zIndex' => $data['zIndex'],
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
    