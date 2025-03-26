"use client";
import React, { useState } from "react";
import styles from "./_styles/data.module.css";
import CheckoutProgress from "./_components/checkout-progress"
import CustomerForm from "./_components/CustomerForm";
import OrderSummary from "./_components/OrderSummary";
import Button from "./_components/Button"

function Data() {

  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({});

  return (
    <>
    <CheckoutProgress/>
    <main className={styles.data}>
      <CustomerForm onValidationResult={setIsFormValid} isSubmitted={isSubmitted} onCustomerInfoChange={setCustomerInfo}/>
      <OrderSummary />
    </main>
    <Button isFormValid={isFormValid} setIsSubmitted={setIsSubmitted} customerInfo={customerInfo}/>
    </>
  );
}

export default Data;
