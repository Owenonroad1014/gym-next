-- 資料表結構 `reservations`
--

-- 預約紀錄表
CREATE TABLE reservations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    member_id INT NOT NULL,
    class_id INT NOT NULL,
    coach_id INT NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'confirmed',
    notification_sent TINYINT(1) NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES member(member_id),
    FOREIGN KEY (class_id) REFERENCES classes(id),
    FOREIGN KEY (coach_id) REFERENCES coaches(id)
);

