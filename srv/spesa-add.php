<?php

  require 'config.php';
  require 'utils.php';
  
  session_start();
  $idUser = $_SESSION['idUser'];

  $data = $_POST["dataSpesa"];
  $importo = $_POST["importo"];
  $categoria = $_POST["categoria"];
  $note = cleanPOST("note");
  $idSpesa = cleanPOST("idSpesa");

  $conn = mysql_connect($_CONFIG['host'], $_CONFIG['user'], $_CONFIG['pass']) or die('Impossibile stabilire una connessione: ' . mysql_error());
  mysql_select_db($_CONFIG['dbname']);

  if ($idSpesa > 0) {
      $sql = "update qsSpese set dataSpesa = '$data', importo = '$importo', categoria = '$categoria', note = '$note', idUser = $idUser where idSpesa = $idSpesa";
  } else {
      $sql = "insert into qsSpese(dataSpesa, importo, categoria, note, idUser) values ('$data', '$importo', '$categoria', '$note', $idUser)";
  }
  
  mysql_query($sql) or die(mysql_error());

  mysql_close($conn);
  
  echo "{ \"success\": true }";
?>
