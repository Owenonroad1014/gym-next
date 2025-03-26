"use client";
import React, { useState, useEffect } from "react";
import styles from "../_styles/data.module.css";

function CustomerForm({ onValidationResult, isSubmitted,}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
 
  
  const validateForm = (data, isFinalCheck = false) => {
    let newErrors = {};

    if (!data.name.trim()) {
      if (isFinalCheck) newErrors.name = "請輸入姓名";
    } else if (!/^[\u4e00-\u9fa5a-zA-Z]{2,20}$/.test(data.name)) {
      newErrors.name = "姓名格式錯誤，請輸入 2~20 個中文字或英文";
    }

    if (!data.phone.trim()) {
      if (isFinalCheck) newErrors.phone = "請輸入手機號碼";
    } else if (!/^09\d{8}$/.test(data.phone)) {
      newErrors.phone = "請輸入正確的手機號碼 (格式：09xxxxxxxx)";
    }

    if (!data.email.trim()) {
      if (isFinalCheck) newErrors.email = "請輸入電子信箱";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "請輸入正確的電子信箱";
    }

    setErrors(newErrors);
    onValidationResult(Object.keys(newErrors).length === 0);
  };

  useEffect(() => {
    if (isSubmitted) {
      validateForm(formData, true);
    }
  }, [isSubmitted]);

  const handleChange = (e) => {
    const updatedData = { ...formData, [e.target.name]: e.target.value };
    setFormData(updatedData);
    validateForm(updatedData, false);
  };
  

  return (
    <>
    <div className={styles.form}>
      <h2 className={styles.div}>訂購人資料</h2>

      <div className={styles.name}>
        <label htmlFor="customer-name">姓名</label>
        <input
          id="customer-name"
          name="name"
          type="text"
          className={`${styles.input} ${errors.name ? styles.errorInput : ""}`}
          value={formData.name}
          placeholder="請填寫姓名"
          onChange={handleChange} />
        {(isSubmitted || errors.name) && errors.name && (
          <span className={styles.error}>{errors.name}</span>
        )}
      </div>

      <div className={styles.phone}>
        <label htmlFor="customer-phone">電話</label>
        <input
          id="customer-phone"
          name="phone"
          type="text"
          className={`${styles.input} ${errors.phone ? styles.errorInput : ""}`}
          value={formData.phone}
          placeholder="請輸入電話"
          onChange={handleChange} />
        {(isSubmitted || errors.phone) && errors.phone && (
          <span className={styles.error}>{errors.phone}</span>
        )}
      </div>

      <div className={styles.email}>
        <label htmlFor="customer-email">電子信箱</label>
        <input
          id="customer-email"
          name="email"
          className={`${styles.input} ${errors.email ? styles.errorInput : ""}`}
          value={formData.email}
          placeholder="請輸入 e-mail"
          onChange={handleChange} />
        {(isSubmitted || errors.email) && errors.email && (
          <span className={styles.error}>{errors.email}</span>
        )}
      </div>

      <div className={styles.div2}>
        <label htmlFor="order-notes">訂單備註</label>
        <textarea id="order-notes" className={styles.td}></textarea>
      </div>
    
    <div className={styles.formCard}>
        <h2 className={styles.formHeader}>發票</h2>
        <div>
          <label className={styles.formLabel} htmlFor="invoiceType">
            發票類型
          </label>
          <select id="invoiceType" className={styles.dropdown}>
            <option value="">請選擇發票類型</option>
            <option value="personal">紙本發票</option>
            <option value="company">電子發票</option>
            <option value="donation">捐贈發票</option>
          </select>
        </div>
      </div>
    </div>
    </>
  );
}

export default CustomerForm;
