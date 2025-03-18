"use client";
import React from "react";
import HeroSection from "./components/HeroSection";
import ProductGrid from "./components/ProductGrid";
import styles from "./components/_styles/EquipmentRental.module.css";
import Breadcrumb from "./components/breadcrumb";
import Search from "./components/search";
import { useSearchParams } from "next/navigation";

const EquipmentRental = () => {
const searchParams = useSearchParams();
  return (
    <main className={styles.equipmentRental}>
      <HeroSection />
      <section className={styles.contentSection}>
      <div className={styles.contentTitle}>
      <Breadcrumb />
      <div className="btnAndSearch">
      <Search searchParams={searchParams}/>
      </div>
      </div>
        <ProductGrid >
      </ProductGrid>
      </section>
    </main>
  );
};

export default EquipmentRental;
