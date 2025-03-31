-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2025-03-31 09:42:10
-- 伺服器版本： 8.0.41
-- PHP 版本： 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `gym_database`
--

-- --------------------------------------------------------

--
-- 資料表結構 `favorites`
--

CREATE TABLE `favorites` (
  `like_id` int NOT NULL,
  `member_id` int NOT NULL,
  `product_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `favorites`
--

INSERT INTO `favorites` (`like_id`, `member_id`, `product_id`, `created_at`) VALUES
(37, 4, 10, '2025-03-22 11:48:51'),
(120, 1, 1, '2025-03-28 02:59:45');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`like_id`),
  ADD UNIQUE KEY `unique_favorite` (`member_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `favorites`
--
ALTER TABLE `favorites`
  MODIFY `like_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=139;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
