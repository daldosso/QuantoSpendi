<?php

  require 'config.php';
  require 'utils.php';
  
  $success = false;
  
  session_start();

  if (isset($_SESSION['user'])) {
      $success = true;
  } else {
      $username = cleanPOST('username');
      $password = cleanPOST('password');
      
      $conn = mysql_connect($_CONFIG['host'], $_CONFIG['user'], $_CONFIG['pass']) or die('Impossibile stabilire una connessione: ' . mysql_error());
      mysql_select_db($_CONFIG['dbname']);

      $sql = "SELECT * FROM qsUsers WHERE username = '$username' AND password = '$password'";
      $result = mysql_query($sql) or die(mysql_error());
      $count = mysql_num_rows($result);

      if ($count == 1) {
          $row = mysql_fetch_array($result);
          $_SESSION['user'] = $row['username'];
          $success = true;
      }

      mysql_close($conn);
  }
  
  $response = array();
  $response['success'] = $success;
  echo json_encode($response);
?>
