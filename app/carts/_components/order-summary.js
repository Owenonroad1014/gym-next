'use client'
import React from 'react'
import styles from './_styles/order-summary.module.css'
import PaymentMethodSection from './payment-method-section'
import PickupStoreSection from './pickup-store-section'
// import OrderTotals from "./OrderTotals";

function OrderSummary() {
  // In a real app, these values would be calculated based on cart items
  const subtotal = 2500
  const shipping = 0
  const total = subtotal + shipping

  const handleCheckout = () => {
    // In a real app, this would handle the checkout process
    console.log('Processing checkout...')
  }

  return (
    <aside className={styles.summaryContainer}>
      <section className={styles.detailsSection}>
        <PaymentMethodSection />
        <PickupStoreSection />
      </section>

      <section className={styles.totalsSection}>
        <h2 className={styles.summaryTitle}>合計明細</h2>
        <div className={styles.summaryContent}>
          {/* OrderTotals section */}
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
          {/* Checkout button */}
          <button className={styles.checkoutButton} onClick={handleCheckout}>
            訂單確認
          </button>
        </div>
      </section>
    </aside>
  );
}

export default OrderSummary;
