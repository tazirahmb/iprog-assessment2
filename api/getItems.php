<?php

  include 'connection.php';


  $searchParams = $_GET['search'];
  $category = $_GET['category'];
  
  $additionalQuery = '';

  if($searchParams) {
    $additionalQuery = $additionalQuery." AND products.product_name LIKE '%$searchParams%'";    
  }
  if($category) {
    $additionalQuery = $additionalQuery." AND products.categories_id = $category";    
  } 

   $query_string = "SELECT products.product_id AS _id, products.product_name AS name, products.unit_price AS price, products.unit_quantity AS unit, products.in_stock AS stock, products.image_url AS image, categories.categories_name FROM products, categories WHERE products.categories_id = categories.categories_id $additionalQuery ORDER BY products.categories_id ASC";
   
   $result = mysqli_query($conn, $query_string);
   $rows = array();
  while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
  }

   print json_encode($rows);
?>