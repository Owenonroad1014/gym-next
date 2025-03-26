"use client";
import React, { useEffect, useState } from "react";
import { PENDING_REVIEWS_LIST, SUBMIT_REVIEW_API, IMG_PATH } from "@/config/api-path";
import { useAuth } from "@/context/auth-context";
import styles from "./_component/_styles/review.module.css";

const PendingReview = () => {
  const { auth, getAuthHeader } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const headers = auth ? { ...getAuthHeader() } : {};

  useEffect(() => {
    const fetchPendingReviews = async () => {
      try {
        const response = await fetch(PENDING_REVIEWS_LIST, { headers });
        const data = await response.json();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("獲取待評價商品錯誤:", error);
      }
    };
    fetchPendingReviews();
  }, [auth]);

  // **打開新增評價的彈窗**
  const handleOpenReview = (product) => {
    setSelectedProduct(product);
    setRating(0);
    setComment("");
    setIsDialogOpen(true);
  };

  // **提交評價**
  const handleSubmitReview = async () => {
    if (rating === 0 || comment.trim() === "") {
      alert("請輸入星等與評論內容");
      return;
    }

    try {
      const response = await fetch(SUBMIT_REVIEW_API, {
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
        alert("評價提交成功！");

        // **從 products 狀態移除已評價商品**
        setProducts((prevProducts) =>
          prevProducts.filter((p) => p.product_id !== selectedProduct.product_id)
        );

        setIsDialogOpen(false);
      } else {
        alert("操作失敗：" + data.error);
      }
    } catch (error) {
      console.error("提交評價錯誤:", error);
    }
  };

  return (
    <>
      <article className={styles.review}>
        {products.map((product) => (
          <div role="button" key={product.order_id} onClick={() => handleOpenReview(product)}>
            <div className={styles.imgContainer}>
              <img src={`${IMG_PATH}/${product.image_url}`} alt={product.name} className={styles.img} />
            </div>
            {product.weight !== null && <div>商品重量: {product.weight}</div>}
            <div>訂單時間: {new Date(product.added_at).toLocaleString("zh-TW", { hour12: false })}</div>
            <p>商品名稱: {product.name}</p>

            <button onClick={() => handleOpenReview(product)}>新增評價</button>
          </div>
        ))}
      </article>

      {isDialogOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={() => setIsDialogOpen(false)}>×</button>
            <h3>新增評價 - {selectedProduct?.name}</h3>

            <div className="flex items-center">
              <span className="mr-2">星等：</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} className={styles.star} onClick={() => setRating(star)}>
                  {rating >= star ? "★" : "☆"}
                </button>
              ))}
            </div>

            <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="輸入您的評價" className={styles.textarea} />

            <button onClick={handleSubmitReview} className="w-full mt-4 bg-blue-500 text-white py-2 rounded">
              提交評價
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PendingReview;
