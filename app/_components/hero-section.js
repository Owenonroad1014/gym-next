// components/HeroSection.js
"use client"

import React, { useEffect } from 'react';
import styles from './_styles/hero-section.module.css';
import gsap from 'gsap';


const HeroSection = () => {

  useEffect(() => {
    gsap.from(`.${styles.content} > *`, {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.2
    });
  }, []);

  return (
  
      <div className={styles.container}>
        <div className={styles.title}>GYMBOO SPACE</div>
        <div className={styles.heroImage}>
          <div className={styles.content}>

            <div className={styles.mainHeading}>
            make progress and grow up together
            </div>
          </div>
        </div>
      </div>
    
  
  );
};

export default HeroSection;




