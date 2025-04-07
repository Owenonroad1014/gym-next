"use client";
import React, { useEffect, useState } from "react";
import { REVIEWS_LIST, EDIT_REVIEW_API, IMG_PATH } from "@/config/api-path";
import { useAuth } from "@/context/auth-context";
import styles from "./_compenents/_styles/review.module.css";
import { FaStar, FaRegStar } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { FaClipboardList } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Link from 'next/link'
import ReactDOM from 'react-dom';
import loaderStyle from '@/app/_components/_styles/loading.module.css'

const MySwal = withReactContent(Swal);

const Review = () => {
  const { auth, getAuthHeader } = useAuth();
  // const [selectedProduct, setSelectedProduct] = useState(null);
  // const [rating, setRating] = useState(0);
  // const [comment, setComment] = useState("");
  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [products, setProducts] = useState([]);
    const [isloading, setIsloading] = useState(true)

  const headers = auth ? { ...getAuthHeader() } : {};

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(REVIEWS_LIST, { headers });
        const data = await response.json();
        if (data.success) {
          const formattedProducts = data.products.map((p) => ({
            ...p,
            latest_review: p.rating !== null ? { rating: p.rating, comment: p.review_text } : null,order_item_id: p.order_item_id,
          }));
          setProducts(formattedProducts);
          setIsloading(false)
        }
      } catch (error) {
        console.error("獲取商品列表錯誤:", error);
        setIsloading(false)
      }
    };
    fetchProducts();
  }, [auth]);

  const handleOpenReview = async (product) => {
    document.body.style.overflow = 'hidden';
    let currentRating = product.latest_review?.rating || 0;  // 讀取原有評分
  
    const { value: formValues } = await Swal.fire({
      title: `編輯評價 - ${product.name}`,
      html: `
        <div style="display: flex; flex-direction: column; align-items: center;">
          <div id="star-container" style="margin-bottom: 10px; width: 80%;"></div>
          <textarea style="width: 80%;" id="review-text" class="swal2-textarea" placeholder="輸入您的評價">${product.latest_review?.comment || ""}</textarea>
        </div>
      `,
      confirmButtonColor: '#f87808',
      didOpen: () => {
        const starContainer = document.getElementById("star-container");
  
        for (let i = 1; i <= 5; i++) {
          const starSpan = document.createElement("span");
          starSpan.style.cursor = "pointer";
          starSpan.style.margin = "0 4px";
  
          // 設置點擊事件，變更評分
          starSpan.onclick = () => {
            currentRating = i;
            document.querySelectorAll("#star-container span").forEach((s, index) => {
              const starIcon = index < i
                ? React.createElement(FaStar, { color: "#f87808", size: 36 })
                : React.createElement(FaRegStar, { color: "#f87808", size: 36 });
              ReactDOM.render(starIcon, s);
            });
          };
  
          // 初始化星星圖示 (根據 `currentRating` 來決定)
          const initialIcon = i <= currentRating
            ? React.createElement(FaStar, { color: "#f87808", size: 36 })
            : React.createElement(FaRegStar, { color: "#f87808", size: 36 });
  
          ReactDOM.render(initialIcon, starSpan);
          starContainer.appendChild(starSpan);
        }
      },
      didClose: () => {
        document.body.style.overflow = '';
      },
      showCancelButton: true,
      cancelButtonText: '取消',
      confirmButtonText: "更新評價",
      preConfirm: () => {
        const reviewText = document.getElementById("review-text").value.trim();
        if (currentRating === 0) {
          Swal.showValidationMessage("請輸入星等");
          return false;
        }
        return { rating: currentRating, comment: reviewText };
      }
    });
  
    if (formValues) {
      handleSubmitReview(product, formValues.rating, formValues.comment, product.order_item_id);
    }
  };

  const handleSubmitReview = async (product, rating, comment, orderItemId) => {
    try {
      const response = await fetch(EDIT_REVIEW_API, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: product.product_id,
          rating,
          review_text: comment,
          order_item_id: orderItemId,
        }),
      });

      const data = await response.json();
      if (data.success) {
        Swal.fire({
          title: "評價已更新！",
          icon: "success",
          confirmButtonColor: '#f87808'
        });
        
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.order_item_id === orderItemId
              ? { ...p, latest_review: { rating, comment } }
              : p
          )
        );
      } else {
        Swal.fire("操作失敗", data.error, "error");
      }
    } catch (error) {
      console.error("提交評價錯誤:", error);
      Swal.fire("發生錯誤", "請稍後再試", "error");
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) =>
      i < rating ? <FaStar key={i} color="#f87808" size={20} /> : <FaRegStar key={i} color="#f87808" size={20} />
    );
  };

  if (isloading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={loaderStyle.loader}></div>
      </div>
    );
  }

  return (
    <>
      <article className={styles.review}>
        {products
          .filter((product) => product.latest_review !== null)
          .map((product) => (
            <Link href={`/products/${product.product_id}`} key={product.order_item_id} className={styles.productReview}>
              <div className={styles.imgContainer}>
                <img src={`${IMG_PATH}/${product.image_url}`} alt={product.name} className={styles.img} />
              </div>
              <div className={styles.content}>
                <div className={styles.contentItems}>
                  <div className={styles.productContent}>
                    <FaClipboardList />訂單資訊
                  </div>
                  <hr className={styles.divder}/>
                  <div className={styles.contentItem}>
                    <div>訂單編號: # {product.order_id}</div>
                    <div>商品名稱: {product.name}</div>
                    {product.weight !== null && <div>商品規格: {product.weight}公斤</div>}
                    <div>訂單日期: {new Date(product.added_at).toLocaleString("zh-TW", { hour12: false })}</div>
                  </div>
                </div>
                <div className={styles.latest_review}>
                  <div className={styles.productComment}>
                    <span>
                    <CiEdit />評論: 
                    </span>
                    <span className={styles.stars}>
                    {renderStars(product.latest_review.rating)}</span>
                  </div>
                  <div className={`${styles.comment} ${styles.scrollbox}`}>{product.latest_review.comment}</div>
                  <div className={styles.buttonArea}>
                  <button onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleOpenReview(product);
                  }} className={styles.button}>
                    編輯
                  </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </article>
    </>
  );
};

export default Review;
