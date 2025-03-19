-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2025-03-19 09:20:20
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
  `member_id` int NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `avatar` varchar(500) DEFAULT 'default_avatar.png',
  `sex` enum('男性','女性') DEFAULT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `intro` varchar(300) DEFAULT '我熱愛各種運動健身項目，快來找我一起運動吧!',
  `item` varchar(10) DEFAULT NULL,
  `goal` set('增肌','減脂','提高耐力','增強體能','健康維持','提高核心能量') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `member_profile`
--

INSERT INTO `member_profile` (`profile_id`, `member_id`, `name`, `avatar`, `sex`, `mobile`, `intro`, `item`, `goal`, `created_at`, `update_at`) VALUES
(1, 1, '陳小明', 'default_avatar.png', '男性', '0912345678', '健身是我生活的一部分，無論是重訓還是慢跑，我都樂在其中，歡迎與我一起運動！', '跑步', '增肌,健康維持', '2025-03-17 01:43:45', '2025-03-17 01:43:45'),
(2, 2, '林小美', 'default_avatar.png', '女性', '0923456789', '瑜伽讓我保持平衡與放鬆，我熱愛挑戰高難度體式，期待與同好們一起交流心得！', '瑜伽', '減脂,健康維持', '2025-03-17 01:43:45', '2025-03-17 01:43:45'),
(3, 3, '王阿強', 'default_avatar.png', '男性', '0934567890', '身為鐵人三項愛好者，我喜歡游泳、騎車與長跑的組合，希望能與志同道合的夥伴一起訓練！', '游泳', '提高耐力,增強體能', '2025-03-17 01:43:45', '2025-03-17 01:43:45'),
(4, 4, '李小華', 'default_avatar.png', '男性', '0945678901', '健身房是我的第二個家，我每天都在挑戰更高的重量與更強的自己，歡迎一起鍛鍊！', '重訓', '增肌', '2025-03-17 01:43:45', '2025-03-17 01:43:45'),
(5, 5, '張小芳', 'default_avatar.png', '女性', '0956789012', '馬拉松是我的熱情，我熱愛長距離跑步，每次挑戰新紀錄都讓我充滿成就感！', '跑步', '提高耐力', '2025-03-17 01:43:45', '2025-03-17 01:43:45'),
(6, 6, '趙阿志', 'default_avatar.png', '男性', '0967890123', '舉重讓我變得更強壯，我專注於核心訓練與肌力發展，希望能與更多人交流經驗！', '舉重', '增肌,提高核心能量', '2025-03-17 01:43:45', '2025-03-17 01:43:45'),
(7, 7, '黃小婷', 'default_avatar.png', '女性', '0978901234', '舞蹈是我的熱愛，我透過舞蹈訓練柔軟度與耐力，希望找到志同道合的夥伴一起跳舞！', '舞蹈', '健康維持', '2025-03-17 01:43:45', '2025-03-17 01:43:45'),
(8, 8, '周阿宏', 'default_avatar.png', '男性', '0989012345', '登山讓我放鬆身心，挑戰不同高度的山峰是我的目標，希望能與夥伴們一起享受大自然！', '登山', '增強體能', '2025-03-17 01:43:45', '2025-03-17 01:43:45'),
(9, 9, '許小麗', 'default_avatar.png', '女性', '0990123456', '健美是一種生活態度，我嚴格控管飲食與訓練，努力雕塑完美體態，期待與你交流！', '健美', '增肌,健康維持', '2025-03-17 01:43:45', '2025-03-17 01:43:45'),
(10, 10, '劉阿杰', 'default_avatar.png', '男性', '0901234567', '我是健身新手，剛開始學習如何正確訓練，希望能找到夥伴一起成長進步！', '重訓', '增肌,減脂', '2025-03-17 01:43:45', '2025-03-17 01:43:45');

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
