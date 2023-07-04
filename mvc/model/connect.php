<?php
    include __DIR__ . '/../../config.php';

    function connect() {
        $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME; 
        $user = DB_USER;
        $pass = DB_PASS;
        $err = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION); 

        $PDO = new PDO($dsn, $user, $pass, $err);
        $PDO->exec("set names utf8");
        return $PDO; 
    }
?>
