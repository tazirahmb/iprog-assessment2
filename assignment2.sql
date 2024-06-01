-- Adminer 4.8.1 MySQL 10.11.6-MariaDB-2 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

CREATE DATABASE `assignment2` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `assignment2`;

CREATE TABLE `cars` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `car_name` text NOT NULL,
  `price` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `image` text DEFAULT NULL,
  `category_id` int(4) NOT NULL,
  PRIMARY KEY (`_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `cars_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `cars` (`_id`, `car_name`, `price`, `stock`, `image`, `category_id`) VALUES
(1,	'Model S',	90,	28,	'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-S.png',	1),
(2,	'Model 3',	60,	0,	'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-3-Performance-LHD.png',	1),
(3,	'Model X',	40,	583,	'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-X.png',	1),
(4,	'Model Y',	40,	9,	'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-Y.png',	1),
(5,	'Camry',	50,	0,	'https://www.toyota.com/imgix/content/dam/toyota/jellies/max/2025/camry/le/2552/040/1.png?bg=fff&fm=webp&q=90&w=1764',	2),
(6,	'Crown',	70,	41,	'https://www.toyota.com/imgix/content/dam/toyota/jellies/max/2025/toyotacrown/xle/4015/202/1.png?bg=fff&fm=webp&q=90&w=1764',	2),
(7,	'bZ4X',	132,	325,	'https://www.toyota.com/imgix/content/dam/toyota/jellies/max/2024/bz4x/xle/2872/089/1.png?bg=fff&fm=webp&q=90&w=1764',	2),
(8,	'Crosstrek Hybrid',	80,	2,	'https://cdn.oem-production.subaru.com.au/media/sniknfxx/my24-crosstrek-awd-hybrid-l-sun-blaze-pearl-front.png',	3),
(9,	'Forester Hybrid',	65,	0,	'https://cdn.oem-production.subaru.com.au/media/hnnbpa5s/for24-hybrid-l_front_horizonbluepearl.png',	3),
(10,	'Solterra',	94,	18,	'https://cdn.oem-production.subaru.com.au/media/tm1fz2cy/my24-solterra-awd-front-harbourmistgreypearl.png',	3),
(11,	'CX-30',	100,	3,	'https://www.mazdausa.com/siteassets/vehicles/2024/cx-30/profile-jelly/2023-cx-30-2_5-premium-plus-profile-polymetalgrey.png',	4);

CREATE TABLE `categories` (
  `_id` int(4) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `categories` (`_id`, `name`) VALUES
(1,	'Tesla'),
(2,	'Toyota'),
(3,	'Subaru'),
(4,	'Mazda');

CREATE TABLE `orders` (
  `_id` bigint(20) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `full_name` text NOT NULL,
  `phone_number` bigint(20) NOT NULL,
  `email` text NOT NULL,
  `car_id` int(11) NOT NULL,
  `car_quantity` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `total_price` int(11) NOT NULL,
  `status` tinyint(4) DEFAULT 0,
  PRIMARY KEY (`_id`),
  KEY `car_id` (`car_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`car_id`) REFERENCES `cars` (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `orders` (`_id`, `full_name`, `phone_number`, `email`, `car_id`, `car_quantity`, `start_date`, `end_date`, `total_price`, `status`) VALUES
(00000000000022424887,	'Nama aku',	230000022,	'zira@mail.com',	8,	1,	'2024-06-19',	'2024-06-21',	160,	0),
(00000000000042559832,	'Nama aku',	230000022,	'zira@mail.com',	8,	1,	'2024-06-19',	'2024-06-21',	160,	1),
(00000000000064701726,	'nama abc',	122222,	'nama@mail.com',	6,	1,	'2024-06-08',	'2024-06-09',	70,	1),
(00000000000071269359,	'Nama aku',	230000022,	'zira@mail.com',	8,	1,	'2024-06-19',	'2024-06-21',	160,	0),
(00000000000081713560,	'orang bau',	3959999,	'zirah@orang.bau',	7,	3,	'2024-06-19',	'2024-06-22',	1188,	1),
(00000000000091883383,	'nama ending',	2499999,	'ending@mail.com',	7,	2,	'2024-06-20',	'2024-06-23',	792,	1),
(00000000000095103938,	'Nama aku',	230000022,	'zira@mail.com',	8,	1,	'2024-06-19',	'2024-06-21',	160,	0),
(00000000000099453824,	'Nama aku',	230000022,	'zira@mail.com',	8,	1,	'2024-06-05',	'2024-06-21',	1280,	0);

-- 2024-06-01 14:39:57
