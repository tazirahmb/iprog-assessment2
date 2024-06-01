<?php

  include 'connection.php';

  // prepare variable to be inputted in DB
  $orderId = random_int(10000000, 99999999); // generate random ID
  $fullName = $_POST['firstName']." ".$_POST['lastName'];
  $email = $_POST['email'];
  $phoneNumber =(int) $_POST['phoneNumber'];
  $carId = (int) $_POST['_id'];
  $carQty = (int) $_POST['qty'];
  $startDate = $_POST['startDate'];
  $endDate = $_POST['endDate'];
  $totalPrice = (int) $_POST['totalPrice'];

  $get_car_quantity = "SELECT stock FROM cars WHERE _id = $carId";
  
  $product_stock_result = mysqli_query($conn, $get_car_quantity);
  $product_stock_array = mysqli_fetch_assoc($product_stock_result);
  $product_stock = $product_stock_array["stock"]; // received product stock from database;

  $final_car_stock = $product_stock - $carQty;
  
  if($final_car_stock < 0) {
    throw new Exception("your car quantity order total exceed available in our database!", 1);
  } else {
    $update_car_quantity_query = "UPDATE cars
      SET stock = $final_car_stock
      WHERE _id = $carId;";
    mysqli_query($conn, $update_car_quantity_query);
  }

// insert order data to db after stock successfully decreased
  $add_order_query = "INSERT INTO orders(_id, full_name, phone_number, email, car_id, car_quantity, start_date, end_date, total_price) VALUES('$orderId', '$fullName', '$phoneNumber', '$email', '$carId', '$carQty', '$startDate', '$endDate', '$totalPrice')";
  mysqli_query($conn, $add_order_query);

  $result = array("_id"=>$orderId);
  
  print json_encode($result);
?>