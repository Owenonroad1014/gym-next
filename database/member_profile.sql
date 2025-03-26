-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2025-03-24 06:08:01
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
  `avatar` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `sex` enum('male','female') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `intro` varchar(300) DEFAULT '我熱愛各種運動健身項目，快來找我一起運動吧!',
  `item` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `goal` set('增肌','減脂','提高耐力','增強體能','健康維持','提高核心能量') DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `add_status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `member_profile`
--

INSERT INTO `member_profile` (`profile_id`, `member_id`, `avatar`, `sex`, `mobile`, `intro`, `item`, `goal`, `status`, `add_status`, `created_at`, `update_at`) VALUES
(1, 1, 'avatar.jpg', 'male', '0912345678', '健身是我生活的一部分，無論是重訓還是慢跑，我都樂在其中，歡迎與我一起運動！', '跑步', '增肌,健康維持', 1, 1, '2025-03-16 09:43:45', '2025-03-18 22:28:26'),
(2, 2, 'avatar.jpg', 'female', '0923456789', '瑜伽讓我保持平衡與放鬆，我熱愛挑戰高難度體式，期待與同好們一起交流心得！', '瑜伽', '減脂,健康維持', 1, 1, '2025-03-16 09:43:45', '2025-03-18 22:28:33'),
(3, 3, 'avatar.jpg', 'male', '0934567890', '身為鐵人三項愛好者，我喜歡游泳、騎車與長跑的組合，希望能與志同道合的夥伴一起訓練！', '游泳', '提高耐力,增強體能', 1, 1, '2025-03-16 09:43:45', '2025-03-18 22:28:38'),
(4, 4, 'avatar.jpg', 'male', '0945678901', '健身房是我的第二個家，我每天都在挑戰更高的重量與更強的自己，歡迎一起鍛鍊！', '重訓', '增肌', 1, 1, '2025-03-16 09:43:45', '2025-03-18 22:28:44'),
(5, 5, 'avatar.jpg', 'female', '0956789012', '馬拉松是我的熱情，我熱愛長距離跑步，每次挑戰新紀錄都讓我充滿成就感！', '跑步', '提高耐力', 1, 1, '2025-03-16 09:43:45', '2025-03-18 22:28:50'),
(6, 6, 'avatar.jpg', 'male', '0967890123', '舉重讓我變得更強壯，我專注於核心訓練與肌力發展，希望能與更多人交流經驗！', '舉重', '增肌,提高核心能量', 1, 1, '2025-03-16 09:43:45', '2025-03-18 22:28:57'),
(7, 7, 'avatar.jpg', 'female', '0978901234', '舞蹈是我的熱愛，我透過舞蹈訓練柔軟度與耐力，希望找到志同道合的夥伴一起跳舞！', '舞蹈', '健康維持', 1, 1, '2025-03-16 09:43:45', '2025-03-18 22:29:02'),
(8, 8, 'avatar.jpg', 'male', '0989012345', '登山讓我放鬆身心，挑戰不同高度的山峰是我的目標，希望能與夥伴們一起享受大自然！', '登山', '增強體能', 1, 1, '2025-03-16 09:43:45', '2025-03-19 09:02:40'),
(9, 9, 'avatar.jpg', 'female', '0990123456', '健美是一種生活態度，我嚴格控管飲食與訓練，努力雕塑完美體態，期待與你交流！', '健美', '增肌,健康維持', 1, 1, '2025-03-16 09:43:45', '2025-03-18 22:29:13'),
(10, 10, 'avatar.jpg', 'male', '0901234567', '我是健身新手，剛開始學習如何正確訓練，希望能找到夥伴一起成長進步！', '重訓', '增肌,減脂', 1, 1, '2025-03-16 09:43:45', '2025-03-18 22:29:18'),
(11, 11, '/imgs/avatar/default-avatar.png', 'female', '0912345678', '我熱愛各種運動健身項目，快來找我一起運動吧!', NULL, NULL, 0, 0, '2025-03-24 03:19:30', '2025-03-24 03:19:44'),
(12, 12, '[object Object]', 'male', '0912345678', '狀態為公開時，自我簡介需為必填，且至少需要30個字元狀態為公開時，自我簡介需為必填，且至少需要30個字元狀態為公開時，自我簡介需為必填，且至少需要30個字元狀態為公開時，自我簡介需為必填，且至少需要30個字元', NULL, NULL, 1, 0, '2025-03-24 03:21:09', '2025-03-24 03:33:56');

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
  MODIFY `profile_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
