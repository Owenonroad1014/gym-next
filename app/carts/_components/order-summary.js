"use client";
import React from "react";
import styles from "./_styles/order-summary.module.css";
import PaymentMethodSection from "./payment-method-section";
import PickupStoreSection from "./pickup-store-section";
import { useCart } from "@/context/cart-context"; // 引入 Context
import Link from 'next/link'

function OrderSummary() {
  const { subtotal } = useCart(); //獲取總金額
  const shipping = 0;
  const total = subtotal + shipping;

  // 這裡可以執行結帳邏輯
  const handleCheckout = () => {
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
            <Link href="/carts/data"><span>訂單確認</span></Link>
          </button>
          {/* 如果這是一個真實的購物車，handleCheckout 可能會：
          送出訂單
          導向到付款頁面
          驗證用戶資訊 */}

        </div> 
      </section>
    </aside>
  );
}

export default OrderSummary;
