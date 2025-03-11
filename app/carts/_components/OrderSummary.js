"use client";
import React from "react";
import styles from "./_styles/OrderSummary.module.css";
import PaymentMethodSection from "./PaymentMethodSection";
import PickupStoreSection from "./PickupStoreSection";
import OrderTotals from "./OrderTotals";

function OrderSummary() {
  const handleCheckout = () => {
    // In a real app, this would handle the checkout process
    console.log("Processing checkout...");
  };

  return (
    <aside className={styles.summaryContainer}>
      <section className={styles.detailsSection}>
        <PaymentMethodSection />
        <PickupStoreSection />
      </section>

      <section className={styles.totalsSection}>
        <h2 className={styles.summaryTitle}>合計明細</h2>
        <div className={styles.summaryContent}>
          <OrderTotals />
          <button className={styles.checkoutButton} onClick={handleCheckout}>
            訂單確認
          </button>
        </div>
      </section>
    </aside>
  );
}

export default OrderSummary;
