"use client";
import React, { useEffect } from "react";
import styles from "./_styles/order-summary.module.css";
import PaymentMethodSection from "./payment-method-section";
import PickupStoreSection from "./pickup-store-section";
import { useCart } from "@/context/cart-context"; // 引入 Context
import { useRouter } from 'next/navigation'; // 使用 useRouter 進行頁面跳轉

function OrderSummary() {
  const { cartItems, subtotal } = useCart(); // 獲取購物車內容 & 總金額
  const router = useRouter(); // Next.js 路由

  const shipping = 0;
  const total = subtotal + shipping;

  // 進入頁面時，確保購物車資料載入 LocalStorage
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // 結帳邏輯
  const handleCheckout = () => {
    if (subtotal === 0) {
      alert("您的購物車是空的，請先添加商品！");
      return;
    }

    // 存入 LocalStorage（確保資料在下一步存在）
    localStorage.setItem("cart", JSON.stringify(cartItems));

    // 跳轉到填寫訂購人資料頁面
    router.push("/carts/data");
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
          <button className={styles.checkoutButton} onClick={handleCheckout} disabled={subtotal === 0}>
            <span>訂單確認</span>
          </button>
        </div> 
      </section>
    </aside>
  );
}

export default OrderSummary;
