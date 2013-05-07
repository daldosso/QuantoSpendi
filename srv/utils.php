<?php

  // funzione utilizzata per "pulire" i dati in input, evita XXS e SQLInjection
  function cleanInput($input) {
      $input = htmlspecialchars(stripslashes($input));
      $input = str_ireplace("script", "blocked", $input);
      $input = addslashes($input);
//      $input = mysql_real_escape_string($input);
      return $input;
  }

  function cleanPOST($input) {
      if (isset($_POST[$input])) {
          return cleanInput($_POST[$input]);
      } else {
          return '';
      }
  }

  function cleanGET($input) {
      if (isset($_GET[$input])) {
          return cleanInput($_GET[$input]);
      } else {
          return '';
      }
  }

  function cleanParam($input) {
      if (isset($_REQUEST[$input])) {
          return cleanInput($_REQUEST[$input]);
      } else {
          return '';
      }
  }

  function getDateFromString($inputDate) {
      $d = substr($inputDate, 0, 4);
      $m = substr($inputDate, 5, 2);
      $y = substr($inputDate, 7, 2);
      return mktime(0, 0, 0, $m, $d, $y);
  }

  function getFirstDayOfMonth($m, $y) {
      return date('Y-m-d', mktime(0, 0, 0, $m, 1, $y));
  }

  function getLastDayOfMonth($m, $y) {
      return date('Y-m-t', mktime(0, 0, 0, $m, 1, $y));
  }

?>
