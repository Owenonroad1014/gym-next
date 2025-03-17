-- 資料表結構 `coaches`
--

CREATE TABLE `coaches` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `skill` varchar(50) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `description` text,
  `location` varchar(50) DEFAULT NULL,
  `branch` varchar(50) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `coaches`
--

INSERT INTO `coaches` (`id`, `name`, `title`, `skill`, `email`, `phone`, `description`, `location`, `branch`, `avatar`, `created_at`, `updated_at`) VALUES
(1, '張育瑄', '專業瑜珈教練', '瑜珈', 'yuhsuan.chang@email.com', '0912-345-678', '專業瑜珈教練，擁有10年教學經驗，專精於初學者指導與體態調整。', '台北市', '中山店', 'coach1.jpg', '2025-03-13 15:08:02', '2025-03-13 15:08:02'),
(2, '林明宏', '重量訓練教練', '重訓', 'minghong.lin@email.com', '0923-456-789', '資深重訓教練，專注於肌力訓練與體態雕塑。', '台北市', '中華店', 'coach2.jpg', '2025-03-13 15:08:02', '2025-03-13 15:08:02'),
(3, '王雅婷', '有氧舞蹈教練', '舞蹈', 'yating.wang@email.com', '0934-567-890', '專業舞蹈老師，擅長帶動課堂氣氛。', '新北市', '中山店', 'coach3.jpg', '2025-03-13 15:08:02', '2025-03-13 15:08:02'),
(4, '李志豪', '功能性訓練教練', '綜合訓練', 'zhihao.lee@email.com', '0945-678-901', '運動科學碩士，專注於姿勢矯正。', '新北市', '中華店', 'coach4.jpg', '2025-03-13 15:08:02', '2025-03-13 15:08:02'),
(5, '陳思穎', '皮拉提斯教練', '皮拉提斯', 'siying.chen@email.com', '0956-789-012', '專精於核心訓練與體態調整。', '台北市', '中山店', 'coach5.jpg', '2025-03-13 15:08:02', '2025-03-13 15:08:02'),
(6, '吳建志', '重量訓練教練', '重訓', 'jianzhi.wu@email.com', '0967-890-123', '擅長制定個人化訓練計畫。', '台北市', '中華店', 'coach6.jpg', '2025-03-13 15:08:02', '2025-03-13 15:08:02'),
(7, '許雅琪', '瑜珈教練', '瑜珈', 'yaqi.xu@email.com', '0978-901-234', '專注於心靈療癒與壓力舒緩。', '新北市', '中山店', 'coach7.jpg', '2025-03-13 15:08:02', '2025-03-13 15:08:02'),
(8, '黃志偉', '綜合格鬥教練', '格鬥', 'zhiwei.huang@email.com', '0989-012-345', '擁有豐富的競技經驗。', '新北市', '中華店', 'coach8.jpg', '2025-03-13 15:08:02', '2025-03-13 15:08:02'),
(9, '楊曉君', '有氧教練', '有氧', 'xiaojun.yang@email.com', '0990-123-456', '善於帶領團體課程。', '台北市', '中山店', 'coach9.jpg', '2025-03-13 15:08:02', '2025-03-13 15:08:02'),
(10, '蔡明達', '體適能教練', '體適能', 'mingda.tsai@email.com', '0901-234-567', '注重全方位的體能訓練。', '台北市', '中華店', 'coach10.jpg', '2025-03-13 15:08:02', '2025-03-13 15:08:02');

-- --------------------------------------------------------

--
-- 資料表結構 `coach_certifications`
--

CREATE TABLE `coach_certifications` (
  `id` int NOT NULL,
  `coach_id` int NOT NULL,
  `certification` varchar(255) NOT NULL,
  `issue_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `coach_certifications`
--

INSERT INTO `coach_certifications` (`id`, `coach_id`, `certification`, `issue_date`) VALUES
(1, 1, '國際瑜珈教練證照', '2023-01-15'),
(2, 1, '皮拉提斯指導員證照', '2022-06-20'),
(3, 2, '健身教練證照', '2023-03-10'),
(4, 3, '舞蹈教練證照', '2023-05-01'),
(5, 4, '功能性訓練證照', '2023-02-15'),
(6, 5, '皮拉提斯教練證照', '2023-04-20');

-- --------------------------------------------------------

--
-- 資料表結構 `coach_social_media`
--

CREATE TABLE `coach_social_media` (
  `id` int NOT NULL,
  `coach_id` int NOT NULL,
  `platform` varchar(50) NOT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `coach_social_media`
--

INSERT INTO `coach_social_media` (`id`, `coach_id`, `platform`, `url`) VALUES
(1, 1, 'facebook', 'https://facebook.com/coach1'),
(2, 1, 'instagram', 'https://instagram.com/coach1'),
(3, 2, 'facebook', 'https://facebook.com/coach2'),
(4, 3, 'instagram', 'https://instagram.com/coach3'),
(5, 4, 'facebook', 'https://facebook.com/coach4'),
(6, 5, 'instagram', 'https://instagram.com/coach5');


