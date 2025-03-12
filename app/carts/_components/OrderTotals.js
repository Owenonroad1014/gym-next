import React from "react";
import styles from "./_styles/OrderTotals.module.css";

function OrderTotals() {
  // In a real app, these values would be calculated based on cart items
  const subtotal = 2500;
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className={styles.totalsContainer}>
      <div className={styles.lineItems}>
        <div className={styles.lineItem}>
          <span className={styles.lineItemLabel}>商品金額</span>
          <span className={styles.lineItemValue}>${subtotal}</span>
        </div>
        <div className={styles.lineItemShipping}>
          <span className={styles.lineItemLabel}>運費</span>
          <span className={styles.lineItemValue}>${shipping}</span>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.orderTotal}>
        <div className={styles.totalRow}>
          <h3 className={styles.totalLabel}>合計</h3>
          <span className={styles.totalValue}>${total}</span>
        </div>
      </div>
    </div>
  );
}

export default OrderTotals;
