<?php

// include 'vendor/autoload.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

// $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
// $dotenv->load();

$dbHost = 'localhost';
$dbUser = 'root';
$dbPass = 'pwd123';
$dbName = 'assignment2';

// $dbHost = $_ENV['DB_HOST'];
// $dbUser = $_ENV['DB_USER'];
// $dbPass = $_ENV['DB_PASS'];
// $dbName = $_ENV['DB_NAME'];

$conn = mysqli_connect($dbHost, $dbUser, $dbPass, $dbName);
   
  if (mysqli_connect_errno()) {
      echo "Failed to connect to MySQL: " . mysqli_connect_error();
      exit;
  }
?>