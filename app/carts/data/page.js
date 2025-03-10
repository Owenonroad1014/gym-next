"use client";
import React from "react";
import styles from "./_styles/data.module.css";
import CheckoutProgress from "./_components/CheckoutProgress";
import OrderSummary from "./_components/OrderSummary";
import CustomerForm from "./_components/CustomerForm";
import PaymentForm from "./_components/PaymentForm";
import InvoiceForm from "./_components/InvoiceForm";
import Button from "./_components/Button";

function Body2() {
  return (
    <main className={styles.body2}>
      <CheckoutProgress />
      <OrderSummary />
      <CustomerForm />
      <PaymentForm />
      <InvoiceForm />
      <Button />      
    </main>
  );
}

export default Body2;
