"use client"
import React from "react";
import styles from "./_styles/HeroSection.module.css";
import BlurText from "@/app/_components/blur-text";

const HeroSection = () => {
  return (
    <header className={styles.hero}>
      <img
        src="/img/banner.jpg"
        className={styles.heroBackground}
      />
      <div className={styles.headerContain}>
      <BlurText text="器材租借" className={styles.heroTitle}/>
      <BlurText text="工欲善其事，必先利其器，你想要的器材GYM在這裡，快來挑選你要的器材吧!!" className={styles.heroContent}/>
    

      </div>
    </header>
  );
};

export default HeroSection;
