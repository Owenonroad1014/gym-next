'use client'

import styles from './_styles/coaches.module.css'
import React, { useState, useEffect } from 'react'
import Search from './_components/search'
import Banner from './_components/banner'
import CoachCard from './_components/coaches-card'


export default function coachesPage() {
  // const [city, setCity] = useState('')
  // const [district, setDistrict] = useState('')
  // const [trainers, setTrainers] = useState([])
  
  
  return (
    <>
    <Banner title="GYM身教練" subtitle="從入門到進階，專業教練帶你飛。"/>
    <div className={styles.container}>
      
      
      <div className={styles.content}>
        <div className={styles.searchSection}>
          <div className={styles.coachIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <h2 className={styles.secTitle}>尋找教練</h2>
          <div className={styles.filterContainer}>
            <Search/>
          </div>
        </div>
        
        <div className={styles.resultsContainer}>
            <div className={styles.emptyResults}>
              <p>選擇地區以顯示教練</p>
            </div>
        </div>
      </div>
    </div>
    </>
  )
}