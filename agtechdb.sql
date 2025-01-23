-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 06, 2024 at 05:37 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `agtechdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_appointments`
--

CREATE TABLE `admin_appointments` (
  `id` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL,
  `status` enum('pending','upcoming','past','cancelled','complete') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_appointments`
--

INSERT INTO `admin_appointments` (`id`, `appointment_id`, `status`, `created_at`) VALUES
(1, 72, 'cancelled', '2024-10-10 02:42:18'),
(2, 73, 'complete', '2024-10-10 02:42:18'),
(3, 74, 'complete', '2024-10-10 02:42:18'),
(4, 75, 'past', '2024-10-10 02:42:18'),
(5, 76, 'past', '2024-10-10 02:42:18'),
(6, 77, 'past', '2024-10-10 02:42:18'),
(7, 78, 'past', '2024-10-10 02:42:18'),
(8, 79, 'past', '2024-10-10 02:42:18'),
(9, 80, 'past', '2024-10-10 02:42:18'),
(10, 81, 'past', '2024-10-10 02:42:18'),
(11, 82, 'past', '2024-10-10 02:42:18'),
(12, 83, 'past', '2024-10-10 02:42:18'),
(13, 85, 'past', '2024-10-10 02:42:18'),
(14, 86, 'past', '2024-10-10 02:42:18'),
(15, 87, 'past', '2024-10-10 02:42:18'),
(16, 88, 'past', '2024-10-10 02:42:18'),
(17, 89, 'past', '2024-10-10 02:45:02'),
(18, 90, 'past', '2024-10-10 02:49:27'),
(19, 91, 'past', '2024-10-10 15:06:24'),
(20, 92, 'past', '2024-10-10 15:07:24'),
(21, 93, 'past', '2024-10-10 15:08:17'),
(22, 94, 'past', '2024-10-10 15:10:01'),
(23, 95, 'past', '2024-10-10 15:13:35'),
(24, 96, 'past', '2024-10-10 15:14:21'),
(25, 97, 'past', '2024-10-10 15:22:22'),
(26, 98, 'past', '2024-10-10 15:56:03'),
(27, 99, 'past', '2024-10-11 15:17:35'),
(28, 100, 'past', '2024-10-13 14:42:59'),
(29, 101, 'past', '2024-10-13 14:43:50'),
(30, 102, 'past', '2024-10-13 14:44:51'),
(31, 103, 'past', '2024-10-14 15:17:49'),
(32, 104, 'past', '2024-10-17 05:21:38'),
(33, 105, 'past', '2024-10-17 05:22:59'),
(34, 106, 'past', '2024-10-17 05:23:46'),
(35, 107, 'past', '2024-10-17 15:26:54'),
(36, 108, 'complete', '2024-10-17 15:35:37'),
(37, 109, 'past', '2024-10-18 16:08:22'),
(38, 110, 'past', '2024-10-18 16:43:09'),
(39, 111, 'past', '2024-10-18 16:51:52'),
(40, 112, 'past', '2024-10-22 16:00:08'),
(41, 113, 'past', '2024-10-22 16:00:58'),
(42, 114, 'past', '2024-10-24 15:55:13'),
(43, 115, 'past', '2024-10-24 15:55:49'),
(44, 116, 'past', '2024-10-24 15:56:31'),
(45, 117, 'past', '2024-10-24 15:57:21'),
(46, 118, 'past', '2024-10-24 16:44:46'),
(47, 119, 'past', '2024-10-24 16:45:35'),
(48, 120, 'past', '2024-10-24 18:41:06'),
(49, 121, 'past', '2024-10-25 05:25:06'),
(50, 122, 'past', '2024-10-25 05:34:40'),
(51, 123, 'past', '2024-10-25 06:39:51'),
(52, 124, 'past', '2024-10-25 06:52:53'),
(53, 125, 'past', '2024-10-25 06:59:57'),
(54, 126, 'past', '2024-10-25 11:52:06'),
(57, 129, 'complete', '2024-10-27 09:21:01'),
(58, 130, 'past', '2024-10-27 16:44:56'),
(59, 131, 'past', '2024-10-27 16:50:08'),
(60, 132, 'complete', '2024-10-27 17:12:42'),
(61, 133, 'complete', '2024-10-27 17:17:47'),
(62, 134, 'past', '2024-10-27 18:15:03'),
(63, 135, 'past', '2024-10-27 18:20:19'),
(64, 136, 'past', '2024-10-27 18:23:08'),
(65, 137, 'past', '2024-10-27 18:31:34'),
(66, 138, 'past', '2024-10-27 18:37:46'),
(67, 139, 'past', '2024-10-27 18:42:10'),
(68, 140, 'past', '2024-10-28 02:35:22'),
(69, 141, 'past', '2024-10-28 02:42:10'),
(70, 142, 'complete', '2024-10-28 03:16:22'),
(71, 143, 'past', '2024-10-28 03:19:24'),
(72, 144, 'complete', '2024-10-28 15:36:38'),
(73, 145, 'complete', '2024-10-29 06:59:30'),
(74, 146, 'complete', '2024-10-29 13:28:07'),
(75, 147, 'past', '2024-10-29 13:31:16'),
(76, 148, 'complete', '2024-10-29 18:17:36'),
(77, 149, 'past', '2024-10-29 18:53:02'),
(78, 150, 'past', '2024-10-29 19:00:51'),
(79, 151, 'past', '2024-10-29 19:25:06'),
(80, 152, 'complete', '2024-10-29 19:26:53'),
(81, 153, 'complete', '2024-10-30 02:32:48'),
(82, 154, 'past', '2024-10-30 02:36:06'),
(83, 155, 'past', '2024-10-30 03:32:55'),
(84, 156, 'complete', '2024-10-30 03:38:56'),
(85, 157, 'complete', '2024-10-30 03:50:21'),
(86, 158, 'past', '2024-10-30 03:56:00'),
(87, 159, 'past', '2024-10-30 04:02:43'),
(88, 160, 'past', '2024-10-30 04:10:21'),
(89, 161, 'complete', '2024-10-30 05:46:27'),
(90, 162, 'complete', '2024-10-30 06:08:12'),
(91, 163, 'complete', '2024-10-30 06:30:11'),
(92, 164, 'complete', '2024-10-30 07:05:03'),
(93, 165, 'complete', '2024-10-30 08:42:00'),
(94, 166, 'past', '2024-10-31 08:48:25'),
(95, 167, 'complete', '2024-10-31 08:54:50'),
(96, 168, 'complete', '2024-10-31 09:17:27'),
(97, 169, 'complete', '2024-10-31 09:35:11'),
(98, 170, 'complete', '2024-10-31 09:59:47'),
(99, 171, 'complete', '2024-10-31 17:27:04'),
(100, 172, 'complete', '2024-11-01 03:49:42'),
(101, 173, 'complete', '2024-11-01 03:56:41'),
(102, 174, 'complete', '2024-11-01 05:32:50'),
(103, 175, 'complete', '2024-11-01 05:46:36'),
(104, 176, 'complete', '2024-11-01 12:11:49'),
(105, 177, 'cancelled', '2024-11-01 15:10:36'),
(106, 178, 'cancelled', '2024-11-02 03:33:30'),
(107, 179, 'complete', '2024-11-02 13:20:44'),
(108, 180, 'complete', '2024-11-02 16:25:42'),
(109, 181, 'complete', '2024-11-02 17:45:27'),
(110, 182, 'complete', '2024-11-02 18:06:28'),
(111, 183, 'complete', '2024-11-02 18:12:53'),
(112, 184, 'complete', '2024-11-02 18:17:57'),
(113, 185, 'complete', '2024-11-02 18:19:52'),
(114, 186, 'complete', '2024-11-02 18:21:31'),
(115, 187, 'cancelled', '2024-11-03 06:38:03'),
(116, 188, 'cancelled', '2024-11-03 06:44:48'),
(117, 189, 'cancelled', '2024-11-03 07:01:53'),
(118, 190, 'cancelled', '2024-11-03 07:03:08'),
(119, 191, 'pending', '2024-11-03 07:09:51'),
(120, 192, 'pending', '2024-11-03 07:40:30'),
(121, 193, 'cancelled', '2024-11-03 07:43:52'),
(122, 194, 'cancelled', '2024-11-03 07:46:04'),
(123, 195, 'cancelled', '2024-11-03 12:54:06'),
(124, 196, 'pending', '2024-11-03 13:03:43'),
(125, 197, 'pending', '2024-11-03 13:09:05'),
(126, 198, 'pending', '2024-11-03 13:15:22'),
(127, 199, 'pending', '2024-11-03 13:20:37'),
(128, 200, 'pending', '2024-11-04 15:19:04'),
(129, 201, 'cancelled', '2024-11-04 15:21:35'),
(130, 202, 'complete', '2024-11-04 15:32:45'),
(131, 203, 'cancelled', '2024-11-04 15:41:13'),
(132, 204, 'cancelled', '2024-11-04 15:46:12'),
(133, 205, 'pending', '2024-11-04 15:59:00'),
(134, 206, 'complete', '2024-11-05 03:23:21'),
(135, 207, 'complete', '2024-11-05 12:22:58'),
(136, 208, 'complete', '2024-11-05 14:55:56');

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `contact_number` varchar(15) NOT NULL,
  `plate_number` varchar(15) NOT NULL,
  `car_brand` varchar(50) NOT NULL,
  `car_model` varchar(50) NOT NULL,
  `car_year` int(11) NOT NULL,
  `services` text NOT NULL,
  `appointment_date` date NOT NULL,
  `appointment_time` time NOT NULL,
  `mechanic` varchar(50) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `first_name`, `last_name`, `contact_number`, `plate_number`, `car_brand`, `car_model`, `car_year`, `services`, `appointment_date`, `appointment_time`, `mechanic`, `token`) VALUES
(16, 'jigz', 'ESTEBAN', '1234567890', 'ANV1231', 'Ford', 'Focus', 2012, 'General Wiring, Transmission', '2024-09-27', '10:00:00', '', NULL),
(17, 'jigz', 'esteban', '09123456789', 'abc123', 'Ford', 'Ecosport', 2023, 'Oil Change, Brake Inspection, Tire Rotation, Engine Check, General Wiring, Transmission', '2024-09-27', '12:00:00', 'Choti Aquino', NULL),
(18, 'Arnel', 'Esteban', '099087654321', 'Qrx123', 'Honda', 'CR-V', 2012, 'General Wiring', '2024-09-29', '00:00:00', '', NULL),
(22, 'f', 'f', '1', 'f', 'Ford', 'Focus', 2011, 'Oil Change', '0000-00-00', '00:00:00', '', NULL),
(24, 'ishi', 'marie', '09878655315', 'qwe231', 'Ford', 'Raptor', 2014, 'Transmission', '2024-09-27', '10:00:00', 'Kurt Juanitez', NULL),
(25, '1', '1', '1', '1', 'Ford', 'Focus', 2011, 'Engine Check', '2024-09-27', '10:00:00', 'Alfredo Batumbakal', NULL),
(26, 'f', 'f', '213', 'f', 'Ford', 'Everest', 2011, 'General Wiring', '2024-09-27', '10:00:00', 'Karl Marte', NULL),
(27, 'f', 'f', '1', 'f', 'Ford', 'Ecosport', 2013, 'General Wiring', '2024-09-27', '10:00:00', 'Karl Marte', NULL),
(28, 'joe', 'biden', '09125463721', 'frn123', 'Ford', 'Ecosport', 2011, 'Transmission', '2024-09-27', '10:00:00', 'Alfredo Batumbakal', NULL),
(29, 'Aiyaw', 'CoNa', '09911777444', 'umy000', 'Ford', 'Explorer', 2012, 'Transmission', '2024-09-28', '10:00:00', 'Mikee Tan', NULL),
(30, 'wyxz`', 'wyxz', '09876543290', 'pls213', 'Toyota', 'HiAce', 2012, 'Oil Change', '2024-09-28', '10:00:00', 'James Bond', NULL),
(31, 'jichael', 'mordan', '09123412345', 'mjm232', 'Nissan', 'Xtrail', 2013, 'General Wiring', '2024-09-28', '10:00:00', 'Kurt Juanitez', NULL),
(32, 'nic', 'kerr', '09654387921', 'rcs123', 'Mitsubishi', 'Pajero', 2012, 'Engine Check, Transmission', '2024-09-28', '10:00:00', 'Karl Marte', NULL),
(33, '1', '1', '1', '1', 'Ford', 'Everest', 2011, 'Engine Check', '2024-09-27', '10:00:00', '', NULL),
(34, '2', '2', '2', '2', 'Nissan', 'Almera', 2012, 'Oil Change', '2024-09-27', '16:00:00', '', NULL),
(35, '1', '1', '11', '1', 'Ford', 'Ranger', 2012, 'Engine Check', '2024-09-29', '10:00:00', '', NULL),
(36, '2', '2', '2', '2', 'Ford', 'Everest', 2014, 'Oil Change', '2024-09-29', '10:00:00', '', NULL),
(37, '3', '3', '3', '3', 'Ford', 'Escape', 2006, 'Brake Inspection', '2024-09-29', '10:00:00', '', NULL),
(38, '1', '1', '1', '1', 'Ford', 'Escape', 2010, 'Transmission', '2024-09-29', '12:00:00', '', NULL),
(39, 'z', 'z', '1', 'z', 'Toyota', 'Hilux', 2009, 'Tire Rotation', '2024-09-29', '12:00:00', 'Kurt Juanitez', NULL),
(40, 'x', 'x', '1', 'x', 'Ford', 'Focus', 2012, 'Transmission', '2024-10-01', '12:00:00', 'Jigz Esteban', NULL),
(41, 'c', 'c', '2', 'c', 'Ford', 'Focus', 2008, 'Engine Check', '2024-10-01', '12:00:00', 'Conrad Quadrado', NULL),
(42, 'v', 'v', '3', 'v', 'Toyota', 'Camry', 2008, 'General Wiring', '2024-10-01', '12:00:00', 'Karl Marte', NULL),
(43, '1', '1', '1', '1f', 'Ford', 'Focus', 2010, 'Transmission', '2024-09-29', '12:00:00', 'Alfred Batumbakal', NULL),
(44, 'f', 'f', '1', '1', 'Ford', 'Escape', 2009, 'Brake Inspection', '2024-10-02', '12:00:00', 'Choti Aquino', NULL),
(45, 'queen', 'king', '09876789', 'poi098', 'Ford', 'Everest', 2010, 'Tire Rotation', '2024-10-02', '12:00:00', 'Kurt Juanitez', NULL),
(46, 'f', 'f', '1', 'f', 'Ford', 'Escape', 2012, 'General Wiring', '2024-10-02', '12:00:00', NULL, NULL),
(47, '6', '6', '6', '6', 'Ford', 'Everest', 2011, 'Oil Change', '2024-10-01', '10:00:00', 'Conrad Quadrado', NULL),
(48, 'r', 'r', '5', 'r', 'Ford', 'Escape', 2008, 'General Wiring', '2024-10-03', '14:00:00', 'Jigz Esteban', NULL),
(49, 'choti', 'aquino', '099099090909', 'bnm980', 'Toyota', 'HiAce', 2009, 'General Wiring', '2024-10-03', '10:00:00', NULL, NULL),
(50, 'jigz', 'esteban', '09123568927', 'abc123', 'Nissan', 'Almera', 2013, 'General Wiring', '2024-10-07', '10:00:00', NULL, NULL),
(51, '0', '0', '0', '0', 'Mitsubishi', 'Mirage', 2014, 'Engine Check', '2024-10-07', '12:00:00', NULL, NULL),
(52, '9', '9', '9', '9', 'Mitsubishi', 'Pajero', 2008, 'Transmission', '2024-10-07', '14:00:00', 'Choti Aquino', NULL),
(53, '1', '1', '1', '1', 'Ford', 'Everest', 2012, 'Transmission', '2024-10-05', '10:00:00', NULL, NULL),
(54, '2', '2', '2', '2', 'Ford', 'Focus', 2011, 'General Wiring', '2024-10-05', '10:00:00', 'Karl Marte', NULL),
(55, '3', '3', '3', '3', 'Ford', 'Ecosport', 2014, 'Engine Check', '2024-10-06', '10:00:00', NULL, NULL),
(56, '4', '4', '4', '4', 'Ford', 'Expedition', 2006, 'General Wiring', '2024-10-06', '10:00:00', 'Conrad Quadrado', NULL),
(57, '5', '5', '5', '5', 'Toyota', 'Innova', 2008, 'Oil Change', '2024-10-05', '12:00:00', NULL, NULL),
(58, '6', '6', '6', '6', 'Toyota', 'HiAce', 2010, 'Tire Rotation', '2024-10-05', '10:00:00', 'Conrad Quadrado', NULL),
(59, '1', '1', '1', '1', 'Ford', 'Escape', 2007, 'Transmission', '2024-10-06', '10:00:00', 'Kurt Juanitez', NULL),
(60, '2', '2', '2', '2', 'Ford', 'Focus', 2007, 'Transmission', '2024-10-06', '12:00:00', 'Kurt Juanitez', NULL),
(61, '3', '3', '3', '3', 'Ford', 'Everest', 2009, 'Transmission', '2024-10-06', '12:00:00', 'Jigz Esteban', NULL),
(62, '5', '5', '5', '5', 'Toyota', 'Innova', 2008, 'Transmission', '2024-10-06', '12:00:00', 'Conrad Quadrado', NULL),
(63, '4', '4', '4', '4', 'Ford', 'Escape', 2008, 'Transmission', '2024-10-06', '14:00:00', 'Jigz Esteban', NULL),
(64, '8', '8', '8', '8', 'Ford', 'Escape', 2009, 'Transmission', '2024-10-06', '14:00:00', 'Alfred Batumbakal', NULL),
(65, '1', '1', '1', '1', 'Ford', 'Focus', 2010, 'Transmission', '2024-10-06', '14:00:00', 'Conrad Quadrado', NULL),
(66, '1', '1', '1', '1', 'Ford', 'Focus', 2008, 'Transmission', '2024-10-06', '16:00:00', 'Kurt Juanitez', NULL),
(67, '1', '1', '1', '1', 'Ford', 'Escape', 2007, 'Transmission', '2024-10-06', '16:00:00', 'Alfred Batumbakal', NULL),
(68, '1', '1', '1', '1', 'Ford', 'Escape', 2008, 'Transmission', '2024-10-06', '16:00:00', 'Jigz Esteban', NULL),
(69, '4', '4', '4', '4', 'Ford', 'Expedition', 2008, 'Transmission', '2024-10-06', '18:00:00', 'Jigz Esteban', NULL),
(70, '1', '1', '1', 'f', 'Ford', 'Focus', 2010, 'Transmission', '2024-10-06', '18:00:00', 'Kurt Juanitez', NULL),
(71, '1', '1', '1', '1', 'Ford', 'Escape', 2008, 'Transmission', '2024-10-06', '18:00:00', 'Conrad Quadrado', NULL),
(72, '1', '1', '1', '1', 'Ford', 'Ecosport', 2010, 'Transmission', '2024-10-08', '10:00:00', 'Choti Aquino', NULL),
(73, 'Jigz', 'ESTEBAN', '0912356879', 'ABC1Q23', 'Toyota', 'Fortuner', 2008, 'Engine Check', '2024-10-10', '10:00:00', 'Karl Marte', NULL),
(74, 'choti ', 'aquino', '0987654321', 'xzxc432', 'Nissan', 'Terra', 2008, 'Oil Change, Brake Inspection, Tire Rotation, Engine Check', '2024-11-01', '10:00:00', 'Alfred Batumbakal', NULL),
(75, 'Jake', 'zyrus', '09875667821', 'tyr234', 'Ford', 'Ranger', 2019, 'Oil Change', '2024-10-21', '12:00:00', 'Karl Marte', NULL),
(76, 'Nick', 'Nick', '09876785423', 'try123', 'Honda', 'CR-V', 2008, 'Tire Rotation', '2024-10-10', '16:00:00', 'Choti Aquino', NULL),
(77, 'Karl roi', 'marte', '09871236547', 'qwe098', 'Nissan', 'Terra', 2011, 'General Wiring', '2024-10-16', '10:00:00', 'Alfred Batumbakal', NULL),
(78, 'kurt', 'juanitez', '0956423718', 'hra135', 'Mitsubishi', 'Pajero', 2009, 'Oil Change', '2024-10-25', '11:00:00', 'Jigz Esteban', NULL),
(79, 'alfred', 'freedom', '09886453245', 'vhn756', 'Chevrolet', 'Trailblazer', 2022, 'Brake Inspection', '2024-10-24', '15:00:00', 'Karl Marte', NULL),
(80, '1', '1', '1', '1', 'Ford', 'Escape', 2009, 'Oil Change', '2024-10-10', '12:00:00', 'Choti Aquino', NULL),
(81, 'James', 'michael', '09673421568', 'tqn752', 'Mitsubishi', 'Mirage', 2009, 'General Wiring', '2024-10-10', '10:00:00', 'Alfred Batumbakal', NULL),
(82, 'Mike', 'Miller', '09543627186', 'rhf412', 'Hyundai', 'Tucson', 2010, 'General Wiring', '2024-10-11', '10:00:00', 'Choti Aquino', NULL),
(83, 'Iane', 'Gonzales', '09654372814', 'hqu415', 'Ford', 'Everest', 2021, 'Tire Rotation', '2024-10-12', '14:00:00', 'Karl Marte', NULL),
(85, 'john', 'doe', '09657452361', 'ytk234', 'Toyota', 'Fortuner', 2011, 'Tire Rotation', '2024-10-25', '13:00:00', 'Choti Aquino', NULL),
(86, 'Arnel', 'gonzales', '0965749371', '32hs4n', 'Mitsubishi', 'Xpander', 2012, 'Oil Change', '2024-10-10', '12:00:00', 'Kurt Juanitez', NULL),
(87, '1', '1', '1', '1', 'Ford', 'Focus', 2009, 'Engine Check', '2024-10-11', '10:00:00', 'Jigz Esteban', NULL),
(88, '2', '2', '2', '2', 'Ford', 'Focus', 2009, 'Brake Inspection', '2024-10-11', '10:00:00', 'Alfred Batumbakal', NULL),
(89, 'Matt', 'Ryan', '09876423616', 'nrh2466', 'Ford', 'Everest', 2015, 'Engine Check', '2024-10-11', '16:00:00', 'Choti Aquino', NULL),
(90, 'Danica', 'abigaile', '096735649124', 'btn4524', 'Hyundai', 'Tucson', 2016, 'Oil Change', '2024-10-19', '14:00:00', 'Alfred Batumbakal', NULL),
(91, 'paul', 'fernando', '09876542145', 'tnb3612', 'Ford', 'Focus', 2014, 'Oil Change', '2024-10-11', '12:00:00', 'Choti Aquino', NULL),
(92, 'James', 'williams', '09765426182', 'rgh0668', 'Toyota', 'HiAce', 2019, 'Tire Rotation', '2024-10-11', '12:00:00', 'Alfred Batumbakal', NULL),
(93, 'jun', 'revilla', '09985468621', 'nmz6704', 'Honda', 'Accord', 2019, 'General Wiring', '2024-10-11', '12:00:00', 'Conrad Quadrado', NULL),
(94, 'maverick', 'ignacio', '09658235674', 'nbk7694', 'Chevrolet', 'Sail', 2020, 'Brake Inspection', '2024-10-11', '14:00:00', 'Jigz Esteban', NULL),
(95, 'Rey', 'nambatac', '09764536712', 'tbr2357', 'Mitsubishi', 'Xpander', 2021, 'Engine Check', '2024-10-11', '14:00:00', 'Choti Aquino', NULL),
(96, 'jimmy', 'manansala', '09129872213', 'knr5379', 'Nissan', 'Almera', 2023, 'Engine Check', '2024-10-11', '14:00:00', 'Alfred Batumbakal', NULL),
(97, 'andrei ', 'cortez', '09995467234', 'rde2409', 'Honda', 'Civic', 2015, 'Transmission', '2024-10-25', '13:00:00', 'Jigz Esteban', NULL),
(98, 'trixie', 'mercedez', '09768423512', 'thn2478', 'Ford', 'Escape', 2007, 'Transmission', '2024-10-25', '13:00:00', 'Alfred Batumbakal', NULL),
(99, 'Steven', 'adams', '09875634866', 'knh6235', 'Ford', 'Focus', 2007, 'Transmission', '2024-10-18', '10:00:00', 'Jigz Esteban', NULL),
(100, 'ronnie', 'malonzo', '09867425465', 'spr7694', 'Honda', 'CR-V', 2009, 'Belts and Hoses Inspection', '2024-10-17', '10:00:00', 'Choti Aquino', NULL),
(101, 'robin', 'velasquez', '09235469685', 'gpn5692', 'Mitsubishi', 'Lancer', 2004, 'Engine Check', '2024-10-17', '10:00:00', 'Jigz Esteban', NULL),
(102, 'scott', 'santos', '09279874361', 'tnq1286', 'Hyundai', 'Santa Fe', 2011, 'Oil Change', '2024-10-17', '12:00:00', 'Karl Marte', NULL),
(103, 'Dale', 'quinto', '09758493665', 'mvc1246', 'Ford', 'Escape', 2009, 'Belts and Hoses Inspection', '2024-10-25', '15:00:00', 'Conrad Quadrado', NULL),
(104, 'davis', 'johnson', '09658450182', 'mnb7295', 'Mitsubishi', 'Pajero', 2011, 'Belts and Hoses Inspection', '2024-10-18', '14:00:00', 'Alfred Batumbakal', NULL),
(105, 'CORINA', 'WATSON', '09658437276', 'MNB2621', 'Ford', 'Raptor', 2024, 'Oil Change', '2024-10-18', '14:00:00', 'Conrad Quadrado', NULL),
(106, 'Stephen', 'hernandez', '0999454711', 'rxz3251', 'Ford', 'Escape', 2008, 'Engine Check', '2024-10-18', '14:00:00', 'Choti Aquino', NULL),
(107, 'melvin', 'aquino', '09123456789', 'nbm1209', 'Ford', 'Raptor', 2023, 'Oil Change', '2024-10-18', '10:00:00', 'Conrad Quadrado', NULL),
(108, 'roi', 'cortez', '09876543214', 'pnu1246', 'Toyota', 'Fortuner', 2010, 'Belts and Hoses Inspection', '2024-10-21', '16:00:00', 'Choti Aquino', NULL),
(109, 'Jun', 'mercado', '09123456789', 'nby2048', 'Hyundai', 'Tucson', 2007, 'Unknown/For Checkup', '2024-10-19', '10:00:00', 'Karl Marte', NULL),
(110, 'jay', 'manalo', '09657483721', 'pvv2746', 'Nissan', 'Xtrail', 2010, 'Suspension Services', '2024-10-19', '10:00:00', 'Alfred Batumbakal', NULL),
(111, 'nate', 'sta maria', '09768524156', 'bkk1209', 'Mitsubishi', 'Pajero', 2008, 'Suspension Services', '2024-10-19', '10:00:00', 'Conrad Quadrado', NULL),
(112, 'shawn', 'mendez', '09768439281', 'trf2745', 'Mitsubishi', 'Xpander', 2010, 'Unknown/For Checkup', '2024-10-24', '11:00:00', 'Alfred Batumbakal', NULL),
(113, 'nicolas', 'batum', '09657482570', 'plm7802', 'Hyundai', 'Santa Fe', 2008, 'Suspension Services, Unknown/For Checkup', '2024-10-24', '11:00:00', 'Karl Marte', NULL),
(114, 'TOm', 'holland', '09657452798', 'ert2476', 'Hyundai', 'Tucson', 2010, 'Unknown/For Checkup', '2024-10-24', '15:00:00', 'Alfred Batumbakal', NULL),
(115, 'chris', 'haynes', '09887653562', 'fgh2856', 'Mitsubishi', 'Xpander', 2009, 'Suspension Services', '2024-10-25', '10:00:00', 'Jigz Esteban', NULL),
(116, 'charles', 'barkley', '09134647482', 'zxc2809', 'Nissan', 'Terra', 2016, 'Engine Check', '2024-10-25', '10:00:00', 'Conrad Quadrado', NULL),
(117, 'austin', 'reaves', '09676628945', 'lkj9862', 'Chevrolet', 'Captiva', 2011, 'Oil Change', '2024-10-25', '11:00:00', 'Alfred Batumbakal', NULL),
(118, 'adam', 'silver', '09582671122', 'khj0658', 'Ford', 'Everest', 2010, 'Transmission', '2024-10-25', '10:00:00', 'Choti Aquino', NULL),
(119, 'francis', 'chua', '09125731254', 'eti0215', 'Honda', 'Accord', 2014, 'Suspension Services', '2024-10-25', '11:00:00', 'Choti Aquino', NULL),
(120, 'james', 'harden', '09567213451', 'saf1242', 'Chevrolet', 'Trailblazer', 2006, 'Unknown/For Checkup', '2024-10-25', '15:00:00', 'Jigz Esteban', NULL),
(121, 'princess', 'queen', '09562913456', 'nmh2143', 'Mitsubishi', 'Montero', 2007, 'Suspension Services', '2024-10-25', '15:00:00', 'Choti Aquino', NULL),
(122, 'ernie', 'smith', '09434816794', 'fqw1246', 'Mitsubishi', 'Montero', 2011, 'Computer Diagnostics', '2024-10-26', '10:00:00', 'Karl Marte', NULL),
(123, 'kevin', 'durant', '09234568471', 'fds0582', 'Honda', 'CR-V', 2008, 'Unknown/For Checkup', '2024-10-26', '10:00:00', 'Alfred Batumbakal', NULL),
(124, 'devin', 'booker', '09412655731', 'aui4671', 'Honda', 'Accord', 2010, 'Oil Change', '2024-10-26', '10:00:00', 'Conrad Quadrado', NULL),
(125, 'bradley', 'beal', '09134672181', 'dsa3120', 'Ford', 'Ecosport', 2009, 'Unknown/For Checkup', '2024-10-26', '11:00:00', 'Alfred Batumbakal', NULL),
(126, 'stan', 'smith', '09157682452', 'fas6813', 'Honda', 'Brio', 2007, 'Unknown/For Checkup', '2024-10-26', '11:00:00', 'Conrad Quadrado', NULL),
(129, 'Shawn', 'Corps', '09123443210', 'LLH2140', 'Ford', 'Ecosport', 2019, 'Oil Change', '2024-10-28', '17:20:00', 'Choti Aquino', NULL),
(130, 'Jake', 'Paul', '09756483427', 'jkd5812', 'Hyundai', 'Tucson', 2020, 'Oil Change', '2024-10-29', '13:44:00', 'Choti Aquino', NULL),
(131, 'Logan', 'Paul', '09659475638', 'kjl4187', 'toyota', 'vios', 2022, 'Tire Rotation', '2024-10-28', '13:49:00', 'Karl Marte', NULL),
(132, 'Handy', 'Manny', '09657486657', 'png3857', 'Toyota', 'Corolla', 2022, 'Oil Change', '2024-10-29', '14:11:00', 'Choti Aquino', NULL),
(133, 'Joseph', 'Mills', '09556472865', 'YTN2049', 'Ford', 'Raptor', 2020, 'Oil Change', '2024-10-29', '14:16:00', 'Choti Aquino', NULL),
(134, 'Lincoln', 'Velasquez', '09445247521', 'NTY0281', 'Toyota', 'Camry', 2022, 'Oil Change', '2024-10-29', '15:14:00', 'Choti Aquino', NULL),
(135, 'Viy', 'Cortez', '09775643827', 'KJL0857', 'Ford', 'Fiesta', 2022, 'Tire Rotation', '2024-10-29', '15:19:00', 'Choti Aquino', NULL),
(136, 'Kevin', 'Hermosada', '09995424857', 'THN6791', 'Ford', 'Territory', 2019, 'Oil Change', '2024-10-29', '15:22:00', 'Choti Aquino', NULL),
(137, 'Kevin', 'Hufana', '09255749775', 'HNG4381', 'Nissan', 'Almera', 2018, 'Tire Rotation', '2024-10-28', '15:31:00', 'Karl Marte', NULL),
(138, 'Melai', 'Quinto', '09664729384', 'QNR2409', 'Hyundai', 'Santa Fe', 2008, 'Oil Change', '2024-10-29', '03:37:00', 'Choti Aquino', NULL),
(139, 'Clyde', 'Drexler', '09521582746', 'MNB2948', 'Mitsubishi', 'Mirage', 2019, 'Tire Rotation', '2024-10-29', '16:41:00', 'Choti Aquino', NULL),
(140, 'James', 'Wiseman', '09125746851', 'NBI0184', 'Hyundai', 'Tucson', 2022, 'Oil Change', '2024-10-29', '11:34:00', 'Choti Aquino', NULL),
(141, 'Cade', 'Cunningham', '09564892741', 'JRB2948', 'Ford', 'Mustang', 2022, 'Oil Change', '2024-10-29', '11:41:00', 'Choti Aquino', NULL),
(142, 'Kim', 'Perez', '09385746291', 'BNF2948', 'Ford', 'Ecosport', 2020, 'Oil Change', '2024-10-29', '11:15:00', 'Choti Aquino', NULL),
(143, 'Robert', 'Williams', '09543754921', 'JNY2049', 'Ford', 'Ecosport', 2022, 'Oil Change', '2024-10-28', '11:22:00', 'Choti Aquino', NULL),
(144, 'angelo', 'russel', '09564738275', 'sda4028', 'Toyota', 'Innova', 2010, 'Unknown/For Checkup', '2024-10-30', '11:00:00', 'Alfred Batumbakal', NULL),
(145, 'setsuna', 'ignacio', '09656492751', 'jfu2140', 'Toyota', 'Land Cruiser', 2010, 'Unknown/For Checkup', '2024-10-31', '11:00:00', 'Karl Marte', NULL),
(146, 'justin', 'montalban', '09465826580', 'bvn1248', 'Ford', 'Raptor', 2023, 'Oil Change', '2024-10-30', '14:00:00', 'Choti Aquino', NULL),
(147, 'luke', 'kornet', '09574926584', 'fyq4928', 'Chevrolet', 'Sail', 2023, 'Unknown/For Checkup', '2024-10-30', '11:00:00', 'Choti Aquino', NULL),
(148, 'Kai', 'Cenat', '09564728164', 'GNT0924', 'Nissan', 'Almera', 2022, 'Transmission', '2024-10-31', '03:16:00', 'Jigz Esteban', NULL),
(149, 'Michael', 'Jordan', '09214857409', 'NPO2049', 'Ford', 'Ecosport', 2022, 'Oil Change', '2024-10-23', '10:00:00', 'Choti Aquino', NULL),
(150, 'Scottie ', 'Pippen', '09564826572', 'CXZ0059', 'Ford', 'Raptor', 2022, 'Tire Rotation', '2024-10-23', '03:00:00', 'Choti Aquino', NULL),
(151, 'Nate', 'Robinson', '09246856248', 'MBU2045', 'Hyundai', 'Tucson', 2018, 'Transmission', '2024-10-30', '03:24:00', 'Karl Marte', NULL),
(152, 'Dennis', 'Rodman', '09864562754', 'KSA2498', 'Toyota', 'Vios', 2021, 'Tire Rotation', '2024-10-30', '03:26:00', 'Choti Aquino', NULL),
(153, 'Steve', 'Kerr', '09564728364', 'MBN0245', 'Chevrolet', 'Sail', 2021, 'Unknown/For Checkup', '2024-10-30', '10:31:00', 'Choti Aquino', NULL),
(154, 'John', 'Paxson', '09574382574', 'SHJ0284', 'Ford', 'Fiesta', 2023, 'Oil Change', '2024-10-30', '10:35:00', 'Karl Marte', NULL),
(155, 'Mohammed', 'Ali', '09453728565', 'BSF2574', 'Hyundai', 'Accent', 2017, 'Transmission', '2024-10-23', '11:32:00', 'Choti Aquino', NULL),
(156, 'Connor', 'Mcgregor', '09245745948', 'NKG2049', 'Ford', 'Raptor', 2018, 'Transmission', '2024-10-31', '11:38:00', 'Karl Marte', NULL),
(157, 'Ghoun', 'Esteban', '09437256482', 'ITN2049', 'Hyundai', 'Almera', 2021, 'Transmission', '2024-10-31', '11:49:00', 'Choti Aquino', NULL),
(158, 'Mike', 'Tan', '09584638291', 'HTN2509', 'Toyota', 'HiAce', 2024, 'Tire Rotation', '2024-10-30', '11:55:00', 'Karl Marte', NULL),
(159, 'Zeus', 'Martinez', '09462856482', 'NUT2408', 'Nissan', 'Lancer', 2008, 'Unknown/For Checkup', '2024-10-30', '12:02:00', 'Karl Marte', NULL),
(160, 'King', 'Estrada', '09824739127', 'BKG9985', 'Ford', 'Fiesta', 2018, 'Transmission', '2024-10-30', '12:09:00', 'Karl Marte', NULL),
(161, 'Hershey', 'Marie', '09642745574', 'JNT2049', 'Ford', 'Ecosport', 2019, 'Engine Check', '2024-10-30', '13:45:00', 'Jigz Esteban', NULL),
(162, 'Hershey', 'Marie', '09642745574', 'JNT2049', 'Ford', 'Ecosport', 2019, 'Change Oil', '2024-10-31', '14:07:00', 'Choti Aquino', NULL),
(163, 'Hershey', 'Agunday', '09637265746', 'JNT2049', 'Toyota', 'Vios', 2022, 'Transmission', '2024-11-01', '14:29:00', 'Karl Marte', NULL),
(164, 'Randy', 'McGrady', '09866582741', 'SAD6746', 'Hyundai', 'Accent', 2019, 'Unknown/For Checkup', '2024-10-23', '15:04:00', 'Jigz Esteban', NULL),
(165, 'James', 'Harden', '09671241256', 'SAD6746', 'Ford', 'Raptor', 2021, 'Tire Rotation', '2024-10-31', '16:41:00', 'Jigz Esteban', NULL),
(166, 'Marlon', 'Victorio', '09251634875', 'HBT6857', 'Ford', 'Ecosport', 2022, 'Unknown/For Checkup', '2024-10-24', '16:48:00', 'Choti Aquino', NULL),
(167, 'Marie', 'Bonite', '09564285745', 'NBM2450', 'Chevrolet', 'Sail', 2012, 'Oil Change', '2024-10-31', '16:54:00', 'Jigz Esteban', NULL),
(168, 'John', 'Batum', '09569675641', 'NGB2481', 'Ford', 'Ecosport', 2022, 'Tire Rotation', '2024-10-31', '17:16:00', 'Choti Aquino', NULL),
(169, 'Martin', 'Rivera', '09827354638', 'HTB6756', 'Toyota', 'Vios', 2022, 'Transmission', '2024-10-31', '17:34:00', 'Jigz Esteban', NULL),
(170, 'Ace', 'Mendoza', '09576412621', 'QHX5874', 'Toyota', 'HiAce', 2019, 'Transmission', '2024-10-31', '17:59:00', 'Karl Marte', NULL),
(171, 'jonathan', 'kuminga', '09564821462', 'nba2495', 'Honda', 'Civic', 2012, 'Unknown/For Checkup', '2024-11-01', '10:00:00', 'Choti Aquino', '79a9b9d0c8302867e03b8dd6ddfb8f05'),
(172, 'Sam', 'Milby', '09852657462', 'NMY0677', 'Ford', 'Ecosport', 2020, 'Engine Check', '2024-11-01', '11:49:00', 'Choti Aquino', NULL),
(173, 'Kevin', 'Porter', '09365826564', 'NOH7958', 'Toyota', 'Vios', 2023, 'Oil Change', '2024-11-01', '11:56:00', 'Jigz Esteban', '654644226281719621ed1a3f195c7ee4'),
(174, 'Stephen', 'Smith', '09682765674', 'HTJ5098', 'Nissan', 'Almera', 2019, 'Palit lahat', '2024-11-01', '13:32:00', 'Choti Aquino', '61e9a95e097fb5e7b3d22c44510d8e61'),
(175, 'reynaldo', 'reyes', '09657487274', 'uva626', 'Mitsubishi', 'Montero', 2019, 'Oil Change, Engine Check', '2024-11-01', '15:00:00', 'Choti Aquino', '0ccd677442d9ba308fca64c822e6cd7d'),
(176, 'max', 'christie', '09525594867', 'KNT5840', 'Toyota', 'Vios', 2023, 'Oil Change', '2024-11-01', '20:11:00', 'Karl Marte', 'f672017adfd78229f22aa1cf8bdfa881'),
(177, 'Alvin', 'moreno', '09573484625', 'tyh2948', 'Chevrolet', 'Trailblazer', 2010, 'Unknown/For Checkup', '2024-11-02', '10:00:00', 'Alfred Batumbakal', 'aa76c36e07428495e1dd81f6c5c5732b'),
(178, '1', '1', '09574657462', 'nbm2109', 'Toyota', 'Land Cruiser', 2009, 'Unknown/For Checkup', '2024-11-02', '14:00:00', 'Vince Carter', '0e5c1ffbb52d9f2f2046491c7324ff3c'),
(179, 'Neil', 'Armstrong', '639768473627', 'ASD1204', 'Honda', 'Civic', 2019, 'Tire Rotation', '2024-11-02', '21:19:00', 'Choti Aquino', '1153fb18bf76622e603f96adeb594f30'),
(180, 'Kian', 'Soriano', '639762547566', 'NYP5094', 'Ford', 'Raptor', 2021, 'Tire Rotation', '2024-11-04', '00:25:00', 'Choti Aquino', '5e3ef4708b9b440e36edff1c484b31db'),
(181, 'Francis', 'Corpuz', '639864726482', 'JYU0959', 'Ford', 'Ecosport', 2022, 'Unknown/For Checkup', '2024-11-03', '01:44:00', 'Chito Aquino', 'd8b60e8dc3e694ec68451306ac792026'),
(182, 'AVY', 'Rebite', '639846582734', 'jjg4052', 'Chevrolet', 'Captiva', 2017, 'Unknown/For Checkup', '2024-11-04', '10:00:00', NULL, '8d1f39e8cda9bbc22fc213fdbb33eb78'),
(183, 'Joshua', 'Banaria', '639564726412', 'NGM0975', 'Nissan', 'Almera', 2022, 'Transmission', '2024-11-04', '02:12:00', 'Choti Aquino', 'aace60c2947ae95d319c9886636ed804'),
(184, 'Kiko', 'Sibal', '639872746521', 'JHN2471', 'Chevrolet', 'Sail', 2019, 'Transmission', '2024-11-04', '02:17:00', 'Karl Marte', '244d1c4faabe6b9b3c14b7a89eab447d'),
(185, 'Christopher', 'Martin', '639214627564', 'YBW0294', 'Toyota', 'Vios', 2022, 'Engine Check', '2024-11-04', '02:19:00', 'Choti Aquino', '1a45dcb9384873383622a8c0c29d209b'),
(186, 'Ray', 'Yu', '639726584712', 'UTN4472', 'Hyundai', 'Tucson', 2019, 'Unknown/For Checkup', '2024-11-04', '02:21:00', 'Mike Reyes', 'f2a60c87432e922a6afd5573b74044fb'),
(187, 'richard', 'jefferson', '639657462711', 'rew9248', 'Toyota', 'Land Cruiser', 2008, 'Unknown/For Checkup', '2024-11-04', '10:00:00', NULL, '83d108d6b8f63fee1a29f18c51c6983b'),
(188, 'RiCKy', 'rubio', '639284756348', 'qoy5894', 'Chevrolet', 'Sail', 2020, 'Unknown/For Checkup', '2024-11-04', '10:00:00', NULL, 'bb38ed37632d3ec19a20ee7d1f5a4ace'),
(189, 'Jimmy', 'santos', '639574821029', 'nnm9984', 'Ford', 'Ecosport', 2023, 'Unknown/For Checkup', '2024-11-04', '11:00:00', 'Choti Aquino', '6b01ba4b3d9f0a63e1a920f8ebdd4125'),
(190, 'trixie', 'kate', '639578429181', 'vnb0594', 'Toyota', 'Vios', 2024, 'Oil Change', '2024-11-05', '10:00:00', 'Kurt Juanitez', '1ee44ab68bfe1091927f3154d3c95fbb'),
(191, 'carmelo', 'anthony', '639758472615', 'pph5924', 'Ford', 'Ranger', 2014, 'Unknown/For Checkup', '2024-11-09', '10:00:00', 'Karl Marte', '286db2f7e84efa7f3dac1c9ccef96323'),
(192, 'SEAN', 'CHAVEZ', '639847659292', 'nmb0495', 'Ford', 'Focus', 2010, 'Unknown/For Checkup', '2024-11-09', '10:00:00', 'Kurt Juanitez', 'a5b2ceb41506597e39e78f112c274a9a'),
(193, 'iAN', 'TEODOSIO', '639574821928', 'LBC2258', 'Toyota', 'Innova', 2014, 'Unknown/For Checkup', '2024-11-05', '10:00:00', 'Conrad Quadrado', '29ed71c4893dd7d54074a4974aee5611'),
(194, 'JINKY', 'MENDOZA', '639584828482', 'RRG4824', 'Ford', 'Escape', 2007, 'Unknown/For Checkup', '2024-11-05', '10:00:00', 'Choti Aquino', 'a003b9ae05aa1fd2e6710617724b1bb0'),
(195, 'kane', 'hayes', '639547568490', 'fnt2509', 'Ford', 'Escape', 2009, 'Unknown/For Checkup', '2024-11-04', '11:00:00', 'Karl Marte', '60e4001946a8dce92a9e150114339ebc'),
(196, 'nice', 'quinto', '639058234162', 'nbm4124', 'Toyota', 'Fortuner', 2009, 'Unknown/For Checkup', '2024-11-04', '11:00:00', 'Kurt Juanitez', '26e9935b0654ab266f4155cedb75e524'),
(197, 'super', 'frince', '639424056784', 'asd2421', 'Ford', 'Escape', 2009, 'Heating and Air Conditioning', '2024-11-04', '13:00:00', 'Miggy Cruz', '686efd8dd1b01e22ebe95f41b5467abf'),
(198, 'Ajhay', 'Nepomuceno', '639576215849', 'oop2049', 'Chevrolet', 'Trailblazer', 2009, 'Unknown/For Checkup', '2024-11-04', '13:00:00', 'Choti Aquino', '40d487b13a7eb6c65be1aa57808baa77'),
(199, 'justine', 'chan', '639657472721', 'yht5954', 'Chevrolet', 'Trailblazer', 2009, 'Oil Change, Heating and Air Conditioning', '2024-11-05', '11:00:00', 'Choti Aquino', '3a8d40475a70bd4d97d6490ac75b7d39'),
(200, 'Diane ', 'Libay', '639186457956', 'nbm1241', 'Ford', 'Escape', 2010, 'Unknown/For Checkup', '2024-11-05', '11:00:00', 'Karl Marte', '813fbb08eb45442fdc1d543b119e2622'),
(201, 'wyxz', 'wyxz', '639454308680', 'nbm2495', 'Ford', 'Escape', 2009, 'Unknown/For Checkup', '2024-11-05', '11:00:00', 'Alfred Batumbakal', '5f89612c57fb14b0dada9d57668c412e'),
(202, 'Ishi', 'Marie', '639947729049', 'ewq4029', 'Ford', 'Focus', 2010, 'Unknown/For Checkup', '2024-11-07', '10:00:00', 'Alfred Batumbakal', 'd6854069541b314fa721f30305586ff9'),
(203, 'jigz', 'esteban', '09454308680', 'nbk6045', 'Ford', 'Ecosport', 2024, 'Unknown/For Checkup', '2024-11-05', '13:00:00', 'Choti Aquino', 'ded256a4c2b0e7e04be7adbed9776825'),
(204, 'hershey', 'bonite', '09454308680', 'afo5049', 'Chevrolet', 'Sail', 2015, 'Unknown/For Checkup', '2024-11-05', '13:00:00', 'Miggy Cruz', 'c37a1fd788a4ab6c828e4a87f6bbb82d'),
(205, 'iane', 'ghoun', '09454308680', 'jhg5872', 'Toyota', 'Fortuner', 2011, 'Unknown/For Checkup', '2024-11-07', '10:00:00', 'Choti Aquino', 'b07c39af2544867706851e11137bc5df'),
(206, 'Kent', 'Barcelona', '639454308680', 'hgk2049', 'Toyota', 'Fortuner', 2012, 'Unknown/For Checkup', '2024-11-05', '15:00:00', 'Karl Marte', '58ca82255a250b9715ea71554103a8ce'),
(207, 'Marie', 'Ishi', '639454308680', 'EWQ4029', 'Toyota', 'Raptor', 2021, 'Transmission', '2024-11-05', '13:00:00', 'Conrad Quadrado', 'b68d76a5c2932747cb606fddbc3c60a6'),
(208, 'Princess', 'Freiya', '639947729049', 'tgb5749', 'Toyota', 'Fortuner', 2010, 'Computer Diagnostics', '2024-11-05', '14:00:00', 'Karl Marte', '1184d0498d5accd3ad48c805eaed4365');

-- --------------------------------------------------------

--
-- Table structure for table `appointment_progress_status`
--

CREATE TABLE `appointment_progress_status` (
  `id` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL,
  `progress_report_enabled` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointment_progress_status`
--

INSERT INTO `appointment_progress_status` (`id`, `appointment_id`, `progress_report_enabled`) VALUES
(1, 89, 1),
(2, 82, 1),
(3, 95, 1),
(4, 86, 1),
(5, 81, 1),
(6, 73, 1),
(7, 101, 1),
(8, 99, 1),
(9, 104, 1),
(10, 106, 1),
(11, 94, 1),
(12, 77, 1),
(13, 100, 1),
(14, 96, 1),
(15, 102, 1),
(16, 83, 1),
(17, 108, 1),
(18, 75, 1),
(19, 112, 1),
(20, 113, 1),
(21, 79, 1),
(22, 114, 1),
(23, 115, 1),
(24, 116, 1),
(25, 117, 1),
(26, 78, 1),
(27, 118, 1),
(28, 119, 1),
(29, 120, 1),
(30, 98, 1),
(31, 97, 1),
(32, 103, 1),
(33, 121, 1),
(34, 122, 1),
(35, 85, 1),
(36, 123, 1),
(37, 124, 1),
(38, 125, 1),
(39, 126, 1),
(40, 129, 1),
(41, 130, 1),
(42, 131, 1),
(43, 132, 1),
(44, 133, 1),
(45, 134, 1),
(46, 135, 1),
(47, 136, 1),
(48, 137, 1),
(49, 138, 1),
(50, 139, 1),
(51, 140, 1),
(52, 141, 1),
(53, 76, 1),
(54, 142, 1),
(55, 148, 1),
(56, 144, 1),
(57, 146, 1),
(58, 147, 1),
(59, 149, 1),
(60, 150, 1),
(61, 151, 1),
(62, 152, 1),
(63, 153, 1),
(64, 154, 1),
(65, 155, 1),
(66, 156, 1),
(67, 157, 1),
(68, 158, 1),
(69, 159, 1),
(70, 160, 1),
(71, 161, 1),
(72, 162, 1),
(73, 163, 1),
(74, 164, 1),
(75, 165, 1),
(76, 145, 1),
(77, 166, 1),
(78, 167, 1),
(79, 168, 1),
(80, 169, 1),
(81, 170, 1),
(82, 171, 1),
(83, 172, 1),
(84, 173, 1),
(85, 174, 1),
(86, 175, 1),
(87, 74, 1),
(88, 176, 1),
(89, 179, 1),
(90, 180, 1),
(91, 181, 1),
(92, 182, 1),
(93, 183, 1),
(94, 184, 1),
(95, 185, 1),
(96, 186, 1),
(97, 202, 1),
(98, 206, 1),
(99, 207, 1),
(100, 208, 1);

-- --------------------------------------------------------

--
-- Table structure for table `car_conditions`
--

CREATE TABLE `car_conditions` (
  `id` int(11) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `car_conditions`
--

INSERT INTO `car_conditions` (`id`, `file_path`, `token`, `created_at`) VALUES
(31, 'uploads/car_conditions/1730432152_79a9b9d0c8302867e03b8dd6ddfb8f05_2.jpg', '79a9b9d0c8302867e03b8dd6ddfb8f05', '2024-11-01 03:35:52'),
(32, 'uploads/car_conditions/1730432152_79a9b9d0c8302867e03b8dd6ddfb8f05_3.jpg', '79a9b9d0c8302867e03b8dd6ddfb8f05', '2024-11-01 03:35:52'),
(33, 'uploads/car_conditions/1730432152_79a9b9d0c8302867e03b8dd6ddfb8f05_4.jpg', '79a9b9d0c8302867e03b8dd6ddfb8f05', '2024-11-01 03:35:52'),
(34, 'uploads/car_conditions/1730432152_79a9b9d0c8302867e03b8dd6ddfb8f05_5.jpg', '79a9b9d0c8302867e03b8dd6ddfb8f05', '2024-11-01 03:35:52'),
(35, 'uploads/car_conditions/1730432246_79a9b9d0c8302867e03b8dd6ddfb8f05_5.jpg', '79a9b9d0c8302867e03b8dd6ddfb8f05', '2024-11-01 03:37:26'),
(36, 'uploads/car_conditions/1730434009_654644226281719621ed1a3f195c7ee4_me.jpg', '654644226281719621ed1a3f195c7ee4', '2024-11-01 04:06:49'),
(37, 'uploads/car_conditions/1730439278_61e9a95e097fb5e7b3d22c44510d8e61_About me.png', '61e9a95e097fb5e7b3d22c44510d8e61', '2024-11-01 05:34:38'),
(38, 'uploads/car_conditions/1730440086_0ccd677442d9ba308fca64c822e6cd7d_462640962_3939506989652162_7441887404624792900_n.jpg', '0ccd677442d9ba308fca64c822e6cd7d', '2024-11-01 05:48:06'),
(39, 'uploads/car_conditions/1730440086_0ccd677442d9ba308fca64c822e6cd7d_462547912_922191599834901_6107650301322858495_n.jpg', '0ccd677442d9ba308fca64c822e6cd7d', '2024-11-01 05:48:06'),
(40, 'uploads/car_conditions/1730440086_0ccd677442d9ba308fca64c822e6cd7d_462648064_579615991257537_4096330205830329919_n.jpg', '0ccd677442d9ba308fca64c822e6cd7d', '2024-11-01 05:48:06'),
(41, 'uploads/car_conditions/1730440086_0ccd677442d9ba308fca64c822e6cd7d_462560527_1325142788866949_6998819650591301699_n.jpg', '0ccd677442d9ba308fca64c822e6cd7d', '2024-11-01 05:48:06'),
(42, 'uploads/car_conditions/1730440086_0ccd677442d9ba308fca64c822e6cd7d_462582384_528534779975396_6177029075655069392_n.jpg', '0ccd677442d9ba308fca64c822e6cd7d', '2024-11-01 05:48:06'),
(43, 'uploads/car_conditions/1730885258_58ca82255a250b9715ea71554103a8ce_choose-bg.jpg', '58ca82255a250b9715ea71554103a8ce', '2024-11-06 09:27:38'),
(44, 'uploads/car_conditions/1730885859_f2a60c87432e922a6afd5573b74044fb_background3.png', 'f2a60c87432e922a6afd5573b74044fb', '2024-11-06 09:37:39'),
(45, 'uploads/car_conditions/1730885859_f2a60c87432e922a6afd5573b74044fb_background2.png', 'f2a60c87432e922a6afd5573b74044fb', '2024-11-06 09:37:39');

-- --------------------------------------------------------

--
-- Table structure for table `checklists`
--

CREATE TABLE `checklists` (
  `id` int(11) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `checklists`
--

INSERT INTO `checklists` (`id`, `file_path`, `token`, `created_at`) VALUES
(1, 'uploads/checklists/1.jpg', '79a9b9d0c8302867e03b8dd6ddfb8f05', '2024-11-01 03:29:42'),
(2, 'uploads/checklists/1730432152_79a9b9d0c8302867e03b8dd6ddfb8f05_1.jpg', '79a9b9d0c8302867e03b8dd6ddfb8f05', '2024-11-01 03:35:52'),
(3, 'uploads/checklists/1730432246_79a9b9d0c8302867e03b8dd6ddfb8f05_1.jpg', '79a9b9d0c8302867e03b8dd6ddfb8f05', '2024-11-01 03:37:26'),
(4, 'uploads/checklists/1730434009_654644226281719621ed1a3f195c7ee4_prof.png', '654644226281719621ed1a3f195c7ee4', '2024-11-01 04:06:49'),
(5, 'uploads/checklists/1730439278_61e9a95e097fb5e7b3d22c44510d8e61_CO-AUTHORSHIP-AGREEMENT.pdf', '61e9a95e097fb5e7b3d22c44510d8e61', '2024-11-01 05:34:38'),
(6, 'uploads/checklists/1730440086_0ccd677442d9ba308fca64c822e6cd7d_462542385_437649626020594_4241602666550852807_n.jpg', '0ccd677442d9ba308fca64c822e6cd7d', '2024-11-01 05:48:06'),
(7, 'uploads/checklists/1730885258_58ca82255a250b9715ea71554103a8ce_commitment-bg.jpg', '58ca82255a250b9715ea71554103a8ce', '2024-11-06 09:27:38'),
(8, 'uploads/checklists/1730885859_f2a60c87432e922a6afd5573b74044fb_background1.png', 'f2a60c87432e922a6afd5573b74044fb', '2024-11-06 09:37:39');

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `stock` int(11) NOT NULL,
  `retail_price` decimal(10,2) NOT NULL,
  `capital_price` decimal(10,2) NOT NULL,
  `item_by` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`id`, `name`, `brand`, `category`, `status`, `type`, `stock`, `retail_price`, `capital_price`, `item_by`) VALUES
(1, 'Y2K HEADLIGHT', 'TOYOTA', 'HEADLIGHT', 'inactive', 'ORIGINAL', 9, 1200.00, 600.00, 'GLEN'),
(2, 'TOYOTA PARK LIGHT', 'BMW', 'LIGHT', 'active', 'CLASS A', 9, 1200.00, 1200.00, 'GLEN'),
(3, 'RBC MUFFLER', 'TOYOTA', 'MUFFLER', 'inactive', 'ORIGINAL', 9, 5100.00, 1600.00, 'GLEN'),
(4, 'VILLAIN FENDER', 'SUZUKI', 'FENDER', 'inactive', 'ORIGINAL', 10, 4225.75, 3100.00, 'GLEN'),
(5, 'SUZUKI OIL SEAL', 'SUZUKI', 'OIL', 'inactive', 'CLASS A', 8, 250.00, 100.00, 'GLEN'),
(6, 'TOYOTA SIDE MIRROR', 'TOYOTA', 'MIRROR', 'active', 'ORIGINAL', 13, 5000.00, 2500.00, 'GLEN'),
(7, 'FORD OIL GASKET', 'FORD', 'OIL FILTER', 'inactive', 'ORIGINAL', 0, 500.00, 150.00, 'GLEN'),
(8, 'SHELL HELIX ULTRA 0W-40 OIL 1L', 'SHELL', 'OIL', 'active', 'ORIGINAL', 12, 1200.00, 900.00, 'ANALYN'),
(9, 'HAVOLINE PRODS FULLY SYNTHETIC LE SAE 5W-40', 'CALTEX', 'OIL', 'inactive', 'ORIGINAL', 8, 1300.00, 950.00, 'GLEN'),
(10, 'HYUNDAI SIDE MIRROR', 'HYUNDAI', 'MIRROR', 'active', 'ORIGINAL', 18, 1500.00, 1000.00, 'ANALYN'),
(11, 'RUSI OIL', 'RUSI', 'OIL', 'active', 'ORIGINAL', 12, 1200.00, 700.00, 'GLEN'),
(12, 'FORD OIL FILTER', 'FORD', 'OIL FILTER', 'active', 'ORIGINAL', 1, 1500.00, 850.00, 'GLEN'),
(13, 'FORD TAIL LIGHT', 'FORD', 'LIGHT', 'inactive', 'ORIGINAL', 8, 1000.00, 800.00, 'GLEN'),
(14, 'FORD OIL FILTER CLASS S', 'FORD', 'OIL FILTER', 'active', 'CLASS A', 4, 1200.00, 600.00, 'GLEN');

--
-- Triggers `inventory`
--
DELIMITER $$
CREATE TRIGGER `update_job_order_parts_availability` AFTER UPDATE ON `inventory` FOR EACH ROW BEGIN
    -- Check if the stock has been increased from 0 to a positive value
    IF NEW.stock > 0 AND OLD.stock = 0 THEN
        -- Update availability in job_order_parts where part name matches and availability is 'Unavailable'
        UPDATE job_order_parts 
        SET availability = 'Available', progress = 'In Progress'
        WHERE part_name = NEW.name AND availability = 'Unavailable';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `inventory_deduction`
--

CREATE TABLE `inventory_deduction` (
  `id` int(11) NOT NULL,
  `job_order_id` int(11) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `part_name` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `completion_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory_deduction`
--

INSERT INTO `inventory_deduction` (`id`, `job_order_id`, `first_name`, `last_name`, `part_name`, `quantity`, `completion_time`) VALUES
(1, 135, 'Setsuna Ignacio', '2024-11-01', 'Y2K HEADLIGHT', 1, '0000-00-00 00:00:00'),
(2, 135, 'Setsuna Ignacio', '2024-11-01', 'FORD OIL FILTER', 2, '0000-00-00 00:00:00'),
(3, 135, 'Setsuna Ignacio', '2024-11-01', 'Y2K HEADLIGHT', 1, '0000-00-00 00:00:00'),
(4, 136, 'Marlon Victorio', '2024-11-01', 'FORD OIL FILTER', 2, '0000-00-00 00:00:00'),
(5, 137, 'Marie Bonite', '2024-11-01', 'FORD OIL FILTER', 1, '2024-10-31 09:06:22'),
(6, 140, 'Ace Mendoza', '2024-11-01', 'FORD OIL FILTER', 1, '0000-00-00 00:00:00'),
(7, 140, 'Ace Mendoza', '2024-11-01', 'SUZUKI OIL SEAL', 1, '0000-00-00 00:00:00'),
(8, 139, 'Martin Rivera', '2024-11-01', 'TOYOTA SIDE MIRROR', 1, '2024-10-31 10:42:44'),
(9, 139, 'Martin Rivera', '2024-11-01', 'VILLAIN FENDER', 2, '2024-10-31 10:42:46'),
(10, 139, 'Martin Rivera', '2024-11-01', 'RUSI OIL', 1, '2024-10-31 10:42:49'),
(11, 138, 'John Batum', '2024-11-01', 'TOYOTA SIDE MIRROR', 1, '2024-10-31 10:44:18'),
(12, 119, 'Ghoun Esteban', '2024-10-31', 'HAVOLINE PRODS FULLY SYNTHETIC LE SAE 5W-40', 1, '2024-10-31 12:31:09'),
(13, 118, 'Connor Mcgregor', '2024-10-31', 'FORD OIL GASKET', 1, '2024-10-31 12:31:16'),
(14, 118, 'Connor Mcgregor', '2024-10-31', 'HAVOLINE PRODS FULLY SYNTHETIC LE SAE 5W-40', 1, '2024-10-31 12:31:18'),
(15, 121, 'Zeus Martinez', '2024-10-31', 'HAVOLINE PRODS FULLY SYNTHETIC LE SAE 5W-40', 1, '2024-10-31 12:31:25'),
(16, 116, 'John Paxson', '2024-10-31', 'TOYOTA SIDE MIRROR', 1, '2024-10-31 12:31:34'),
(17, 116, 'John Paxson', '2024-10-31', 'HAVOLINE PRODS FULLY SYNTHETIC LE SAE 5W-40', 1, '2024-10-31 12:31:36'),
(18, 115, 'Steve Kerr', '2024-10-31', 'SHELL HELIX ULTRA 0W-40 OIL 1L', 1, '2024-10-31 12:31:39'),
(19, 114, 'Dennis Rodman', '2024-10-31', 'HAVOLINE PRODS FULLY SYNTHETIC LE SAE 5W-40', 1, '2024-10-31 12:31:43'),
(20, 136, 'Marlon Victorio', '2024-11-01', 'Y2K HEADLIGHT', 1, '2024-10-31 12:33:57'),
(21, 117, 'Mohammed Ali', '2024-10-31', 'FORD OIL GASKET', 1, '2024-10-31 12:34:09'),
(22, 112, 'Scottie Pippen', '2024-10-31', 'FORD OIL FILTER', 1, '2024-10-31 12:34:12'),
(23, 112, 'Scottie Pippen', '2024-10-31', 'TOYOTA SIDE MIRROR', 1, '2024-10-31 12:34:13'),
(24, 140, 'Ace', 'Mendoza', 'FORD OIL FILTER', 1, '2024-10-31 13:02:38'),
(25, 139, 'Martin', 'Rivera', 'FORD OIL FILTER CLASS S', 1, '2024-10-31 13:06:16'),
(26, 138, 'John', 'Batum', 'FORD OIL GASKET', 1, '2024-10-31 13:10:35'),
(27, 141, 'Jonathan', 'Kuminga', 'FORD OIL FILTER', 1, '2024-11-01 03:16:02'),
(28, 141, 'Jonathan', 'Kuminga', 'FORD OIL GASKET', 1, '2024-11-01 03:38:48'),
(29, 142, 'Sam', 'Milby', 'FORD TAIL LIGHT', 1, '2024-11-01 03:50:26'),
(30, 142, 'Sam', 'Milby', 'HAVOLINE PRODS FULLY SYNTHETIC LE SAE 5W-40', 1, '2024-11-01 03:50:32'),
(31, 142, 'Sam', 'Milby', 'RBC MUFFLER', 1, '2024-11-01 03:50:34'),
(32, 143, 'Kevin', 'Porter', 'TOYOTA PARK LIGHT', 1, '2024-11-01 03:58:54'),
(33, 143, 'Kevin', 'Porter', 'VILLAIN FENDER', 1, '2024-11-01 03:58:55'),
(34, 143, 'Kevin', 'Porter', 'TOYOTA SIDE MIRROR', 1, '2024-11-01 03:59:04'),
(35, 144, 'Stephen', 'Smith', 'RUSI OIL', 2, '2024-11-01 05:35:59'),
(36, 145, 'Reynaldo', 'Reyes', 'FORD OIL GASKET', 1, '2024-11-01 05:49:17'),
(37, 147, 'Max', 'Christie', 'FORD OIL GASKET', 1, '2024-11-02 03:53:26'),
(38, 147, 'Max', 'Christie', 'FORD OIL FILTER', 1, '2024-11-02 16:53:08'),
(39, 150, 'Francis', 'Corpuz', 'FORD OIL FILTER', 1, '2024-11-04 16:18:56'),
(40, 156, 'Ishi', 'Marie', 'FORD OIL GASKET', 1, '2024-11-05 19:58:43'),
(41, 156, 'Ishi', 'Marie', 'FORD OIL FILTER', 1, '2024-11-05 19:58:44'),
(42, 156, 'Ishi', 'Marie', 'HAVOLINE PRODS FULLY SYNTHETIC LE SAE 5W-40', 1, '2024-11-05 19:58:46'),
(43, 158, 'Marie', 'Ishi', 'FORD OIL FILTER', 1, '2024-11-05 20:33:58'),
(44, 159, 'Princess', 'Freiya', 'FORD OIL FILTER', 1, '2024-11-05 23:00:02'),
(45, 157, 'Kent', 'Barcelona', 'RUSI OIL', 1, '2024-11-06 09:20:44'),
(46, 149, 'Kian', 'Soriano', 'FORD OIL FILTER', 1, '2024-11-06 17:02:08'),
(47, 151, 'Avy', 'Rebite', 'FORD OIL FILTER CLASS S', 1, '2024-11-06 17:02:23'),
(48, 152, 'Joshua', 'Banaria', 'FORD OIL FILTER CLASS S', 1, '2024-11-06 17:03:01'),
(49, 153, 'Kiko', 'Sibal', 'FORD OIL FILTER', 1, '2024-11-06 17:12:55'),
(50, 155, 'Ray', 'Yu', 'FORD OIL FILTER CLASS S', 1, '2024-11-06 17:37:48'),
(51, 154, 'Christopher', 'Martin', 'FORD OIL FILTER CLASS S', 1, '2024-11-06 18:28:56'),
(52, 148, 'Neil', 'Armstrong', 'FORD OIL GASKET', 1, '2024-11-06 18:30:19'),
(53, 45, 'Choti', 'Aquino', 'FORD OIL FILTER', 1, '2024-11-06 18:32:08'),
(54, 142, 'Sam', 'Milby', 'SHELL HELIX ULTRA 0W-40 OIL 1L', 1, '2024-11-06 18:32:32'),
(55, 147, 'Max', 'Christie', 'FORD OIL FILTER CLASS S', 1, '2024-11-06 18:33:55'),
(56, 157, 'Kent', 'Barcelona', 'FORD OIL FILTER CLASS S', 1, '2024-11-06 18:35:19'),
(57, 157, 'Kent', 'Barcelona', 'SUZUKI OIL SEAL', 1, '2024-11-06 18:35:20'),
(58, 157, 'Kent', 'Barcelona', 'FORD OIL GASKET', 1, '2024-11-06 18:35:22'),
(59, 137, 'Marie', 'Bonite', 'FORD OIL FILTER', 1, '2024-11-06 18:54:07'),
(60, 138, 'John', 'Batum', 'FORD TAIL LIGHT', 1, '2024-11-06 18:55:06');

-- --------------------------------------------------------

--
-- Table structure for table `inventory_stock_changes`
--

CREATE TABLE `inventory_stock_changes` (
  `id` int(11) NOT NULL,
  `part_name` varchar(255) NOT NULL,
  `change_type` enum('add','deduct') NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_stock` int(11) NOT NULL,
  `change_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory_stock_changes`
--

INSERT INTO `inventory_stock_changes` (`id`, `part_name`, `change_type`, `quantity`, `total_stock`, `change_date`) VALUES
(1, 'SUZUKI OIL SEAL', 'add', 1, 10, '2024-10-31 19:49:04'),
(2, 'FORD OIL FILTER', 'deduct', 1, 19, '2024-10-31 20:09:00'),
(3, 'SUZUKI OIL SEAL', 'deduct', 1, 9, '2024-10-31 20:09:52'),
(4, 'FORD OIL FILTER', 'add', 1, 20, '2024-10-31 20:14:20'),
(5, 'FORD OIL FILTER', 'deduct', 0, 10, '2024-10-31 20:40:47'),
(6, 'FORD OIL FILTER', 'deduct', 0, 10, '2024-10-31 21:05:09'),
(7, 'FORD OIL GASKET', 'deduct', 1, 13, '2024-10-31 21:10:35'),
(8, 'HAVOLINE PRODS FULLY SYNTHETIC LE SAE 5W-40', 'add', 3, 10, '2024-11-01 03:33:38'),
(9, 'FORD OIL FILTER', 'deduct', 1, 9, '2024-11-01 11:16:02'),
(10, 'FORD OIL GASKET', 'deduct', 1, 12, '2024-11-01 11:38:48'),
(11, 'FORD TAIL LIGHT', 'deduct', 1, 9, '2024-11-01 11:50:26'),
(12, 'HAVOLINE PRODS FULLY SYNTHETIC LE SAE 5W-40', 'deduct', 1, 9, '2024-11-01 11:50:32'),
(13, 'RBC MUFFLER', 'deduct', 1, 9, '2024-11-01 11:50:34'),
(14, 'TOYOTA PARK LIGHT', 'deduct', 1, 9, '2024-11-01 11:58:54'),
(15, 'VILLAIN FENDER', 'deduct', 1, 9, '2024-11-01 11:58:55'),
(16, 'TOYOTA SIDE MIRROR', 'deduct', 1, 13, '2024-11-01 11:59:04'),
(17, 'RUSI OIL', 'deduct', 2, 13, '2024-11-01 13:35:59'),
(18, 'FORD OIL GASKET', 'deduct', 12, 0, '2024-11-01 13:41:07'),
(19, 'FORD OIL GASKET', 'add', 1, 1, '2024-11-01 13:48:53'),
(20, 'FORD OIL GASKET', 'deduct', 1, 0, '2024-11-01 13:49:17'),
(21, 'FORD OIL FILTER CLASS S', 'add', 1, 10, '2024-11-01 20:37:07'),
(22, 'FORD OIL FILTER', 'add', 1, 10, '2024-11-02 11:47:52'),
(23, 'FORD OIL GASKET', 'add', 1, 1, '2024-11-02 11:53:21'),
(24, 'FORD OIL GASKET', 'deduct', 1, 0, '2024-11-02 11:53:26'),
(25, 'FORD OIL FILTER', 'deduct', 1, 9, '2024-11-02 16:53:08'),
(26, 'FORD OIL GASKET', 'add', 2, 2, '2024-11-03 18:39:41'),
(27, 'VILLAIN FENDER', 'add', 1, 10, '2024-11-03 18:47:37'),
(28, 'FORD OIL FILTER', 'deduct', 1, 8, '2024-11-04 16:18:56'),
(29, 'FORD OIL GASKET', 'add', 1, 3, '2024-11-05 19:58:27'),
(30, 'FORD OIL GASKET', 'deduct', 1, 2, '2024-11-05 19:58:43'),
(31, 'FORD OIL FILTER', 'deduct', 1, 7, '2024-11-05 19:58:44'),
(32, 'HAVOLINE PRODS FULLY SYNTHETIC LE SAE 5W-40', 'deduct', 1, 8, '2024-11-05 19:58:46'),
(33, 'FORD OIL FILTER', 'deduct', 1, 6, '2024-11-05 20:33:58'),
(34, 'FORD OIL FILTER', 'deduct', 1, 5, '2024-11-05 23:00:02'),
(35, 'RUSI OIL', 'deduct', 1, 12, '2024-11-06 09:20:44'),
(36, 'FORD OIL FILTER', 'deduct', 1, 4, '2024-11-06 17:02:08'),
(37, 'FORD OIL FILTER CLASS S', 'deduct', 1, 9, '2024-11-06 17:02:23'),
(38, 'FORD OIL FILTER CLASS S', 'deduct', 1, 8, '2024-11-06 17:03:01'),
(39, 'FORD OIL FILTER', 'deduct', 1, 3, '2024-11-06 17:12:55'),
(40, 'FORD OIL FILTER CLASS S', 'deduct', 1, 7, '2024-11-06 17:37:48'),
(41, 'FORD OIL FILTER CLASS S', 'deduct', 1, 6, '2024-11-06 18:28:56'),
(42, 'FORD OIL GASKET', 'deduct', 1, 1, '2024-11-06 18:30:19'),
(43, 'FORD OIL FILTER', 'deduct', 1, 2, '2024-11-06 18:32:08'),
(44, 'SHELL HELIX ULTRA 0W-40 OIL 1L', 'deduct', 1, 12, '2024-11-06 18:32:32'),
(45, 'FORD OIL FILTER CLASS S', 'deduct', 1, 5, '2024-11-06 18:33:55'),
(46, 'FORD OIL FILTER CLASS S', 'deduct', 1, 4, '2024-11-06 18:35:19'),
(47, 'SUZUKI OIL SEAL', 'deduct', 1, 8, '2024-11-06 18:35:20'),
(48, 'FORD OIL GASKET', 'deduct', 1, 0, '2024-11-06 18:35:22'),
(49, 'FORD OIL FILTER', 'deduct', 1, 1, '2024-11-06 18:54:07'),
(50, 'FORD TAIL LIGHT', 'deduct', 1, 8, '2024-11-06 18:55:06');

-- --------------------------------------------------------

--
-- Table structure for table `job_orders`
--

CREATE TABLE `job_orders` (
  `id` int(11) NOT NULL,
  `service` varchar(255) NOT NULL,
  `appointment_id` int(11) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `car_brand` varchar(255) DEFAULT NULL,
  `car_model` varchar(255) DEFAULT NULL,
  `year_model` varchar(255) DEFAULT NULL,
  `plate_number` varchar(255) DEFAULT NULL,
  `mechanic` varchar(255) DEFAULT NULL,
  `progress` varchar(50) DEFAULT NULL,
  `estimate_completion` date DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `appointment_date` date DEFAULT NULL,
  `progress_report_enabled` tinyint(1) DEFAULT 0,
  `token` varchar(64) DEFAULT NULL,
  `actual_completion_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_orders`
--

INSERT INTO `job_orders` (`id`, `service`, `appointment_id`, `first_name`, `last_name`, `car_brand`, `car_model`, `year_model`, `plate_number`, `mechanic`, `progress`, `estimate_completion`, `remarks`, `appointment_date`, `progress_report_enabled`, `token`, `actual_completion_date`) VALUES
(1, '', 72, '1', '1', 'Ford', 'Ecosport', '2010', NULL, 'Nate Joseph', 'In Progress', '2024-10-25', 'Ang sira ay ang carborador', NULL, 0, NULL, NULL),
(2, '', 72, '1', '1', 'Ford', 'Ecosport', '2010', NULL, 'Choti Aquino', 'In Progress', '2024-10-24', 'Dragging', NULL, 0, NULL, NULL),
(3, '', 73, 'Jigz', 'Esteban', 'Toyota', 'Fortuner', '2008', NULL, 'Karl Marte', 'In Progress', '2024-10-10', '', NULL, 0, NULL, NULL),
(4, '', 72, '1', '1', 'Ford', 'Ecosport', '2010', NULL, 'Choti Aquino', 'In Progress', '2024-10-24', '', '2024-10-08', 0, NULL, NULL),
(5, '', 72, '1', '1', 'Ford', 'Ecosport', '2010', NULL, 'Choti Aquino', 'In Progress', '2024-10-24', '', '2024-10-08', 0, NULL, NULL),
(6, '', 73, 'Jigz', 'Esteban', 'Toyota', 'Fortuner', '2008', NULL, 'Karl Marte', 'In Progress', '2024-10-24', '', '2024-10-10', 0, NULL, NULL),
(7, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL),
(8, '', 73, 'Jigz', 'Esteban', 'Toyota', 'Fortuner', '2008', NULL, 'Karl Marte', 'In Progress', '2024-10-24', '', '2024-10-10', 0, NULL, NULL),
(9, '', 76, 'Nick', 'Nick', 'Honda', 'CR-V', '2008', NULL, 'Choti Aquino', 'In Progress', '2024-10-24', 'test', '2024-10-10', 0, NULL, NULL),
(10, '', 72, '1', '1', 'Ford', 'Ecosport', '2010', NULL, 'Choti Aquino', 'In Progress', '2024-10-24', '', '2024-10-08', 0, NULL, NULL),
(11, '', 86, 'Arnel', 'Gonzales', 'Mitsubishi', 'Xpander', '2012', NULL, 'Kurt Juanitez', 'In Progress', '2024-10-24', '', '2024-10-10', 0, NULL, NULL),
(12, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL),
(13, '', 72, '1', '1', 'Ford', 'Ecosport', '2010', NULL, 'Choti Aquino', 'In Progress', '2024-10-24', '', '2024-10-08', 0, NULL, NULL),
(14, '', 89, 'Matt', 'Ryan', 'Ford', 'Everest', '2015', NULL, 'Choti Aquino', 'In Progress', '2024-10-24', '', '2024-10-11', 0, NULL, NULL),
(15, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL),
(16, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL),
(17, '', 92, 'James', 'Williams', 'Toyota', 'HiAce', '2019', NULL, 'Alfred Batumbakal', 'In Progress', '2024-10-24', '', '2024-10-11', 0, NULL, NULL),
(18, '', 72, '1', '1', 'Ford', 'Ecosport', '2010', NULL, 'Choti Aquino', 'In Progress', '2024-10-24', '', '2024-10-08', 0, NULL, NULL),
(19, '', 72, '1', '1', 'Ford', 'Ecosport', '2010', NULL, 'Choti Aquino', 'In Progress', '2024-10-24', '', '2024-10-08', 0, NULL, NULL),
(20, '', 73, 'Jigz', 'Esteban', 'Toyota', 'Fortuner', '2008', NULL, 'Karl Marte', 'In Progress', '2024-10-24', '', '2024-10-10', 0, NULL, NULL),
(21, '', 72, '1', '1', 'Ford', 'Ecosport', '2010', NULL, 'Choti Aquino', 'In Progress', '2024-10-24', '', '2024-10-08', 0, NULL, NULL),
(22, '', 72, '1', '1', 'Ford', 'Ecosport', '2010', NULL, 'Choti Aquino', 'In Progress', '2024-10-24', 'wala lang', '2024-10-08', 0, NULL, NULL),
(23, '', 72, '1', '1', 'Ford', 'Ecosport', '2010', NULL, 'Choti Aquino', 'In Progress', '2024-10-24', '', '2024-10-08', 0, NULL, NULL),
(24, '', 72, '1', '1', 'Ford', 'Ecosport', '2010', NULL, 'Choti Aquino', 'In Progress', '2024-10-24', '', '2024-10-08', 0, NULL, NULL),
(25, '', 72, '1', '1', 'Ford', 'Ecosport', '2010', NULL, 'Choti Aquino', 'In Progress', '2024-10-24', '', '2024-10-08', 0, NULL, NULL),
(26, '', 72, '1', '1', 'Ford', 'Ecosport', '2010', NULL, 'Choti Aquino', 'In Progress', '2024-10-24', '', '2024-10-08', 0, NULL, NULL),
(27, '', 73, 'Jigz', 'Esteban', 'Toyota', 'Fortuner', '2008', NULL, 'Karl Marte', 'In Progress', '2024-10-24', '', '2024-10-10', 0, NULL, NULL),
(28, '', 81, 'James', 'Michael', 'Mitsubishi', 'Mirage', '2009', NULL, 'Alfred Batumbakal', 'In Progress', '2024-10-24', '', '2024-10-10', 0, NULL, NULL),
(29, '', 91, 'Paul', 'Fernando', 'Ford', 'Focus', '2014', NULL, 'Choti Aquino', 'In Progress', '2024-10-24', '', '2024-10-11', 0, NULL, NULL),
(30, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL),
(31, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL),
(32, '', 72, '1', '1', 'Ford', 'Ecosport', '2010', NULL, 'Choti Aquino', 'In Progress', '2024-10-24', '', '2024-10-08', 0, NULL, NULL),
(33, '', 73, 'Jigz', 'Esteban', 'Toyota', 'Fortuner', '2008', NULL, 'Karl Marte', 'In Progress', '2024-10-24', '', '2024-10-10', 0, NULL, NULL),
(34, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL),
(35, '', 72, '1', '1', 'Ford', 'Ecosport', '2010', NULL, 'Choti Aquino', 'In Progress', '2024-10-24', '', '2024-10-08', 0, NULL, NULL),
(36, '', 72, '1', '1', 'Ford', 'Ecosport', '2010', NULL, 'Choti Aquino', 'In Progress', '2024-10-31', '', '2024-10-08', 0, NULL, NULL),
(37, '', 72, '1', '1', 'Ford', 'Ecosport', '2010', NULL, 'Choti Aquino', 'In Progress', '2024-10-24', '', '2024-10-08', 0, NULL, NULL),
(38, '', 72, '1', '1', 'Ford', 'Ecosport', '2010', NULL, 'Choti Aquino', 'In Progress', '2024-10-24', 'Yep', '2024-10-08', 0, NULL, NULL),
(39, 'Transmission', 72, '1', '1', 'Ford', 'Ecosport', '2010', NULL, 'Choti Aquino', 'In Progress', '2024-10-24', '', '2024-10-08', 0, NULL, NULL),
(40, 'Engine Check', 73, 'Jigz', 'Esteban', 'Toyota', 'Fortuner', '2008', NULL, 'Karl Marte', 'In Progress', '2024-10-24', '', '2024-10-10', 0, NULL, NULL),
(41, 'Transmission', 72, '1', '1', 'Ford', 'Ecosport', '2010', NULL, 'Choti Aquino', 'In Progress', '2024-10-24', '', '2024-10-08', 0, NULL, NULL),
(42, 'Transmission', 72, '1', '1', 'Ford', 'Ecosport', '2010', NULL, 'Choti Aquino', 'In Progress', '2024-10-24', '', '2024-10-08', 0, NULL, NULL),
(43, 'Transmission', 72, '1', '1', 'Ford', 'Ecosport', '2010', NULL, 'Choti Aquino', 'In Progress', '2024-10-24', '', '2024-10-08', 0, NULL, NULL),
(44, 'Transmission', 72, '1', '1', 'Ford', 'Ecosport', '2010', NULL, 'Choti Aquino', 'In Progress', '2024-10-26', '', '2024-10-08', 0, NULL, NULL),
(45, 'Oil Change, Brake Inspection, Tire Rotation, Engine Check', 74, 'Choti ', 'Aquino', 'Nissan', 'Terra', '2008', NULL, 'Alfred Batumbakal', 'Complete', '2024-10-25', '', '2024-11-01', 0, NULL, '2024-11-06 18:32:11'),
(46, 'Oil Change', 75, 'Jake', 'Zyrus', 'Ford', 'Ranger', '2019', NULL, 'Karl Marte', 'In Progress', '2024-10-24', 'Secret', '2024-10-21', 1, NULL, NULL),
(47, 'Suspension Services', 110, 'Jay', 'Manalo', 'Nissan', 'Xtrail', '2010', NULL, 'Alfred Batumbakal', 'In Progress', '2024-10-24', '', '2024-10-19', 1, NULL, NULL),
(48, 'Oil Change', 90, 'Danica', 'Abigaile', 'Hyundai', 'Tucson', '2016', NULL, 'Alfred Batumbakal', 'In Progress', '2024-10-24', 'Change Oil', '2024-10-19', 1, NULL, NULL),
(49, 'General Wiring', 93, 'Jun', 'Revilla', 'Honda', 'Accord', '2019', NULL, 'Conrad Quadrado', 'In Progress', '2024-10-24', 'Gasket', '2024-10-11', 1, NULL, NULL),
(50, 'Brake Inspection', 94, 'Maverick', 'Ignacio', 'Chevrolet', 'Sail', '2020', NULL, 'Jigz Esteban', 'In Progress', '2024-10-24', 'muffler', '2024-10-11', 1, NULL, NULL),
(51, 'Brake Inspection', 88, '2', '2', 'Ford', 'Focus', '2009', NULL, 'Alfred Batumbakal', 'In Progress', '2024-10-24', '2', '2024-10-11', 1, NULL, NULL),
(52, 'Engine Check', 89, 'Matt', 'Ryan', 'Ford', 'Everest', '2015', NULL, 'Choti Aquino', 'In Progress', '2024-10-31', '1', '2024-10-11', 0, NULL, NULL),
(53, 'General Wiring', 82, 'Mike', 'Miller', 'Hyundai', 'Tucson', '2010', NULL, 'Choti Aquino', 'In Progress', '2024-10-25', 'oil', '2024-10-11', 0, NULL, NULL),
(54, 'Engine Check', 95, 'Rey', 'Nambatac', 'Mitsubishi', 'Xpander', '2021', NULL, 'Choti Aquino', 'In Progress', '2024-10-25', 'Change all', '2024-10-11', 0, NULL, NULL),
(55, 'Oil Change', 86, 'Arnel', 'Gonzales', 'Mitsubishi', 'Xpander', '2012', NULL, 'Kurt Juanitez', 'In Progress', '2024-10-31', '', '2024-10-10', 0, '8d905a43040361a2eb10d11d14e2c6c2', NULL),
(56, 'General Wiring', 81, 'James', 'Michael', 'Mitsubishi', 'Mirage', '2009', NULL, 'Alfred Batumbakal', 'In Progress', '2024-10-31', '', '2024-10-10', 0, '6a63e9e926a9741144f394cc7a7dcb01', NULL),
(57, 'Engine Check', 73, 'Jigz', 'Esteban', 'Toyota', 'Fortuner', '2008', NULL, 'Karl Marte', 'In Progress', '2024-10-25', '', '2024-10-10', 0, '97455b1524622252865bc9c3cda0bb1c', NULL),
(58, 'Engine Check', 101, 'Robin', 'Velasquez', 'Mitsubishi', 'Lancer', '2004', NULL, 'Jigz Esteban', 'In Progress', '2024-10-25', '', '2024-10-17', 0, 'd02652ff973cb29c6face25ab9086701', NULL),
(59, 'Transmission', 99, 'Steven', 'Adams', 'Ford', 'Focus', '2007', NULL, 'Jigz Esteban', 'In Progress', '2024-10-25', '', '2024-10-18', 0, '43724c02c3d886ffaf1ce2043c4fa05b', NULL),
(60, 'Belts and Hoses Inspection', 104, 'Davis', 'Johnson', 'Mitsubishi', 'Pajero', '2011', NULL, 'Alfred Batumbakal', 'In Progress', '2024-10-25', '', '2024-10-18', 0, '043e2e6d9a9e029b62082b8e4503b46d', NULL),
(61, 'Engine Check', 106, 'Stephen', 'Hernandez', 'Ford', 'Escape', '2008', NULL, 'Choti Aquino', 'In Progress', '2024-10-25', '', '2024-10-18', 0, '0ba4df512844757134cb2e5108c93c15', NULL),
(62, 'Brake Inspection', 94, 'Maverick', 'Ignacio', 'Chevrolet', 'Sail', '2020', NULL, 'Jigz Esteban', 'In Progress', '2024-10-25', '', '2024-10-11', 0, 'b6cbc8ce9f96fbc2eb8813812ceb2fbb', NULL),
(63, 'General Wiring', 77, 'Karl roi', 'Marte', 'Nissan', 'Terra', '2011', NULL, 'Alfred Batumbakal', 'In Progress', '2024-10-25', '', '2024-10-16', 0, '07684bd0e95d8c7b971a6a7c70a365ba', NULL),
(64, 'Belts and Hoses Inspection', 100, 'Ronnie', 'Malonzo', 'Honda', 'CR-V', '2009', NULL, 'Choti Aquino', 'In Progress', '2024-10-25', '', '2024-10-17', 0, '25429e90d008787272eef4968b59ab87', NULL),
(65, 'Engine Check', 96, 'Jimmy', 'Manansala', 'Nissan', 'Almera', '2023', NULL, 'Alfred Batumbakal', 'In Progress', '2024-10-25', '', '2024-10-11', 0, '19bf46bfbb187f208294835beb6bfbbd', NULL),
(66, 'Oil Change', 102, 'Scott', 'Santos', 'Hyundai', 'Santa Fe', '2011', NULL, 'Karl Marte', 'In Progress', '2024-10-25', '', '2024-10-17', 0, 'd5e8cef34807c1eb6a5552559848a0a5', NULL),
(67, 'Tire Rotation', 83, 'Iane', 'Gonzales', 'Ford', 'Everest', '2021', NULL, 'Karl Marte', 'In Progress', '2024-10-25', '', '2024-10-12', 0, 'd56a2abb72ea3d68f23884584524138d', NULL),
(68, 'Belts and Hoses Inspection', 108, 'Roi', 'Cortez', 'Toyota', 'Fortuner', '2010', NULL, 'Choti Aquino', 'In Progress', '2024-10-30', '', '2024-10-21', 0, '857e018eb57735b5c6763c17cdaf88bd', NULL),
(69, 'Oil Change', 75, 'Jake', 'Zyrus', 'Ford', 'Ranger', '2019', NULL, 'Karl Marte', 'In Progress', '2024-10-15', '', '2024-10-21', 0, '099b09b93eeaafd6274fe6247a14114d', NULL),
(70, 'Unknown/For Checkup', 112, 'Shawn', 'Mendez', 'Mitsubishi', 'Xpander', '2010', NULL, 'Alfred Batumbakal', 'In Progress', '2024-11-02', '', '2024-10-24', 0, 'aabc30998c617681d6fbc91552799b68', NULL),
(71, 'Suspension Services, Unknown/For Checkup', 113, 'Nicolas', 'Batum', 'Hyundai', 'Santa Fe', '2008', NULL, 'Karl Marte', 'In Progress', '2024-10-27', '', '2024-10-24', 0, '5bdf24c56fa92efcd33d6b4f5993e246', NULL),
(72, 'Brake Inspection', 79, 'Alfred', 'Freedom', 'Chevrolet', 'Trailblazer', '2022', NULL, 'Karl Marte', 'In Progress', '2024-10-29', '', '2024-10-24', 0, '60f37a4502bfc8dac2f6cb4e382befbc', NULL),
(73, 'Unknown/For Checkup', 114, 'Tom', 'Holland', 'Hyundai', 'Tucson', '2010', NULL, 'Alfred Batumbakal', 'In Progress', '2024-10-26', '', '2024-10-24', 0, '7e96ca1d8a4b19860bc29dc240e3087a', NULL),
(74, 'Suspension Services', 115, 'Chris', 'Haynes', 'Mitsubishi', 'Xpander', '2009', NULL, 'Jigz Esteban', 'In Progress', '2024-10-27', '', '2024-10-25', 0, '229adab826158f7b1f346b7feaeab84c', NULL),
(75, 'Suspension Services', 115, 'Chris', 'Haynes', 'Mitsubishi', 'Xpander', '2009', NULL, 'Jigz Esteban', 'In Progress', '2024-10-26', '', '2024-10-25', 0, '2f3aa72d6e6c808c76cf1607a8a7a69b', NULL),
(76, 'Engine Check', 116, 'Charles', 'Barkley', 'Nissan', 'Terra', '2016', NULL, 'Conrad Quadrado', 'In Progress', '2024-10-26', '', '2024-10-25', 0, 'd53b3882681245de434dc0abc07b3076', NULL),
(77, 'Oil Change', 117, 'Austin', 'Reaves', 'Chevrolet', 'Captiva', '2011', NULL, 'Alfred Batumbakal', 'In Progress', '2024-10-28', '', '2024-10-25', 0, 'de4d74addc2821b172cd602ccc5a9589', NULL),
(78, 'Oil Change', 78, 'Kurt', 'Juanitez', 'Mitsubishi', 'Pajero', '2009', NULL, 'Jigz Esteban', 'In Progress', '2024-10-28', '', '2024-10-25', 0, '63759bfc49453f184a481996775a5402', NULL),
(79, 'Transmission', 118, 'Adam', 'Silver', 'Ford', 'Everest', '2010', NULL, 'Choti Aquino', 'In Progress', '2024-10-30', '', '2024-10-25', 0, '37ec977cc42370edafc6ed025ddcf807', NULL),
(80, 'Suspension Services', 119, 'Francis', 'Chua', 'Honda', 'Accord', '2014', NULL, 'Choti Aquino', 'In Progress', '2024-10-28', '', '2024-10-25', 0, '4e7a33d9640a69f5c40d7e8766e6ee1f', NULL),
(81, 'Unknown/For Checkup', 120, 'James', 'Harden', 'Chevrolet', 'Trailblazer', '2006', NULL, 'Jigz Esteban', 'In Progress', '2024-10-26', '', '2024-10-25', 0, '25e616db593dff3831018f9b334aecd7', NULL),
(82, 'Transmission', 98, 'Trixie', 'Mercedez', 'Ford', 'Escape', '2007', NULL, 'Alfred Batumbakal', 'In Progress', '2024-10-26', '', '2024-10-25', 0, 'd45539c40a2b47b2771518e1240a89a1', NULL),
(83, 'Transmission', 97, 'Andrei ', 'Cortez', 'Honda', 'Civic', '2015', NULL, 'Jigz Esteban', 'In Progress', '2024-10-28', '', '2024-10-25', 0, '89c05400962d837e238695980fee996b', NULL),
(84, 'Belts and Hoses Inspection', 103, 'Dale', 'Quinto', 'Ford', 'Escape', '2009', NULL, 'Conrad Quadrado', 'In Progress', '2024-10-30', '', '2024-10-25', 0, '227dc9a407cd21e607319a4f656ab6e8', NULL),
(85, 'Suspension Services', 121, 'Princess', 'Queen', 'Mitsubishi', 'Montero', '2007', NULL, 'Choti Aquino', 'In Progress', '2024-10-26', '', '2024-10-25', 0, '19f0010bf98b72f193e32dd69881dd39', NULL),
(86, 'Computer Diagnostics', 122, 'Ernie', 'Smith', 'Mitsubishi', 'Montero', '2011', NULL, 'Karl Marte', 'In Progress', '2024-10-26', '', '2024-10-26', 0, '91efd209511cfc189f9a20b6d396e395', NULL),
(87, 'Tire Rotation', 85, 'John', 'Doe', 'Toyota', 'Fortuner', '2011', NULL, 'Choti Aquino', 'In Progress', '2024-10-26', '', '2024-10-25', 0, 'f5229c80945dfaba7d333dadf7d10f19', NULL),
(88, 'Unknown/For Checkup', 123, 'Kevin', 'Durant', 'Honda', 'CR-V', '2008', NULL, 'Alfred Batumbakal', 'In Progress', '2024-10-26', '', '2024-10-26', 0, '74f04fb4be78b8bcdaf43f6f26a12438', NULL),
(89, 'Oil Change', 124, 'Devin', 'Booker', 'Honda', 'Accord', '2010', NULL, 'Conrad Quadrado', 'In Progress', '2024-10-28', '', '2024-10-26', 0, '512735ce49c21e6aca2af67f0b930413', NULL),
(90, 'Unknown/For Checkup', 125, 'Bradley', 'Beal', 'Ford', 'Ecosport', '2009', NULL, 'Alfred Batumbakal', 'In Progress', '2024-10-27', '', '2024-10-26', 0, 'c11a54ee0cdcc7e13ffe5aa2b7d0b3e2', NULL),
(91, 'Unknown/For Checkup', 126, 'Stan', 'Smith', 'Honda', 'Brio', '2007', NULL, 'Conrad Quadrado', 'In Progress', '2024-10-29', '', '2024-10-26', 0, '160533c5161a647ee2c1ba82d6fbab61', NULL),
(92, 'Oil Change', 129, '', '', '', '', '2019', NULL, '', 'In Progress', '2024-10-23', '', '2024-10-28', 0, 'a19de44b1ef81ba369a1d7f81e52e24a', NULL),
(93, 'Oil Change', 130, '', '', '', '', '2020', NULL, '', 'In Progress', '2024-10-29', '', '2024-10-29', 0, '16317fb94d90cf7062d0de7ef68be180', NULL),
(94, 'Tire Rotation', 131, '', '', '', '', '2022', NULL, '', 'In Progress', '2024-10-29', '', '2024-10-28', 0, '07251cd2691b44141f40d63321610993', NULL),
(95, 'Oil Change', 132, '', '', '', '', '2022', NULL, '', 'In Progress', '2024-10-29', '', '2024-10-29', 0, '932e0709b3cf32de57e0dbe884e55716', NULL),
(96, 'Oil Change', 133, '', '', '', '', '2020', NULL, '', 'In Progress', '2024-10-29', '', '2024-10-29', 0, 'df4b1d3755316153bf6754d367b7248c', NULL),
(97, 'Oil Change', 134, '', '', '', '', '2022', NULL, '', 'In Progress', '2024-10-29', '', '2024-10-29', 0, '3f38753ebe78cb77b9879594485bb50a', NULL),
(98, 'Tire Rotation', 135, '', '', '', '', '2022', NULL, '', 'In Progress', '2024-10-30', '', '2024-10-29', 0, '338dd3ee5df0c584f22981c9f4e8f1e9', NULL),
(99, 'Oil Change', 136, '', '', '', '', '2019', NULL, '', 'In Progress', '2024-10-29', '', '2024-10-29', 0, 'a835f53e92b6ff0619565bcacc4864c5', NULL),
(100, 'Tire Rotation', 137, '', '', '', '', '2018', NULL, '', 'In Progress', '2024-10-29', '', '2024-10-28', 0, '7e46829475df7102670055fd478ad4ad', NULL),
(101, 'Oil Change', 138, '', '', '', '', '2008', NULL, '', 'In Progress', '2024-10-29', '', '2024-10-29', 0, '7d9303d886adb1ca37614c928f17a131', NULL),
(102, 'Tire Rotation', 139, '', '', '', '', '2019', NULL, '', 'In Progress', '2024-10-29', '', '2024-10-29', 0, '0a336a297c4635edf25f82cc30a6c5c9', NULL),
(103, 'Oil Change', 140, '', '', '', '', '2022', NULL, '', 'In Progress', '2024-10-29', '', '2024-10-29', 0, 'c4947a9b50600fc0345ede319344964e', NULL),
(104, 'Oil Change', 141, '', '', '', '', '2022', NULL, '', 'In Progress', '2024-10-29', '', '2024-10-29', 0, '31b04a3a9e58746ab4600dce5e4e9a8e', NULL),
(105, 'Tire Rotation', 76, '', '', '', '', '2008', NULL, '', 'In Progress', '2024-10-29', '', '2024-10-10', 0, '903d045b591ca21b550f1f9fe123da2c', NULL),
(106, 'Oil Change', 142, '', '', '', '', '2020', NULL, '', 'In Progress', '2024-10-29', '', '2024-10-29', 0, 'e81da57484b576707fcf59159cc62705', NULL),
(107, 'Transmission', 148, '', '', '', '', '2022', NULL, '', 'In Progress', '2024-10-31', '', '2024-10-31', 0, '7f798b6376cadf5b5427e0377d933984', NULL),
(108, 'Unknown/For Checkup', 144, '', '', '', '', '2010', NULL, '', 'Complete', '2024-10-31', 'Change All', '2024-10-30', 0, '3fa6a86b084844d3715a0599d2fb3042', '2024-11-06 19:02:09'),
(109, 'Oil Change', 146, '', '', '', '', '2023', NULL, '', 'Complete', '2024-10-31', '', '2024-10-30', 0, 'aa606080d753687be5239b0f9ad83b89', '2024-11-06 20:08:50'),
(110, 'Unknown/For Checkup', 147, '', '', '', '', '2023', NULL, '', 'In Progress', '2024-10-31', '', '2024-10-30', 0, 'dc3b1aebebd82fe85a5949bc9035310c', NULL),
(111, 'Oil Change', 149, '', '', '', '', '2022', NULL, '', 'In Progress', '2024-10-31', '', '2024-10-23', 0, '6312956e9d2c8812b742b02ac2c886f7', NULL),
(112, 'Tire Rotation', 150, 'Scottie ', 'Pippen', 'Ford', 'Raptor', '2022', NULL, 'Choti Aquino', 'In Progress', '2024-10-31', 'N/A', '2024-10-23', 0, 'd1739af183581bcb13b746a7af113eeb', NULL),
(113, 'Transmission', 151, 'Nate', 'Robinson', 'Hyundai', 'Tucson', '2018', NULL, 'Karl Marte', 'In Progress', '2024-10-31', 'N/A', '2024-10-30', 0, 'fa80ba0a9ef0738705fb9a0c9ba19fb8', NULL),
(114, 'Tire Rotation', 152, 'Dennis', 'Rodman', 'Toyota', 'Vios', '2021', NULL, 'N/A', 'Complete', '2024-10-31', 'N/A', '2024-10-30', 0, '3c769f527430109129d5bcd9924cf8a2', '2024-11-06 19:05:03'),
(115, 'Overhaul', 153, 'Steve', 'Kerr', 'Chevrolet', 'Sail', '2021', NULL, 'N/A', 'Complete', '2024-10-31', 'N/A', '2024-10-30', 0, '6e868e22fd20063667f49697f5b09de9', '2024-11-06 19:05:42'),
(116, 'Oil Change', 154, 'John', 'Paxson', 'Ford', 'Fiesta', '2023', NULL, 'Karl Marte', 'In Progress', '2024-10-31', 'Need palitan ng langis', '2024-10-30', 0, '871c906136c70366f25bb49a5d176d89', NULL),
(117, 'Transmission', 155, 'Mohammed', 'Ali', 'Hyundai', 'Accent', '2017', '0', 'Choti Aquino', 'In Progress', '2024-10-31', 'N/A', '2024-10-23', 0, '1622a131a940c743cc0ac63e09b8d8f2', NULL),
(118, 'Transmission', 156, 'Connor', 'Mcgregor', 'Ford', 'Raptor', '2018', 'NKG2049', 'Karl Marte', 'Complete', '2024-10-31', 'N/A', '2024-10-31', 0, 'baea01971cdf308b5ed3bfa21fc85206', '2024-11-06 18:43:32'),
(119, 'Transmission', 157, 'Ghoun', 'Esteban', 'Hyundai', 'Almera', '2021', 'ITN2049', 'Choti Aquino', 'Complete', '2024-10-31', 'N/A', '2024-10-31', 0, '572e5736af2238c987cdf73e750284d7', '2024-11-06 18:53:55'),
(120, 'Tire Rotation', 158, 'Mike', 'Tan', 'Toyota', 'HiAce', '2024', 'HTN2509', 'Karl Marte', 'In Progress', '2024-10-30', 'N/A', '2024-10-30', 0, '174aa1d11d494e6f28b09f2c32b6990f', NULL),
(121, 'Unknown/For Checkup', 159, 'Zeus', 'Martinez', 'Nissan', 'Lancer', '2008', 'NUT2408', 'Karl Marte', 'In Progress', '2024-10-31', 'Change oil', '2024-10-30', 0, '40dc6aef2e74fc829e29f978830707ce', NULL),
(122, 'Transmission', 160, 'King', 'Estrada', 'Ford', 'Fiesta', '2018', 'BKG9985', 'Karl Marte', 'In Progress', '2024-10-31', 'N/A', '2024-10-30', 0, 'e0297e22db4e5cad7b45b85a7288784f', NULL),
(123, 'Transmission', 160, 'King', 'Estrada', 'Ford', 'Fiesta', '2018', 'BKG9985', 'Karl Marte', 'In Progress', '2024-10-31', 'N/A', '2024-10-30', 0, '13534950683d244cb3c14b3396d3dd04', NULL),
(124, 'Transmission', 160, 'King', 'Estrada', 'Ford', 'Fiesta', '2018', 'BKG9985', 'Karl Marte', 'In Progress', '2024-10-31', 'N/A', '2024-10-30', 0, '18e0099e8353031bde08061ec6de5991', NULL),
(125, 'Transmission', 160, 'King', 'Estrada', 'Ford', 'Fiesta', '2018', 'BKG9985', 'Karl Marte', 'In Progress', '2024-10-31', 'N/A', '2024-10-30', 0, 'f93f3f72a63eebb898efe55a6a2fe96f', NULL),
(126, 'Transmission', 160, 'King', 'Estrada', 'Ford', 'Fiesta', '2018', 'BKG9985', 'Karl Marte', 'In Progress', '2024-10-31', 'N/A', '2024-10-30', 0, '2f1756c08897507da319086d5af41353', NULL),
(127, 'Transmission', 160, 'King', 'Estrada', 'Ford', 'Fiesta', '2018', 'BKG9985', 'Karl Marte', 'In Progress', '2024-10-31', 'N/A', '2024-10-30', 0, '7fec39f65895ab128ac8166430580f1b', NULL),
(128, 'Transmission', 160, 'King', 'Estrada', 'Ford', 'Fiesta', '2018', 'BKG9985', 'Karl Marte', 'In Progress', '2024-10-31', 'N/A', '2024-10-30', 0, 'cef055db68f674f8ec5d17071e55c0c8', NULL),
(129, 'Transmission', 160, 'King', 'Estrada', 'Ford', 'Fiesta', '2018', 'BKG9985', 'Karl Marte', 'In Progress', '2024-10-31', 'N/A', '2024-10-30', 0, '6394d73fae913dafc970f2eac190c975', NULL),
(130, 'Engine Check', 161, 'Hershey', 'Marie', 'Ford', 'Ecosport', '2019', 'JNT2049', 'Jigz Esteban', 'In Progress', '2024-10-31', 'Nice', '2024-10-30', 0, 'e2e8d3d47e6cd45387aa12f099862ceb', NULL),
(131, 'Change Oil', 162, 'Hershey', 'Marie', 'Ford', 'Ecosport', '2019', 'JNT2049', 'Choti Aquino', 'In Progress', '2024-10-31', 'N/A', '2024-10-31', 0, '2fc5c4591f36c0bda319650fe5efb28d', NULL),
(132, 'Transmission', 163, 'Hershey', 'Agunday', 'Toyota', 'Vios', '2022', 'JNT2049', 'Karl Marte', 'In Progress', '2024-11-02', 'N/A', '2024-11-01', 0, '9d264dc5f4944a722504de70afb47363', NULL),
(133, 'Unknown/For Checkup', 164, 'Randy', 'Mcgrady', 'Hyundai', 'Accent', '2019', 'SAD6746', 'Jigz Esteban', 'In Progress', '2024-10-31', 'N/A', '2024-10-23', 0, '7b5cc55bdb8bb3fb5357b414a502a8a3', NULL),
(134, 'Tire Rotation', 165, 'James', 'Harden', 'Ford', 'Raptor', '2021', 'SAD6746', 'Jigz Esteban', 'In Progress', '2024-11-01', 'N/A', '2024-10-31', 0, 'a1f1b760788d3986ed879a4c1a30d8aa', NULL),
(135, 'Unknown/For Checkup', 145, 'Setsuna', 'Ignacio', 'Toyota', 'Land Cruiser', '2010', 'JFU2140', 'Karl Marte', 'Complete', '2024-11-01', 'N/A', '2024-10-31', 0, '887695c1ff80ddb988f35f3fe451257f', '2024-11-06 18:43:21'),
(136, 'Unknown/For Checkup', 166, 'Marlon', 'Victorio', 'Ford', 'Ecosport', '2022', 'HBT6857', 'Choti Aquino', 'In Progress', '2024-11-01', 'N/A', '2024-10-24', 0, 'ae2ccafc2f0c4626e27fa34a16579f40', NULL),
(137, 'Oil Change', 167, 'Marie', 'Bonite', 'Chevrolet', 'Sail', '2012', 'NBM2450', 'Jigz Esteban', 'Complete', '2024-11-01', 'N/A', '2024-10-31', 0, 'd69ab3e777f99cec84000ae599915399', '2024-11-06 18:54:18'),
(138, 'Tire Rotation', 168, 'John', 'Batum', 'Ford', 'Ecosport', '2022', 'NGB2481', 'Choti Aquino', 'Complete', '2024-11-01', 'N/A', '2024-10-31', 0, '311aa7d4bc78acc3e6b9e4312c6b0758', '2024-11-06 18:55:12'),
(139, 'Transmission', 169, 'Martin', 'Rivera', 'Toyota', 'Vios', '2022', 'HTB6756', 'Jigz Esteban', 'In Progress', '2024-11-01', 'N/A', '2024-10-31', 0, '4921e612b811c6f0d88a3639eeec6597', NULL),
(140, 'Transmission', 170, 'Ace', 'Mendoza', 'Toyota', 'HiAce', '2019', 'QHX5874', 'Karl Marte', 'In Progress', '2024-11-01', 'N/A', '2024-10-31', 0, '4e3d1f3083093d17cc97bd15cafebe51', NULL),
(141, 'Unknown/For Checkup', 171, 'Jonathan', 'Kuminga', 'Honda', 'Civic', '2012', 'NBA2495', 'Choti Aquino', 'In Progress', '2024-11-01', 'N/A', '2024-11-01', 0, 'c979320329de0de1e7a15e8febb13a7f', NULL),
(142, 'Engine Check', 172, 'Sam', 'Milby', 'Ford', 'Ecosport', '2020', 'NMY0677', 'Choti Aquino', 'Complete', '2024-11-02', 'N/A', '2024-11-01', 0, '6d060c84c71a8fb11d24e6e8caf41801', '2024-11-06 18:32:33'),
(143, 'Oil Change', 173, 'Kevin', 'Porter', 'Toyota', 'Vios', '2023', 'NOH7958', 'Jigz Esteban', 'In Progress', '2024-11-01', 'N/A', '2024-11-01', 0, 'b5cd682efa34f147046a80e113def2ac', NULL),
(144, 'Palit langis', 174, 'Stephen', 'Smith', 'Nissan', 'Almera', '2019', 'HTJ5098', 'Choti Aquino', 'In Progress', '2024-11-08', 'N/A', '2024-11-01', 0, 'eb6a61523f1215076f31c22a240f9d96', NULL),
(145, 'Oil Change, Engine Check', 175, 'Reynaldo', 'Reyes', 'Mitsubishi', 'Montero', '2019', 'UVA626', 'Choti Aquino', 'In Progress', '2024-11-07', 'N/A', '2024-11-01', 0, '33a5da64ee66ddca5996a3f8ce5e3a5c', NULL),
(146, 'Oil Change, Brake Inspection, Tire Rotation, Engine Check', 74, 'Choti ', 'Aquino', 'Nissan', 'Terra', '2008', 'XZXC432', 'Alfred Batumbakal', 'Complete', '2024-11-02', 'Trial 101', '2024-11-01', 0, '0ce72b761486f98d1702f759fc414cc4', '2024-11-06 18:32:11'),
(147, 'Oil Change', 176, 'Max', 'Christie', 'Toyota', 'Vios', '2023', 'KNT5840', 'Karl Marte', 'Complete', '2024-11-02', 'N/A', '2024-11-01', 0, 'd2ad03ebce66332dacbcc9dc6e235784', '2024-11-06 18:34:00'),
(148, 'Tire Rotation', 179, 'Neil', 'Armstrong', 'Honda', 'Civic', '2019', 'ASD1204', 'Choti Aquino', 'Complete', '2024-11-08', 'sira gasket', '2024-11-02', 0, '2caa0251272281d687973058a943146c', '2024-11-06 18:30:20'),
(149, 'Tire Rotation', 180, 'Kian', 'Soriano', 'Ford', 'Raptor', '2021', 'NYP5094', 'Choti Aquino', 'In Progress', '2024-11-04', 'N/A', '2024-11-04', 0, 'dee5a689d8e5e40a9aeca1d7d50c2d9d', NULL),
(150, 'Unknown/For Checkup', 181, 'Francis', 'Corpuz', 'Ford', 'Ecosport', '2022', 'JYU0959', 'Chito Aquino', 'Complete', '2024-11-04', 'Test 103', '2024-11-03', 0, 'abc69ad4436282499506ec51a1554c68', '2024-11-06 18:29:42'),
(151, 'Unknown/For Checkup', 182, 'Avy', 'Rebite', 'Chevrolet', 'Captiva', '2017', 'JJG4052', NULL, 'In Progress', '2024-11-05', 'N/A', '2024-11-04', 0, '84487cfc14cb935349085681c3dd685b', NULL),
(152, 'Transmission', 183, 'Joshua', 'Banaria', 'Nissan', 'Almera', '2022', 'NGM0975', 'Choti Aquino', 'In Progress', '2024-11-04', 'N/A', '2024-11-04', 0, 'bf0d8ef33088952467b0007a553d361a', NULL),
(153, 'Transmission', 184, 'Kiko', 'Sibal', 'Chevrolet', 'Sail', '2019', 'JHN2471', '', 'complete', '2024-11-04', 'N/A', '2024-11-04', 0, 'e73acefda0711c58c7f4ea0ee722c6b1', NULL),
(154, 'Engine Check', 185, 'Christopher', 'Martin', 'Toyota', 'Vios', '2022', 'YBW0294', '', 'In Progress', '2024-11-04', 'N/A', '2024-11-04', 0, '26745e00cbe279aa0ce7365071f07a60', NULL),
(155, 'Unknown/For Checkup', 186, 'Ray', 'Yu', 'Hyundai', 'Tucson', '2019', 'UTN4472', '', 'Complete', '2024-11-04', 'N/A', '2024-11-04', 0, 'c0da4f8416c87a5308346aa312641820', NULL),
(156, 'Unknown/For Checkup', 202, 'Ishi', 'Marie', 'Ford', 'Focus', '2010', 'EWQ4029', 'Alfred Batumbakal', 'In Progress', '2024-11-07', 'Palit ng langis ', '2024-11-07', 0, '5547200b09f4f1a27e04f1e545ff70b9', NULL),
(157, 'Unknown/For Checkup', 206, 'Kent', 'Barcelona', 'Toyota', 'Fortuner', '2012', 'HGK2049', 'Karl Marte', 'Complete', '2024-11-06', 'Trial 103', '2024-11-05', 0, 'd9108218324ae3b73db0ad4b9d356fdd', '2024-11-06 18:35:32'),
(158, 'Transmission', 207, 'Marie', 'Ishi', 'Toyota', 'Raptor', '2021', 'EWQ4029', 'Conrad Quadrado', 'In Progress', '2024-11-06', 'N/A', '2024-11-05', 0, '42e10f32e85001e82c333f98aa8f9391', NULL),
(159, 'Computer Diagnostics', 208, 'Princess', 'Freiya', 'Toyota', 'Fortuner', '2010', 'TGB5749', 'Karl Marte', 'In Progress', '2024-11-06', 'Filter', '2024-11-05', 0, '99fda392956cb04b534244cb7bc8f6c2', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `job_order_parts`
--

CREATE TABLE `job_order_parts` (
  `id` int(11) NOT NULL,
  `job_order_id` int(11) DEFAULT NULL,
  `appointment_id` int(11) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `part_name` varchar(255) DEFAULT NULL,
  `part_quantity` int(11) DEFAULT NULL,
  `availability` varchar(20) DEFAULT NULL,
  `progress` varchar(50) DEFAULT NULL,
  `days_to_deliver` int(11) DEFAULT NULL,
  `plate_number` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_order_parts`
--

INSERT INTO `job_order_parts` (`id`, `job_order_id`, `appointment_id`, `first_name`, `last_name`, `part_name`, `part_quantity`, `availability`, `progress`, `days_to_deliver`, `plate_number`) VALUES
(1, 2, 72, '1', '1', 'Y2K HEADLIGHT', 1, 'available', 'complete', NULL, NULL),
(2, 2, 72, '1', '1', 'VILLAIN FENDER', 2, 'available', NULL, NULL, NULL),
(3, 2, 72, '1', '1', 'SHELL HELIX ULTRA 0W-40 OIL 1L', 1, 'available', NULL, NULL, NULL),
(4, 3, 73, 'Jigz', 'Esteban', 'HAVOLINE PRODS FULLY SYNTHETIC LE SAE 5W-40', 3, 'available', NULL, NULL, NULL),
(5, 3, 73, 'Jigz', 'Esteban', 'RUSI OIL', 1, 'available', NULL, NULL, NULL),
(6, 3, 73, 'Jigz', 'Esteban', 'HYUNDAI SIDE MIRROR', 1, 'available', NULL, NULL, NULL),
(7, 4, 72, '1', '1', 'Y2K HEADLIGHT', 1, 'available', 'complete', NULL, NULL),
(8, 5, 72, '1', '1', 'TOYOTA PARK LIGHT', 2, 'available', 'complete', NULL, NULL),
(9, 5, 72, '1', '1', 'Y2K HEADLIGHT', 1, 'available', 'complete', NULL, NULL),
(10, 5, 72, '1', '1', 'SUZUKI OIL SEAL', 1, 'available', 'complete', NULL, NULL),
(11, 8, 73, 'Jigz', 'Esteban', 'RBC MUFFLER', 1, 'available', 'complete', NULL, NULL),
(12, 8, 73, 'Jigz', 'Esteban', 'SUZUKI OIL SEAL', 1, 'available', 'complete', NULL, NULL),
(13, 9, 76, 'Nick', 'Nick', 'RBC MUFFLER', 1, 'available', 'complete', NULL, NULL),
(14, 10, 72, '1', '1', 'RBC MUFFLER', 1, 'available', 'complete', NULL, NULL),
(15, 11, 86, 'Arnel', 'Gonzales', 'RBC MUFFLER', 2, 'available', 'complete', NULL, NULL),
(16, 17, 92, 'James', 'Williams', 'RBC MUFFLER', 2, 'available', 'complete', 0, NULL),
(17, 17, 92, 'James', 'Williams', 'Y2K HEADLIGHT', 1, 'available', 'complete', 0, NULL),
(18, 18, 72, '1', '1', 'RBC MUFFLER', 1, 'available', 'complete', 0, NULL),
(19, 20, 73, 'Jigz', 'Esteban', 'RBC MUFFLER', 1, 'available', 'complete', 0, NULL),
(20, 21, 72, '1', '1', 'RBC MUFFLER', 1, 'available', 'complete', 4, NULL),
(21, 22, NULL, NULL, NULL, 'RBC MUFFLER', 1, 'available', 'complete', 1, NULL),
(22, 22, NULL, NULL, NULL, 'Y2K HEADLIGHT', 2, 'available', 'complete', 0, NULL),
(23, 23, NULL, NULL, NULL, 'RBC MUFFLER', 1, 'available', 'complete', 2, NULL),
(24, 23, NULL, NULL, NULL, 'Y2K HEADLIGHT', 1, 'available', 'complete', 0, NULL),
(25, 24, NULL, NULL, NULL, 'TOYOTA PARK LIGHT', 1, 'available', 'complete', 0, NULL),
(26, 24, NULL, NULL, NULL, 'RBC MUFFLER', 1, 'available', 'complete', 1, NULL),
(27, 25, 72, '1', '1', 'RBC MUFFLER', 1, 'available', 'complete', 1, NULL),
(28, 25, 72, '1', '1', 'TOYOTA PARK LIGHT', 2, 'available', 'complete', 0, NULL),
(29, 26, NULL, NULL, NULL, 'TOYOTA PARK LIGHT', 1, 'available', 'complete', 0, NULL),
(30, 26, NULL, NULL, NULL, 'RBC MUFFLER', 1, 'available', 'complete', 1, NULL),
(31, 27, NULL, NULL, NULL, 'TOYOTA PARK LIGHT', 1, 'available', 'complete', 0, NULL),
(32, 27, NULL, NULL, NULL, 'RBC MUFFLER', 1, 'available', 'complete', 1, NULL),
(33, 28, NULL, NULL, NULL, 'RUSI OIL', 1, 'available', 'complete', 0, NULL),
(34, 28, NULL, NULL, NULL, 'SUZUKI OIL SEAL', 1, 'available', 'complete', 2, NULL),
(35, 29, NULL, NULL, NULL, 'RBC MUFFLER', 2, 'available', 'complete', 2, NULL),
(36, 29, NULL, NULL, NULL, 'RUSI OIL', 2, 'available', 'complete', 0, NULL),
(37, 32, NULL, NULL, NULL, 'RBC MUFFLER', 1, 'available', 'complete', 1, NULL),
(38, 32, NULL, NULL, NULL, 'Y2K HEADLIGHT', 1, 'available', 'complete', 0, NULL),
(39, 33, 73, 'Jigz', 'Esteban', 'TOYOTA PARK LIGHT', 2, 'available', 'complete', 0, NULL),
(40, 33, 73, 'Jigz', 'Esteban', 'RBC MUFFLER', 2, 'available', 'complete', 5, NULL),
(41, 35, 72, '1', '1', 'RBC MUFFLER', 1, 'available', 'complete', 1, NULL),
(42, 35, 72, '1', '1', 'SHELL HELIX ULTRA 0W-40 OIL 1L', 1, 'available', 'complete', 0, NULL),
(43, 36, 72, '1', '1', 'Y2K HEADLIGHT', 1, 'available', 'complete', 0, NULL),
(44, 36, 72, '1', '1', 'RBC MUFFLER', 1, 'available', 'complete', 3, NULL),
(45, 37, 72, '1', '1', 'TOYOTA PARK LIGHT', 1, 'available', 'complete', 0, NULL),
(46, 37, 72, '1', '1', 'RBC MUFFLER', 2, 'available', 'complete', 2, NULL),
(47, 38, 72, '1', '1', 'RBC MUFFLER', 2, 'available', 'complete', 2, NULL),
(48, 38, 72, '1', '1', 'Y2K HEADLIGHT', 2, 'available', 'complete', 0, NULL),
(49, 39, NULL, NULL, NULL, 'TOYOTA PARK LIGHT', 3, 'available', 'complete', 0, NULL),
(50, 39, NULL, NULL, NULL, 'RBC MUFFLER', 2, 'available', 'complete', 5, NULL),
(51, 40, NULL, NULL, NULL, 'RBC MUFFLER', 2, 'available', 'complete', 2, NULL),
(52, 40, NULL, NULL, NULL, 'VILLAIN FENDER', 2, 'available', 'complete', 0, NULL),
(53, 41, 72, '1', '1', 'RBC MUFFLER', 2, 'available', 'complete', 4, NULL),
(54, 41, 72, '1', '1', 'TOYOTA PARK LIGHT', 2, 'available', 'complete', 0, NULL),
(55, 42, 72, '1', '1', 'RBC MUFFLER', 2, 'available', 'complete', 2, NULL),
(56, 42, 72, '1', '1', 'FORD OIL GASKET', 5, 'available', 'complete', 0, NULL),
(57, 42, 72, '1', '1', 'RUSI OIL', 3, 'available', 'complete', 0, NULL),
(58, 43, 72, '1', '1', 'TOYOTA SIDE MIRROR', 2, 'available', 'complete', 0, NULL),
(59, 43, 72, '1', '1', 'RBC MUFFLER', 1, 'available', 'complete', 6, NULL),
(60, 44, 72, '1', '1', 'RBC MUFFLER', 2, 'available', 'complete', 2, NULL),
(61, 44, 72, '1', '1', 'VILLAIN FENDER', 2, 'available', 'complete', 0, NULL),
(62, 45, 74, 'Choti ', 'Aquino', 'RBC MUFFLER', 2, 'available', 'complete', 3, NULL),
(63, 45, 74, 'Choti ', 'Aquino', 'VILLAIN FENDER', 1, 'available', 'complete', 0, NULL),
(64, 46, 75, 'Jake', 'Zyrus', 'RBC MUFFLER', 2, 'available', 'complete', 3, NULL),
(65, 46, 75, 'Jake', 'Zyrus', 'Y2K HEADLIGHT', 1, 'available', 'complete', 0, NULL),
(66, 47, 110, 'Jay', 'Manalo', 'HYUNDAI SIDE MIRROR', 2, 'available', 'complete', 0, NULL),
(67, 47, 110, 'Jay', 'Manalo', 'RBC MUFFLER', 1, 'available', 'complete', 1, NULL),
(68, 48, 90, 'Danica', 'Abigaile', 'RUSI OIL', 3, 'available', 'complete', 0, NULL),
(69, 48, 90, 'Danica', 'Abigaile', 'RBC MUFFLER', 1, 'available', 'complete', 1, NULL),
(70, 49, 93, 'Jun', 'Revilla', 'FORD OIL GASKET', 1, 'available', 'complete', 0, NULL),
(71, 49, 93, 'Jun', 'Revilla', 'RBC MUFFLER', 1, 'available', 'complete', 1, NULL),
(72, 50, 94, 'Maverick', 'Ignacio', 'TOYOTA SIDE MIRROR', 2, 'available', 'complete', 0, NULL),
(73, 50, 94, 'Maverick', 'Ignacio', 'VILLAIN FENDER', 1, 'available', 'complete', 0, NULL),
(74, 50, 94, 'Maverick', 'Ignacio', 'RBC MUFFLER', 1, 'available', 'complete', 3, NULL),
(75, 51, 88, '2', '2', 'RBC MUFFLER', 1, 'available', 'complete', 1, NULL),
(76, 51, 88, '2', '2', 'VILLAIN FENDER', 1, 'available', 'complete', 0, NULL),
(77, 52, 89, 'Matt', 'Ryan', 'RBC MUFFLER', 2, 'available', 'complete', 2, NULL),
(78, 52, 89, 'Matt', 'Ryan', 'VILLAIN FENDER', 1, 'available', 'complete', 0, NULL),
(79, 53, 82, 'Mike', 'Miller', 'FORD OIL GASKET', 1, 'available', 'complete', 0, NULL),
(80, 53, 82, 'Mike', 'Miller', 'SUZUKI OIL SEAL', 1, 'available', 'complete', 1, NULL),
(81, 54, 95, 'Rey', 'Nambatac', 'SHELL HELIX ULTRA 0W-40 OIL 1L', 2, 'available', 'complete', 0, NULL),
(82, 54, 95, 'Rey', 'Nambatac', 'HYUNDAI SIDE MIRROR', 1, 'available', 'complete', 0, NULL),
(83, 55, 86, 'Arnel', 'Gonzales', 'Y2K HEADLIGHT', 1, 'available', 'complete', 0, NULL),
(84, 56, 81, 'James', 'Michael', 'FORD OIL GASKET', 2, 'available', 'complete', 0, NULL),
(85, 57, 73, 'Jigz', 'Esteban', 'Y2K HEADLIGHT', 1, 'available', 'complete', 0, NULL),
(86, 57, 73, 'Jigz', 'Esteban', 'VILLAIN FENDER', 1, 'available', 'complete', 0, NULL),
(87, 58, 101, 'Robin', 'Velasquez', 'Y2K HEADLIGHT', 1, 'available', 'complete', 0, NULL),
(88, 58, 101, 'Robin', 'Velasquez', 'VILLAIN FENDER', 1, 'available', 'complete', 0, NULL),
(89, 59, 99, 'Steven', 'Adams', 'VILLAIN FENDER', 2, 'available', 'complete', 0, NULL),
(90, 60, 104, 'Davis', 'Johnson', 'TOYOTA PARK LIGHT', 1, 'available', 'complete', 0, NULL),
(91, 60, 104, 'Davis', 'Johnson', 'TOYOTA SIDE MIRROR', 1, 'available', 'complete', 0, NULL),
(92, 61, 106, 'Stephen', 'Hernandez', 'Y2K HEADLIGHT', 1, 'available', 'complete', 0, NULL),
(93, 61, 106, 'Stephen', 'Hernandez', 'VILLAIN FENDER', 1, 'available', 'complete', 0, NULL),
(94, 61, 106, 'Stephen', 'Hernandez', 'SHELL HELIX ULTRA 0W-40 OIL 1L', 1, 'available', 'complete', 0, NULL),
(95, 62, 94, 'Maverick', 'Ignacio', 'Y2K HEADLIGHT', 1, 'available', 'complete', 0, NULL),
(96, 62, 94, 'Maverick', 'Ignacio', 'RBC MUFFLER', 2, 'available', 'complete', 2, NULL),
(97, 63, 77, 'Karl roi', 'Marte', 'Y2K HEADLIGHT', 2, 'available', 'complete', 0, NULL),
(98, 63, 77, 'Karl roi', 'Marte', 'VILLAIN FENDER', 1, 'available', 'complete', 0, NULL),
(99, 64, 100, 'Ronnie', 'Malonzo', 'SHELL HELIX ULTRA 0W-40 OIL 1L', 2, 'available', 'complete', 0, NULL),
(100, 64, 100, 'Ronnie', 'Malonzo', 'RBC MUFFLER', 1, 'available', 'complete', 1, NULL),
(101, 65, 96, 'Jimmy', 'Manansala', 'Y2K HEADLIGHT', 2, 'available', 'complete', 0, NULL),
(102, 65, 96, 'Jimmy', 'Manansala', 'RBC MUFFLER', 2, 'available', 'complete', 2, NULL),
(103, 66, 102, 'Scott', 'Santos', 'RUSI OIL', 2, 'available', 'complete', 0, NULL),
(104, 66, 102, 'Scott', 'Santos', 'RBC MUFFLER', 2, 'available', 'complete', 7, NULL),
(105, 66, 102, 'Scott', 'Santos', 'SUZUKI OIL SEAL', 1, 'available', 'complete', 1, NULL),
(106, 67, 83, 'Iane', 'Gonzales', 'VILLAIN FENDER', 2, 'available', 'complete', 0, NULL),
(107, 67, 83, 'Iane', 'Gonzales', 'RBC MUFFLER', 1, 'available', 'complete', 1, NULL),
(108, 67, 83, 'Iane', 'Gonzales', 'SUZUKI OIL SEAL', 1, 'available', 'complete', 1, NULL),
(109, 68, 108, 'Roi', 'Cortez', 'Y2K HEADLIGHT', 1, 'available', 'complete', 0, NULL),
(110, 68, 108, 'Roi', 'Cortez', 'TOYOTA PARK LIGHT', 1, 'available', 'complete', 0, NULL),
(111, 68, 108, 'Roi', 'Cortez', 'RBC MUFFLER', 1, 'available', 'complete', 1, NULL),
(112, 68, 108, 'Roi', 'Cortez', 'VILLAIN FENDER', 1, 'available', 'complete', 0, NULL),
(113, 68, 108, 'Roi', 'Cortez', 'SUZUKI OIL SEAL', 1, 'available', 'complete', 1, NULL),
(114, 68, 108, 'Roi', 'Cortez', 'TOYOTA SIDE MIRROR', 1, 'available', 'complete', 0, NULL),
(115, 68, 108, 'Roi', 'Cortez', 'HYUNDAI SIDE MIRROR', 1, 'available', 'cancelled', 0, NULL),
(116, 68, 108, 'Roi', 'Cortez', 'HAVOLINE PRODS FULLY SYNTHETIC LE SAE 5W-40', 2, 'available', 'complete', 0, NULL),
(117, 69, 75, 'Jake', 'Zyrus', 'Y2K HEADLIGHT', 1, 'available', 'complete', 0, NULL),
(118, 69, 75, 'Jake', 'Zyrus', 'RBC MUFFLER', 2, 'available', 'complete', 1, NULL),
(119, 69, 75, 'Jake', 'Zyrus', 'SUZUKI OIL SEAL', 1, 'available', 'complete', 1, NULL),
(120, 69, 75, 'Jake', 'Zyrus', 'TOYOTA PARK LIGHT', 2, 'available', 'complete', 0, NULL),
(121, 70, 112, 'Shawn', 'Mendez', 'RBC MUFFLER', 2, 'available', 'complete', 2, NULL),
(122, 70, 112, 'Shawn', 'Mendez', 'SUZUKI OIL SEAL', 1, 'available', 'complete', 1, NULL),
(123, 70, 112, 'Shawn', 'Mendez', 'RUSI OIL', 1, 'available', 'complete', 0, NULL),
(124, 71, 113, 'Nicolas', 'Batum', 'Y2K HEADLIGHT', 1, 'available', 'complete', 0, NULL),
(125, 71, 113, 'Nicolas', 'Batum', 'SUZUKI OIL SEAL', 1, 'available', 'complete', 1, NULL),
(126, 71, 113, 'Nicolas', 'Batum', 'RBC MUFFLER', 1, 'available', 'complete', 2, NULL),
(127, 72, 79, 'Alfred', 'Freedom', 'TOYOTA PARK LIGHT', 1, 'available', 'complete', 0, NULL),
(128, 72, 79, 'Alfred', 'Freedom', 'RBC MUFFLER', 1, 'available', 'complete', 3, NULL),
(129, 72, 79, 'Alfred', 'Freedom', 'VILLAIN FENDER', 1, 'available', 'complete', 0, NULL),
(130, 72, 79, 'Alfred', 'Freedom', 'SUZUKI OIL SEAL', 1, 'available', 'complete', 2, NULL),
(131, 73, 114, 'Tom', 'Holland', 'Y2K HEADLIGHT', 1, 'available', 'complete', 0, NULL),
(132, 73, 114, 'Tom', 'Holland', 'TOYOTA PARK LIGHT', 1, 'available', 'complete', 0, NULL),
(133, 73, 114, 'Tom', 'Holland', 'RBC MUFFLER', 1, 'available', 'complete', 1, NULL),
(134, 74, 115, 'Chris', 'Haynes', 'Y2K HEADLIGHT', 1, 'available', 'complete', 0, NULL),
(135, 74, 115, 'Chris', 'Haynes', 'TOYOTA PARK LIGHT', 1, 'available', 'complete', 0, NULL),
(136, 74, 115, 'Chris', 'Haynes', 'VILLAIN FENDER', 1, 'available', 'complete', 0, NULL),
(137, 74, 115, 'Chris', 'Haynes', 'SUZUKI OIL SEAL', 1, 'available', 'complete', 1, NULL),
(138, 74, 115, 'Chris', 'Haynes', 'SHELL HELIX ULTRA 0W-40 OIL 1L', 1, 'available', 'complete', 0, NULL),
(139, 75, 115, 'Chris', 'Haynes', 'FORD OIL GASKET', 1, 'available', 'complete', 0, NULL),
(140, 76, 116, 'Charles', 'Barkley', 'FORD OIL FILTER', 1, 'available', 'complete', 1, NULL),
(141, 76, 116, 'Charles', 'Barkley', 'SUZUKI OIL SEAL', 1, 'available', 'complete', 1, NULL),
(142, 76, 116, 'Charles', 'Barkley', 'RBC MUFFLER', 1, 'available', 'complete', 1, NULL),
(143, 77, 117, 'Austin', 'Reaves', 'RBC MUFFLER', 1, 'available', 'complete', 1, NULL),
(144, 77, 117, 'Austin', 'Reaves', 'SUZUKI OIL SEAL', 1, 'available', 'complete', 1, NULL),
(145, 77, 117, 'Austin', 'Reaves', 'FORD OIL GASKET', 1, 'available', 'complete', 1, NULL),
(146, 77, 117, 'Austin', 'Reaves', 'HAVOLINE PRODS FULLY SYNTHETIC LE SAE 5W-40', 2, 'available', 'complete', 1, NULL),
(147, 77, 117, 'Austin', 'Reaves', 'FORD OIL FILTER', 1, 'available', 'complete', 1, NULL),
(148, 78, 78, 'Kurt', 'Juanitez', 'RBC MUFFLER', 1, 'available', 'complete', 1, NULL),
(149, 78, 78, 'Kurt', 'Juanitez', 'SUZUKI OIL SEAL', 1, 'available', 'complete', 1, NULL),
(150, 78, 78, 'Kurt', 'Juanitez', 'FORD OIL GASKET', 1, 'available', 'complete', 1, NULL),
(151, 78, 78, 'Kurt', 'Juanitez', 'HAVOLINE PRODS FULLY SYNTHETIC LE SAE 5W-40', 1, 'available', 'complete', 1, NULL),
(152, 78, 78, 'Kurt', 'Juanitez', 'FORD OIL FILTER', 1, 'available', 'complete', 1, NULL),
(153, 79, 118, 'Adam', 'Silver', 'RBC MUFFLER', 1, 'available', 'complete', 1, NULL),
(154, 79, 118, 'Adam', 'Silver', 'Y2K HEADLIGHT', 1, 'available', 'complete', 0, NULL),
(155, 79, 118, 'Adam', 'Silver', 'SUZUKI OIL SEAL', 1, 'available', 'complete', 1, NULL),
(156, 79, 118, 'Adam', 'Silver', 'FORD OIL GASKET', 1, 'available', 'complete', 1, NULL),
(157, 79, 118, 'Adam', 'Silver', 'FORD OIL FILTER', 1, 'available', 'complete', 1, NULL),
(158, 79, 118, 'Adam', 'Silver', 'HAVOLINE PRODS FULLY SYNTHETIC LE SAE 5W-40', 1, 'available', 'complete', 1, NULL),
(159, 80, 119, 'Francis', 'Chua', 'Y2K HEADLIGHT', 1, 'available', 'complete', 1, NULL),
(160, 80, 119, 'Francis', 'Chua', 'TOYOTA PARK LIGHT', 1, 'available', 'complete', 0, NULL),
(161, 81, 120, 'James', 'Harden', 'Y2K HEADLIGHT', 1, 'available', 'complete', 1, NULL),
(162, 81, 120, 'James', 'Harden', 'HYUNDAI SIDE MIRROR', 1, 'available', 'complete', 0, NULL),
(163, 82, 98, 'Trixie', 'Mercedez', 'Y2K HEADLIGHT', 1, 'available', 'complete', 1, NULL),
(164, 82, 98, 'Trixie', 'Mercedez', 'TOYOTA PARK LIGHT', 1, 'available', 'complete', 0, NULL),
(165, 82, 98, 'Trixie', 'Mercedez', 'SHELL HELIX ULTRA 0W-40 OIL 1L', 1, 'available', 'complete', 0, NULL),
(166, 83, 97, 'Andrei ', 'Cortez', 'Y2K HEADLIGHT', 1, 'available', 'complete', 1, NULL),
(167, 83, 97, 'Andrei ', 'Cortez', 'TOYOTA PARK LIGHT', 1, 'available', 'complete', 0, NULL),
(168, 83, 97, 'Andrei ', 'Cortez', 'RBC MUFFLER', 1, 'available', 'complete', 0, NULL),
(169, 83, 97, 'Andrei ', 'Cortez', 'VILLAIN FENDER', 1, 'available', 'complete', 0, NULL),
(170, 84, 103, 'Dale', 'Quinto', 'TOYOTA PARK LIGHT', 2, 'available', 'complete', 0, NULL),
(171, 84, 103, 'Dale', 'Quinto', 'Y2K HEADLIGHT', 1, 'available', 'complete', 1, NULL),
(172, 84, 103, 'Dale', 'Quinto', 'VILLAIN FENDER', 1, 'available', 'complete', 1, NULL),
(173, 84, 103, 'Dale', 'Quinto', 'RBC MUFFLER', 1, 'available', 'complete', 0, NULL),
(174, 84, 103, 'Dale', 'Quinto', 'TOYOTA SIDE MIRROR', 1, 'available', 'complete', 0, NULL),
(175, 85, 121, 'Princess', 'Queen', 'Y2K HEADLIGHT', 1, 'available', 'complete', 1, NULL),
(176, 85, 121, 'Princess', 'Queen', 'VILLAIN FENDER', 1, 'available', 'complete', 1, NULL),
(177, 85, 121, 'Princess', 'Queen', 'TOYOTA PARK LIGHT', 1, 'available', 'complete', 0, NULL),
(178, 86, 122, 'Ernie', 'Smith', 'Y2K HEADLIGHT', 1, 'available', 'complete', 1, NULL),
(179, 86, 122, 'Ernie', 'Smith', 'VILLAIN FENDER', 1, 'available', 'complete', 1, NULL),
(180, 86, 122, 'Ernie', 'Smith', 'RUSI OIL', 1, 'available', 'complete', 0, NULL),
(181, 87, 85, 'John', 'Doe', 'Y2K HEADLIGHT', 1, 'available', 'complete', 1, NULL),
(182, 87, 85, 'John', 'Doe', 'VILLAIN FENDER', 1, 'available', 'complete', 1, NULL),
(183, 87, 85, 'John', 'Doe', 'TOYOTA PARK LIGHT', 1, 'available', 'complete', 0, NULL),
(184, 87, 85, 'John', 'Doe', 'RBC MUFFLER', 1, 'available', 'complete', 0, NULL),
(185, 88, 123, 'Kevin', 'Durant', 'Y2K HEADLIGHT', 1, 'available', 'complete', 1, NULL),
(186, 88, 123, 'Kevin', 'Durant', 'VILLAIN FENDER', 1, 'available', 'complete', 1, NULL),
(187, 88, 123, 'Kevin', 'Durant', 'TOYOTA PARK LIGHT', 1, 'available', 'complete', 0, NULL),
(188, 89, 124, 'Devin', 'Booker', 'Y2K HEADLIGHT', 1, 'available', 'complete', 1, NULL),
(189, 89, 124, 'Devin', 'Booker', 'VILLAIN FENDER', 2, 'available', 'complete', 2, NULL),
(190, 89, 124, 'Devin', 'Booker', 'TOYOTA PARK LIGHT', 1, 'available', 'complete', 0, NULL),
(191, 89, 124, 'Devin', 'Booker', 'RUSI OIL', 1, 'available', 'complete', 0, NULL),
(192, 89, 124, 'Devin', 'Booker', 'HYUNDAI SIDE MIRROR', 1, 'available', 'complete', 0, NULL),
(193, 90, 125, 'Bradley', 'Beal', 'Y2K HEADLIGHT', 1, 'available', 'complete', 1, NULL),
(194, 90, 125, 'Bradley', 'Beal', 'FORD OIL FILTER', 1, 'available', 'complete', 0, NULL),
(195, 90, 125, 'Bradley', 'Beal', 'VILLAIN FENDER', 1, 'available', 'complete', 1, NULL),
(196, 90, 125, 'Bradley', 'Beal', 'SUZUKI OIL SEAL', 3, 'available', 'complete', 0, NULL),
(197, 90, 125, 'Bradley', 'Beal', 'TOYOTA PARK LIGHT', 3, 'available', 'complete', 0, NULL),
(198, 90, 125, 'Bradley', 'Beal', 'RBC MUFFLER', 3, 'available', 'complete', 0, NULL),
(199, 91, 126, 'Stan', 'Smith', 'Y2K HEADLIGHT', 1, 'available', 'complete', 1, NULL),
(200, 91, 126, 'Stan', 'Smith', 'TOYOTA PARK LIGHT', 1, 'available', 'complete', 0, NULL),
(201, 91, 126, 'Stan', 'Smith', 'RBC MUFFLER', 1, 'available', 'complete', 0, NULL),
(202, 91, 126, 'Stan', 'Smith', 'VILLAIN FENDER', 1, 'available', 'complete', 1, NULL),
(203, 91, 126, 'Stan', 'Smith', 'Y2K HEADLIGHT', 1, 'available', 'complete', 1, NULL),
(204, 91, 126, 'Stan', 'Smith', 'TOYOTA PARK LIGHT', 1, 'available', 'complete', 0, NULL),
(205, 91, 126, 'Stan', 'Smith', 'SUZUKI OIL SEAL', 1, 'available', 'complete', 0, NULL),
(206, 91, 126, 'Stan', 'Smith', 'TOYOTA PARK LIGHT', 1, 'available', 'complete', 0, NULL),
(207, 91, 126, 'Stan', 'Smith', 'SHELL HELIX ULTRA 0W-40 OIL 1L', 1, 'available', 'cancelled', 0, NULL),
(208, 91, 126, 'Stan', 'Smith', 'SHELL HELIX ULTRA 0W-40 OIL 1L', 1, 'available', 'cancelled', 0, NULL),
(209, 91, 126, 'Stan', 'Smith', 'RBC MUFFLER', 1, 'available', 'complete', 0, NULL),
(210, 91, 126, 'Stan', 'Smith', 'SHELL HELIX ULTRA 0W-40 OIL 1L', 1, 'available', 'cancelled', 0, NULL),
(211, 91, 126, 'Stan', 'Smith', 'SHELL HELIX ULTRA 0W-40 OIL 1L', 1, 'available', 'cancelled', 0, NULL),
(212, 91, 126, 'Stan', 'Smith', 'TOYOTA PARK LIGHT', 1, 'available', 'complete', 0, NULL),
(213, 91, 126, 'Stan', 'Smith', 'TOYOTA SIDE MIRROR', 1, 'available', 'cancelled', 0, NULL),
(214, 91, 126, 'Stan', 'Smith', 'RBC MUFFLER', 1, 'available', 'complete', 0, NULL),
(215, 91, 126, 'Stan', 'Smith', 'FORD OIL GASKET', 6, 'available', 'cancelled', 0, NULL),
(216, 92, 129, '', '', 'FORD TAIL LIGHT', 1, 'available', 'complete', 1, NULL),
(217, 92, 129, '', '', 'FORD OIL GASKET', 1, 'available', 'complete', 0, NULL),
(218, 92, 129, '', '', 'FORD OIL FILTER', 1, 'available', 'complete', 0, NULL),
(219, 93, 130, '', '', 'FORD TAIL LIGHT', 1, 'available', 'complete', 1, NULL),
(220, 93, 130, '', '', 'HAVOLINE PRODS FULLY SYNTHETIC LE SAE 5W-40', 1, 'available', 'complete', 0, NULL),
(221, 93, 130, '', '', 'FORD OIL GASKET', 1, 'available', 'complete', 0, NULL),
(222, 94, 131, '', '', 'FORD TAIL LIGHT', 1, 'available', 'complete', 1, NULL),
(223, 95, 132, '', '', 'VILLAIN FENDER', 1, 'available', 'complete', 1, NULL),
(224, 95, 132, '', '', 'Y2K HEADLIGHT', 1, 'available', 'complete', 1, NULL),
(225, 96, 133, '', '', 'Y2K HEADLIGHT', 1, 'available', 'complete', 1, NULL),
(226, 96, 133, '', '', 'FORD OIL FILTER', 1, 'available', 'complete', 0, NULL),
(227, 96, 133, '', '', 'Y2K HEADLIGHT', 1, 'available', 'complete', 1, NULL),
(228, 95, 132, '', '', 'Y2K HEADLIGHT', 1, 'available', 'complete', 1, NULL),
(229, 95, 132, '', '', 'Y2K HEADLIGHT', 1, 'available', 'complete', 1, NULL),
(230, 96, 133, '', '', 'Y2K HEADLIGHT', 1, 'available', 'complete', 1, NULL),
(231, 93, 130, '', '', 'Y2K HEADLIGHT', 1, 'available', 'complete', 1, NULL),
(232, 94, 131, '', '', 'Y2K HEADLIGHT', 1, 'available', 'complete', 1, NULL),
(233, 93, 130, '', '', 'Y2K HEADLIGHT', 1, 'available', 'complete', 1, NULL),
(234, 94, 131, '', '', 'Y2K HEADLIGHT', 1, 'available', 'complete', 1, NULL),
(235, 94, 131, '', '', 'Y2K HEADLIGHT', 1, 'available', 'complete', 1, NULL),
(236, 93, 130, '', '', 'Y2K HEADLIGHT', 1, 'available', 'complete', 1, NULL),
(237, 93, 130, '', '', 'Y2K HEADLIGHT', 1, 'Available', 'complete', 1, NULL),
(238, 94, 131, '', '', 'Y2K HEADLIGHT', 1, 'Available', 'complete', 1, NULL),
(239, 97, 134, '', '', 'Y2K HEADLIGHT', 1, 'Available', 'complete', 1, NULL),
(240, 98, 135, '', '', 'FORD OIL FILTER', 1, 'Available', 'complete', 0, NULL),
(241, 99, 136, '', '', 'FORD OIL FILTER', 1, 'Available', 'complete', 0, NULL),
(242, 99, 136, '', '', 'Y2K HEADLIGHT', 1, 'Available', 'complete', 1, NULL),
(243, 100, 137, '', '', 'Y2K HEADLIGHT', 1, 'Available', 'complete', 1, NULL),
(244, 100, 137, '', '', 'FORD OIL FILTER', 1, 'Available', 'complete', 0, NULL),
(245, 101, 138, '', '', 'FORD OIL FILTER', 1, 'Available', 'complete', 0, NULL),
(246, 102, 139, '', '', 'FORD OIL FILTER', 1, 'Available', 'complete', 0, NULL),
(247, 102, 139, '', '', 'Y2K HEADLIGHT', 1, 'Available', 'complete', 1, NULL),
(248, 103, 140, '', '', 'Y2K HEADLIGHT', 1, 'Available', 'complete', 1, NULL),
(249, 103, 140, '', '', 'FORD OIL FILTER', 1, 'Available', 'complete', 0, NULL),
(250, 104, 141, '', '', 'FORD OIL FILTER', 1, 'Available', 'complete', 0, NULL),
(251, 105, 76, '', '', 'Y2K HEADLIGHT', 1, 'Available', 'complete', 1, NULL),
(252, 106, 142, '', '', 'Y2K HEADLIGHT', 1, 'Available', 'complete', 1, NULL),
(253, 107, 148, '', '', 'Y2K HEADLIGHT', 1, 'Available', 'complete', 1, NULL),
(254, 108, 144, '', '', 'FORD OIL FILTER', 1, 'Available', 'complete', 0, NULL),
(255, 109, 146, '', '', 'FORD OIL FILTER', 1, 'Available', 'complete', 0, NULL),
(256, 110, 147, '', '', 'RUSI OIL', 1, 'Available', 'complete', 0, NULL),
(257, 111, 149, '', '', 'SHELL HELIX ULTRA 0W-40 OIL 1L', 1, 'Available', 'complete', 0, NULL),
(258, 112, 150, 'Scottie ', 'Pippen', 'TOYOTA SIDE MIRROR', 1, 'Available', 'complete', 0, NULL),
(259, 112, 150, 'Scottie ', 'Pippen', 'FORD OIL FILTER', 1, 'Available', 'complete', 0, NULL),
(260, 113, 151, 'Nate', 'Robinson', 'FORD TAIL LIGHT', 1, 'Available', 'complete', 0, NULL),
(261, 114, 152, 'Dennis', 'Rodman', 'HAVOLINE PRODS FULLY SYNTHETIC LE SAE 5W-40', 1, 'Available', 'complete', 0, NULL),
(262, 115, 153, 'Steve', 'Kerr', 'SHELL HELIX ULTRA 0W-40 OIL 1L', 1, 'Available', 'complete', 0, NULL),
(263, 116, 154, 'John', 'Paxson', 'TOYOTA SIDE MIRROR', 1, 'Available', 'complete', 0, NULL),
(264, 116, 154, 'John', 'Paxson', 'HAVOLINE PRODS FULLY SYNTHETIC LE SAE 5W-40', 1, 'Available', 'complete', 0, NULL),
(265, 117, 155, 'Mohammed', 'Ali', 'FORD OIL GASKET', 1, 'Available', 'complete', 0, NULL),
(266, 118, 156, 'Connor', 'Mcgregor', 'HAVOLINE PRODS FULLY SYNTHETIC LE SAE 5W-40', 1, 'Available', 'complete', 0, NULL),
(267, 119, 157, 'Ghoun', 'Esteban', 'HAVOLINE PRODS FULLY SYNTHETIC LE SAE 5W-40', 1, 'Available', 'complete', 0, NULL),
(268, 120, 158, 'Mike', 'Tan', 'HAVOLINE PRODS FULLY SYNTHETIC LE SAE 5W-40', 1, 'Available', 'cancelled', 0, NULL),
(269, 121, 159, 'Zeus', 'Martinez', 'HAVOLINE PRODS FULLY SYNTHETIC LE SAE 5W-40', 1, 'Available', 'complete', 0, NULL),
(270, 118, 156, 'Connor', 'Mcgregor', 'FORD OIL GASKET', 1, 'Available', 'complete', 0, NULL),
(271, 129, 160, 'King', 'Estrada', 'FORD OIL FILTER', 1, 'Available', 'complete', 0, 'BKG9985'),
(272, 130, 161, 'Hershey', 'Marie', 'FORD TAIL LIGHT', 1, 'Available', 'complete', 0, 'JNT2049'),
(273, 130, 161, 'Hershey', 'Marie', 'HAVOLINE PRODS FULLY SYNTHETIC LE SAE 5W-40', 1, 'Available', 'complete', 0, NULL),
(274, 131, 162, 'Hershey', 'Marie', 'VILLAIN FENDER', 1, 'Available', 'complete', 0, 'JNT2049'),
(275, 132, 163, 'Hershey', 'Agunday', 'HAVOLINE PRODS FULLY SYNTHETIC LE SAE 5W-40', 1, 'Available', 'complete', 0, 'JNT2049'),
(276, 133, 164, 'Randy', 'Mcgrady', 'TOYOTA SIDE MIRROR', 1, 'Available', 'complete', 0, 'SAD6746'),
(277, 134, 165, 'James', 'Harden', 'FORD OIL FILTER', 1, 'Available', 'complete', 0, 'SAD6746'),
(278, 134, 165, 'James', 'Harden', 'FORD OIL GASKET', 1, 'Available', 'complete', 0, 'SAD6746'),
(279, 134, 165, 'James', 'Harden', 'FORD TAIL LIGHT', 1, 'Available', 'complete', 0, 'SAD6746'),
(280, 134, 165, 'James', 'Harden', 'TOYOTA PARK LIGHT', 1, 'Available', 'cancelled', 0, 'SAD6746'),
(281, 134, 165, 'James', 'Harden', 'RBC MUFFLER', 1, 'Available', 'complete', 0, 'SAD6746'),
(282, 134, 165, 'James', 'Harden', 'SHELL HELIX ULTRA 0W-40 OIL 1L', 1, 'Available', 'complete', 0, NULL),
(283, 135, 145, 'Setsuna', 'Ignacio', 'FORD OIL FILTER', 2, 'Available', 'complete', 0, 'JFU2140'),
(284, 135, 145, 'Setsuna', 'Ignacio', 'Y2K HEADLIGHT', 1, 'Available', 'complete', 1, 'JFU2140'),
(285, 136, 166, 'Marlon', 'Victorio', 'Y2K HEADLIGHT', 1, 'Available', 'complete', 1, 'HBT6857'),
(286, 136, 166, 'Marlon', 'Victorio', 'FORD OIL FILTER', 1, 'Available', 'complete', 0, 'HBT6857'),
(287, 136, 166, 'Marlon', 'Victorio', 'FORD OIL FILTER', 1, 'Available', 'complete', 0, NULL),
(288, 135, 145, 'Setsuna', 'Ignacio', 'Y2K HEADLIGHT', 1, 'Available', 'complete', 1, NULL),
(289, 137, 167, 'Marie', 'Bonite', 'FORD TAIL LIGHT', 1, 'Available', 'complete', 1, 'NBM2450'),
(290, 137, 167, 'Marie', 'Bonite', 'FORD OIL FILTER', 1, 'Available', 'complete', 0, 'NBM2450'),
(291, 138, 168, 'John', 'Batum', 'FORD TAIL LIGHT', 1, 'Available', 'complete', 1, 'NGB2481'),
(292, 139, 169, 'Martin', 'Rivera', 'FORD TAIL LIGHT', 1, 'Available', 'complete', 1, 'HTB6756'),
(293, 140, 170, 'Ace', 'Mendoza', 'Y2K HEADLIGHT', 1, 'Available', 'complete', 1, 'QHX5874'),
(294, 118, 156, 'Connor', 'Mcgregor', 'Y2K HEADLIGHT', 1, 'Available', 'complete', 1, NULL),
(295, 140, 170, 'Ace', 'Mendoza', 'FORD OIL FILTER', 1, 'Available', 'complete', 0, NULL),
(296, 140, 170, 'Ace', 'Mendoza', 'SUZUKI OIL SEAL', 1, 'Available', 'complete', 0, NULL),
(297, 139, 169, 'Martin', 'Rivera', 'TOYOTA SIDE MIRROR', 1, 'Available', 'complete', 0, NULL),
(298, 139, 169, 'Martin', 'Rivera', 'VILLAIN FENDER', 2, 'Available', 'complete', 0, NULL),
(299, 139, 169, 'Martin', 'Rivera', 'RUSI OIL', 1, 'Available', 'complete', 0, NULL),
(300, 138, 168, 'John', 'Batum', 'TOYOTA SIDE MIRROR', 1, 'Available', 'complete', 0, NULL),
(301, 140, 170, 'Ace', 'Mendoza', 'FORD OIL FILTER', 1, 'Available', 'complete', 0, NULL),
(302, 139, 169, 'Martin', 'Rivera', 'FORD OIL FILTER CLASS S', 1, 'Available', 'complete', 0, NULL),
(303, 138, 168, 'John', 'Batum', 'FORD OIL GASKET', 1, 'Available', 'complete', 0, NULL),
(304, 141, 171, 'Jonathan', 'Kuminga', 'FORD OIL FILTER', 1, 'Available', 'complete', 0, 'NBA2495'),
(305, 141, 171, 'Jonathan', 'Kuminga', 'FORD OIL GASKET', 1, 'Available', 'complete', 0, 'NBA2495'),
(306, 142, 172, 'Sam', 'Milby', 'FORD TAIL LIGHT', 1, 'Available', 'complete', 0, 'NMY0677'),
(307, 142, 172, 'Sam', 'Milby', 'HAVOLINE PRODS FULLY SYNTHETIC LE SAE 5W-40', 1, 'Available', 'complete', 0, 'NMY0677'),
(308, 142, 172, 'Sam', 'Milby', 'RBC MUFFLER', 1, 'Available', 'complete', 0, 'NMY0677'),
(309, 143, 173, 'Kevin', 'Porter', 'TOYOTA PARK LIGHT', 1, 'Available', 'complete', 0, 'NOH7958'),
(310, 143, 173, 'Kevin', 'Porter', 'VILLAIN FENDER', 1, 'Available', 'complete', 0, 'NOH7958'),
(311, 143, 173, 'Kevin', 'Porter', 'TOYOTA SIDE MIRROR', 1, 'Available', 'complete', 0, 'NOH7958'),
(312, 144, 174, 'Stephen', 'Smith', 'RUSI OIL', 2, 'Available', 'complete', 0, 'HTJ5098'),
(313, 145, 175, 'Reynaldo', 'Reyes', 'FORD OIL GASKET', 1, 'Available', 'complete', 1, 'UVA626'),
(314, 146, 74, 'Choti ', 'Aquino', 'FORD OIL GASKET', 1, 'Unavailable', 'In Progress', 1, 'XZXC432'),
(315, 147, 176, 'Max', 'Christie', 'FORD OIL GASKET', 1, 'Available', 'complete', 1, 'KNT5840'),
(316, 147, 176, 'Max', 'Christie', 'FORD OIL FILTER', 1, 'Available', 'complete', 0, NULL),
(317, 148, 179, 'Neil', 'Armstrong', 'FORD OIL GASKET', 1, 'Available', 'complete', 1, 'ASD1204'),
(318, 149, 180, 'Kian', 'Soriano', 'FORD OIL FILTER', 1, 'Available', 'complete', 0, 'NYP5094'),
(319, 150, 181, 'Francis', 'Corpuz', 'FORD OIL FILTER', 1, 'Available', 'complete', 0, 'JYU0959'),
(320, 151, 182, 'Avy', 'Rebite', 'FORD OIL FILTER CLASS S', 1, 'Available', 'complete', 0, 'JJG4052'),
(321, 152, 183, 'Joshua', 'Banaria', 'FORD OIL FILTER CLASS S', 1, 'Available', 'complete', 0, 'NGM0975'),
(322, 153, 184, 'Kiko', 'Sibal', 'FORD OIL FILTER', 1, 'Available', 'complete', 0, 'JHN2471'),
(323, 154, 185, 'Christopher', 'Martin', 'FORD OIL FILTER CLASS S', 1, 'Available', 'complete', 0, 'YBW0294'),
(324, 155, 186, 'Ray', 'Yu', 'FORD OIL FILTER CLASS S', 1, 'Available', 'complete', 0, 'UTN4472'),
(325, 156, 202, 'Ishi', 'Marie', 'FORD OIL FILTER', 1, 'Available', 'complete', 0, 'EWQ4029'),
(326, 156, 202, 'Ishi', 'Marie', 'FORD OIL GASKET', 1, 'Available', 'complete', 1, 'EWQ4029'),
(327, 156, 202, 'Ishi', 'Marie', 'HAVOLINE PRODS FULLY SYNTHETIC LE SAE 5W-40', 1, 'Available', 'complete', 0, 'EWQ4029'),
(328, 157, 206, 'Kent', 'Barcelona', 'FORD OIL FILTER CLASS S', 1, 'Available', 'complete', 0, 'HGK2049'),
(329, 157, 206, 'Kent', 'Barcelona', 'RUSI OIL', 1, 'Available', 'complete', 0, 'HGK2049'),
(330, 157, 206, 'Kent', 'Barcelona', 'SUZUKI OIL SEAL', 1, 'Available', 'complete', 0, 'HGK2049'),
(331, 158, 207, 'Marie', 'Ishi', 'FORD OIL FILTER', 1, 'Available', 'complete', 0, 'EWQ4029'),
(332, 159, 208, 'Princess', 'Freiya', 'FORD OIL FILTER', 1, 'Available', 'complete', 0, 'TGB5749'),
(333, 157, 206, 'Kent', 'Barcelona', 'FORD OIL GASKET', 1, 'Available', 'complete', 1, NULL),
(334, 45, 74, 'Choti ', 'Aquino', 'FORD OIL FILTER', 1, 'Available', 'complete', 0, NULL),
(335, 142, 172, 'Sam', 'Milby', 'SHELL HELIX ULTRA 0W-40 OIL 1L', 1, 'Available', 'complete', 0, NULL),
(336, 147, 176, 'Max', 'Christie', 'FORD OIL FILTER CLASS S', 1, 'Available', 'complete', 0, NULL),
(337, 137, 167, 'Marie', 'Bonite', 'FORD OIL FILTER', 1, 'Available', 'complete', 0, NULL),
(338, 138, 168, 'John', 'Batum', 'FORD TAIL LIGHT', 1, 'Available', 'complete', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `mechanics`
--

CREATE TABLE `mechanics` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mechanics`
--

INSERT INTO `mechanics` (`id`, `name`) VALUES
(1, 'Choti Aquino'),
(2, 'Karl Marte'),
(3, 'Kurt Juanitez'),
(4, 'Jigz Esteban'),
(5, 'Alfred Batumbakal'),
(6, 'Conrad Quadrado'),
(13, 'Miggy Cruz');

-- --------------------------------------------------------

--
-- Table structure for table `mechanic_schedule`
--

CREATE TABLE `mechanic_schedule` (
  `id` int(11) NOT NULL,
  `mechanic_id` int(11) NOT NULL,
  `day_of_week` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mechanic_schedule`
--

INSERT INTO `mechanic_schedule` (`id`, `mechanic_id`, `day_of_week`) VALUES
(266, 1, 'Monday'),
(267, 1, 'Tuesday'),
(268, 1, 'Wednesday'),
(269, 1, 'Thursday'),
(270, 1, 'Friday'),
(271, 1, 'Saturday'),
(272, 1, 'Sunday'),
(273, 2, 'Monday'),
(274, 2, 'Tuesday'),
(275, 2, 'Wednesday'),
(276, 2, 'Thursday'),
(277, 2, 'Saturday'),
(278, 3, 'Monday'),
(279, 3, 'Tuesday'),
(280, 3, 'Wednesday'),
(281, 3, 'Thursday'),
(282, 3, 'Saturday'),
(283, 4, 'Wednesday'),
(284, 4, 'Thursday'),
(285, 4, 'Friday'),
(286, 4, 'Sunday'),
(287, 5, 'Monday'),
(288, 5, 'Tuesday'),
(289, 5, 'Thursday'),
(290, 5, 'Friday'),
(291, 5, 'Saturday'),
(292, 5, 'Sunday'),
(293, 6, 'Monday'),
(294, 6, 'Tuesday'),
(295, 6, 'Wednesday'),
(296, 6, 'Thursday'),
(297, 6, 'Friday'),
(298, 6, 'Sunday'),
(299, 13, 'Monday'),
(300, 13, 'Tuesday'),
(301, 13, 'Wednesday');

-- --------------------------------------------------------

--
-- Table structure for table `sms_logs`
--

CREATE TABLE `sms_logs` (
  `id` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL,
  `contact_number` varchar(15) NOT NULL,
  `message` text NOT NULL,
  `status` varchar(20) NOT NULL,
  `sent_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `type` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sms_logs`
--

INSERT INTO `sms_logs` (`id`, `appointment_id`, `contact_number`, `message`, `status`, `sent_at`, `type`) VALUES
(1, 200, '639186457956', 'Hello Diane  Libay, your appointment for 2024-11-05 has been processed. Please wait for the confirmation of your booking. Looking forward to giving you our quality service.', 'sent', '2024-11-04 15:19:04', 'booking'),
(2, 201, '639454308680', 'Hello wyxz wyxz, your appointment for 2024-11-05 has been processed. Please wait for the confirmation of your booking. Looking forward to giving you our quality service.', 'sent', '2024-11-04 15:21:35', 'booking'),
(3, 202, '639947729049', 'Hello Ishi Marie, your appointment for 2024-11-06 has been processed. Please wait for the confirmation of your booking. Looking forward to giving you our quality service.', 'failed', '2024-11-04 15:32:45', 'booking'),
(4, 203, '09454308680', 'Hello jigz esteban, your appointment for 2024-11-05 has been processed. Please wait for the confirmation of your booking. Looking forward to giving you our quality service.', 'failed', '2024-11-04 15:41:14', 'booking'),
(5, 204, '09454308680', 'Hello hershey bonite, your appointment for 2024-11-05 has been processed. Please wait for the confirmation of your booking. Looking forward to giving you our quality service.', 'failed', '2024-11-04 15:46:13', 'booking'),
(6, 205, '09454308680', 'Hello iane ghoun, your appointment for 2024-11-07 has been processed. Please wait for the confirmation of your booking. Looking forward to giving you our quality service.', 'failed', '2024-11-04 15:59:01', 'booking'),
(7, 206, '639454308680', 'Hello Kent Barcelona, your appointment for 2024-11-05 has been processed. Please wait for the confirmation of your booking. Looking forward to giving you our quality service.', 'failed', '2024-11-05 03:23:22', 'booking'),
(8, 200, '639186457956', 'Hello Diane  Libay, your appointment for 2024-11-05 has been processed. Please wait for the confirmation of your booking. Looking forward to giving you our quality service.', 'failed', '2024-11-05 05:49:28', 'booking'),
(9, 200, '639186457956', 'Hello Diane  Libay, your appointment for 2024-11-05 has been processed. Please wait for the confirmation of your booking. Looking forward to giving you our quality service.', 'failed', '2024-11-05 06:35:03', 'booking'),
(10, 202, '639947729049', 'Hello Ishi Marie, your appointment for 2024-11-06 has been processed. Please wait for the confirmation of your booking. Looking forward to giving you our quality service.', 'failed', '2024-11-05 06:37:29', 'booking'),
(11, 201, '639454308680', 'Hello wyxz wyxz, we are sorry to inform you that your appointment for 2024-11-05 has been declined.', 'failed', '2024-11-05 07:12:23', 'cancelled'),
(12, 201, '639454308680', 'Hello wyxz wyxz, we are sorry to inform you that your appointment for 2024-11-05 has been declined.', 'failed', '2024-11-05 07:19:49', 'booking'),
(13, 202, '639947729049', 'Hi Ishi Marie! We are glad to inform you that your appointment has been Approved! Please be at our shop at least 30 minutes before your booked date and time slot: 2024-11-06 10:00:00.', 'failed', '2024-11-05 08:52:14', 'approved'),
(14, 202, '639947729049', 'Hi Ishi Marie! We are glad to inform you that your appointment has been Approved! Please be at our shop at least 30 minutes before your booked date and time slot: 2024-11-06 10:00:00.', 'failed', '2024-11-05 08:58:09', 'booking'),
(15, 202, '639947729049', 'Hi Ishi Marie! Please mind that your booking has been rescheduled from 2024-11-06 at 10:00:00 to 2024-11-07 at 10:00:00. Thank you for your understanding.', 'failed', '2024-11-05 09:12:07', 'rescheduled'),
(16, 202, '639947729049', 'Hi Ishi Marie! Please mind that your booking has been rescheduled from 2024-11-06 at 10:00:00 to 2024-11-07 at 10:00:00. Thank you for your understanding.', 'failed', '2024-11-05 09:12:29', 'booking'),
(17, 206, '639454308680', 'Hi Kent Barcelona! Please mind that your booking has been rescheduled from 2024-11-05 at 13:00:00 to 2024-11-06 at 11:00:00. Thank you for your understanding.', 'failed', '2024-11-05 09:17:11', 'rescheduled'),
(18, 206, '639454308680', 'Hello Kent Barcelona, we are sorry to inform you that your appointment for 2024-11-06 has been declined.', 'failed', '2024-11-05 09:23:39', 'cancelled'),
(19, 202, '639947729049', 'Hi Ishi Marie! Please mind that your booking has been rescheduled from 2024-11-06 at 10:00:00 to 2024-11-07 at 10:00:00. Thank you for your understanding.', 'failed', '2024-11-05 11:14:01', 'booking'),
(20, 206, '639454308680', 'Hi Kent Barcelona! Please mind that your booking has been rescheduled from 2024-11-06 at 11:00:00 to 2024-11-05 at 15:00:00. Thank you for your understanding.', 'failed', '2024-11-05 11:44:11', 'rescheduled'),
(21, 206, '639454308680', 'Hi Kent Barcelona! We are glad to inform you that your car will now be undergoing service. For progress updates, please click this link: Progress Report Link: www.agtechnicianservices.com/d9108218324ae3b73db0ad4b9d356fdd.', 'failed', '2024-11-05 11:44:54', 'service'),
(22, 202, '639947729049', 'Good Day Ishi Marie! We are glad to tell you that the services you avail for your car Ford Focus with plate number ewq4029 is done. Please come to our shop immediately.', 'failed', '2024-11-05 11:58:49', 'completed'),
(23, 207, '639454308680', 'Hi Marie Ishi! Please mind that your booking has been rescheduled from 2024-11-06 at 21:22:00 to 2024-11-05 at 13:00:00. Thank you for your understanding.', 'failed', '2024-11-05 12:29:02', 'rescheduled'),
(24, 207, '639454308680', 'Hi Marie Ishi! Please mind that your booking has been rescheduled from 2024-11-06 at 21:22:00 to 2024-11-05 at 13:00:00. Thank you for your understanding.', 'failed', '2024-11-05 12:31:52', 'booking'),
(25, 207, '639454308680', 'Hi Marie Ishi! We are glad to inform you that your car will now be undergoing service. For progress updates, please click this link: Progress Report Link: www.agtechnicianservices.com/42e10f32e85001e82c333f98aa8f9391', 'failed', '2024-11-05 12:33:35', 'service'),
(26, 207, '639454308680', 'Good Day Marie Ishi! We are glad to tell you that the services you avail for your car Toyota Raptor with plate number EWQ4029 is done. Please come to our shop immediately.', 'failed', '2024-11-05 12:34:00', 'completed'),
(27, 208, '639947729049', 'Hello Princess Freiya, your appointment for 2024-11-06 has been processed. Please wait for the confirmation of your booking. Looking forward to giving you our quality service.', 'failed', '2024-11-05 14:55:57', 'booking'),
(28, 208, '639947729049', 'Hi Princess Freiya! We are glad to inform you that your appointment has been Approved! Please be at our shop at least 30 minutes before your booked date and time slot: 2024-11-06 at 10:00:00.', 'failed', '2024-11-05 14:57:01', 'approved'),
(29, 208, '639947729049', 'Hello Princess Freiya, we are sorry to inform you that your appointment for 2024-11-06 has been declined.', 'failed', '2024-11-05 14:58:16', 'cancelled'),
(30, 208, '639947729049', 'Hello Princess Freiya, we are sorry to inform you that your appointment for 2024-11-06 has been declined.', 'failed', '2024-11-05 14:58:41', 'booking'),
(31, 208, '639947729049', 'Hi Princess Freiya! Please mind that your booking has been rescheduled from 2024-11-06 at 10:00:00 to 2024-11-05 at 14:00:00. Thank you for your understanding.', 'failed', '2024-11-05 14:59:05', 'rescheduled'),
(32, 208, '639947729049', 'Hi Princess Freiya! We are glad to inform you that your car will now be undergoing service. For progress updates, please click this link: Progress Report Link: www.agtechnicianservices.com/99fda392956cb04b534244cb7bc8f6c2', 'failed', '2024-11-05 14:59:38', 'service'),
(33, 208, '639947729049', 'Good Day Princess Freiya! We are glad to tell you that the services you avail for your car Toyota Fortuner with plate number TGB5749 is done. Please come to our shop immediately.', 'failed', '2024-11-05 15:00:06', 'completed'),
(34, 180, '639762547566', 'Good Day Kian Soriano! We are glad to tell you that the services you avail for your car Ford Raptor with plate number NYP5094 is done. Please come to our shop immediately.', 'failed', '2024-11-06 09:02:10', 'completed'),
(35, 182, '639846582734', 'Good Day AVY Rebite! We are glad to tell you that the services you avail for your car Chevrolet Captiva with plate number JJG4052 is done. Please come to our shop immediately.', 'failed', '2024-11-06 09:02:24', 'completed'),
(36, 183, '639564726412', 'Good Day Joshua Banaria! We are glad to tell you that the services you avail for your car Nissan Almera with plate number NGM0975 is done. Please come to our shop immediately.', 'failed', '2024-11-06 09:03:05', 'completed'),
(37, 184, '639872746521', 'Good Day Kiko Sibal! We are glad to tell you that the services you avail for your car Chevrolet Sail with plate number JHN2471 is done. Please come to our shop immediately.', 'failed', '2024-11-06 09:12:56', 'completed'),
(38, 186, '639726584712', 'Good Day Ray Yu! We are glad to tell you that the services you avail for your car Hyundai Tucson with plate number UTN4472 is done. Please come to our shop immediately.', 'failed', '2024-11-06 09:37:49', 'completed'),
(39, 181, '639864726482', 'Good Day Francis Corpuz! We are glad to tell you that the services you avail for your car Ford Ecosport with plate number JYU0959 is done. Please come to our shop immediately.', 'failed', '2024-11-06 10:29:43', 'completed'),
(40, 179, '639768473627', 'Good Day Neil Armstrong! We are glad to tell you that the services you avail for your car Honda Civic with plate number ASD1204 is done. Please come to our shop immediately.', 'failed', '2024-11-06 10:30:21', 'completed'),
(41, 74, '0987654321', 'Good Day choti  aquino! We are glad to tell you that the services you avail for your car Nissan Terra with plate number XZXC432 is done. Please come to our shop immediately.', 'failed', '2024-11-06 10:32:11', 'completed'),
(42, 172, '09852657462', 'Good Day Sam Milby! We are glad to tell you that the services you avail for your car Ford Ecosport with plate number NMY0677 is done. Please come to our shop immediately.', 'failed', '2024-11-06 10:32:33', 'completed'),
(43, 176, '09525594867', 'Good Day max christie! We are glad to tell you that the services you avail for your car Toyota Vios with plate number KNT5840 is done. Please come to our shop immediately.', 'failed', '2024-11-06 10:34:00', 'completed'),
(44, 206, '639454308680', 'Good Day Kent Barcelona! We are glad to tell you that the services you avail for your car Toyota Fortuner with plate number HGK2049 is done. Please come to our shop immediately.', 'failed', '2024-11-06 10:35:33', 'completed'),
(45, 145, '09656492751', 'Good Day setsuna ignacio! We are glad to tell you that the services you avail for your car Toyota Land Cruiser with plate number JFU2140 is done. Please come to our shop immediately.', 'failed', '2024-11-06 10:43:22', 'completed'),
(46, 156, '09245745948', 'Good Day Connor Mcgregor! We are glad to tell you that the services you avail for your car Ford Raptor with plate number NKG2049 is done. Please come to our shop immediately.', 'failed', '2024-11-06 10:43:32', 'completed'),
(47, 157, '09437256482', 'Good Day Ghoun Esteban! We are glad to tell you that the services you avail for your car Hyundai Almera with plate number ITN2049 is done. Please come to our shop immediately.', 'failed', '2024-11-06 10:53:55', 'completed'),
(48, 167, '09564285745', 'Good Day Marie Bonite! We are glad to tell you that the services you avail for your car Chevrolet Sail with plate number NBM2450 is done. Please come to our shop immediately.', 'failed', '2024-11-06 10:54:18', 'completed'),
(49, 168, '09569675641', 'Good Day John Batum! We are glad to tell you that the services you avail for your car Ford Ecosport with plate number NGB2481 is done. Please come to our shop immediately.', 'failed', '2024-11-06 10:55:13', 'completed'),
(50, 144, '09564738275', 'Good Day angelo russel! We are glad to tell you that the services you avail for your car Toyota Innova with plate number SDA4028 is done. Please come to our shop immediately.', 'failed', '2024-11-06 11:02:10', 'completed'),
(51, 152, '09864562754', 'Good Day Dennis Rodman! We are glad to tell you that the services you avail for your car Toyota Vios with plate number KSA2498 is done. Please come to our shop immediately.', 'failed', '2024-11-06 11:05:03', 'completed'),
(52, 153, '09564728364', 'Good Day Steve Kerr! We are glad to tell you that the services you avail for your car Chevrolet Sail with plate number MBN0245 is done. Please come to our shop immediately.', 'failed', '2024-11-06 11:05:43', 'completed'),
(53, 146, '09465826580', 'Good Day justin montalban! We are glad to tell you that the services you avail for your car Ford Raptor with plate number BVN1248 is done. Please come to our shop immediately.', 'failed', '2024-11-06 12:08:51', 'completed');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`) VALUES
(1, 'admin', '$2y$10$Mj2n7Q7RErsFTpwZTb2MFeYs.0pZ/b/6hn/xbtCuVd9oshw0y4dCu', 'jigzesteban2003@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_appointments`
--
ALTER TABLE `admin_appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointment_id` (`appointment_id`);

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `appointment_progress_status`
--
ALTER TABLE `appointment_progress_status`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointment_id` (`appointment_id`);

--
-- Indexes for table `car_conditions`
--
ALTER TABLE `car_conditions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `checklists`
--
ALTER TABLE `checklists`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventory_deduction`
--
ALTER TABLE `inventory_deduction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `job_order_id` (`job_order_id`);

--
-- Indexes for table `inventory_stock_changes`
--
ALTER TABLE `inventory_stock_changes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_orders`
--
ALTER TABLE `job_orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_order_parts`
--
ALTER TABLE `job_order_parts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `job_order_id` (`job_order_id`);

--
-- Indexes for table `mechanics`
--
ALTER TABLE `mechanics`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mechanic_schedule`
--
ALTER TABLE `mechanic_schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mechanic_id` (`mechanic_id`);

--
-- Indexes for table `sms_logs`
--
ALTER TABLE `sms_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointment_id` (`appointment_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_appointments`
--
ALTER TABLE `admin_appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=137;

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=209;

--
-- AUTO_INCREMENT for table `appointment_progress_status`
--
ALTER TABLE `appointment_progress_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `car_conditions`
--
ALTER TABLE `car_conditions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `checklists`
--
ALTER TABLE `checklists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `inventory_deduction`
--
ALTER TABLE `inventory_deduction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `inventory_stock_changes`
--
ALTER TABLE `inventory_stock_changes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `job_orders`
--
ALTER TABLE `job_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=160;

--
-- AUTO_INCREMENT for table `job_order_parts`
--
ALTER TABLE `job_order_parts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=339;

--
-- AUTO_INCREMENT for table `mechanics`
--
ALTER TABLE `mechanics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `mechanic_schedule`
--
ALTER TABLE `mechanic_schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=302;

--
-- AUTO_INCREMENT for table `sms_logs`
--
ALTER TABLE `sms_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin_appointments`
--
ALTER TABLE `admin_appointments`
  ADD CONSTRAINT `admin_appointments_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `appointment_progress_status`
--
ALTER TABLE `appointment_progress_status`
  ADD CONSTRAINT `appointment_progress_status_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `inventory_deduction`
--
ALTER TABLE `inventory_deduction`
  ADD CONSTRAINT `inventory_deduction_ibfk_1` FOREIGN KEY (`job_order_id`) REFERENCES `job_orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `job_order_parts`
--
ALTER TABLE `job_order_parts`
  ADD CONSTRAINT `job_order_parts_ibfk_1` FOREIGN KEY (`job_order_id`) REFERENCES `job_orders` (`id`);

--
-- Constraints for table `mechanic_schedule`
--
ALTER TABLE `mechanic_schedule`
  ADD CONSTRAINT `mechanic_schedule_ibfk_1` FOREIGN KEY (`mechanic_id`) REFERENCES `mechanics` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `sms_logs`
--
ALTER TABLE `sms_logs`
  ADD CONSTRAINT `sms_logs_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
