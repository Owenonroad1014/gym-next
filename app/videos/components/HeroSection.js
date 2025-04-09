"use client"
import React from "react";
import styles from "./_styles/HeroSection.module.css";
import BlurText from "@/app/_components/blur-text";

const HeroSection = () => {
  return (
    <header className={styles.hero}>
      <img
        src="/img/videoBanner.jpg"
        className={styles.heroBackground}
      />
      <div className={styles.headerContain}>
      <BlurText text="影片分享" className={styles.heroTitle}/>
      <BlurText text="不管是哪一種類型的影片，這裡應有GYM有，快來挑選自己喜歡的影片吧!" className={styles.heroContent}/>
      </div>
     
    </header>
  );
};

export default HeroSection;
