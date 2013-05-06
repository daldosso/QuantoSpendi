<?php

  function getDateFromString($inputDate) {
      $d = substr($inputDate, 0, 4);
      $m = substr($inputDate, 5, 2);
      $y = substr($inputDate, 7, 2);
      return mktime(0, 0, 0, $m, $d, $y);
  }

?>
