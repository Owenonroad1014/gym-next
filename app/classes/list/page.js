'use client'

import React, { useState, useEffect } from 'react'
import styles from '../_styles/coaches.module.css'
import Banner from '../_components/banner'
import Search from '../_components/search'
import Calendar from '../_components/calendar'

export default function CoachesListPage(props) {
  const courses = [
    {
      id: '1',
      date: new Date(2025, 2, 11
      ),
      title: '瑜珈初級班',
      time: '19:00 - 20:00'
      
    },
    {
      id: '2',
      date: new Date(2025, 2, 20
      ),
      title: '重訓班',
      time: '19:00 - 20:00'
    },
  ];


  return (
    <>
      <div className={styles.container}>
        <Banner title="課程專區" subtitle="FITNESS CLASSES" />

        <div className={styles.content}>
          <div className={styles.searchSection}>
            <div className={styles.coachIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                <line x1="12" y1="6" x2="16" y2="6"></line>
                <line x1="12" y1="10" x2="16" y2="10"></line>
                <line x1="12" y1="14" x2="16" y2="14"></line>
              </svg>
            </div>
            <h2 className={styles.secTitle}>課表查詢</h2>
            <div className={styles.filterContainer}>
              <Search />
            </div>
          </div>

          <div>{/* filter */}</div>
          <Calendar courses={courses} />

          
        </div>
      </div>
    </>
  )
}
