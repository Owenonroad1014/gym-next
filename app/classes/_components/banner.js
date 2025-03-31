// _components/Banner.js
'use client'
import React from 'react'
import styles from './_styles/banner.module.css'

import BlurText from '../../_components/blur-text';

export default function Banner({ title, subtitle }) {
  return (
    <div className={styles.bannerImageContainer}>
      <BlurText text={title} className={styles.title}/>
      <BlurText text={subtitle} className={styles.p}/>
    </div>
  )
}
