-- 好友請求表
CREATE TABLE friend_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES member(member_id),
  FOREIGN KEY (receiver_id) REFERENCES member(member_id)
);

-- 好友關係表(已接受好友)
CREATE TABLE friendships (
  user1_id INT NOT NULL,
  user2_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user1_id, user2_id),
  FOREIGN KEY (user1_id) REFERENCES  member(member_id),
  FOREIGN KEY (user2_id) REFERENCES  member(member_id)
);
-- 聊天室表格
CREATE TABLE chats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user1_id INT NOT NULL,  -- 用戶 1 ID
  user2_id INT NOT NULL,  -- 用戶 2 ID
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 聊天創建時間
  user1_delete INT NOT NULL DEFAULT 0,
  user2_delete INT NOT NULL DEFAULT 0,
  FOREIGN KEY (user1_id) REFERENCES  member(member_id),
  FOREIGN KEY (user2_id) REFERENCES  member(member_id)
);
-- 聊天內容表
CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  chat_id INT NOT NULL,  -- 聊天室 ID (即對應的好友關係)
  sender_id INT NOT NULL,  -- 發送訊息的用戶 ID
  message TEXT NOT NULL,  -- 訊息內容
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 訊息發送時間
  FOREIGN KEY (chat_id) REFERENCES chats(id),
  FOREIGN KEY (sender_id) REFERENCES member(member_id)
);
