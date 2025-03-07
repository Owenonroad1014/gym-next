"use client";
import React from "react";
import styles from "../_styles/carts.module.css";

function InvoiceForm() {
  return (
    <section className={styles.sectionD}>
      <div className={styles.formCard}>
        <h2 className={styles.formHeader}>發票</h2>
        <div className={styles.invoiceSection}>
          <div>
            <label className={styles.formLabel} htmlFor="carrierType">
              載具類型
            </label>
            <select id="carrierType" className={styles.dropdown}>
              <option value="">請選擇載具類型</option>
              <option value="mobile">手機條碼</option>
              <option value="citizen">自然人憑證</option>
              <option value="none">無載具</option>
            </select>
          </div>
          <div>
            <label className={styles.formLabel} htmlFor="invoiceType">
              發票類型
            </label>
            <select id="invoiceType" className={styles.dropdown}>
              <option value="">請選擇發票類型</option>
              <option value="personal">個人發票</option>
              <option value="company">公司發票</option>
              <option value="donation">捐贈發票</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InvoiceForm;
