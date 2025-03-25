"use client";
import React, { useEffect } from "react";
import styles from "./_styles/order-summary.module.css";
import PaymentMethodSection from "./payment-method-section";
import PickupStoreSection from "./pickup-store-section";
import { useCart } from "@/context/cart-context"; // 引入 Context
import { useRouter } from 'next/navigation'; // 改用 useRouter 進行頁面跳轉

function OrderSummary() {
  const { cartItems, subtotal } = useCart(); //獲取總金額
  const router = useRouter(); // 使用 Next.js 路由

  const shipping = 0;
  const total = subtotal + shipping;

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // 這裡可以執行結帳邏輯
  const handleCheckout = () => {
    if (subtotal === 0) {
      alert("您的購物車是空的，請先添加商品！");
      return;
      }
    console.log("Processing checkout...");
    localStorage.setItem("cart", JSON.stringify(cartItems));
    router.push("/carts/data"); // 使用 Next.js 進行頁面跳轉
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
           <button className={styles.checkoutButton} onClick={handleCheckout} disabled={subtotal === 0} >{/*如果購物車為空，禁用按鈕 */}
           <span>訂單確認</span>
          </button>
        </div> 
      </section>
    </aside>
  );
}

export default OrderSummary;
