'use client'

import styles from '../_styles/classes.module.css'
import React, { useState, useEffect } from 'react'
import Search from '../_components/search'
import Banner from '../_components/banner'
import TabButton from '../_components/tabButton'
import Filter from '../_components/filter'
import Sort from '../_components/sort'
import ClassesIntro from '../../_components/classes-intro'
import { CLASSES_LIST } from '../../../config/api-path'
import { useSearchParams } from 'next/navigation'
import Calendar from '../_components/calendar'

export default function ClassCalenderPage(props) {
  const [activeTab, setActiveTab] = useState('search')
  const searchParams = useSearchParams()
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const location = searchParams.get('location')
  const branch = searchParams.get('branch')
          
const fetchClasses = async () => {
        try {
          
          const response = await fetch(
            `${CLASSES_LIST}?${
              location ? `location=${location}&` : ''
            }${
              branch ? `branch=${branch}&` : ''
            }`
          )
          const data = await response.json()
          if(data.success) {
            setClasses(data.rows)
          }
          setLoading(false)
        } catch (error) {
          console.error('Error:', error)
          setLoading(false)
        }
      }
  useEffect(() => {
      
      fetchClasses();
    }, [searchParams, location, branch])

    const handleReservationSuccess = () => {
      fetchClasses();
    }

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

            <div>{/* filter */}</div>
            <Calendar 
      classes={classes.map(classes => ({
        id: classes.id,
        date: classes.class_date,
        title: classes.title,
        time: `${classes.start_time.slice(0, 5)} - ${classes.end_time.slice(0, 5)}`,
        coach_name: classes.coach_name,
        max_capacity: classes.max_capacity,
        current_capacity: classes.current_capacity,
        coach_id: classes.coach_id,
        start_time: classes.start_time,
        end_time: classes.end_time,
        location: classes.location,
        branch: classes.branch,
      }))} 
      location={location}
      branch={branch} 
      onReservationSuccess={handleReservationSuccess}
      />
          </div>
        ) : (
          <>
            <Filter />
            <h2>靜態課程</h2>
            <Sort />
            <ClassesIntro
              title="靜態課程-1"
              description="採用重量訓練的正金字塔訓練法，相同肌群的抗阻力訓練會重覆進行三個循環並逐次增加負重，給予肌肉不同抗阻的刺激，突破肌耐力的訓練瓶頸。"
              avatarUrl="/images/yoga.jpg"
            />

            <ClassesIntro
              title="靜態課程-2"
              description="採用重量訓練的正金字塔訓練法，相同肌群的抗阻力訓練會重覆進行三個循環並逐次增加負重，給予肌肉不同抗阻的刺激，突破肌耐力的訓練瓶頸。"
              avatarUrl="/images/yoga.jpg"
              variant="type2"
            />
            <ClassesIntro
              title="靜態課程-1"
              description="採用重量訓練的正金字塔訓練法，相同肌群的抗阻力訓練會重覆進行三個循環並逐次增加負重，給予肌肉不同抗阻的刺激，突破肌耐力的訓練瓶頸。"
              avatarUrl="/images/yoga.jpg"
            />

            <ClassesIntro
              title="靜態課程-2"
              description="採用重量訓練的正金字塔訓練法，相同肌群的抗阻力訓練會重覆進行三個循環並逐次增加負重，給予肌肉不同抗阻的刺激，突破肌耐力的訓練瓶頸。"
              avatarUrl="/images/yoga.jpg"
              variant="type2"
            />
          </>
        )}
      </div>
    </>
  )
}
