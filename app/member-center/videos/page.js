"use client";
import React, { useEffect, useState } from "react";
import { PRODUCTS_FAV, IMG_PATH } from "@/config/api-path";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import cardStyle from "./_compenents/_styles/videos.module.css";
import Image from "next/image";
import Swal from "sweetalert2";
import loaderStyle from '@/app/_components/_styles/loading.module.css'

const Videos = () => {
  const { auth, getAuthHeader } = useAuth();
  const [Products, setProducts] = useState([]);
  const [isloading, setIsloading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const headers = auth ? { ...getAuthHeader() } : {};
        const res = await fetch(PRODUCTS_FAV, { headers });
        const obj = await res.json();
        console.log("後端回傳的商品列表:", obj);

        if (obj.success) {
          setProducts(obj.favorites || []);
          setIsloading(false)
        }
      } catch (error) {
        console.error("獲取商品列表錯誤:", error);
        setIsloading(false)
      }
    };

    fetchProducts();
  }, [auth, getAuthHeader]);

  // **處理取消收藏**
  const handleRemoveFavorite = async (product,event) => {
    document.body.style.overflow = 'hidden'
    event.stopPropagation(); // 阻止事件冒泡
    const result = await Swal.fire({
      title: `確定要取消收藏 ${product.name} 嗎?`,
      text: "取消後需要重新收藏才能恢復",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "取消收藏",
      cancelButtonText: "取消",
      didClose: () => {
        document.body.style.overflow = ''
      },
    });

    if (result.isConfirmed) {
      try {
        const headers = auth ? { ...getAuthHeader(), "Content-Type": "application/json" } : {};
        const res = await fetch(`${PRODUCTS_FAV}/${product.product_id}`, {
          method: "DELETE",
          headers,
        });

        const response = await res.json();
        if (response.success) {
          Swal.fire("已取消收藏!", `${product.name} 已從你的收藏列表中移除`, "success");

          // **前端同步更新狀態**
          setProducts((prev) => prev.filter((p) => p.product_id !== product.product_id));
        } else {
          Swal.fire("操作失敗", "請稍後再試", "error");
        }
      } catch (error) {
        console.error("取消收藏錯誤:", error);
        Swal.fire("錯誤", "無法取消收藏，請稍後再試", "error");
      }
    }
  };

  return (
    <>
    {isloading ? (
        <>
          <div className={cardStyle.loaderContainer}>
            <div className={loaderStyle.loader}></div>
          </div>
        </>
      ) : (<>
      {Products.length === 0 ? (
        <p>目前沒有收藏的商品</p>
      ) : (
        Products.map((product) => (
          <div key={product.product_id} >
            <Link href={`/products/${product.product_id}`} className={cardStyle.favCard}>
              <div className={cardStyle.images}>
                <Image
                  src={`${IMG_PATH}/${product.image_url}`}
                  width={300}
                  height={200}
                  alt={product.name}
                  className={cardStyle.cardImage}
                />
              </div>
              <div className={cardStyle.content}>
                <div className={cardStyle.cardBody}>
                  <h3 className={cardStyle.name}>{product.name}</h3>
                  <div className={cardStyle.price}>{product.price}元/天</div>
                  <div className={cardStyle.cardDesc}>
                    <p>{product.description}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault(); // 阻止默認行為
                    event.stopPropagation(); // 阻止事件冒泡
                    handleRemoveFavorite(product, event);
                  }}
                  style={{ zIndex: 1 }} // 確保按鈕在 Link 之上
                >
                  取消收藏
                </button>
              </div>
            </Link>
          </div>
        ))
      )}
      </>)}
    </>
  );
};

export default Videos;
