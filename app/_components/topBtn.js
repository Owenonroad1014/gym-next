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
    <div className={styles.container} onClick={scrollToTop}>
      <Image src="/gymdot.svg" alt='topButton' width={50} height={50}/>
      <p class={styles.text}>Back to Top</p>
    </div>
  )
}
