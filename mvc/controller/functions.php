<?php

function assets($asset, $class) {
    switch ($asset) {
        case 'css':
            echo '<link rel="stylesheet" href="' . get_url('/assets/main.css">');
            break;
        case 'js':
            echo '<script src="' . get_url('/assets/main.bundle.js') . '"></script>';
            switch ($class) {
                case 'accueil':
                    echo '<script src="' . get_url('/assets/accueil.bundle.js') . '"></script>';
                    break;
                case 'localite':
                    //echo '<script src="' . get_url('/assets/main.conseil.js') . '"></script>';
                    break;
                case 'emplacement':
                    echo '<script src="' . get_url('/assets/conseil.bundle.js') . '"></script>';
                    break;
                case 'annexe':
                    echo '<script src="' . get_url('/assets/annexe.bundle.js') . '"></script>';
                    break;
                default:
                    // Cas par défaut si aucun asset correspondant n'est spécifié
                    echo 'Classe non reconnue';
                    break;
            }
            break;
        default:
            // Cas par défaut si aucun asset correspondant n'est spécifié
            echo 'Asset non reconnu';
            break;
    }
}

function var_name($var) {
    foreach($GLOBALS as $key => $value) {
        if ($value === $var) {
            return $key;
        }
    }
    return false;
}

function tab_localite($tab) {
    $nomTableau = var_name($tab);
    $nomlocalite = substr($nomTableau, strpos($nomTableau, '_') + 1);
    $localite = array('localite' => $nomlocalite);
    return $localite;
}

function get_url($str) {
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https://' : 'http://';
    //echo $protocol;
    $host = $_SERVER['HTTP_HOST'];
    //echo $host;
    if ($str === 'base') {
        $url = $protocol . $host;
    } else {
        $path = absolutePath(rtrim(dirname($_SERVER['PHP_SELF']), '/'));
        //echo $path;
        $url = $protocol . $host . $path . $str;
    }
    return $url;
}

function absolutePath($string) {
    $parts = explode('/', $string, 3);
    
    if (count($parts) >= 3) {
        return '/' . $parts[1];
    } else {
        return $string;
    }
}

function get_css($string) {
    $string = strtolower($string);
    
    // Remplacement des caractères accentués
    $string = str_replace(
        ['à', 'â', 'ä', 'á', 'ã', 'å', 'æ', 'ç', 'è', 'é', 'ê', 'ë', 'ì', 'í', 'î', 'ï', 'ð', 'ñ', 'ò', 'ó', 'ô', 'ö', 'õ', 'ø', 'œ', 'ß', 'ù', 'ú', 'û', 'ü', 'ý', 'þ', 'ÿ'],
        ['a', 'a', 'a', 'a', 'a', 'a', 'ae', 'c', 'e', 'e', 'e', 'e', 'i', 'i', 'i', 'i', 'd', 'n', 'o', 'o', 'o', 'o', 'o', 'o', 'oe', 'ss', 'u', 'u', 'u', 'u', 'y', 'th', 'y'],
        $string
    );
       
    return $string;
}