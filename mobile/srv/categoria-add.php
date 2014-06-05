<?php

  require 'config.php';

  $descrizione = strtoupper($_POST["descrizione"]);

  $conn = mysql_connect($_CONFIG['host'], $_CONFIG['user'], $_CONFIG['pass']) or die('Impossibile stabilire una connessione: ' . mysql_error());
  mysql_select_db($_CONFIG['dbname']);

  $sql = "insert into qsCategorie(descrizione) values ('$descrizione')";
  mysql_query($sql) or die(mysql_error());

  mysql_close($conn);
  
  echo "{ \"success\": true }";
?>
