"use client";
import React, { useState } from "react";
import styles from "./_styles/ProductDetail.module.css";

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);

  const decrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const increase = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className={styles.quantitySelector}>
      <button
        onClick={decrease}
        className={styles.quantityButton}
        aria-label="Decrease quantity"
      >
        _
      </button>
      <span className={styles.quantityValue}>{quantity}</span>
      <button
        onClick={increase}
        className={styles.quantityButton}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
