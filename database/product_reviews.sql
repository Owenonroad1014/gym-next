CREATE TABLE `product_reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `member_id` int NOT NULL,
  `product_id` int NOT NULL,
  `rating` int DEFAULT NULL,
  `review_text` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `order_item_id` int DEFAULT NULL,

  -- 主鍵
  PRIMARY KEY (`id`),

  -- 索引
  KEY `member_id` (`member_id`),
  KEY `product_id` (`product_id`),

  -- 外鍵
  CONSTRAINT `product_reviews_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `product_reviews_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
);


INSERT INTO `product_reviews` (`member_id`, `product_id`, `rating`, `review_text`, `created_at`, `order_item_id`) VALUES
( 4, 1, 3, '啞鈴實用方便，重量選擇多樣。租金合理，取還過程順暢，非常適合居家訓練。', '2025-03-25 07:46:22', 1),
( 4, 9, 4, '器材很乾淨也很新，之後有需要會再來這邊做租借~~', '2025-03-25 13:43:07', 5),
( 4, 7, 5, '重訓設備穩固好用，適合日常訓練，租期彈性很加分。', '2025-03-25 14:14:25', 4),
( 4, 15, 4, '價格合理，設備維護良好，是居家健身的不二選擇！', '2025-03-25 14:59:10', 6),
( 4, 13, 3, '普普通通', '2025-03-25 15:26:21', 7),
( 1, 1, 4, '商品很棒棒，愛了~~~~~~', '2025-03-26 03:35:40', NULL),
( 7, 1, 3, '難用死，狗才跟你們借', '2025-03-27 01:24:14', NULL),
( 4, 18, 4, '租借流程簡單。整體體驗非常滿意，會再次選擇這家公司。', '2025-03-28 06:52:29', 10),
( 4, 14, 5, '這款瑜珈繩質感優越，彈性適中，手感舒適，大大提升了我的瑜珈體驗。租借流程非常便利，送達迅速，包裝完好無損。使用一個月後，繩子依然保持良好狀態，沒有鬆弛或磨損跡象。租金合理，比購買新品經濟實惠，非常適合我這種偶爾練習的愛好者。客服回應迅速，歸還過程也相當簡便。強烈推薦給想嘗試瑜珈輔具但不想一次投入太多的朋友們。', '2025-03-31 07:59:36', 13),
( 4, 11, 1, '', '2025-04-07 03:41:09', 12);