'use client'

import styles from '../_styles/locations.module.css'
import React, { useState, useEffect } from 'react'
import Search from '../_components/search'
import Banner from '../_components/banner'
import { MdShareLocation } from "react-icons/md";
import LocationCard from '../_components/locations-card'


export default function locationsPage() {
  // const [city, setCity] = useState('')
  // const [district, setDistrict] = useState('')
  // const [trainers, setTrainers] = useState([])

  return (
    <>
      <Banner
        title="營業GYM點"
        subtitle="尋找有相同運動愛好的朋友，一起GYM步吧！"
      />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.searchSection}>
            <div className={styles.locationIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </div>
            <h2 className={styles.secTitle}>尋找據點</h2>
            <div className={styles.filterContainer}>
              <Search />
            </div>
          </div>
          <div className={styles.mapContainer}>
          <div className={styles.mapIcon}><MdShareLocation /></div>
          <h3> 點擊尋找最近的據點</h3>

          </div>
        </div>
        <div className={styles.locationesContainer}>
          <LocationCard/>
          <LocationCard/>
          <LocationCard/>
          
        </div>
      </div>
    </>
  )
}
