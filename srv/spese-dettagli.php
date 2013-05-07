<?php

  require 'config.php';
  require 'utils.php';
  
  $mese = $_GET["mese"];
  $anno = $_GET["anno"];
  $idCategoria = $_GET["categoria"];
  $idSpesa = $_GET["idSpesa"];
  $match = $_GET["match"];
  
  $firstDay = getFirstDayOfMonth($mese, $anno);
  $lastDay = getLastDayOfMonth($mese, $anno);
  
  if ($idCategoria) {
      $where = "WHERE c.idCategoria = $idCategoria AND s.dataSpesa >= '$firstDay' AND s.dataSpesa <= '$lastDay'";
  }
  if ($idSpesa) {
      $where = "WHERE s.idSpesa = $idSpesa";
  }
  
  if ($match != '') {
      $where = "WHERE UPPER(s.note) like '%$match%'
                   OR UPPER(c.descrizione) like '%$match%'
                   OR DATE_FORMAT(s.dataSpesa, '%d/%m/%Y') like '%$match%'
               ";
  }
  
  $conn = mysql_connect($_CONFIG['host'], $_CONFIG['user'], $_CONFIG['pass']) or die('Impossibile stabilire una connessione: ' . mysql_error());
  mysql_select_db($_CONFIG['dbname']);

  $sql = "      
    SELECT s.*, DATE_FORMAT(s.dataSpesa, '%d/%m/%Y') as dataSpesa, replace(cast(s.importo as char), '.', ',') as importo,
           c.descrizione as categoria
      FROM qsSpese s
     INNER JOIN qsCategorie c ON (s.categoria = c.idCategoria)
     $where
     ORDER BY dataSpesa DESC
  ";
  
  $result = mysql_query($sql) or die(mysql_error());
  
  $sqlFields = 'SHOW FIELDS FROM qsSpese';
  $resultFields = mysql_query($sqlFields) or die(mysql_error());

  $numRows = mysql_num_rows($result);
  $data = array();
  $fields = array();
  
  while ($row = mysql_fetch_assoc($resultFields)) {
    $fields[] = array(
        'type' => 'string',
        'name' => $row['Field']
    );
  }
  
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
          'idSpesa' => $row['idSpesa'],
          'dataSpesa' => $row['dataSpesa'],
          'importo' => $row['importo'],
          'categoria' => $row['categoria'],
          'note' => $row['note']
      );
  }
  
  echo json_encode($data);
  
  mysql_close($conn);

?>
