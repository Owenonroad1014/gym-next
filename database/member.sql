-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2025-03-19 09:19:34
-- 伺服器版本： 8.0.40
-- PHP 版本： 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `gymboo_database`
--

-- --------------------------------------------------------

--
-- 資料表結構 `member`
--

CREATE TABLE `member` (
  `member_id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password_g` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `member`
--

INSERT INTO `member` (`member_id`, `email`, `password_hash`, `password_g`, `created_at`, `update_at`) VALUES
(1, 'owen@example.com', '$2b$10$Op2jWHwdvd8v.DPYXRov5O.nssk9zdwn61R6bre4vxgsv8Jc/5x.C', NULL, '2025-03-17 01:43:45', '2025-03-19 02:09:15'),
(2, 'jing@example.com', '$2b$10$Op2jWHwdvd8v.DPYXRov5O.nssk9zdwn61R6bre4vxgsv8Jc/5x.C', NULL, '2025-03-17 01:43:45', '2025-03-19 02:09:20'),
(3, 'hsin@example.com', '$2b$10$Op2jWHwdvd8v.DPYXRov5O.nssk9zdwn61R6bre4vxgsv8Jc/5x.C', NULL, '2025-03-17 01:43:45', '2025-03-19 02:09:25'),
(4, 'ching@example.com', '$2b$10$Op2jWHwdvd8v.DPYXRov5O.nssk9zdwn61R6bre4vxgsv8Jc/5x.C', NULL, '2025-03-17 01:43:45', '2025-03-19 02:09:32'),
(5, 'yang@example.com', '$2b$10$Op2jWHwdvd8v.DPYXRov5O.nssk9zdwn61R6bre4vxgsv8Jc/5x.C', NULL, '2025-03-17 01:43:45', '2025-03-19 02:09:38'),
(6, 'user6@example.com', 'fc4c0d35e3f7d6292f24a95f896f1eae2fdc46cf4a5a8246d4b79b0ee0a5b8c4', NULL, '2025-03-17 01:43:45', '2025-03-17 01:43:45'),
(7, 'user7@example.com', 'e99a18c428cb38d5f260853678922e03abd8d62b8e18f27f6fc2c17d14e6f0ef', NULL, '2025-03-17 01:43:45', '2025-03-17 01:43:45'),
(8, 'user8@example.com', '7a57a5a743894a0e72e525d9ff363b60f7285a6e78bd030ccd54816b7b7a1327', NULL, '2025-03-17 01:43:45', '2025-03-17 01:43:45'),
(9, 'user9@example.com', 'b89eaac7e61417341b710b727768294d0e6a277b3f3af21c5f6ac1c0f2f66c92', NULL, '2025-03-17 01:43:45', '2025-03-17 01:43:45'),
(10, 'user10@example.com', '0a7d2c61a8d0745126657a4b7c3d4f305ea3c7f19c3d3e9df99954ef797b6e02', NULL, '2025-03-17 01:43:45', '2025-03-17 01:43:45');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`member_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `member`
--
ALTER TABLE `member`
  MODIFY `member_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
