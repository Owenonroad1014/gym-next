'use client'

import React, { useState, useEffect } from 'react'
import CoachesCard from '../_components/coaches-card'
import Breadcrumb from '../_components/breadcrumb'
import styles from '../_styles/coaches.module.css'
import Banner from '../_components/banner'
import Search from '../_components/search'

export default function CoachesListPage(props) {
  const breadcrumb = ['home', '教練列表']


  return (
    <>
    <Banner title="健身教練" subtitle="FITNESS COACH"/>
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
        
        <div> 
        <Breadcrumb breadcrumb={breadcrumb} />
      </div>
      <div className={styles.coachesContainer}>
        <CoachesCard
          avatarUrl="https://avatar.iran.liara.run/public/boy?username=Scott"
          skill="瑜伽"
          name="王小明"
          email="123@gmail.com"
          phone ="0900111222"
          description = "專業瑜珈教練, 擁有10年教學經驗..."
          detailsUrl = "/coaches/list/detail"
          />
          <CoachesCard
          avatarUrl="https://avatar.iran.liara.run/public/boy?username=Scott"
          skill="瑜伽"
          name="王小明"
          email="123@gmail.com"
          phone ="0900111222"
          description = "專業瑜珈教練, 擁有10年教學經驗..."
          detailsUrl = "/coaches/list/detail"
          />
          <CoachesCard
          avatarUrl="https://avatar.iran.liara.run/public/boy?username=Scott"
          skill="瑜伽"
          name="王小明"
          email="123@gmail.com"
          phone ="0900111222"
          description = "專業瑜珈教練, 擁有10年教學經驗..."
          detailsUrl = "/coaches/list/detail"
          />
          <CoachesCard
          avatarUrl="https://avatar.iran.liara.run/public/boy?username=Scott"
          skill="瑜伽"
          name="王小明"
          email="123@gmail.com"
          phone ="0900111222"
          description = "專業瑜珈教練, 擁有10年教學經驗..."
          detailsUrl = "/coaches/list/detail"
          />
          <CoachesCard
          avatarUrl="https://avatar.iran.liara.run/public/boy?username=Scott"
          skill="瑜伽"
          name="王小明"
          email="123@gmail.com"
          phone ="0900111222"
          description = "專業瑜珈教練, 擁有10年教學經驗..."
          detailsUrl = "/coaches/list/detail"
          />
          <CoachesCard
          avatarUrl="https://avatar.iran.liara.run/public/boy?username=Scott"
          skill="瑜伽"
          name="王小明"
          email="123@gmail.com"
          phone ="0900111222"
          description = "專業瑜珈教練, 擁有10年教學經驗..."
          detailsUrl = "/coaches/list/detail"
          />
      </div>
      </div> 
      </div> 

    </>
  )
}
  