-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2025-03-31 04:57:32
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
-- 資料表結構 `video_favorites`
--

CREATE TABLE `video_favorites` (
  `like_id` int NOT NULL,
  `member_id` int NOT NULL,
  `video_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `video_favorites`
--

INSERT INTO `video_favorites` (`like_id`, `member_id`, `video_id`, `created_at`) VALUES
(15, 4, 3, '2025-03-24 13:56:06'),
(16, 4, 2, '2025-03-24 15:00:16');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `video_favorites`
--
ALTER TABLE `video_favorites`
  ADD PRIMARY KEY (`like_id`),
  ADD UNIQUE KEY `unique_favorite` (`member_id`,`video_id`),
  ADD KEY `video_id` (`video_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `video_favorites`
--
ALTER TABLE `video_favorites`
  MODIFY `like_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `video_favorites`
--
ALTER TABLE `video_favorites`
  ADD CONSTRAINT `video_favorites_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `video_favorites_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
