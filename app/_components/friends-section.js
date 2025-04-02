'use client'
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './_styles/friends-section.module.css';

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
      description: "尋找健身夥伴一起重訓"
    },
    {
      icon: "🧘",
      title: "高強度間歇訓練", 
      description: "一起進行HIIT訓練"
    },
    {
      icon: "🏋️",
      title: "交叉訓練",
      description: "加入CrossFit團練"
    }
  ]

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
        ))}
      </motion.div>
    </div>
  )
}