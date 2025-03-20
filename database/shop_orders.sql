
CREATE TABLE shop_orders (
  id INT NOT NULL AUTO_INCREMENT,  -- 訂單唯一識別碼
  user_id INT NOT NULL,  -- 參考使用者的 ID
  product_id INT NOT NULL,  -- 參考 products 表的商品ID
  product_variant_id INT DEFAULT NULL,  -- 參考 productvariants 表的商品變體 ID (重量)
  rental_start_date DATE NOT NULL,  -- 租賃開始日期
  rental_end_date DATE NOT NULL,  -- 租賃結束日期
  rental_days INT GENERATED ALWAYS AS (DATEDIFF(rental_end_date, rental_start_date)) STORED,  -- 自動計算租賃天數
  quantity INT NOT NULL,  -- 購買數量
  price DECIMAL(10, 0) NOT NULL,  -- 單品租借價格
  total_price DECIMAL(10, 0) GENERATED ALWAYS AS (rental_days * price) STORED,  -- 自動計算租金
  status ENUM('已下單', '租賃中', '已歸還') NOT NULL DEFAULT '已下單',  -- 訂單狀態
  payment_status ENUM('未付款', '已付款', '退款中', '已退款') NOT NULL DEFAULT '未付款',  -- 付款狀態
  pickup_method ENUM('台南中西店', '台南中華店', '台南永康店') NOT NULL DEFAULT '台南中西店',
  payment_method ENUM('現金', '信用卡') NOT NULL DEFAULT '信用卡',
  added_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,  -- 訂單建立時間
  PRIMARY KEY (id)
);

  #drop table shop_orders;
  #FOREIGN KEY (user_id) REFERENCES users(id),  -- 參考 users 表的 ID
  #FOREIGN KEY (product_id) REFERENCES products(id),  -- 參考 products 表的商品 ID
  #FOREIGN KEY (product_variant_id) REFERENCES productvariants(id)  -- 參考 productvariants 表的商品變體 ID
  
  INSERT INTO shop_orders (user_id, product_id, product_variant_id, rental_start_date, rental_end_date, quantity, price, status, payment_status, pickup_method, payment_method)
VALUES
(1, 101, 201, '2025-03-01', '2025-03-05', 2, 500, '已下單', '未付款', '台南中西店', '信用卡'),
(2, 102, 202, '2025-03-10', '2025-03-15', 1, 800, '租賃中', '已付款', '台南中華店', '現金'),
(3, 103, 203, '2025-03-05', '2025-03-07', 3, 600, '已下單', '未付款', '台南永康店', '信用卡'),
(4, 104, NULL, '2025-03-12', '2025-03-18', 1, 1200, '租賃中', '已付款', '台南中西店', '現金'),
(5, 105, 205, '2025-03-02', '2025-03-04', 2, 550, '已歸還', '已付款', '台南中華店', '信用卡'),
(6, 106, NULL, '2025-03-20', '2025-03-22', 1, 750, '已下單', '未付款', '台南永康店', '現金'),
(7, 107, 207, '2025-03-25', '2025-03-30', 2, 900, '租賃中', '已付款', '台南中西店', '信用卡'),
(8, 108, NULL, '2025-03-15', '2025-03-20', 1, 650, '已歸還', '已退款', '台南中華店', '現金'),
(9, 109, 209, '2025-03-08', '2025-03-12', 3, 500, '已下單', '未付款', '台南永康店', '信用卡'),
(10, 110, NULL, '2025-03-22', '2025-03-28', 1, 1000, '租賃中', '已付款', '台南中西店', '現金');





