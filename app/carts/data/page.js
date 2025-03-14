"use client";
import React from "react";
import styles from "./_styles/data.module.css";
import CheckoutProgress from "./_components/checkout-progress";
import OrderSummary from "./_components/order-summary";
import CustomerForm from "./_components/customer-form";
import PaymentForm from "./_components/payment-form";
import InvoiceForm from "./_components/invoice-form";
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
