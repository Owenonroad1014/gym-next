'use client'

import styles from './_styles/classes.module.css'
import React, { useState, useEffect } from 'react'
import Search from './_components/search'
import Banner from './_components/banner'
import TabButton from './_components/tabButton'
import Filter from './_components/filter'


export default function ClassesPage() {
  // const [city, setCity] = useState('')
  // const [district, setDistrict] = useState('')
  // const [trainers, setTrainers] = useState([])
  const [activeTab, setActiveTab] = useState('search')

  return (
    <>
      <Banner title="課程專區" subtitle="FITNESS CLASSES" />
      <div className={styles.container}>
        <div className={styles.tabButtons}>
          <TabButton
            isActive={activeTab === 'search'}
            onClick={() => setActiveTab('search')}
          >
            課表查詢
          </TabButton>
          <TabButton
            isActive={activeTab === 'intro'}
            onClick={() => setActiveTab('intro')}
          >
            課程介紹
          </TabButton>
        </div>

        {activeTab === 'search' ? (
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
            <div className={styles.resultsContainer}>
              <div className={styles.emptyResults}>
                <p>選擇場館以顯示該場館課程</p>
              </div>
            </div>
          </div>
        ) : (

            <Filter />
         
        )}
      </div>
    </>
  )
}
