"use client";
import React from "react";
import { useCart } from "@/context/cart-context"; // 引入 Context
import styles from "./_styles/payment-method-section.module.css";

function PaymentMethodSection() {
  const { paymentMethod, updatePaymentMethod } = useCart(); // 從 Context 取得狀態
  const paymentMethods = ["信用卡", "現金"]; 

  return (
    <div className={styles.sectionContainer}>
      <h3 className={styles.sectionTitle}>付款方式</h3>

      {/* 選擇付款方式 */}
      <div className={styles.dropdownContainer}>
        <select
          className={styles.paymentDropdown}
          value={paymentMethod}
          onChange={(e) => updatePaymentMethod(e.target.value)} // 更新 Context 狀態
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
