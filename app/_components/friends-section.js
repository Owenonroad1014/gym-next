'use client'  

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './_styles/friends-section.module.css';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function WorkoutFriends() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
      }
    });
  }, []);

  const cardVariants = {
    offscreen: {
      y: 300,
      rotate: -10,
      opacity: 0
    },
    onscreen: {
      y: 0,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 1.5,
        delayChildren: 1
      }
    }
  }

  const workoutTypes = [
    {
      icon: "💪",
      title: "重量訓練",
      description: "找到志同道合的重訓夥伴，一起互相鼓勵成長",
      href: "friends?category=增肌"
    },
    {
      icon: "🧘",
      title: "增強體能",
      description: "和新朋友一起挑戰HIIT，相互激勵突破極限",
      href: "friends?category=增強體能"
    },
    {
      icon: "🏋️",
      title: "健康維持",
      description: "結交運動夥伴，建立健康生活圈",
      href: "friends?category=健康維持"
    }
  ];
  

  return (
    <div className={styles.list} ref={containerRef}>
      <motion.div 
        className={styles.container}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className={styles.textContainer}>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            健身夥伴
          </motion.h2>
          <motion.p 
            className={styles.description}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            尋找同好，一起GYM步吧!
          </motion.p>
        </div>
      </motion.div>

      <motion.div 
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        {workoutTypes.map((type, index) => (
          <>
          <Link href={type.href} key={index} className={styles.grid}>
          <motion.div 
            key={index}
            className={styles.item}
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255,255,255,0.8)",
              transition: { duration: 0.2 }
            }}
          >
            <div className={styles.iconFrame}>
              <div className={styles.icon}>{type.icon}</div>
            </div>
            <div className={styles.content}>
              <h3 className={styles.itemTitle}>{type.title}</h3>
              <p className={styles.subtitle}>{type.description}</p>
            </div>
          </motion.div>
          </Link>
          </>
        ))}
      </motion.div>
    </div>
  )
}