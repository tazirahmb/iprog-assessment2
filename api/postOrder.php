<?php

  include 'connection.php';

  // prepare variable to be inputted in DB
  $orderId = random_int(10000000, 99999999); // generate random ID
  $fullName = $_POST['firstName']." ".$_POST['lastName'];
  $email = $_POST['email'];
  $phoneNumber = $_POST['phoneNumber'];
  $fullAddress = $_POST['address'].', '.$_POST['suburb'].' '.$_POST['state'].' '.$_POST['postcode'];
  $orderJson = $_POST['order'];

  // processing order quantity
  $orderArray = json_decode($_POST['order']);

  foreach($orderArray as $key => $value) {
    $productId = $value->_id;
    $orderQtyPaid = $value->quantity;

    // get product qty in db
    $get_product_quantity = "SELECT in_stock FROM products WHERE product_id = $productId";

    $product_stock_result = mysqli_query($conn, $get_product_quantity);
    $product_stock_array = mysqli_fetch_assoc($product_stock_result);
    $product_stock = $product_stock_array["in_stock"]; // received product stock from database;

    $final_product_stock = $product_stock - $orderQtyPaid;

    if($final_product_stock < 0) {
      throw new Exception("One or more of your Product Stock already sold out. Please check your cart again!", 1);      
    } else { 
      
      $update_products_quantity_query = "UPDATE products
        SET in_stock = $final_product_stock
        WHERE product_id = $productId;";
      mysqli_query($conn, $update_products_quantity_query);
    }
  }

// insert order data to db after all stock successfully decreased
$add_order_query = "INSERT INTO orders(order_id, full_name, phone_number, email, full_address, orders) VALUES('$orderId', '$fullName', '$phoneNumber', '$email', '$fullAddress', '$orderJson')";
mysqli_query($conn, $add_order_query);

  $result = array("_id"=>$orderId);
  
  print json_encode($result);
?>