import React from "react";
import styles from "../_styles/carts.module.css";

function ProductRow({ product }) {
  const { image, dateRange, days, quantity, price, subtotal } = product;

  return (
    <div className={styles.productRow}>
      <img src={image} alt="Product" className={styles.productImage} />
      <div>
        <div>{dateRange}</div>
        <div>{days}天</div>
      </div>
      <div>{quantity}</div>
      <div>${price}</div>
      <div>${subtotal}</div>
    </div>
  );
}

export default ProductRow;
