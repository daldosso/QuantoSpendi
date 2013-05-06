<?php

  require 'config.php';
  require 'utils.php';

  $idSpesa = $_POST["id"];

  $conn = mysql_connect($_CONFIG['host'], $_CONFIG['user'], $_CONFIG['pass']) or die('Impossibile stabilire una connessione: ' . mysql_error());
  mysql_select_db($_CONFIG['dbname']);

  $sql = "delete from qsSpese where idSpesa = $idSpesa";
  mysql_query($sql) or die(mysql_error());

  mysql_close($conn);
?>
