'use client'

import React, { useState } from 'react'
import styles from './_styles/floatBar.module.css'
import { motion } from 'framer-motion'
import { AiTwotoneCloseSquare } from 'react-icons/ai'
import { MdAddReaction } from 'react-icons/md'
const FloatingBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      className={styles.floatBar}
      animate={{
        width: isOpen ? '80%' : '60px',
        height: isOpen ? 'auto' : '60px',
      }}
      initial={false}
    >
      <button className={styles.toggleBtn} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <AiTwotoneCloseSquare /> : <MdAddReaction />}
      </button>
      {isOpen && (
        <div className={styles.content}>
          <div className={styles.addCart}>
            <div className={styles.productItem}>
              <p>啞鈴</p>
              <p>
                NT <span className={styles.price}>200</span>
              </p>
            </div>
            <button className={`${styles.btn} ${styles.add}`}>
              加入購物車
            </button>
          </div>
          <button className={`${styles.btn} ${styles.rentNote}`}>
            租借須知
          </button>
          <button className={`${styles.btn} ${styles.cart}`}>查看購物車</button>
        </div>
      )}
    </motion.div>
  )
}

export default FloatingBar
