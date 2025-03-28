-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2025-03-28 01:52:07
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
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `google_uid` varchar(255) DEFAULT NULL,
  `password_hash` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `member`
--

INSERT INTO `member` (`member_id`, `name`, `email`, `google_uid`, `password_hash`, `created_at`, `update_at`) VALUES
(4, '王名強', 'ching@example.com', NULL, '$2b$10$Op2jWHwdvd8v.DPYXRov5O.nssk9zdwn61R6bre4vxgsv8Jc/5x.C', '2025-03-16 01:43:45', '2025-03-18 02:09:32'),
(3, '劉秀杰', 'hsin@example.com', NULL, '$2b$10$Op2jWHwdvd8v.DPYXRov5O.nssk9zdwn61R6bre4vxgsv8Jc/5x.C', '2025-03-16 01:43:45', '2025-03-18 02:09:25'),
(2, '林一美', 'jing@example.com', NULL, '$2b$10$Op2jWHwdvd8v.DPYXRov5O.nssk9zdwn61R6bre4vxgsv8Jc/5x.C', '2025-03-16 01:43:45', '2025-03-18 02:09:20'),
(1, '陳小明', 'owen@example.com', NULL, '$2b$10$Op2jWHwdvd8v.DPYXRov5O.nssk9zdwn61R6bre4vxgsv8Jc/5x.C', '2025-03-16 01:43:45', '2025-03-18 02:09:15'),
(10, '周成宏', 'user10@example.com', NULL, '0a7d2c61a8d0745126657a4b7c3d4f305ea3c7f19c3d3e9df99954ef797b6e02', '2025-03-16 01:43:45', '2025-03-16 01:43:45'),
(6, '張營芳', 'user6@example.com', NULL, 'fc4c0d35e3f7d6292f24a95f896f1eae2fdc46cf4a5a8246d4b79b0ee0a5b8c4', '2025-03-16 01:43:45', '2025-03-16 01:43:45'),
(7, '黃嚴婷', 'user7@example.com', NULL, 'e99a18c428cb38d5f260853678922e03abd8d62b8e18f27f6fc2c17d14e6f0ef', '2025-03-16 01:43:45', '2025-03-16 01:43:45'),
(8, '趙禮志', 'user8@example.com', NULL, '7a57a5a743894a0e72e525d9ff363b60f7285a6e78bd030ccd54816b7b7a1327', '2025-03-16 01:43:45', '2025-03-16 01:43:45'),
(9, '許新麗', 'user9@example.com', NULL, 'b89eaac7e61417341b710b727768294d0e6a277b3f3af21c5f6ac1c0f2f66c92', '2025-03-16 01:43:45', '2025-03-16 01:43:45'),
(5, '李小華', 'yang@example.com', NULL, '$2b$10$Op2jWHwdvd8v.DPYXRov5O.nssk9zdwn61R6bre4vxgsv8Jc/5x.C', '2025-03-16 01:43:45', '2025-03-18 02:09:38');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `member`
--
ALTER TABLE `member`
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `google_uid` (`google_uid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
