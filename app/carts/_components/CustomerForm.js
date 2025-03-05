"use client";
import React from "react";
import styles from "../_styles/carts.module.css";

function CustomerForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
  };

  return (
    <section className={styles.sectionB}>
      <div className={styles.formCard}>
        <h2 className={styles.formHeader}>訂購人資料</h2>
        <form className={styles.formGroup} onSubmit={handleSubmit}>
          <label className={styles.formLabel} htmlFor="name">
            姓名
          </label>
          <input id="name" type="text" className={styles.formInput} required />

          <label className={styles.formLabel} htmlFor="address">
            地址
          </label>
          <input
            id="address"
            type="text"
            className={styles.formInput}
            required
          />

          <label className={styles.formLabel} htmlFor="email">
            電子信箱
          </label>
          <input
            id="email"
            type="email"
            className={styles.formInput}
            required
          />

          <label className={styles.formLabel} htmlFor="phone">
            手機號碼
          </label>
          <input id="phone" type="tel" className={styles.formInput} required />

          <label className={styles.formLabel} htmlFor="notes">
            訂單備註
          </label>
          <textarea id="notes" className={styles.formTextarea} />
        </form>
      </div>
    </section>
  );
}

export default CustomerForm;
