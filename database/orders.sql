

CREATE TABLE orders (
  order_id INT AUTO_INCREMENT PRIMARY KEY, 
  member_id INT NOT NULL,  -- 參考會員 ID
  customer_name VARCHAR(100) NOT NULL, -- 訂購人姓名
  customer_phone VARCHAR(20) NOT NULL, -- 訂購人電話
  customer_email VARCHAR(100) NOT NULL, -- 訂購人 Email
  status ENUM('已下單', '租賃中', '已歸還') NOT NULL DEFAULT '已下單',  -- 訂單狀態
  payment_status ENUM('未付款', '已付款', '退款中', '已退款') NOT NULL DEFAULT '未付款',  -- 付款狀態
  pickup_method ENUM('台南中西店', '台南中華店', '台南永康店') NOT NULL DEFAULT '台南中西店',
  payment_method ENUM('現金', '信用卡') NOT NULL DEFAULT '信用卡',
  added_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP -- 訂單建立時間  
  #FOREIGN KEY (member_id) REFERENCES member(member_id) ON DELETE CASCADE
);


INSERT INTO orders (
  member_id, customer_name, customer_phone, customer_email, status, payment_status, pickup_method, payment_method
) VALUES
(1, '張三', '0912345678', 'zhangsan@example.com', '已下單', '未付款', '台南中西店', '信用卡'),
(2, '李四', '0922333444', 'lisi@example.com', '租賃中', '已付款', '台南中華店', '現金'),
(3, '王五', '0933111222', 'wangwu@example.com', '已下單', '未付款', '台南永康店', '信用卡'),
(4, '陳六', '0988777666', 'chenliu@example.com', '租賃中', '已付款', '台南中西店', '信用卡'),
(4, '陳六', '0988777666', 'chenliu@example.com', '已歸還', '已付款', '台南中華店', '現金'),
(4, '陳六', '0988777666', 'chenliu@example.com', '已歸還', '未付款', '台南永康店', '信用卡'),
(4, '陳六', '0988777666', 'chenliu@example.com', '已歸還', '已付款', '台南中西店', '現金'),
(5, '周八', '0955667788', 'zhoub@example.com', '已歸還', '已退款', '台南中華店', '信用卡'),
(6, '鄭九', '0977554433', 'zhengjiu@example.com', '已下單', '未付款', '台南永康店', '現金'),
(7, '趙十', '0966112233', 'zhaoshi@example.com', '已歸還', '已付款', '台南中西店', '信用卡');



CREATE TABLE order_items (
  order_item_id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,  -- 參考 orders 訂單 ID
  product_id INT NOT NULL,  -- 參考 products 商品 ID
  product_variant_id INT DEFAULT NULL,  -- 參考 productvariants 變體 ID (重量)
  rental_start_date DATE NOT NULL,  -- 租賃開始日期
  rental_end_date DATE NOT NULL,  -- 租賃結束日期
  rental_days INT GENERATED ALWAYS AS (DATEDIFF(rental_end_date, rental_start_date)) STORED,  -- 自動計算租賃天數
  quantity INT NOT NULL,  -- 商品數量
  price DECIMAL(10, 0) NOT NULL,  -- 單品租借價格
  total_price DECIMAL(10, 0) GENERATED ALWAYS AS (rental_days * price * quantity) STORED  -- 自動計算租金
  #FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
  #FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  #FOREIGN KEY (product_variant_id) REFERENCES productvariants(id) ON DELETE SET NULL
);

INSERT INTO order_items (
  order_id, product_id, product_variant_id, rental_start_date, rental_end_date, quantity, price
) VALUES
(1, 1, 3, '2025-03-01', '2025-03-05', 2, 500),
(2, 2, 5, '2025-03-02', '2025-03-06', 1, 700),
(3, 2, 5, '2025-03-03', '2025-03-07', 3, 400),
(4, 7, NULL, '2025-03-04', '2025-03-08', 2, 600),
(4, 9, 10, '2025-03-05', '2025-03-09', 1, 800),
(4, 15, 12, '2025-03-06', '2025-03-10', 2, 550),
(4, 13, NULL, '2025-03-07', '2025-03-11', 1, 900),
(8, 14, NULL, '2025-03-08', '2025-03-12', 3, 350),
(9, 16, 15, '2025-03-09', '2025-03-13', 2, 750),
(4, 18, NULL, '2025-03-10', '2025-03-14', 1, 1000);

