"use client";

import React, { useEffect, useState } from "react";
import styles from "./_styles/rental-date.module.css";

const RentalDate = ({ rentalStartDate, rentalEndDate, onDateChange }) => {
  // 計算租借天數
  const calculateRentalDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const [rentalDays, setRentalDays] = useState(calculateRentalDays(rentalStartDate, rentalEndDate));

  // 更新租借天數
  useEffect(() => {
    setRentalDays(calculateRentalDays(rentalStartDate, rentalEndDate));
  }, [rentalStartDate, rentalEndDate]);

  // 處理開始日期變更
  const handleStartDateChange = (event) => {
    const newStartDate = event.target.value;

    // 設定新的結束日期為開始日期的隔一天
    const newEndDate = new Date(newStartDate);
    newEndDate.setDate(newEndDate.getDate() + 1);
    const formattedNewEnd = newEndDate.toISOString().split("T")[0];

    // 通知父組件更新狀態
    if (onDateChange) {
      onDateChange(newStartDate, formattedNewEnd);
    }
  };

  // 處理結束日期變更
  const handleEndDateChange = (event) => {
    const newEndDate = event.target.value;
    if (newEndDate <= rentalStartDate) return; // 確保結束日期不早於開始日期

    // 通知父組件更新狀態
    if (onDateChange) {
      onDateChange(rentalStartDate, newEndDate);
    }
  };

  return (
    <>
      <div className={styles.dateSelect}>
        <label className={styles.label}>
          租借開始日期：
          <input
            type="date"
            value={rentalStartDate}
            onChange={handleStartDateChange}
            min={new Date().toISOString().split("T")[0]} // 不能選過去日期
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
            min={rentalStartDate} // 不能早於開始日期
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
