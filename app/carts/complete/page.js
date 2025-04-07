"use client";
import { useEffect, useState } from "react";
import styles from "./_styles/order-confirmation.module.css";
import Link from 'next/link'
import CheckoutProgress from "./_components/checkout-progress";
import { BsBagCheck } from "react-icons/bs";

function OrderConfirmationHeader() {
  return (
    <>
      {/* <img
        src={imageUrl}
        alt="Order confirmation"
        className={styles.confirmationImage}
      /> */}
      <BsBagCheck size={100} style={{color: "#5d5a5a"}}/>
      <h1 className={styles.confirmationTitle}>感謝您的租賃</h1>
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
    const pickupMethod = localStorage.getItem("pickupMethod");
    // const invoiceNumber = localStorage.getItem("invoiceNumber");

    if (orderId) {
      setOrderInfo({
        orderId,
        orderDate: orderDate || "未知",
        orderAmount: orderAmount || "未知",
        pickupMethod: pickupMethod || "未知",
        // invoiceNumber: invoiceNumber || "N/A",
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
        value={orderInfo.pickupMethod}
        className={styles.orderDetailItem}
      />
    </section>
  );
}

function OrderConfirmation() {
  return (
    
    <main className={styles.pageContainer}>
    <CheckoutProgress/>
      <article className={styles.contentWrapper}>
        <OrderConfirmationHeader /> {/*imageUrl="/cart-img/check.png"  */}
        <OrderDetails />
      </article>
    
    <div className={styles.container}>

    <Link href="/">
        <button className={styles.pseudo}>
          <span>回到首頁</span>
        </button>
      </Link>

      <Link href="/member-center/carts">
        <button className={styles.pseudo2}>
          <span>查看訂單</span>
        </button>
      </Link>
      </div>
      </main>
  );
}

export default OrderConfirmation;
