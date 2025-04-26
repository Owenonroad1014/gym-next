"use client";
import React from 'react'
import styles from './_styles/topBtn.module.css'
import Image from 'next/image'
export default function topBtn() {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });}
  return (
    <div className={styles.container} role="button" // 指定角色為按鈕
    tabIndex={0}    // 使元素可聚焦
    onClick={scrollToTop}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {  // 支援鍵盤 Enter 或 Space 鍵點擊
        scrollToTop();
      }
    }}
    >
      <Image src="/gymdot.svg" alt='topButton' width={50} height={50}/>
      <p className={styles.text}>Back to Top</p>
    </div>
  )
}
