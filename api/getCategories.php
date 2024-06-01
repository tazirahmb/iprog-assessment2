<?php

  include 'connection.php';

   $query_string = "SELECT * FROM categories";
   
   $result = mysqli_query($conn, $query_string);

   $rows = array();
  while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
  }

   print json_encode($rows);
?>