"use client";
import React from "react";
import HeroSection from "./components/HeroSection";
import ProductGrid from "./components/ProductGrid";
import styles from "./components/_styles/EquipmentRental.module.css";
import Breadcrumb from "./components/breadcrumb";
import Search from "./components/search";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/auth-context";

const EquipmentRental = () => {
  const searchParams = useSearchParams();
  const { auth } = useAuth();
  
  return (
    <main className={styles.equipmentRental}>
      <HeroSection />
      <Breadcrumb />
      <section className={styles.contentSection}>
        <div className={styles.contentTitle}>
          <div className="btnAndSearch">
            <Search searchParams={searchParams}/>
          </div>
        </div>
        <ProductGrid auth={auth} />
      </section>
    </main>
  );
};

export default EquipmentRental;
