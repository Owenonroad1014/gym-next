"use client";
import React from "react";
import styles from "./_styles/shopping-cart.module.css";
import CheckoutProgress from "./_components/checkout-progress";
import CartHeader from "./_components/cart-header";
import CartProductList from "./_components/cart-product-list";
import OrderSummary from "./_components/order-summary";

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
