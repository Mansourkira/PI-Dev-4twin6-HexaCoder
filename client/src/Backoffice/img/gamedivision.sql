-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 26, 2021 at 09:10 PM
-- Server version: 8.0.21
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gamedivision`
--

-- --------------------------------------------------------

--
-- Table structure for table `favourites`
--

DROP TABLE IF EXISTS `favourites`;
CREATE TABLE IF NOT EXISTS `favourites` (
  `user_id` int NOT NULL,
  `Product_id` int NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
CREATE TABLE IF NOT EXISTS `games` (
  `Game_id` int NOT NULL AUTO_INCREMENT,
  `Game_name` varchar(255) NOT NULL,
  `Game_cover` varchar(255) NOT NULL,
  `Description` text NOT NULL,
  PRIMARY KEY (`Game_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
CREATE TABLE IF NOT EXISTS `news` (
  `News_id` int NOT NULL AUTO_INCREMENT,
  `News_title` varchar(255) NOT NULL,
  `News_description` text NOT NULL,
  `News_img` varchar(255) NOT NULL,
  `News_type` varchar(255) NOT NULL,
  PRIMARY KEY (`News_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) NOT NULL,
  `Team_id` int NOT NULL,
  `price` double NOT NULL,
  `Category` varchar(255) NOT NULL,
  `Quantity` int NOT NULL,
  `Description` text NOT NULL,
  `img` blob NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reclamations`
--

DROP TABLE IF EXISTS `reclamations`;
CREATE TABLE IF NOT EXISTS `reclamations` (
  `User_id` varchar(50) NOT NULL,
  `Subject` text NOT NULL,
  `Reclamation_id` int NOT NULL AUTO_INCREMENT,
  `Reclamation_context` text NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`Reclamation_id`),
  KEY `User_id` (`User_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
CREATE TABLE IF NOT EXISTS `teams` (
  `team_id` int NOT NULL AUTO_INCREMENT,
  `team_name` varchar(255) NOT NULL,
  `team_logo` varchar(255) NOT NULL,
  `Team_Website` varchar(255) NOT NULL,
  `user1_id` int NOT NULL,
  `user2_id` int NOT NULL,
  `user3_id` int NOT NULL,
  `user4_id` int NOT NULL,
  `user5_id` int NOT NULL,
  PRIMARY KEY (`team_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `team_intr`
--

DROP TABLE IF EXISTS `team_intr`;
CREATE TABLE IF NOT EXISTS `team_intr` (
  `team_id` int NOT NULL DEFAULT '0',
  `team_name` varchar(255) NOT NULL,
  `team_logo` varchar(255) NOT NULL,
  `Team_Website` varchar(255) NOT NULL,
  `member1_id` int NOT NULL,
  `member2_id` int NOT NULL,
  `member3_id` int NOT NULL,
  `member4_id` int NOT NULL,
  `member5_id` int NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tournaments`
--

DROP TABLE IF EXISTS `tournaments`;
CREATE TABLE IF NOT EXISTS `tournaments` (
  `Tr_id` int NOT NULL AUTO_INCREMENT,
  `tr_cover` varchar(255) NOT NULL,
  `Game_id` int NOT NULL,
  `team_id` int NOT NULL,
  PRIMARY KEY (`Tr_id`),
  KEY `Game_id` (`Game_id`),
  KEY `Team_id` (`team_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tournaments_intr`
--

DROP TABLE IF EXISTS `tournaments_intr`;
CREATE TABLE IF NOT EXISTS `tournaments_intr` (
  `Tr_id` int NOT NULL,
  `tr_cover` varchar(255) NOT NULL,
  `tr_link` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `User_id` int NOT NULL AUTO_INCREMENT,
  `User_name` varchar(30) NOT NULL,
  `User_lastname` varchar(30) NOT NULL,
  `User_Email` varchar(50) NOT NULL,
  `User_phone` bigint NOT NULL,
  `User_password` varchar(30) NOT NULL,
  `User_photo` varchar(100) NOT NULL,
  `User_gender` varchar(6) NOT NULL,
  PRIMARY KEY (`User_id`),
  UNIQUE KEY `User_Email` (`User_Email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
