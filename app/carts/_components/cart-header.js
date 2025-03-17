import React from "react";
import styles from "./_styles/cart-header.module.css";

function CartHeader() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.loginPrompt}>
        <span>尚未登入會員?</span>
        <a href="#" className={styles.loginLink}>
          登入
        </a>
      </div>
      <h1 className={styles.cartTitle}>購物車</h1>
    </header>
  );
}

export default CartHeader;
