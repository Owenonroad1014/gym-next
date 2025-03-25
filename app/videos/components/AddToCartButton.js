import React from "react";
import styles from "./_styles/AddToCartButton.module.css";

const AddToCartButton = ({ variant, onClick }) => {
  const buttonClass =
    variant === "light" ? styles.buttonLight : styles.buttonDark;

  return (
    <>

    <div
      className={`${styles.button} ${buttonClass}`}
      // onClick={onClick}
    >
      查看更多
    </div>
    </>
  );
};

export default AddToCartButton;
