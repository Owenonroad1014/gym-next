import React from "react";
import styles from "../_styles/carts.module.css";
import ProductRow from "./ProductRow";

function OrderSummary() {
  // Sample product data - in a real app, this would come from props or context
  const products = [
    {
      id: 1,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f19966d2e72201d1c84d3ab87816127bd62b2e27f92a3ef6d0da0f1607e56539?placeholderIfAbsent=true",
      dateRange: "2025/3/3~2025/3/8",
      days: 5,
      quantity: 1,
      price: 500,
      subtotal: 2500,
    },
    {
      id: 2,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f19966d2e72201d1c84d3ab87816127bd62b2e27f92a3ef6d0da0f1607e56539?placeholderIfAbsent=true",
      dateRange: "2025/3/3~2025/3/8",
      days: 5,
      quantity: 1,
      price: 500,
      subtotal: 2500,
    },
  ];

  // Calculate totals
  const subtotal = products.reduce((sum, product) => sum + product.subtotal, 0);
  const discount = 0;
  const total = subtotal - discount;

  return (
    <section className={styles.sectionA}>
      <article className={styles.card}>
        <header className={styles.header}>
          <div>
            <span className={styles.span}>合計:$500</span>
            <br />
            <span>購物車(1件)</span>
          </div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5f84a20c2fd60de342f73abf9f6aab7cb2ec80080f56ef35981149ed29e2b0bd?placeholderIfAbsent=true"
            alt="Cart icon"
            className={styles.img3}
          />
        </header>

        <div className={styles.productTable}>
          <div className={styles.tableHeader}>
            <div>商品資料</div>
            <div>租借天數</div>
            <div>數量</div>
            <div>價格</div>
            <div>小計</div>
          </div>

          {products.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
        </div>

        <footer className={styles.summary}>
          <div>小計:${subtotal}</div>
          <div className={styles.div}>優惠:${discount}</div>
          <div className={styles.div}>合計:${total}</div>
        </footer>
      </article>
    </section>
  );
}

export default OrderSummary;
