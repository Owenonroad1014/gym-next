"use client";
import React from "react";
import styles from "../_styles/carts.module.css";

function PaymentForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Payment form submission logic would go here
  };

  return (
    <section className={styles.sectionC}>
      <div className={styles.formCard}>
        <h2 className={styles.formHeader}>付款資料</h2>
        <form className={styles.formGroup} onSubmit={handleSubmit}>
          <label className={styles.formLabel} htmlFor="cardNumber">
            卡號
          </label>
          <input
            id="cardNumber"
            type="text"
            className={styles.formInput}
            required
            placeholder="XXXX XXXX XXXX XXXX"
          />

          <label className={styles.formLabel} htmlFor="cardholderName">
            持卡人姓名
          </label>
          <input
            id="cardholderName"
            type="text"
            className={styles.formInput}
            required
          />

          <label className={styles.formLabel} htmlFor="expiryDate">
            有效期限
          </label>
          <input
            id="expiryDate"
            type="text"
            className={styles.formInput}
            required
            placeholder="MM/YY"
          />

          <label className={styles.formLabel} htmlFor="securityCode">
            安全碼
          </label>
          <input
            id="securityCode"
            type="text"
            className={styles.formInput}
            required
            placeholder="CVC"
          />
        </form>
      </div>
    </section>
  );
}

export default PaymentForm;
