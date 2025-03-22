"use client";

import React, { useState, useEffect } from "react";
import styles from "./_styles/rental-date.module.css"

const RentalDate = ({ product, updateCartItem,price, id }) => {
  // 取得今天的日期
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // 格式化為 YYYY-MM-DD
  };

  // 設定初始日期
  const todayDate = getTodayDate();
  const nextDayDate = new Date();
  nextDayDate.setDate(nextDayDate.getDate() + 1);
  const formattedNextDay = nextDayDate.toISOString().split("T")[0];

  const [rentalStartDate, setRentalStartDate] = useState(todayDate);
  const [rentalEndDate, setRentalEndDate] = useState(formattedNextDay);
  const [rentalDays, setRentalDays] = useState(1);

  

  // 計算租借天數
  const calculateRentalDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  // 處理開始日期變更
  const handleStartDateChange = (event) => {
    const newStartDate = event.target.value;
    setRentalStartDate(newStartDate);
    updateCartItem(id, { rentalStartDate: newStartDate });
  
    // 自動調整結束日期為開始日期的隔一天
    const newEndDate = new Date(newStartDate);
    newEndDate.setDate(newEndDate.getDate() + 1);
    const formattedNewEnd = newEndDate.toISOString().split("T")[0];
  
    setRentalEndDate(formattedNewEnd);
    updateCartItem(id, { rentalEndDate: formattedNewEnd });
  
    // 更新租借天數
    setRentalDays(calculateRentalDays(newStartDate, formattedNewEnd));
  };

  // 處理結束日期變更
  const handleEndDateChange = (event) => {
    const newEndDate = event.target.value;
    if (newEndDate <= rentalStartDate) return; // 確保結束日期不早於開始日期

    setRentalEndDate(newEndDate);
    updateCartItem(id, { rentalEndDate: newEndDate });

    // 更新租借天數
    setRentalDays(calculateRentalDays(rentalStartDate, newEndDate));
  };

  // 更新租借天數
  useEffect(() => {
    setRentalDays(calculateRentalDays(rentalStartDate, rentalEndDate));
  }, [rentalStartDate, rentalEndDate]);

  // 總價（不會顯示在畫面上，但可以傳到後端）
  const subtotal = price * rentalDays;

  return (
    <>
    <div className={styles.dateSelect}>
      <label className={styles.label}>
        租借開始日期：
        <input
          type="date"
          value={rentalStartDate}
          onChange={handleStartDateChange}
          min={todayDate} 
          className={styles.input}
        />
      </label>
        <br />
      <label className={styles.label}>
        租借結束日期：
        <input
          type="date"
          value={rentalEndDate}
          onChange={handleEndDateChange}
          min={rentalStartDate} 
          className={styles.input}
        />
      </label>
    </div>
    <br />
    <p className={styles.rentalDays}>租借天數：{rentalDays} 天</p>
    </>
  );
};

export default RentalDate;
