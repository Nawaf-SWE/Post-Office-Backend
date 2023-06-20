-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 20, 2023 at 05:05 PM
-- Server version: 5.7.39
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `postoffice`
--

-- --------------------------------------------------------

--
-- Table structure for table `branches`
--

CREATE TABLE `branches` (
  `id` int(11) NOT NULL,
  `city_id` int(11) NOT NULL,
  `name_ar` varchar(100) NOT NULL,
  `name_en` varchar(100) NOT NULL,
  `lat` float(10,10) NOT NULL,
  `lng` float(10,10) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `name_ar` varchar(100) NOT NULL,
  `name_en` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `fcm` varchar(255) DEFAULT NULL,
  `lat` float(10,10) DEFAULT NULL,
  `lng` float(10,10) DEFAULT NULL,
  `ceatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `phone` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

CREATE TABLE `packages` (
  `id` int(11) NOT NULL,
  `weight` double(10,10) NOT NULL,
  `shipping_type` varchar(25) NOT NULL DEFAULT 'regular',
  `cost` double(10,10) NOT NULL,
  `package_category` varchar(25) NOT NULL,
  `receiver_name` varchar(150) NOT NULL,
  `receiver_phone` varchar(10) NOT NULL,
  `receiver_email` varchar(150) DEFAULT NULL,
  `receiver_building_no` int(11) NOT NULL,
  `receiver_postal_code` int(11) NOT NULL,
  `receiver_street` varchar(150) NOT NULL,
  `receiver_city_id` int(11) NOT NULL,
  `receiver_branch_id` int(11) NOT NULL,
  `sender_name` varchar(150) NOT NULL,
  `sender_phone` varchar(10) NOT NULL,
  `sender_email` varchar(150) DEFAULT NULL,
  `sender_building_no` int(11) NOT NULL,
  `sender_postal_code` int(11) NOT NULL,
  `sender_street` varchar(100) NOT NULL,
  `sender_city_id` int(11) NOT NULL,
  `sender_branch_id` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tracking`
--

CREATE TABLE `tracking` (
  `id` int(11) NOT NULL,
  `package_id` int(11) NOT NULL,
  `branch_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `delivery_status` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `role` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `fcm` varchar(255) DEFAULT NULL,
  `branch_id` int(11) DEFAULT NULL,
  `lat` float(10,10) NOT NULL,
  `lng` float(10,10) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`id`),
  ADD KEY `city_id` (`city_id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sender_phone` (`sender_phone`),
  ADD KEY `receiver_city_id` (`receiver_city_id`),
  ADD KEY `receiver_branch_id` (`receiver_branch_id`),
  ADD KEY `sender_city_id` (`sender_city_id`),
  ADD KEY `sender_branch_id` (`sender_branch_id`);

--
-- Indexes for table `tracking`
--
ALTER TABLE `tracking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `package_id` (`package_id`),
  ADD KEY `branch_id` (`branch_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `branch_id` (`branch_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `branches`
--
ALTER TABLE `branches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `packages`
--
ALTER TABLE `packages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tracking`
--
ALTER TABLE `tracking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `branches`
--
ALTER TABLE `branches`
  ADD CONSTRAINT `branches_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `packages`
--
ALTER TABLE `packages`
  ADD CONSTRAINT `packages_ibfk_1` FOREIGN KEY (`receiver_branch_id`) REFERENCES `branches` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `packages_ibfk_2` FOREIGN KEY (`receiver_city_id`) REFERENCES `cities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `packages_ibfk_3` FOREIGN KEY (`sender_branch_id`) REFERENCES `branches` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `packages_ibfk_4` FOREIGN KEY (`sender_city_id`) REFERENCES `cities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tracking`
--
ALTER TABLE `tracking`
  ADD CONSTRAINT `tracking_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tracking_ibfk_2` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tracking_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
