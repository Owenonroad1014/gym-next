#drop table shop_orders;

CREATE TABLE shop_orders (
  order_id INT AUTO_INCREMENT PRIMARY KEY, 
  member_id INT NOT NULL,  -- 參考使用者的 ID
  product_id INT NOT NULL,  -- 參考 products 表的商品ID
  product_variant_id INT DEFAULT NULL,  -- 參考 productvariants 表的商品變體 ID (重量)
  rental_start_date DATE NOT NULL,  -- 租賃開始日期
  rental_end_date DATE NOT NULL,  -- 租賃結束日期
  rental_days INT GENERATED ALWAYS AS (DATEDIFF(rental_end_date, rental_start_date)) STORED,  -- 自動計算租賃天數
  quantity INT NOT NULL,  -- 購買數量
  price DECIMAL(10, 0) NOT NULL,  -- 單品租借價格
  total_price DECIMAL(10, 0) GENERATED ALWAYS AS (rental_days * price* quantity) STORED,  -- 自動計算租金
  status ENUM('已下單', '租賃中', '已歸還') NOT NULL DEFAULT '已下單',  -- 訂單狀態
  payment_status ENUM('未付款', '已付款', '退款中', '已退款') NOT NULL DEFAULT '未付款',  -- 付款狀態
  pickup_method ENUM('台南中西店', '台南中華店', '台南永康店') NOT NULL DEFAULT '台南中西店',
  payment_method ENUM('現金', '信用卡') NOT NULL DEFAULT '信用卡',
  added_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP -- 訂單建立時間  
); 




#FOREIGN KEY (member_id) REFERENCES members(id),  -- 參考 users 表的 ID
  #FOREIGN KEY (product_id) REFERENCES products(id),  -- 參考 products 表的商品 ID
  #FOREIGN KEY (product_variant_id) REFERENCES productvariants(id)  -- 參考 productvariants 表的商品變體 ID
  
INSERT INTO shop_orders (
  member_id, product_id, product_variant_id, rental_start_date, rental_end_date, 
  quantity, price, status, payment_status, pickup_method, payment_method
) VALUES
(1, 101, 201, '2025-03-01', '2025-03-05', 2, 500, '已下單', '未付款', '台南中西店', '信用卡'),
(2, 102, 202, '2025-03-02', '2025-03-06', 1, 700, '租賃中', '已付款', '台南中華店', '現金'),
(3, 103, 203, '2025-03-03', '2025-03-07', 3, 400, '已下單', '未付款', '台南永康店', '信用卡'),
(4, 104, NULL, '2025-03-04', '2025-03-08', 2, 600, '租賃中', '已付款', '台南中西店', '信用卡'),
(5, 105, 205, '2025-03-05', '2025-03-09', 1, 800, '已歸還', '已付款', '台南中華店', '現金'),
(6, 106, NULL, '2025-03-06', '2025-03-10', 2, 550, '已下單', '未付款', '台南永康店', '信用卡'),
(7, 107, 207, '2025-03-07', '2025-03-11', 1, 900, '租賃中', '已付款', '台南中西店', '現金'),
(8, 108, 208, '2025-03-08', '2025-03-12', 3, 350, '已歸還', '已退款', '台南中華店', '信用卡'),
(9, 109, NULL, '2025-03-09', '2025-03-13', 2, 750, '已下單', '未付款', '台南永康店', '現金'),
(10, 110, 210, '2025-03-10', '2025-03-14', 1, 1000, '已歸還', '已付款', '台南中西店', '信用卡');




CREATE TABLE shop_orders (
  order_id INT AUTO_INCREMENT PRIMARY KEY, 
  member_id INT NOT NULL,  -- 參考使用者的 ID
  product_id INT NOT NULL,  -- 參考 products 表的商品ID
  product_variant_id INT DEFAULT NULL,  -- 參考 productvariants 表的商品變體 ID (重量)
  rental_start_date DATE NOT NULL,  -- 租賃開始日期
  rental_end_date DATE NOT NULL,  -- 租賃結束日期
  rental_days INT GENERATED ALWAYS AS (DATEDIFF(rental_end_date, rental_start_date)) STORED,  -- 自動計算租賃天數

  quantity INT NOT NULL,  -- 購買數量
  price DECIMAL(10, 0) NOT NULL,  -- 單品租借價格
  total_price DECIMAL(10, 0) GENERATED ALWAYS AS (rental_days * price * quantity) STORED,  -- 自動計算租金
  
  customer_name VARCHAR(100) NOT NULL, -- 訂購人姓名
  customer_phone VARCHAR(20) NOT NULL, -- 訂購人電話
  customer_email VARCHAR(100) NOT NULL, -- 訂購人 Email
  
  status ENUM('已下單', '租賃中', '已歸還') NOT NULL DEFAULT '已下單',  -- 訂單狀態
  payment_status ENUM('未付款', '已付款', '退款中', '已退款') NOT NULL DEFAULT '未付款',  -- 付款狀態
  pickup_method ENUM('台南中西店', '台南中華店', '台南永康店') NOT NULL DEFAULT '台南中西店',
  payment_method ENUM('現金', '信用卡') NOT NULL DEFAULT '信用卡',
  added_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP -- 訂單建立時間  
);



ALTER TABLE shop_orders
ADD CONSTRAINT fk_shop_orders_member FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
ADD CONSTRAINT fk_shop_orders_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
ADD CONSTRAINT fk_shop_orders_variant FOREIGN KEY (product_variant_id) REFERENCES ProductVariants(id) ON DELETE SET NULL;




INSERT INTO shop_orders (
  member_id, product_id, product_variant_id, rental_start_date, rental_end_date, 
  quantity, price, customer_name, customer_phone, customer_email, status, payment_status, pickup_method, payment_method
) VALUES
(1, 5, 10, '2025-03-01', '2025-03-05', 2, 500, '張三', '0912345678', 'zhangsan@example.com', '已下單', '未付款', '台南中西店', '信用卡'),
(2, 8, 15, '2025-03-02', '2025-03-06', 1, 700, '李四', '0922333444', 'lisi@example.com', '租賃中', '已付款', '台南中華店', '現金'),
(3, 12, 18, '2025-03-03', '2025-03-07', 3, 400, '王五', '0933111222', 'wangwu@example.com', '已下單', '未付款', '台南永康店', '信用卡'),
(4, 7, NULL, '2025-03-04', '2025-03-08', 2, 600, '陳六', '0988777666', 'chenliu@example.com', '租賃中', '已付款', '台南中西店', '信用卡'),
(4, 9, 12, '2025-03-05', '2025-03-09', 1, 800, '陳六', '0988777666', 'chenliu@example.com', '已歸還', '已付款', '台南中華店', '現金'),
(4, 11, NULL, '2025-03-06', '2025-03-10', 2, 550, '陳六', '0988777666', 'chenliu@example.com', '已下單', '未付款', '台南永康店', '信用卡'),
(4, 13, 17, '2025-03-07', '2025-03-11', 1, 900, '陳六', '0988777666', 'chenliu@example.com', '租賃中', '已付款', '台南中西店', '現金'),
(5, 14, 19, '2025-03-08', '2025-03-12', 3, 350, '周八', '0955667788', 'zhoub@example.com', '已歸還', '已退款', '台南中華店', '信用卡'),
(6, 16, NULL, '2025-03-09', '2025-03-13', 2, 750, '鄭九', '0977554433', 'zhengjiu@example.com', '已下單', '未付款', '台南永康店', '現金'),
(7, 18, 20, '2025-03-10', '2025-03-14', 1, 1000, '趙十', '0966112233', 'zhaoshi@example.com', '已歸還', '已付款', '台南中西店', '信用卡');


