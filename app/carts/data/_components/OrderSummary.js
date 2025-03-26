"use client";
import React, { useState, useEffect } from "react";
import styles from "../_styles/data.module.css";
import CartItem from "./CartItem";

function OrderSummary() {
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [pickupStore, setPickupStore] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const shipping = 0;
  const total = subtotal + shipping;

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const storedPaymentMethod = localStorage.getItem("paymentMethod") || "未選擇";
    const storedPickupStore = localStorage.getItem("pickupStore") || "未選擇";

    setCartItems(storedCart);
    setPaymentMethod(storedPaymentMethod);
    setPickupStore(storedPickupStore);

    // ✅ 計算總金額
    const calculatedSubtotal = storedCart.reduce((acc, item) => {
      const rentalDays =
        (new Date(item.rentalEndDate) - new Date(item.rentalStartDate)) /
          (1000 * 60 * 60 * 24) || 1;
      return acc + item.price * item.quantity * rentalDays;
    }, 0);

    setSubtotal(calculatedSubtotal);
  }, []);


  return (
    <section className={styles.orderSummary}>
      <h2 className={styles.div3}>訂單資訊</h2>

      <div className={styles.productsCoupon}>
      {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className={styles.pickupstore}>
        <div className={styles.info2}>
          <h3 className={styles.gym}>自取gym點</h3>
          <p className={styles.div6}>{pickupStore}</p>
        </div>
        <p className={styles.info3}>{paymentMethod}</p>
      </div>

      <div className={styles.fields}>
        <div className={styles.orderSummaryInfo}>
          <div className={styles.content2}>
            <div className={styles.titleAmount}>
              <h3 className={styles.div7}>商品金額</h3>
              <p className={styles.css4000}>${subtotal}</p>
            </div>
          </div>
        </div>

        <div className={styles.orderSummaryInfo2}>
          <div className={styles.content3}>
            <div className={styles.titleAmount}>
              <h3 className={styles.div8}>運費</h3>
              <p className={styles.css0}>${shipping}</p>
            </div>
          </div>
        </div>

        <div className={styles.orderSummaryInfo3}>
          <div className={styles.content4}>
            <div className={styles.titleAmount2}>
              <h3 className={styles.div9}>合計</h3>
              <p className={styles.css40002}>${total}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderSummary;
