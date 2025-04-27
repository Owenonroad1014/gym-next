'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import CoachesCard from '../_components/coaches-card'
import Breadcrumb from '../_components/bread'
import styles from '../_styles/coaches.module.css'
import Banner from '../_components/banner'
import Search from '../_components/search'
import Pagination from '../_components/pagination'
import SearchForm from '../_components/search-form'
import { COACHES_LIST } from '../../../config/api-path'
import loaderStyle from '@/app/_components/_styles/loading.module.css'

export default function CoachesListPage(props) {
  const [coaches, setCoaches] = useState([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const breadcrumb = ['home', '教練列表']
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 6
  const totalPages = Math.ceil(coaches.length / perPage)
  const currentCoaches = coaches.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  )

  useEffect(() => {
    setCurrentPage(1) // Reset to first page on new search
    const fetchCoaches = async () => {
      try {
        setCoaches([]) // Clear previous results
        setLoading(true)
        
        const location = searchParams.get('location')
        const branch = searchParams.get('branch')
        const keyword = searchParams.get('keyword')

        const response = await fetch(
          `${COACHES_LIST}?${location ? `location=${location}&` : ''}${
            branch ? `branch=${branch}&` : ''
          }${keyword ? `keyword=${keyword}` : ''}`
        )
        const data = await response.json()
        if (data.success) {
          setCoaches(data.rows)
        }
        setLoading(false)
        
      } catch (error) {
        console.error('Error:', error)
        setCoaches([]) // Clear results on error
        setLoading(false)
      }
    }
    fetchCoaches()
  }, [searchParams])
  

  return (
    <>
      <Banner
        title="GYM身教練"
        subtitle="從入門到進階，專業教練帶你飛。"
      />
      <div className={styles.container}>
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
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h2 className={styles.secTitle}>尋找教練</h2>
            <div className={styles.filterContainer}>
            <Suspense fallback={<div>Loading...</div>}>
              <Search />
            </Suspense>
            </div>
          </div>
            <div className={styles.toolsContainer}>
              <Breadcrumb breadcrumb={breadcrumb} />
              <Suspense fallback={<div>Loading...</div>}>
              <SearchForm />
              </Suspense>
              
            </div>
            {loading ? (
  <div className={styles.loaderContainer}>
    <div className={loaderStyle.loader}></div>
  </div>
) : (
  <>
    <div className={styles.coachesContainer}>
      {currentCoaches.length > 0 ? (
        currentCoaches.map((coach) => (
          <CoachesCard
            key={coach.id}
            id={coach.id}
            name={coach.name}
            email={coach.email}
            phone={coach.phone}
            skill={coach.skill}
            description={coach.description}
            avatar={coach.avatar}
          />
        ))
      ) : (
        <div className={styles.noResults}>
          <p>沒有該分店的教練資料</p>
        </div>
      )}
    </div>
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  </>
)}
        </div>
      </div>
    </>
  )
}
