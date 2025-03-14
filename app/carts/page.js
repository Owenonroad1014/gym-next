"use client";
import React from "react";
import styles from "./_styles/ShoppingCart.module.css";
import CheckoutProgress from "./_components/CheckoutProgress";
import CartHeader from "./_components/CartHeader";
import CartProductList from "./_components/CartProductList";
import OrderSummary from "./_components/OrderSummary";

function ShoppingCart() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Noto+Sans+TC:wght@400;500&family=Poppins:wght@400;500&display=swap"
        rel="stylesheet"
      />
      
      <main className={styles.cartContainer}>
      <CheckoutProgress />
        <CartHeader />
        <section className={styles.cartContent}>
          <CartProductList />
          <OrderSummary />
        </section>
      </main>
    </>
  );
}

export default ShoppingCart;
