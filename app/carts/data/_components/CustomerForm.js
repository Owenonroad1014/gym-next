"use client";
import React, { useState, useEffect } from "react";
import styles from "../_styles/data.module.css";

function CustomerForm({ onValidationResult }) {
  const [formData, setFormData] = useState({
    name: "",
    // address: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false); // 判斷是否已送出

  const handleChange = (e) => {
    const updatedData = { ...formData, [e.target.name]: e.target.value };
    setFormData(updatedData);

    if (isSubmitted) {
      validateForm(updatedData);
    }
  };

  const validateForm = (data) => {
    let newErrors = {};

    if (!data.name.trim()) newErrors.name = "請輸入姓名";
    // if (!data.address.trim()) newErrors.address = "請輸入地址";
    if (!/09\d{8}$/.test(data.phone)) newErrors.phone = "請輸入正確的手機號碼";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) newErrors.email = "請輸入正確的電子信箱";

    setErrors(newErrors);

    // 回傳驗證結果（true = 通過驗證, false = 失敗）
    onValidationResult(Object.keys(newErrors).length === 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    validateForm(formData);
  };

  return (
    <section className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.div}>訂購人資料</h2>

      <div className={styles.name}>
        <label htmlFor="customer-name">姓名</label>
        <input id="customer-name" name="name" className={styles.input} value={formData.name} onChange={handleChange} />
        {isSubmitted && errors.name && <span className={styles.error}>{errors.name}</span>}
      </div>

      {/* <div className={styles.address}>
        <label htmlFor="customer-address">地址</label>
        <input id="customer-address" name="address" className={styles.input2} value={formData.address} onChange={handleChange} />
        {isSubmitted && errors.address && <span className={styles.error}>{errors.address}</span>}
      </div> */}

      <div className={styles.phone}>
        <label htmlFor="customer-phone">電話</label>
        <input id="customer-phone" name="phone" className={styles.input} value={formData.phone} onChange={handleChange} />
        {isSubmitted && errors.phone && <span className={styles.error}>{errors.phone}</span>}
      </div>

      <div className={styles.email}>
        <label htmlFor="customer-email">電子信箱</label>
        <input id="customer-email" name="email" className={styles.input} value={formData.email} onChange={handleChange} />
        {isSubmitted && errors.email && <span className={styles.error}>{errors.email}</span>}
      </div>

      <div className={styles.div2}>
        <label htmlFor="order-notes">訂單備註</label>
        <textarea id="order-notes" className={styles.td}></textarea>
      </div>
    </section>
  );
}

export default CustomerForm;
