<?php

  require 'config.php';
  
  session_start();
  $idUser = $_SESSION['idUser'];
  
  $conn = mysql_connect($_CONFIG['host'], $_CONFIG['user'], $_CONFIG['pass']) or die('Impossibile stabilire una connessione: ' . mysql_error());
  mysql_select_db($_CONFIG['dbname']);

  $sql = "      
    SELECT month(s.dataSpesa) as mese, year(s.dataSpesa) as anno, replace(cast(sum(importo) as char), '.', ',') as totale, sum(importo) as importo
      FROM qsSpese s
     WHERE idUser = $idUser 
     GROUP BY month(s.dataSpesa), year(s.dataSpesa)
     ORDER BY month(s.dataSpesa) desc, year(s.dataSpesa) desc
  ";
  $result = mysql_query($sql) or die(mysql_error());
  
  $sqlFields = 'SHOW FIELDS FROM qsSpese';
  $resultFields = mysql_query($sqlFields) or die(mysql_error());

  $numRows = mysql_num_rows($result);
  $data = array();
  $fields = array();
  
  /*while ($row = mysql_fetch_assoc($resultFields)) {
    $fields[] = array(
        'type' => 'string',
        'name' => $row['Field']
    );
  }*/
  
  $fields[] = array(
      'type' => 'string',
      'name' => 'numMese'
  );
  $fields[] = array(
      'type' => 'string',
      'name' => 'mese'
  );
  $fields[] = array(
      'type' => 'string',
      'name' => 'anno'
  );
  $fields[] = array(
      'type' => 'string',
      'name' => 'importo'
  );
  $fields[] = array(
      'type' => 'integer',
      'name' => 'importoRaw'
  );

  $data['success'] = 'true';
  $data['metaData'] = array(
      'fields' => $fields,
      'totalProperty' => 'numRecord',
      'root' => 'rows'
  );
  $data['successProperty'] = 'success';
  $data['numRecord'] = $numRows;
  $data['rows'] = array();
  
  $nomemese = array (1 => "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre");

  while ($row = mysql_fetch_assoc($result)) {
      $meseDes = $nomemese[$row['mese']];
      $data['rows'][] = array(
          'numMese' => $row['mese'],
          'mese' => $meseDes,
          'anno' => $row['anno'],
          'importo' => $row['totale'],
          'importoRaw' => $row['importo']
      );
  }
  
  echo json_encode($data);
  
  mysql_close($conn);

?>


