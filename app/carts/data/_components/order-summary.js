import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // 引入 icons
import styles from "../_styles/data.module.css";
import ProductRow from "./product-row";

function OrderSummary() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const products = [
    {
      id: 1,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f19966d2e72201d1c84d3ab87816127bd62b2e27f92a3ef6d0da0f1607e56539?placeholderIfAbsent=true",
      name: "飛輪健身車",
      dateRange: "2025/3/3~2025/3/8",
      days: 5,
      quantity: 1,
      price: 500,
      subtotal: 2500,
      weight:5,
    },
    {
      id: 2,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f19966d2e72201d1c84d3ab87816127bd62b2e27f92a3ef6d0da0f1607e56539?placeholderIfAbsent=true",
        name: "飛輪健身車",
      dateRange: "2025/3/3~2025/3/8",
      days: 5,
      quantity: 1,
      price: 500,
      subtotal: 2500,
      weight:5,
    },
  ];

  const subtotal = products.reduce((sum, product) => sum + product.subtotal, 0);
  const discount = 0;
  const total = subtotal - discount;

  return (
    <section className={styles.section}>
      <article className={styles.card}>
        {/* 標題區 - 點擊可展開/收合 */}
        <header className={styles.header} onClick={toggleOpen}>
          <div>
            <span>購物車({products.length}件)</span>
            <br />
            <span className={styles.span}>合計: ${total}</span>
          </div>
          
          <div className={styles.toggleIcon}>
            {isOpen ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
          </div>
        </header>

        {/* 下拉內容區 */}
        {isOpen && (
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

            <footer className={styles.summary}>
              <div>小計: ${subtotal}</div>
              <div className={styles.div}>優惠: ${discount}</div>
              <div className={styles.div}>合計: ${total}</div>
            </footer>
          </div>
        )}
      </article>
    </section>
  );
}

export default OrderSummary;
