import React from "react";
import styles from "./_styles/AddToCartButton.module.css";

const AddToCartButton = ({ variant }) => {
  const buttonClass =
    variant === "light" ? styles.buttonLight : styles.buttonDark;

  return (
    <button className={`${styles.button} ${buttonClass}`}>加入購物車</button>
  );
};

export default AddToCartButton;
