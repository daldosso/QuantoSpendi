<?php

  require 'config.php';
  
  session_start();
  $idUser = $_SESSION['idUser'];
  
  $conn = mysql_connect($_CONFIG['host'], $_CONFIG['user'], $_CONFIG['pass']) or die('Impossibile stabilire una connessione: ' . mysql_error());
  mysql_select_db($_CONFIG['dbname']);

  $sql = "      
        SELECT CAST(AVG(t.totale) AS DECIMAL) AS spesaMedia
          FROM (
             SELECT SUM(s.importo) AS totale
               FROM qsSpese s
              WHERE idUser = $idUser 
                AND MONTH(s.dataSpesa) < MONTH(CURDATE())
           GROUP BY MONTH(s.dataSpesa)
          ) AS t
  ";
  $result = mysql_query($sql) or die(mysql_error());
  $row = mysql_fetch_assoc($result);
  $response = array();
  $response['spesaMedia'] = $row['spesaMedia'] . ',00';
  echo json_encode($response);
  
  mysql_close($conn);

?>


