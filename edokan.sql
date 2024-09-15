-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 15, 2024 at 07:06 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `edokan`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `category_name_ar` varchar(100) NOT NULL,
  `image_url` varchar(150) NOT NULL,
  `parent_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`, `category_name_ar`, `image_url`, `parent_id`) VALUES
(1, 'Vegetables', 'خضروات', '', 0),
(2, 'Pharmacy', 'صيدلية', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `marketplaces`
--

CREATE TABLE `marketplaces` (
  `marketplace_id` int(11) NOT NULL,
  `marketplace_name` varchar(100) NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  `city_id` int(11) NOT NULL,
  `city_name` varchar(100) NOT NULL,
  `marketplace_owner_id` varchar(100) NOT NULL,
  `is_approved` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_general_ci;

--
-- Dumping data for table `marketplaces`
--

INSERT INTO `marketplaces` (`marketplace_id`, `marketplace_name`, `lat`, `lng`, `city_id`, `city_name`, `marketplace_owner_id`, `is_approved`) VALUES
(11, 'Makka Market', 25.8440559, 32.8349115, 1, 'Higaza', 'srcghJa3ykOaFTqB7BFFN3CmX3u2', 1);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_description` varchar(150) NOT NULL,
  `product_image_url` varchar(150) NOT NULL,
  `product_image1_url` varchar(150) NOT NULL,
  `product_image2_url` varchar(150) NOT NULL,
  `product_image3_url` varchar(150) NOT NULL,
  `product_image4_url` varchar(150) NOT NULL,
  `product_price` double NOT NULL,
  `product_discount` double NOT NULL,
  `product_weight` double NOT NULL,
  `product_length` double NOT NULL,
  `product_width` double NOT NULL,
  `product_height` double NOT NULL,
  `marketplace_id` int(11) NOT NULL,
  `marketplace_name` int(11) NOT NULL,
  `marketplace_lat` double NOT NULL,
  `marketplace_lng` double NOT NULL,
  `product_quantity` double NOT NULL,
  `product_status` tinyint(1) NOT NULL,
  `is_global` tinyint(1) NOT NULL,
  `product_owner_id` varchar(100) NOT NULL,
  `date_added` bigint(20) NOT NULL,
  `date_modified` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `product_description`, `product_image_url`, `product_image1_url`, `product_image2_url`, `product_image3_url`, `product_image4_url`, `product_price`, `product_discount`, `product_weight`, `product_length`, `product_width`, `product_height`, `marketplace_id`, `marketplace_name`, `marketplace_lat`, `marketplace_lng`, `product_quantity`, `product_status`, `is_global`, `product_owner_id`, `date_added`, `date_modified`) VALUES
(31, 'Product', 'Probably be there around the same time as the best way to clean ', 'public/images/products/31/thumbnail.jpg', 'public/images/products/31/image1.jpg', '', '', '', 10.5, 0, 0, 0, 0, 0, 11, 0, 25.8440559, 32.8349115, 50, 1, 0, 'srcghJa3ykOaFTqB7BFFN3CmX3u2', 1726406754439, 1726406754439),
(32, 'واقي مرتبة ١٢٠ سم ', 'واقي مرتبة ١٢٠ سم ثلاث قطع ', 'public/images/products/32/thumbnail.jpg', 'public/images/products/32/image1.jpg', 'public/images/products/32/image2.jpg', 'public/images/products/32/image3.jpg', 'public/images/products/32/image4.jpg', 375.5, 1.5, 3000, 0, 120, 220, 11, 0, 25.8440559, 32.8349115, 100, 0, 0, 'srcghJa3ykOaFTqB7BFFN3CmX3u2', 1726416865848, 1726416865848),
(36, 'ملاية سرير كبير  ١٢٠ سم', 'ملاية سرير كبير خمس قطع ', 'public/images/products/36/image4.jpg', 'public/images/products/36/image4.jpg', 'public/images/products/36/image4.jpg', 'public/images/products/36/image4.jpg', 'public/images/products/36/image4.jpg', 100.5, 0, 0, 0, 0, 0, 11, 0, 25.8440559, 32.8349115, 50, 0, 0, 'srcghJa3ykOaFTqB7BFFN3CmX3u2', 1726417247492, 1726417247492),
(46, 'كوفرتة كابتونية ثلاث قطع', 'كوفرتة كابتونية ثلاث قطع مقاس كبير ', 'public/images/products/46/thumbnail.jpg', 'public/images/products/46/image1.jpg', 'public/images/products/46/image2.jpg', 'public/images/products/46/image3.jpg', 'public/images/products/46/image4.jpg', 50.5, 0, 0, 0, 0, 0, 11, 0, 25.8440559, 32.8349115, 500, 0, 0, 'srcghJa3ykOaFTqB7BFFN3CmX3u2', 1726418620292, 1726418620292),
(47, 'بطانية خمسة كيلو ', 'بطانية خمسة كيلو تلات قطع ', 'public/images/products/47/thumbnail.jpg', 'public/images/products/47/image1.jpg', 'public/images/products/47/image2.jpg', '', '', 100.5, 0, 0, 0, 0, 0, 11, 0, 25.8440559, 32.8349115, 0, 0, 0, 'srcghJa3ykOaFTqB7BFFN3CmX3u2', 1726419069416, 1726419069416);

-- --------------------------------------------------------

--
-- Table structure for table `product_categories`
--

CREATE TABLE `product_categories` (
  `product_category_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_general_ci;

--
-- Dumping data for table `product_categories`
--

INSERT INTO `product_categories` (`product_category_id`, `product_id`, `category_id`) VALUES
(1, 46, 1),
(2, 47, 1),
(3, 47, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `image_url` varchar(150) NOT NULL,
  `role` varchar(100) NOT NULL,
  `city_id` int(11) NOT NULL,
  `city_name` varchar(100) NOT NULL,
  `points` int(11) NOT NULL,
  `enabled` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `phone_number`, `image_url`, `role`, `city_id`, `city_name`, `points`, `enabled`) VALUES
('srcghJa3ykOaFTqB7BFFN3CmX3u2', '', '', '+201112282218', '', 'SELLER', 1, 'Higaza', 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `marketplaces`
--
ALTER TABLE `marketplaces`
  ADD PRIMARY KEY (`marketplace_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `product_categories`
--
ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`product_category_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `marketplaces`
--
ALTER TABLE `marketplaces`
  MODIFY `marketplace_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `product_categories`
--
ALTER TABLE `product_categories`
  MODIFY `product_category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
