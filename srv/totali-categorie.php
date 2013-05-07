<?php

  require 'config.php';
  
  $mese = $_GET["mese"];
  $anno = $_GET["anno"];
  
  if (!$mese) { $mese = 0; }
  if (!$anno) { $anno = 0; }
  
  $conn = mysql_connect($_CONFIG['host'], $_CONFIG['user'], $_CONFIG['pass']) or die('Impossibile stabilire una connessione: ' . mysql_error());
  mysql_select_db($_CONFIG['dbname']);

  $sql = "      
    SELECT c.idCategoria, c.descrizione, replace(cast(coalesce(sum(s.importo), 0) as char), '.', ',') as totale
      FROM qsCategorie c
      LEFT JOIN qsSpese s ON (s.categoria = c.idCategoria and month(s.dataSpesa) = $mese AND year(s.dataSpesa) = $anno)
     GROUP BY c.idCategoria
     ORDER BY c.descrizione
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
      'name' => 'idCategoria'
  );
  $fields[] = array(
      'type' => 'string',
      'name' => 'descrizione'
  );
  $fields[] = array(
      'type' => 'string',
      'name' => 'importo'
  );
  $fields[] = array(
      'type' => 'string',
      'name' => 'mese'
  );
  $fields[] = array(
      'type' => 'string',
      'name' => 'anno'
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
  
  while ($row = mysql_fetch_assoc($result)) {
      $data['rows'][] = array(
          'idCategoria' => $row['idCategoria'],
          'descrizione' => $row['descrizione'],
          'importo' => $row['totale'],
          'mese' => $mese,
          'anno' => $anno
      );
  }
  
  echo json_encode($data);
  
  mysql_close($conn);

?>


