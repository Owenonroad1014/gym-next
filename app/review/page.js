"use client";
import React, { useEffect, useState } from "react";
import { REVIEWS_LIST, EDIT_REVIEW_API, IMG_PATH } from "@/config/api-path";
import { useAuth } from "@/context/auth-context";
import styles from "./_component/_styles/review.module.css";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Review = () => {
  const { auth, getAuthHeader } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const headers = auth ? { ...getAuthHeader() } : {};

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(REVIEWS_LIST, { headers });
        const data = await response.json();
        if (data.success) {
          // 確保評論資料被正確存入 `latest_review`
          const formattedProducts = data.products.map((p) => ({
            ...p,
            latest_review: p.rating !== null ? { rating: p.rating, comment: p.review_text } : null,
          }));
          setProducts(formattedProducts);
        }
      } catch (error) {
        console.error("獲取商品列表錯誤:", error);
      }
    };
    fetchProducts();
  }, [auth]);

  // **打開編輯評價彈窗**
  const handleOpenReview = (product) => {
    setSelectedProduct(product);
    setRating(product.latest_review?.rating || 0);
    setComment(product.latest_review?.comment || "");
    setIsDialogOpen(true);
  };

  // **更新評價**
  const handleSubmitReview = async () => {
    if (rating === 0 || comment.trim() === "") {
      alert("請輸入星等與評論內容");
      return;
    }

    try {
      const response = await fetch(EDIT_REVIEW_API, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: selectedProduct.product_id,
          rating,
          review_text: comment,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("評價已更新！");

        // **更新前端顯示的評論**
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.product_id === selectedProduct.product_id
              ? { ...p, latest_review: { rating, comment } }
              : p
          )
        );

        setIsDialogOpen(false);
      } else {
        alert("操作失敗：" + data.error);
      }
    } catch (error) {
      console.error("提交評價錯誤:", error);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) =>
      i < rating ? <AiFillStar key={i} color="gold" size={24} /> : <AiOutlineStar key={i} color="gold" size={24} />
    );
  };

  return (
    <>
      <article className={styles.review}>
        {products
          .filter((product) => product.latest_review !== null) // **只顯示有評論的商品**
          .map((product) => (
            <div className={styles.productReview} key={product.order_item_id} >
              <div className={styles.imgContainer}>
                <img src={`${IMG_PATH}/${product.image_url}`} alt={product.name} className={styles.img} />
              </div>
            <div className={styles.content}>
            <div className={styles.contentItem}>
            <div>訂單編號:{product.order_id}</div>
              <p>商品名稱: {product.name}</p>
              {product.weight !== null && <div>商品重量: {product.weight}</div>}
              <div>訂單日期: {new Date(product.added_at).toLocaleString("zh-TW", { hour12: false })}</div>


            </div>
              
              <div className={styles.latest_review}>
                <p>
                {renderStars(product.latest_review.rating)}</p>
                <p>評論: {product.latest_review.comment}</p>
                <button onClick={() => handleOpenReview(product)}>編輯評價</button>
              </div>
            </div>
            </div>
          ))}
      </article>

      {isDialogOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={() => setIsDialogOpen(false)}>×</button>
            <h3 className={styles.title}>編輯評價 - {selectedProduct?.name}</h3>
            <div className={styles.starContainer}>
  {Array.from({ length: 5 }, (_, i) => (
    <span key={i} onClick={() => setRating(i + 1)} style={{ cursor: "pointer" }}>
      {i < rating ? <AiFillStar color="gold" size={28} /> : <AiOutlineStar color="gold" size={28} />}
    </span>
  ))}
</div>

            <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="輸入您的評價" className={styles.textarea} />

            <button onClick={handleSubmitReview} className="w-full mt-4 bg-blue-500 text-white py-2 rounded">
              更新評價
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Review;
