"use client";
import React, { useEffect, useState } from "react";
import { REVIEWS_LIST, EDIT_REVIEW_API, IMG_PATH } from "@/config/api-path";
import { useAuth } from "@/context/auth-context";
import styles from "./_compenents/_styles/review.module.css";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { FaClipboardList } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Link from 'next/link'

const MySwal = withReactContent(Swal);

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
          const formattedProducts = data.products.map((p) => ({
            ...p,
            latest_review: p.rating !== null ? { rating: p.rating, comment: p.review_text } : null,order_item_id: p.order_item_id,
          }));
          setProducts(formattedProducts);
        }
      } catch (error) {
        console.error("獲取商品列表錯誤:", error);
      }
    };
    fetchProducts();
  }, [auth]);

  const handleOpenReview = async (product) => {
    document.body.style.overflow = 'hidden'
    let currentRating = product.latest_review?.rating || 0;

    const { value: formValues } = await Swal.fire({
      title: `編輯評價 - ${product.name}`,
      html: `
        <div style="display: flex; flex-direction: column; align-items: center;">
          <div id="star-container" style="margin-bottom: 10px; width: 80%;"></div>
          <textarea style="width: 80%;" id="review-text" class="swal2-textarea" placeholder="輸入您的評價">${product.latest_review?.comment || ""}</textarea>
        </div>
      `,
      didOpen: () => {
        const starContainer = document.getElementById("star-container");

        for (let i = 1; i <= 5; i++) {
          const star = document.createElement("span");
          star.innerHTML = i <= currentRating ? "★" : "☆";
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

        document.getElementById("review-text").focus();
      },
      didClose: () => {
        document.body.style.overflow = ''
      },
      showCancelButton: true,
      cancelButtonText: '取消',
      confirmButtonText: "更新評價",
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
        Swal.fire("評價已更新！", "", "success");
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
      i < rating ? <AiFillStar key={i} color="#f87808" size={20} /> : <AiOutlineStar key={i} color="#f87808" size={20} />
    );
  };

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
                    <FaClipboardList />訂單資料
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
                    <CiEdit />評論: <span className={styles.stars}>
                    {renderStars(product.latest_review.rating)}</span>
                  </div>
                  <div className={styles.comment}>{product.latest_review.comment}</div>
                  <button onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleOpenReview(product);
                  }} className={styles.button}>
                    編輯
                  </button>
                </div>
              </div>
            </Link>
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
                  {i < rating ? <AiFillStar color="#f87808" size={28} /> : <AiOutlineStar color="#f87808;" size={28} />}
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