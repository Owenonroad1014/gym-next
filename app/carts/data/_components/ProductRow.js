import React from "react";
import styles from "../_styles/data.module.css";

function ProductRow({ product }) {
  const { image, name, dateRange, days, quantity, price, subtotal, weight } = product;

  return (
    <div className={styles.productRow}>
      {/* 商品資訊區塊 */}
      <div className={styles.productInfo}>
        <img src={image} alt={name} className={styles.productImage} />
        <div>
          <div className={styles.productName}>{name}</div> {/* 商品名稱 */}
          {/* 商品公斤數 */}
        <div>{weight ? `${weight} kg` : "-"}</div>
        </div>
      </div>

      {/* 租借天數 */}
      <div>
        <div>{dateRange}</div>
        <div>{days}天</div>
      </div>

      {/* 商品數量、價格、小計 */}
      <div>{quantity}</div>
      <div>${price}</div>
      <div>${subtotal}</div>
    </div>
  );
}

export default ProductRow;
