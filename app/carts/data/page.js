"use client";
import React, { useState } from "react";
import styles from "./_styles/data.module.css";
import CheckoutProgress from "./_components/checkout-progress"
import CustomerForm from "./_components/CustomerForm";
import OrderSummary from "./_components/OrderSummary";
import Button from "./_components/Button"

function Data() {

  const [isFormValid, setIsFormValid] = useState(false);

  // 這個函式接收 `CustomerForm` 驗證結果，並更新狀態
  const handleValidationResult = (isValid) => {
    setIsFormValid(isValid);
  };

  return (
    <>
    <CheckoutProgress/>
    <main className={styles.data}>
      <CustomerForm onValidationResult={handleValidationResult} />
      <OrderSummary />
    </main>
    <Button isFormValid={isFormValid}/>
    </>
  );
}

export default Data;
