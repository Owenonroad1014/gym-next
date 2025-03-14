"use client";
import React from "react";
import styles from "./_styles/cart-product-list.module.css";
import CartProductItem from "./cart-product-item";

function CartProductList() {
  // Sample product data - in a real app, this would come from a state or props
  const products = [
    {
      id: 1,
      name: "飛輪健身車",
      weight: "5kg",
      price: 500,
      quantity: 1,
      image: "/cart-img/飛輪車.jpg",
    },
    {
      id: 2,
      name: "飛輪健身車",
      weight: "5kg",
      price: 500,
      quantity: 1,
      image: "/cart-img/飛輪車.jpg",
    },
  ];

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

      {products.map((product) => (
        <CartProductItem key={product.id} product={product} />
      ))}
    </section>
  );
}

export default CartProductList;
