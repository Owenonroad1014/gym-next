import React from "react";
import styles from "./_styles/AddToCartButton.module.css";

const AddToCartButton = ({ variant }) => {
  const buttonClass =
    variant === "light" ? styles.buttonLight : styles.buttonDark;

  return (
    <button className={`${styles.button} ${buttonClass}`}>查看更多</button>
  );
};

export default AddToCartButton;
