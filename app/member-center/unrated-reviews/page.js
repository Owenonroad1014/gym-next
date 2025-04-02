"use client";
import React, { useEffect, useState } from "react";
import { PENDING_REVIEWS_LIST, SUBMIT_REVIEW_API, IMG_PATH } from "@/config/api-path";
import { useAuth } from "@/context/auth-context";
import styles from "./_compenents/_styles/review.module.css";
import { CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Link from 'next/link'

const MySwal = withReactContent(Swal);

const Review = () => {
  const { auth, getAuthHeader } = useAuth();
  const [products, setProducts] = useState([]);
  const headers = auth ? { ...getAuthHeader(), "Content-Type": "application/json" } : {};

  useEffect(() => {
    const fetchPendingReviews = async () => {
      try {
        const response = await fetch(PENDING_REVIEWS_LIST, { headers });
        const data = await response.json();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("獲取未評價商品錯誤:", error);
      }
    };
    fetchPendingReviews();
  }, [auth]);

  const handleOpenReview = async (product) => {
    document.body.style.overflow = 'hidden';
    let currentRating = 0;

    const { value: formValues } = await Swal.fire({
      title: `新增評價 - ${product.name}`,
      html: `
        <div style="display: flex; flex-direction:column; align-items: center;">
          <div id="star-container" style="margin-bottom: 10px; width: 80%;"></div>
          <textarea style="width: 80%;" id="review-text" class="swal2-textarea" placeholder="輸入您的評價"></textarea>
        </div>
      `,
      confirmButtonColor: '#f87808',
      didOpen: () => {
        const starContainer = document.getElementById("star-container");
        for (let i = 1; i <= 5; i++) {
          const star = document.createElement("span");
          star.innerHTML = "☆";
          star.style.fontSize = "36px";
          star.style.cursor = "pointer";
          star.style.color = "#f87808";
          star.onclick = () => {
            currentRating = i;
            document.querySelectorAll("#star-container span").forEach((s, index) => {
              s.innerHTML = index < i ? "★" : "☆";
            });
          };
          starContainer.appendChild(star);
        }
      },
      didClose: () => { document.body.style.overflow = ''; },
      showCancelButton: true,
      cancelButtonText: '取消',
      confirmButtonText: "提交評價",
      preConfirm: () => {
        const reviewText = document.getElementById("review-text").value.trim();
        if (!reviewText || currentRating === 0) {
          Swal.showValidationMessage("請輸入星等與評論內容");
          return false;
        }
        return { rating: currentRating, comment: reviewText };
      }
    });

    if (formValues) {
      handleSubmitReview(product, formValues.rating, formValues.comment);
    }
  };

  const handleSubmitReview = async (product, rating, comment) => {
    try {
      const response = await fetch(SUBMIT_REVIEW_API, {
        method: "POST",
        headers,
        body: JSON.stringify({ product_id: product.product_id, rating, review_text: comment,order_item_id:product.order_item_id }),
      });
      const data = await response.json();
      if (data.success) {
        Swal.fire("評價已提交！", "", "success");
        setProducts(prev => prev.filter(p => p.product_id !== product.product_id));
      } else {
        Swal.fire("操作失敗", data.error, "error");
      }
    } catch (error) {
      console.error("提交評價錯誤:", error);
      Swal.fire("發生錯誤", "請稍後再試", "error");
    }
  };

  return (
    <article className={styles.review}>
      {products.length === 0 ? (
        <p>目前沒有未評價的商品</p>
      ) : (
        products.map(product => (
          <Link href={`/products/${product.product_id}`} key={product.product_id} className={styles.productReview}>
            <div className={styles.imgContainer}>
              <img src={`${IMG_PATH}/${product.image_url}`} alt={product.name} className={styles.img} />
            </div>
            <div className={styles.content}>
              <div className={styles.contentItems}>
                <div className={styles.productContent}><CiEdit /> 訂單資訊</div>
                <hr className={styles.divider} />
                <div className={styles.contentArea}>
                <div className={styles.contentItem}>
                  <div>訂單編號: # {product.order_id}</div>
                  <div>商品名稱: {product.name}</div>
                  {product.weight !== null && <div>商品規格: {product.weight}公斤</div>}
                  <div>訂單日期: {new Date(product.added_at).toLocaleString("zh-TW", { hour12: false })}</div>
  
                </div>
                <button onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleOpenReview(product);
              }} className={styles.button}>
                新增評價
              </button>
                </div>

              </div>
 
            </div>
          </Link>
        ))
      )}
    </article>
  );
};

export default Review;
