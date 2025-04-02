import React from "react";
import styles from "./_styles/HeroSection.module.css";

const HeroSection = () => {
  return (
    <header className={styles.hero}>
      <img
        src="/img/videoBanner.jpg"
        className={styles.heroBackground}
      />
      <div className={styles.headerContain}>
      <div className={styles.heroTitle}>影片分享
      </div>
      <p className={styles.heroContent}>不管是哪一種類型的影片，這裡應有GYM有，快來挑選自己喜歡的影片吧!</p>

      </div>
    </header>
  );
};

export default HeroSection;
