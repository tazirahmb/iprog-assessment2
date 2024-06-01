<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$dbHost = 'localhost';
$dbUser = 'root';
$dbPass = 'pwd123';
$dbName = 'assignment2';

$conn = mysqli_connect($dbHost, $dbUser, $dbPass, $dbName);
   
  if (mysqli_connect_errno()) {
      echo "Failed to connect to MySQL: " . mysqli_connect_error();
      exit;
  }
?>