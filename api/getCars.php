<?php

  include 'connection.php';


  $searchParams = $_GET['search'];
  $category = $_GET['category'];
  
  $additionalQuery = '';

  if($searchParams) {
    $additionalQuery = $additionalQuery." AND (cars.car_name LIKE '%$searchParams%' OR categories.name LIKE '%$searchParams%')";
  }
  if($category) {
    $additionalQuery = $additionalQuery." AND cars.category_id = $category";    
  } 

   $query_string = "SELECT cars._id AS _id, cars.car_name AS name, cars.price AS price, cars.stock AS stock, cars.image AS image, categories.name AS brand FROM cars, categories WHERE cars.category_id = categories._id $additionalQuery ORDER BY cars.car_name ASC";
   
   $result = mysqli_query($conn, $query_string);
   $rows = array();
  while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
  }

   print json_encode($rows);
?>