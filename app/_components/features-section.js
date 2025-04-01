// components/FeaturesSection.js
"use client"
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaDumbbell, FaBook, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './_styles/home.module.css';

gsap.registerPlugin(ScrollTrigger);

const FeatureCard = ({ icon: Icon, title, description, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
      },
      delay: index * 0.2
    });
  }, [index]);

  return (
    <motion.div 
      className={styles.card}
      ref={cardRef}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className={styles.iconContainer}>
        <Icon className={styles.icon} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: FaDumbbell,
      title: '找教練',
      description: '展開你的GYM新技能，專業導師帶領！'
    },
    {
      icon: FaBook,
      title: 'GYM享知識',
      description: '學習更多免費知識，掌握正確運動觀念'
    },
    {
      icon: FaMapMarkerAlt,
      title: '找GYM點',
      description: '尋找離你最近的運動空間'
    },
    {
      icon: FaUsers,
      title: '找GYM友',
      description: '和志同道合的夥伴一起運動'
    }
  ];

  return (
    <section className={styles.container}>
      <div className={styles.grid}>
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;