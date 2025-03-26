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
  `location_id` int NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `coaches`
--

INSERT INTO `coaches` (`id`, `name`, `title`, `skill`, `email`, `phone`, `description`, `location_id`, `avatar`, `created_at`, `updated_at`) VALUES
(1, '張育瑄', '專業瑜珈教練', '瑜珈', 'yuhsuan.chang@email.com', '0912-345-678', '專業瑜珈教練，擁有10年教學經驗', 1, 'coach.jpg', '2025-03-20 07:53:57', '2025-03-20 07:54:22'),
(2, '林明宏', '重量訓練教練', '重訓', 'minghong.lin@email.com', '0923-456-789', '資深重訓教練，專注於肌力訓練', 2, 'coach.jpg', '2025-03-20 07:53:57', '2025-03-20 07:54:59'),
(3, '王雅婷', '有氧舞蹈教練', '舞蹈', 'yating.wang@email.com', '0934-567-890', '專業舞蹈老師，擅長帶動課堂氣氛', 3, 'coach.jpg', '2025-03-20 07:53:57', '2025-03-20 07:55:01'),
(4, '李志豪', '功能性訓練教練', '綜合訓練', 'zhihao.lee@email.com', '0945-678-901', '運動科學碩士，專注於姿勢矯正', 4, 'coach.jpg', '2025-03-20 07:53:57', '2025-03-20 07:55:03'),
(5, '陳思穎', '皮拉提斯教練', '皮拉提斯', 'siying.chen@email.com', '0956-789-012', '專精於核心訓練與體態調整', 1, 'coach.jpg', '2025-03-20 07:53:57', '2025-03-20 07:55:05');

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
(4, 3, '舞蹈教練證照', '2023-05-01');

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
(4, 3, 'instagram', 'https://instagram.com/coach3');

-- 資料表索引 `coaches`
--
ALTER TABLE `coaches`
  ADD PRIMARY KEY (`id`),
  ADD KEY `location_id` (`location_id`);

--
-- 資料表索引 `coach_certifications`
--
ALTER TABLE `coach_certifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `coach_id` (`coach_id`);

--
-- 資料表索引 `coach_social_media`
--
ALTER TABLE `coach_social_media`
  ADD PRIMARY KEY (`id`),
  ADD KEY `coach_id` (`coach_id`);


  -- 資料表的限制式 `coaches`
--
ALTER TABLE `coaches`
  ADD CONSTRAINT `coaches_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`);

--
-- 資料表的限制式 `coach_certifications`
--
ALTER TABLE `coach_certifications`
  ADD CONSTRAINT `coach_certifications_ibfk_1` FOREIGN KEY (`coach_id`) REFERENCES `coaches` (`id`);

--
-- 資料表的限制式 `coach_social_media`
--
ALTER TABLE `coach_social_media`
  ADD CONSTRAINT `coach_social_media_ibfk_1` FOREIGN KEY (`coach_id`) REFERENCES `coaches` (`id`);

