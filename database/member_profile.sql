-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2025-03-17 02:44:54
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
-- 資料表結構 `member_profile`
--

CREATE TABLE `member_profile` (
  `profile_id` int NOT NULL,
  `member_id` int DEFAULT NULL,
  `realname` varchar(50) NOT NULL,
  `nickname` varchar(50) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT 'default_avatar.png',
  `sex` enum('男性','女性') NOT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `intro` varchar(300) DEFAULT '我熱愛各種運動健身項目，快來找我一起運動吧!',
  `item` varchar(10) NOT NULL,
  `goal` set('增肌','減脂','提高耐力','增強體能','健康維持','提高核心能量') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `member_profile`
--

INSERT INTO `member_profile` (`profile_id`, `member_id`, `realname`, `nickname`, `avatar`, `sex`, `mobile`, `birthday`, `intro`, `item`, `goal`, `created_at`, `update_at`) VALUES
(1, 1, '陳小明', '明哥', 'avatar1.png', '男性', '0912345678', '1995-03-21', '熱愛健身的上班族', '跑步', '增肌,健康維持', '2025-03-17 01:43:45', '2025-03-17 01:43:45'),
(2, 2, '林小美', '美美', 'avatar2.png', '女性', '0923456789', '1998-07-15', '瑜伽愛好者', '瑜伽', '減脂,健康維持', '2025-03-17 01:43:45', '2025-03-17 01:43:45'),
(3, 3, '王阿強', '強哥', 'avatar3.png', '男性', '0934567890', '1992-05-10', '鐵人三項愛好者', '游泳', '提高耐力,增強體能', '2025-03-17 01:43:45', '2025-03-17 01:43:45'),
(4, 4, '李小華', '華仔', 'avatar4.png', '男性', '0945678901', '1990-11-25', '健身房常客', '重訓', '增肌', '2025-03-17 01:43:45', '2025-03-17 01:43:45'),
(5, 5, '張小芳', '芳芳', 'avatar5.png', '女性', '0956789012', '2000-04-05', '愛跑馬拉松', '跑步', '提高耐力', '2025-03-17 01:43:45', '2025-03-17 01:43:45'),
(6, 6, '趙阿志', '志哥', 'default_avatar.png', '男性', '0967890123', '1997-08-12', NULL, '舉重', '增肌,提高核心能量', '2025-03-17 01:43:45', '2025-03-17 01:43:45'),
(7, 7, '黃小婷', '婷姐', 'avatar7.png', '女性', '0978901234', '1993-09-30', '舞蹈愛好者', '舞蹈', '健康維持', '2025-03-17 01:43:45', '2025-03-17 01:43:45'),
(8, 8, '周阿宏', '宏哥', 'avatar8.png', '男性', '0989012345', '1988-12-17', '熱愛登山', '登山', '增強體能', '2025-03-17 01:43:45', '2025-03-17 01:43:45'),
(9, 9, '許小麗', '麗麗', 'avatar9.png', '女性', '0990123456', '1995-06-23', '健美選手', '健美', '增肌,健康維持', '2025-03-17 01:43:45', '2025-03-17 01:43:45'),
(10, 10, '劉阿杰', '杰仔', 'avatar10.png', '男性', '0901234567', '2001-01-01', '剛入健身房的新手', '重訓', '增肌,減脂', '2025-03-17 01:43:45', '2025-03-17 01:43:45');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `member_profile`
--
ALTER TABLE `member_profile`
  ADD PRIMARY KEY (`profile_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `member_profile`
--
ALTER TABLE `member_profile`
  MODIFY `profile_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
