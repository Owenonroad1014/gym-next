"use client";
import React, { useState } from "react";
import styles from "./_styles/CartProductItem.module.css";

function CartProductItem({ product }) {
  const [quantity, setQuantity] = useState(product.quantity);
  const [rentalStartDate, setRentalStartDate] = useState("");
  const [rentalEndDate, setRentalEndDate] = useState("");

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleStartDateChange = (event) => {
    const newStartDate = event.target.value;
    setRentalStartDate(newStartDate);

    // 如果結束日期比開始日期早，重置結束日期
    if (rentalEndDate && rentalEndDate < newStartDate) {
      setRentalEndDate("");
    }
  };

  const handleEndDateChange = (event) => {
    setRentalEndDate(event.target.value);
  };

  const subtotal = product.price * quantity;

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
          <button className={styles.removeButton}>
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
        />

        <label>結束日期：</label>
        <input
          type="date"
          value={rentalEndDate}
          onChange={handleEndDateChange}
          className={styles.dateInput}
          min={rentalStartDate} // 限制結束日期不能早於開始日期
          disabled={!rentalStartDate} // 未選擇開始日期時，禁用結束日期
        />
      </div>

      <div className={styles.productPricing}>
        <div className={styles.quantityControl}>
          <div className={styles.quantityButtons}>
            <button onClick={handleDecrement} aria-label="Decrease quantity">
              -
            </button>
            <span>{quantity}</span>
            <button onClick={handleIncrement} aria-label="Increase quantity">
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
