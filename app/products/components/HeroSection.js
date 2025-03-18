import React from "react";
import styles from "./_styles/HeroSection.module.css";

const HeroSection = () => {
  return (
    <header className={styles.hero}>
      <img
        src="/img/banner.jpg"
        className={styles.heroBackground}
      />
      <div className={styles.headerContain}>
      <div className={styles.heroTitle}>器材租借
      </div>
      <p className={styles.heroContent}>工欲善其事，必先利其器，你想要的器材GYM在這裡，快來挑選你要的器材吧!</p>

      </div>
    </header>
  );
};

export default HeroSection;
