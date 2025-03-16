'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import CoachesCard from '../_components/coaches-card'
import Breadcrumb from '../_components/breadcrumb'
import styles from '../_styles/coaches.module.css'
import Banner from '../_components/banner'
import Search from '../_components/search'
import Pagination from '../_components/pagination'
import SearchForm from '../_components/search-form'
import { COACHES_LIST } from '../../../config/api-path'



export default function CoachesListPage(props) {
  const [coaches, setCoaches] = useState([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const breadcrumb = ['home', '教練列表']
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 1
  const totalPages = Math.ceil(coaches.length / perPage)
  const currentCoaches = coaches.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );


  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const location = searchParams.get('location')
        const branch = searchParams.get('branch')
        const keyword = searchParams.get('keyword')
        
        const response = await fetch(
          `${COACHES_LIST}?${
            location ? `location=${location}&` : ''
          }${
            branch ? `branch=${branch}&` : ''
          }${
            keyword ? `keyword=${keyword}` : ''
          }`
        )
        const data = await response.json()
        if(data.success) {
          setCoaches(data.rows)
        }
        setLoading(false)
      } catch (error) {
        console.error('Error:', error)
        setLoading(false)
      }
    }
    fetchCoaches()
  }, [searchParams])
  

 


  return (
    <>
     <Banner title="健身教練" subtitle="尋找有相同運動愛好的朋友，一起GYM步吧！"/>
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
        <div className={styles.toolsContainer}><Breadcrumb breadcrumb={breadcrumb} />
        <SearchForm/></div>
        
      </div>
      <div className={styles.coachesContainer}>
      {currentCoaches.map(coach => (
        <CoachesCard key={coach.id} id={coach.id} name={coach.name} email={coach.email} phone={coach.phone} skill={coach.skill} description={coach.description}
        avatar={coach.avatar}/>
      ))}
      </div>
      </div>
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      </div> 

    </>
  )
}
  