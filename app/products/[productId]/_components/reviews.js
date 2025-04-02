"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { AiFillStar, AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import styles from "./_styles/ReviewList.module.css";
import { PRODUCTS_LIST } from "@/config/api-path";
import SpotlightCard from "./SpotlightCard"; // ✅ 引入 SpotlightCard

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const fetchReviews = useCallback(async () => {
    if (!hasMore || loading) return;
    setLoading(true);

    try {
      const res = await fetch(`${PRODUCTS_LIST}/${productId}/reviews?page=${page}&limit=3`);
      const data = await res.json();

      if (data.success) {
        setReviews((prev) => [...prev, ...data.reviews]);
        setHasMore(data.reviews.length === 3);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }

    setLoading(false);
  }, [productId, page, hasMore, loading]);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const lastReviewRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchReviews();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchReviews]
  );

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => {
      if (index < Math.floor(rating)) {
        return <AiFillStar key={index} className={styles.filled} />;
      } else if (index < rating) {
        return <AiTwotoneStar key={index} className={styles.half} />;
      } else {
        return <AiOutlineStar key={index} className={styles.empty} />;
      }
    });
  };

  return (
<div className={`${styles.reviewContainer} ${styles.scrollbox}`}>
      {reviews.map((review, index) => (
        <SpotlightCard key={review.review_id} className={styles.reviewCard}>
          <div
            ref={index === reviews.length - 1 ? lastReviewRef : null}
            className={styles.reviewCardContent} // ✅ 新增一層 div，避免 SpotlightCard 影響原本排版
          >
            <div className={styles.header}>
              <span className={styles.memberName}>{review.member_name}</span>
              <div className={styles.stars}>{renderStars(review.rating)}</div>
            </div>
            <p className={styles.reviewText}>{review.review_text}</p>
            <span className={styles.date}>
              {new Date(review.created_at).toLocaleDateString()}
            </span>
          </div>
        </SpotlightCard>
      ))}
      {loading && <p className={styles.loading}>載入中...</p>}
      {!hasMore && <p className={styles.noMore}>沒有更多評論</p>}
    </div>
  );
};

export default ReviewList;
