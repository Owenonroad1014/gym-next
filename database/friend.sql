-- 好友請求表
CREATE TABLE friend_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES members(id),
  FOREIGN KEY (receiver_id) REFERENCES members(id)
);
-- 好友關係表(已接受好友)
CREATE TABLE friendships (
  user1_id INT NOT NULL,
  user2_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user1_id, user2_id),
  FOREIGN KEY (user1_id) REFERENCES  members(id),
  FOREIGN KEY (user2_id) REFERENCES  members(id)
);
-- 聊天室表格
CREATE TABLE chats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user1_id INT NOT NULL,  -- 用戶 1 ID
  user2_id INT NOT NULL,  -- 用戶 2 ID
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 聊天創建時間
  FOREIGN KEY (user1_id) REFERENCES  members(id),
  FOREIGN KEY (user2_id) REFERENCES  members(id)
);
-- 聊天內容表
CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  chat_id INT NOT NULL,  -- 聊天室 ID (即對應的好友關係)
  sender_id INT NOT NULL,  -- 發送訊息的用戶 ID
  message TEXT NOT NULL,  -- 訊息內容
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 訊息發送時間
  FOREIGN KEY (chat_id) REFERENCES chats(id),
  FOREIGN KEY (sender_id) REFERENCES members(id)
);
SELECT * 
    FROM friendships
    LEFT JOIN members 
    ON members.id = friendships.user1_id OR members.id = friendships.user2_id
    WHERE friendships.user1_id = 1 OR friendships.user2_id = 1;
SELECT * FROM friend_requests WHERE receiver_id=2 AND status="pending";


SELECT 
    subquery.*, 
    members.name AS user_name
FROM 
    (SELECT 
        friendships.*, 
        members.name AS user1_name 
    FROM 
        friendships
    LEFT JOIN 
        members ON members.id = friendships.user1_id OR members.id = friendships.user2_id
    WHERE 
        friendships.user1_id = 1 OR friendships.user2_id = 1
    ) AS subquery
LEFT JOIN 
    members ON members.id = subquery.user1_id
WHERE 
    subquery.id = 2;


select * from friendships left join members on friendships.user1_id = members.id OR friendships.user2_id = members.id;
select * from sub.* , name
(select *  from members left join friendships on members.id = friendships.user1_id  OR members.id = friendships.user2_id where id = 2) AS sub
left join members on  sub.user1_id = members.id ;


SELECT 
    sub.*, 
    m1.name AS user1_name, 
    m2.name AS user2_name
FROM 
    (SELECT * 
     FROM members 
     LEFT JOIN friendships 
     ON members.id = friendships.user1_id 
     OR members.id = friendships.user2_id 
     WHERE members.id = 2) AS sub
LEFT JOIN members AS m1 
ON sub.user1_id = m1.id
LEFT JOIN members AS m2 
ON sub.user2_id = m2.id;




