"use client";
import * as React from "react";
import styles from "./_styles/OrderConfirmation.module.css";

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
  return (
    <section className={styles.orderDetailsContainer}>
      <OrderDetailItem
        label="訂單日期"
        value="2024-12-28 23:30:59"
        className={styles.orderDetailItem}
      />
      <OrderDetailItem
        label="訂單編號"
        value="241225GGG1989Y"
        className={styles.orderDetailItem}
      />
      <OrderDetailItem
        label="訂單金額"
        value="$2500"
        className={styles.orderDetailItem}
      />
      <OrderDetailItem
        label="訂單狀態"
        value="處理中"
        className={styles.orderDetailItem}
      />
      <OrderDetailItem
        label="自取門市"
        value="中西gym"
        className={styles.orderDetailItem}
      />
      <OrderDetailItem
        label="發票號碼"
        value="SB0123456789"
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
    </main>
  );
}

export default OrderConfirmation;
