'use client'


import React from 'react'
import styles from './_styles/location-section.module.css'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function LocationSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('location-section')
      if (element) {
        const rect = element.getBoundingClientRect()
        const isInView = rect.top <= window.innerHeight && rect.bottom >= 0
        setIsVisible(isInView)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // 初始檢查

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div id="location-section" className={styles.container}>
      <div className={`${styles.button} ${isVisible ? styles.visible : ''}`}>
      <Link href="/locations" className={styles.buttonText}>尋找GYM點</Link>
      </div>
      <div className={styles.arrows}>
        <img 
          src="/arrow1.png" 
          alt="" 
          className={isVisible ? styles.visible : ''}
        />
        <img 
          src="/arrow2.png" 
          alt="" 
          className={isVisible ? styles.visible : ''}
        />
        <img 
          src="/arrow3.png" 
          alt="" 
          className={isVisible ? styles.visible : ''}
        />
      </div>
    </div>
  )
}


