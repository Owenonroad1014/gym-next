import React from "react";
import styles from "./_styles/HeroSection.module.css";

const HeroSection = () => {
  return (
    <header className={styles.hero}>
      <img
        src="/img/banner.jpg"
        className={styles.heroBackground}
      />
      <div className="headerContain">
      <h1 className={styles.heroTitle}>器材租借</h1>
      </div>
    </header>
  );
};

export default HeroSection;
