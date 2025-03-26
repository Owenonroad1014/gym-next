"use client";
import { useEffect, useState } from "react";
import styles from "./_styles/order-confirmation.module.css";

function OrderConfirmationHeader({ imageUrl }) {
  return (
    <>
      <img
        src={imageUrl}
        alt="Order confirmation"
        className={styles.confirmationImage}
      />
      <h1 className={styles.confirmationTitle}>訂單成立</h1>
    </>
  );
}

function OrderDetailItem({ label, value, className }) {
  return (
    <p className={className}>
      {label}: {value}
    </p>
  );
}

function OrderDetails() {
  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    // 從 localStorage 取得訂單資訊
    const orderId = localStorage.getItem("lastOrderId");
    const orderDate = localStorage.getItem("orderDate");
    const orderAmount = localStorage.getItem("orderAmount");
    const pickupStore = localStorage.getItem("pickupStore");
    const invoiceNumber = localStorage.getItem("invoiceNumber");

    if (orderId) {
      setOrderInfo({
        orderId,
        orderDate: orderDate || "未知",
        orderAmount: orderAmount || "未知",
        pickupStore: pickupStore || "未知",
        invoiceNumber: invoiceNumber || "N/A",
        status: "處理中"
      });
    }
  }, []);

  if (!orderInfo) {
    return <p className={styles.errorMessage}>無法取得訂單資訊。</p>;
  }

  return (
    <section className={styles.orderDetailsContainer}>
      <OrderDetailItem
        label="訂單日期"
        value={orderInfo.orderDate}
        className={styles.orderDetailItem}
      />
      <OrderDetailItem
        label="訂單編號"
        value={orderInfo.orderId}
        className={styles.orderDetailItem}
      />
      <OrderDetailItem
        label="訂單金額"
        value={`$${orderInfo.orderAmount}`}
        className={styles.orderDetailItem}
      />
      <OrderDetailItem
        label="訂單狀態"
        value={orderInfo.status}
        className={styles.orderDetailItem}
      />
      <OrderDetailItem
        label="自取門市"
        value={orderInfo.pickupStore}
        className={styles.orderDetailItem}
      />
    </section>
  );
}

function OrderConfirmation() {
  return (
    <main className={styles.pageContainer}>
      <article className={styles.contentWrapper}>
        <OrderConfirmationHeader imageUrl="/cart-img/check.png" />
        <OrderDetails />
      </article>

      <div className={styles.buttonContainer}>
        <a href="/" className={styles.homeButton}>回首頁</a>
      </div>
    </main>
    
  );
}

export default OrderConfirmation;
