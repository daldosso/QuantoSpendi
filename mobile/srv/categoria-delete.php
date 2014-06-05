<?php

  require 'config.php';
  require 'utils.php';
  
  session_start();
  $idUser = $_SESSION['idUser'];
  
  if ($idUser == 1) {
      
    $idCategoria = $_POST["idCategoria"];

    $conn = mysql_connect($_CONFIG['host'], $_CONFIG['user'], $_CONFIG['pass']) or die('Impossibile stabilire una connessione: ' . mysql_error());
    mysql_select_db($_CONFIG['dbname']);

    $sql = "delete from qsCategorie where idCategoria = $idCategoria";
    mysql_query($sql) or die(mysql_error());

    mysql_close($conn);
      
  }

?>
