<?php

  include 'connection.php';

  // prepare variable to be inputted in DB
  $orderId = (int) $_GET['orderId'];

  $get_confirmed_car_quantity = "SELECT
  orders.car_quantity AS quantity,
  cars.stock AS stock,
  orders.car_id AS car_id
  FROM orders, cars
  WHERE orders._id = $orderId
  AND orders.car_id = cars._id";
  
  $product_stock_result = mysqli_query($conn, $get_confirmed_car_quantity);
  $product_stock_array = mysqli_fetch_assoc($product_stock_result);
  $product_stock = $product_stock_array["stock"]; 
  $ordered_stock = $product_stock_array["quantity"]; 
  $carId = $product_stock_array["car_id"];
  
  $final_car_stock = $product_stock - $ordered_stock;
  
  if($final_car_stock < 0) {
    throw new Exception("your car quantity order total exceed available in our database!", 1);
  } else {
    $update_car_quantity_query = "UPDATE cars SET stock = $final_car_stock WHERE _id = $carId;";
    mysqli_query($conn, $update_car_quantity_query);
  }
  
// insert order data to db after stock successfully decreased
  $confirm_order = "UPDATE orders SET status = 1 WHERE _id = $orderId;";

  mysqli_query($conn, $confirm_order);

  $result = array("_id"=>1);
  
  print json_encode($result);
?>