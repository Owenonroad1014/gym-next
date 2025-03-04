// _components/Banner.js
'use client'
import React from 'react'
import styles from './_styles/banner.module.css'

export default function Banner({ title, subtitle }) {
  return (
    <div className={styles.bannerImageContainer}>
      <h1 className={styles.title}>{title}</h1>
      <h3 className={styles.p}>{subtitle}</h3>
    </div>
  )
}
