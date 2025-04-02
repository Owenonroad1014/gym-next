-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2025-04-02 03:19:16
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
-- 資料表結構 `product_reviews`
--

CREATE TABLE `product_reviews` (
  `id` int NOT NULL,
  `member_id` int NOT NULL,
  `product_id` int NOT NULL,
  `rating` int DEFAULT NULL,
  `review_text` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `order_item_id` int DEFAULT NULL
) ;

--
-- 傾印資料表的資料 `product_reviews`
--

INSERT INTO `product_reviews` (`id`, `member_id`, `product_id`, `rating`, `review_text`, `created_at`, `order_item_id`) VALUES
(1, 4, 1, 4, '棒棒噠', '2025-03-25 07:46:22', NULL),
(3, 4, 9, 3, '123456', '2025-03-25 13:43:07', 5),
(5, 4, 7, 4, '1234567894', '2025-03-25 14:14:25', 4),
(7, 4, 15, 2, '123456', '2025-03-25 14:59:10', 6),
(8, 4, 13, 3, '123456', '2025-03-25 15:26:21', 7),
(9, 1, 1, 4, '商品很棒棒，愛了~~~~~~', '2025-03-26 03:35:40', NULL),
(10, 7, 1, 3, '難用死，狗才跟你們借', '2025-03-27 01:24:14', NULL),
(11, 4, 18, 3, '123456', '2025-03-28 06:52:29', 10),
(12, 4, 14, 5, '13516548', '2025-03-31 07:59:36', 13),
(13, 4, 14, 4, '111111111111111111111111111111', '2025-03-31 12:09:07', 11);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_id` (`member_id`),
  ADD KEY `product_id` (`product_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `product_reviews`
--
ALTER TABLE `product_reviews`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD CONSTRAINT `product_reviews_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  ADD CONSTRAINT `product_reviews_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
