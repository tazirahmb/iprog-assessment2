<?php

  include 'connection.php';

  $order_id = $_GET['orderId'];

   $query_string = "SELECT
    orders._id as _id,
    orders.full_name as fullName,
    orders.email AS email,
    orders.phone_number AS phoneNumber,
    categories.name AS brand,
    cars.car_name AS carName,
    cars.image AS image,
    cars.price AS initPrice,
    orders.start_date AS startDate,
    orders.end_date AS endDate,
    orders.car_quantity AS quantity,
    orders.total_price AS totalPrice,
    orders.status AS confirmationStatus
    FROM orders, cars, categories
    WHERE orders._id = $order_id AND cars.category_id = categories._id AND orders.car_id = cars._id";
   
   $result = mysqli_query($conn, $query_string);

   $rows = array();
   if(mysqli_num_rows($result) === 1) { // ensure only 1 order returned
     while($r = mysqli_fetch_assoc($result)) {
       $rows[] = $r;
      }
    }

   print json_encode($rows);
?>