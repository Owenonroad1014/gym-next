"use client";
import React from "react";
import styles from "./_styles/cart-product-item.module.css";
import { useCart } from "@/context/cart-context";

function CartProductItem({ product }) {
  const { 
    updateCartItem,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart, } = useCart(); //取得購物車更新函式
  const today = new Date().toISOString().split("T")[0]; // 取得今天的日期
  const rentalStartDate = product.rentalStartDate || "";
  const rentalEndDate = product.rentalEndDate || "";

  

  // 計算租借天數
  const calculateRentalDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 1; // 若未選擇日期，天數為 1
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // 轉換成天數
    return diffDays > 0 ? diffDays : 1; // 確保天數不為負數
  };

  const rentalDays = calculateRentalDays(rentalStartDate, rentalEndDate);
  

  // 處理開始日期變更
  const handleStartDateChange = (event) => {
    const newStartDate = event.target.value;
    if (newStartDate < today) return;
    updateCartItem(product.id, { rentalStartDate: newStartDate });

    // 如果結束日期比開始日期早，重置結束日期
    if (rentalEndDate && rentalEndDate < newStartDate) {
      updateCartItem(product.id, { rentalEndDate: "" });
    }
  };

  // 處理結束日期變更
  const handleEndDateChange = (event) => {
    const newEndDate = event.target.value;
    if (newEndDate < rentalStartDate) return;
    updateCartItem(product.id, { rentalEndDate: newEndDate });
  };


  const subtotal = product.price * product.quantity * rentalDays; 

  return (
    <article className={styles.productItem}>
      <div className={styles.productInfo}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.productImage}
        />
        <div className={styles.productDetails}>
          <h3 className={styles.productName}>{product.name}</h3>
          <p className={styles.productWeight}>{product.weight}</p>
          {/*刪除按鈕 */}
          <button className={styles.removeButton} onClick={() => removeFromCart(product.id)}>
            <div className={styles.removeButtonContent}>
              <i className={styles.removeIcon} />
              <span>移除</span>
            </div>
          </button>
        </div>
      </div>

      {/* 租借日期選擇 */}
      <div className={styles.rentalDate}>
        <label>開始日期：</label>
        <input
          type="date"
          value={rentalStartDate}
          onChange={handleStartDateChange}
          className={styles.dateInput}
          min={today}
        />

        <label>結束日期：</label>
        <input
          type="date"
          value={rentalEndDate}
          onChange={handleEndDateChange}
          className={styles.dateInput}
          min={rentalStartDate || today} // 限制結束日期不能早於開始日期
          disabled={!rentalStartDate} // 未選擇開始日期時，禁用結束日期
        />
        <p>租借天數：{rentalDays} 天</p>
      </div>

        {/* 價格計算 */}
      <div className={styles.productPricing}>
        <div className={styles.quantityControl}>
          <div className={styles.quantityButtons}>
            <button onClick={() => decreaseQuantity(product.id)} aria-label="Decrease quantity" disabled={product.quantity <= 1}>
              -
            </button>
            <span>{product.quantity}</span>
            <button onClick={() => increaseQuantity(product.id)} aria-label="Increase quantity">
              +
            </button>
          </div>
        </div>
        <p className={styles.unitPrice}>${product.price}</p>
        <p className={styles.subtotalPrice}>${subtotal}</p>
      </div>
    </article>
  );
}

export default CartProductItem;
