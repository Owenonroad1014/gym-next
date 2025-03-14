"use client";
import React, { useState } from "react";
import styles from "./_styles/payment-method-section.module.css";

function PaymentMethodSection() {
  const [selectedMethod, setSelectedMethod] = useState(""); // 儲存選擇的付款方式
  const paymentMethods = ["信用卡", "現金"]; // 選項

  const handleMethodChange = (event) => {
    setSelectedMethod(event.target.value);
  };

  return (
    <div className={styles.sectionContainer}>
      <h3 className={styles.sectionTitle}>付款方式</h3>

      {/* 選擇付款方式 */}
      <div className={styles.dropdownContainer}>
        <select
          className={styles.paymentDropdown}
          value={selectedMethod}
          onChange={handleMethodChange}
        >
          <option value="">請選擇付款方式</option>
          {paymentMethods.map((method, index) => (
            <option key={index} value={method}>
              {method}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default PaymentMethodSection;
