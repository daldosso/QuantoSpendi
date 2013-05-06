<?php

  require 'config.php';
  require 'utils.php';

  $data = $_POST["data"];
  $importo = $_POST["importo"];
  $categoria = $_POST["categoria"];
  $note = $_POST["note"];

  $conn = mysql_connect($_CONFIG['host'], $_CONFIG['user'], $_CONFIG['pass']) or die('Impossibile stabilire una connessione: ' . mysql_error());
  mysql_select_db($_CONFIG['dbname']);

  $sql = "insert into qsSpese(dataSpesa, importo, categoria, note) values ('$data', '$importo', '$categoria', '$note')";
  mysql_query($sql) or die(mysql_error());

  mysql_close($conn);
  
  echo "{ success: true }";
?>
