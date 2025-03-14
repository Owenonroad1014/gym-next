資料表結構 `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `category_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `categories`
--

INSERT INTO `categories` (`id`, `category_name`) VALUES
(1, '健身器材'),
(3, '拳擊用品'),
(2, '瑜珈輔具');

-- --------------------------------------------------------

--
-- 資料表結構 `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `product_code` varchar(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `category_id` int NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `average_rating` decimal(3,2) DEFAULT '0.00',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `products`
--

INSERT INTO `products` (`id`, `product_code`, `name`, `description`, `category_id`, `price`, `image_url`, `average_rating`, `created_at`) VALUES
(1, 'P001', '啞鈴', '人體工學設計，防滑握把，穩定訓練手感。', 1, 50, 'products.jpg', 0.00, '2025-03-13 07:37:00'),
(2, 'P002', '槓鈴', '高強度鋼材，適合深蹲、硬舉等訓練。', 1, 50, 'products.jpg', 0.00, '2025-03-13 07:37:00'),
(3, 'P003', '壺鈴', '防滑設計，人體工學握把，穩定好操作。', 1, 80, 'products.jpg', 0.00, '2025-03-13 07:37:00'),
(4, 'P004', '訓練繩', '耐用材質，提升肌耐力與心肺功能。', 1, 50, 'products.jpg', 0.00, '2025-03-13 07:37:00'),
(5, 'P005', '跳繩', '專業訓練跳繩，輕巧耐用，適合燃脂。', 1, 90, 'products.jpg', 0.00, '2025-03-13 07:37:00'),
(6, 'P006', '握力器', '增強手部力量，適合恢復與日常訓練。', 1, 80, 'products.jpg', 0.00, '2025-03-13 07:37:00'),
(7, 'P007', '可調式健身椅', '多角度調整，適合不同訓練需求。', 1, 100, 'products.jpg', 0.00, '2025-03-13 07:37:00'),
(8, 'P008', '平板健身椅', '高密度泡棉支撐，提供舒適與穩定性。', 1, 150, 'products.jpg', 0.00, '2025-03-13 07:37:00'),
(9, 'P009', '槓片', '橡膠包覆材質，減少地板損傷與噪音。', 1, 50, 'products.jpg', 0.00, '2025-03-13 07:37:00'),
(10, 'P010', '健腹輪', '強化核心肌群，增強腹部與背部力量。', 1, 30, 'products.jpg', 0.00, '2025-03-13 07:37:00'),
(11, 'P031', '瑜珈墊', '防滑吸汗，適合初學者與進階訓練者。', 2, 20, 'products.jpg', 0.00, '2025-03-13 07:37:00'),
(12, 'P032', '瑜珈磚', '輕巧耐用，幫助伸展與平衡訓練。', 2, 20, 'products.jpg', 0.00, '2025-03-13 07:37:00'),
(13, 'P033', '瑜珈輪', '適合背部伸展，提升柔軟度與平衡感。', 2, 50, 'products.jpg', 0.00, '2025-03-13 07:37:00'),
(14, 'P034', '瑜珈繩', '加強肌肉柔軟度，適合深層伸展訓練。', 2, 50, 'products.jpg', 0.00, '2025-03-13 07:37:00'),
(15, 'P035', '瑜珈球', '提升核心穩定性，適合平衡與核心訓練。', 2, 50, 'products.jpg', 0.00, '2025-03-13 07:37:00'),
(16, 'P051', '拳擊手套', '減少衝擊，保護手部關節，適合長時間訓練。', 3, 80, 'products.jpg', 0.00, '2025-03-13 07:37:00'),
(17, 'P052', '拳擊頭盔', '加強頭部保護，降低擊打衝擊力。', 3, 100, 'products.jpg', 0.00, '2025-03-13 07:37:00'),
(18, 'P053', '護齒', '符合人體工學設計，減少運動損傷。', 3, 50, 'products.jpg', 0.00, '2025-03-13 07:37:00'),
(19, 'P054', '手綁帶', '提供手腕支撐，吸汗透氣，提升保護力。', 3, 30, 'products.jpg', 0.00, '2025-03-13 07:37:00'),
(20, 'P055', '沙袋', '高強度懸掛設計，耐打耐用。', 3, 80, 'products.jpg', 0.00, '2025-03-13 07:37:00');

-- --------------------------------------------------------

--
-- 資料表結構 `productvariants`
--

CREATE TABLE `productvariants` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `weight` decimal(5,0) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `productvariants`
--

INSERT INTO `productvariants` (`id`, `product_id`, `weight`, `image_url`, `created_at`) VALUES
(1, 1, 2, 'products.jpg', '2025-03-13 07:37:05'),
(2, 1, 5, 'products.jpg', '2025-03-13 07:37:05'),
(3, 1, 10, 'products.jpg', '2025-03-13 07:37:05'),
(4, 2, 10, 'products.jpg', '2025-03-13 07:37:05'),
(5, 2, 15, 'products.jpg', '2025-03-13 07:37:05'),
(6, 2, 20, 'products.jpg', '2025-03-13 07:37:05'),
(7, 3, 4, 'products.jpg', '2025-03-13 07:37:05'),
(8, 3, 8, 'products.jpg', '2025-03-13 07:37:05'),
(9, 3, 12, 'products.jpg', '2025-03-13 07:37:05'),
(10, 9, 5, 'products.jpg', '2025-03-13 07:37:05'),
(11, 9, 10, 'products.jpg', '2025-03-13 07:37:05'),
(12, 15, 1, 'products.jpg', '2025-03-13 07:37:05'),
(13, 15, 2, 'products.jpg', '2025-03-13 07:37:05'),
(14, 16, 8, 'products.jpg', '2025-03-13 07:37:05'),
(15, 16, 10, 'products.jpg', '2025-03-13 07:37:05'),
(16, 20, 20, 'products.jpg', '2025-03-13 07:37:05'),
(17, 20, 30, 'products.jpg', '2025-03-13 07:37:05');
