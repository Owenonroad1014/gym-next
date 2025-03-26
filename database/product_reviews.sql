CREATE TABLE product_reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    member_id INT NOT NULL,
    product_id INT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    review_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES member(member_id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);