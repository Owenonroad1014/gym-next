"use client"

import  { motion } from "framer-motion"
import styles from "./_styles/sidebar.module.css"
// import * as motion from "motion/react-client"
// import { useEffect, useRef, useState } from "react"

const Variants = () => {
    const list = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
      }
      
      const item = {
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: -100 },
      }
      
      return (
        <motion.ul
          initial="hidden"
          whileInView="visible"
          variants={list}
        >
          <motion.li variants={item} className={styles.item}/>
          <motion.li variants={item} className={styles.item}/>
          <motion.li variants={item} className={styles.item}/>
        </motion.ul>
      )
}

export default Variants;
