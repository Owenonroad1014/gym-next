import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import styles from "./_styles/FavoriteButton.module.css";
import { PRODUCTS_LIST } from "@/config/api-path"; // 確保 API 路徑正確

const FavoriteButton = ({ member_id, product_id, isFavorite }) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const toggleFavorite = async () => {
    if (!member_id) {
      alert("請先登入再收藏商品");
      return;
    }

    try {
      const res = await fetch(`${PRODUCTS_LIST}/toggle-favorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ member_id, product_id }),
      });

      const data = await res.json();
      if (data.success) {
        setFavorite(data.action === "added"); // 更新狀態
      } else {
        alert("操作失敗，請稍後再試");
      }
    } catch (error) {
      console.error("收藏功能錯誤:", error);
    }
  };

  return (
    <>
    <span className={styles.hearts} onClick={toggleFavorite}>
      {favorite ? (
        <FaHeart className={styles.heartFilled} />
      ) : (
        <FaRegHeart className={styles.heart} />
      )}
    </span>
    </>
  );
};

export default FavoriteButton;
