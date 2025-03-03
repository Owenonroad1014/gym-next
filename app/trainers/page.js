'use client'

import styles from './_styles/trainers.module.css'
import React, { useState, useEffect } from 'react'
import Search from './_components/search'
import TrainersCard from './_components/trainers-card'
import Sort from './_components/sort'



export default function TrainersPage(props) {
  const [city, setCity] = useState('')
  const [district, setDistrict] = useState('')
  const sortItems = ['home', '教練列表', '教練資訊']
  
  return (
    <div className={styles.container}>
  <div className={styles.bannerImageContainer}>
  <h1 className={styles.title}><span className={styles.titleWhite}>健身</span><span className={styles.titleGrey}>教練</span></h1>
  <h3 className={styles.p}>FIT<span className={styles.pHighlight}>NES</span>S <span className={styles.pHighlight}>CO</span>ACH</h3>
{/* <h3 className={styles.p}>REN<span className={styles.pHighlight}>TA</span>L</h3> */}

      </div>
      
      <div className={styles.content}>
        <div className={styles.searchSection}>
          <div className={styles.trainerIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            
          </div>
          <h2 className={styles.secTitle}>尋找教練</h2>
          <div className={styles.filterContainer}>
          <Search />
            {/* <div className={styles.filterItem}>
              <label htmlFor="city" className={styles.filterLabel}>縣市</label>
              <select 
                id="city" 
                className={styles.filterSelect}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="">選擇縣市</option>
                <option value="taipei">台北市</option>
                <option value="taichung">台中市</option>
                <option value="kaohsiung">高雄市</option>
              </select>
            </div>
            
            <div className={styles.filterItem}>
              <label htmlFor="district" className={styles.filterLabel}>地區</label>
              <select 
                id="district" 
                className={styles.filterSelect}
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              >
                <option value="">選擇地區</option>
                {city === 'taipei' && (
                  <>
                    <option value="daan">大安區</option>
                    <option value="xinyi">信義區</option>
                  </>
                )}
                {city === 'taichung' && (
                  <>
                    <option value="west">西區</option>
                    <option value="north">北區</option>
                  </>
                )}
                {city === 'kaohsiung' && (
                  <>
                    <option value="lingya">苓雅區</option>
                    <option value="sanmin">三民區</option>
                  </>
                )}
              </select>
            </div> */}
          </div>
          
          
          {/* <button className={styles.searchButton}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button> */}
        </div>
        
          
      
        
        <div className={styles.resultsContainer}>
          {/* Trainer results would be displayed here */}
          <div className={styles.emptyResults}>
            <p>選擇地區以顯示教練</p>
          </div>
        </div>
      </div>
      <div>
        <Sort items={sortItems} />
      </div>
      <div className={styles.trainersContainer}>
        <TrainersCard
          avatarUrl="https://avatar.iran.liara.run/public/boy?username=Scott"
          skill="瑜伽"
          name="王小明"
          email="123@gmail.com"
          phone ="0900111222"
          description = "專業瑜珈教練, 擁有10年教學經驗..."
          detailsUrl = "#"
          />
          <TrainersCard
          avatarUrl="https://avatar.iran.liara.run/public/boy?username=Scott"
          skill="瑜伽"
          name="王小明"
          email="123@gmail.com"
          phone ="0900111222"
          description = "專業瑜珈教練, 擁有10年教學經驗..."
          detailsUrl = "#"
          />
          <TrainersCard
          avatarUrl="https://avatar.iran.liara.run/public/boy?username=Scott"
          skill="瑜伽"
          name="王小明"
          email="123@gmail.com"
          phone ="0900111222"
          description = "專業瑜珈教練, 擁有10年教學經驗..."
          detailsUrl = "#"
          />
          <TrainersCard
          avatarUrl="https://avatar.iran.liara.run/public/boy?username=Scott"
          skill="瑜伽"
          name="王小明"
          email="123@gmail.com"
          phone ="0900111222"
          description = "專業瑜珈教練, 擁有10年教學經驗..."
          detailsUrl = "#"
          />
          <TrainersCard
          avatarUrl="https://avatar.iran.liara.run/public/boy?username=Scott"
          skill="瑜伽"
          name="王小明"
          email="123@gmail.com"
          phone ="0900111222"
          description = "專業瑜珈教練, 擁有10年教學經驗..."
          detailsUrl = "#"
          />
          <TrainersCard
          avatarUrl="https://avatar.iran.liara.run/public/boy?username=Scott"
          skill="瑜伽"
          name="王小明"
          email="123@gmail.com"
          phone ="0900111222"
          description = "專業瑜珈教練, 擁有10年教學經驗..."
          detailsUrl = "#"
          />
      </div>
      
      
    </div>
    
  )
}