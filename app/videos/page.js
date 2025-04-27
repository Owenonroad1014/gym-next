"use client";
import React, { Suspense} from "react";
import HeroSection from "./components/HeroSection";
import VideoGrid from "./components/video-Grid";
import styles from "./components/_styles/videos.module.css";
import Breadcrumb from "./components/breadcrumb";
import Search from "./components/search";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/auth-context";


const Videos = () => {
  const searchParams = useSearchParams();
  const { auth } = useAuth();

  return (
    <main className={styles.equipmentRental}>
    <HeroSection />
    <Breadcrumb />
    <section className={styles.contentSection}>
      <div className={styles.contentTitle}>
        <div className="btnAndSearch">
        <Suspense fallback={<div>Loading...</div>}>
          <Search searchParams={searchParams}/>
        </Suspense>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
      <VideoGrid auth={auth} />
      </Suspense>
    </section>
  </main>
  );
};

export default Videos;
