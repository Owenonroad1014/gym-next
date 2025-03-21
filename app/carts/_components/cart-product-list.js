"use client";
import React from "react";
import styles from "./_styles/cart-product-list.module.css";
import CartProductItem from "./cart-product-item";
import { useCart } from "@/context/cart-context"; // 引入 Context

function CartProductList() {
  const { cartItems, updateCartItem } = useCart();

  // 移除商品
  const handleRemoveProduct = (productId) => {
    updateCartItem(productId, { quantity: 0 }); // 設定數量為 0 來表示刪除
  };

  return (
    <section className={styles.productSection}>
      <div className={styles.tableHeader}>
        <h2 className={styles.productHeading}>商品資料</h2>
        <div className={styles.columnTitles}>
          <span className={styles.columnTitle}>租借天數</span>
          <span className={styles.columnTitle}>數量</span>
          <span className={styles.columnTitle}>價格</span>
          <span className={styles.columnTitle}>小計</span>
        </div>
      </div>

      {cartItems
      .filter((product) => product.quantity > 0) // 確保不顯示數量為 0 的商品
      .map((product) => (
        <CartProductItem key={product.id} product={product} onRemove={handleRemoveProduct} />
      ))}

      {cartItems.length === 0 && <p className={styles.emptyCart}>購物車是空的</p>}
    </section>
  );
}

export default CartProductList;
