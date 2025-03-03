"use client";
import React from "react";
import HeroSection from "./components/HeroSection";
import ProductGrid from "./components/ProductGrid";
import styles from "./components/_styles/EquipmentRental.module.css";
import Sort from "./components/sort";
import Search from "./components/search";

const EquipmentRental = () => {
  return (
    <main className={styles.equipmentRental}>
      <HeroSection />
      <section className={styles.contentSection}>
      <div className={styles.contentTitle}>
      <Sort />
      <Search />
      </div>
      
        <ProductGrid />
      </section>
    </main>
  );
};

export default EquipmentRental;
