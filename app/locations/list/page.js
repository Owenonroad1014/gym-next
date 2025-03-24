'use client'

import styles from '../_styles/locations.module.css'
import React, { useState, useEffect } from 'react'
import Search from '../_components/search'
import Banner from '../_components/banner'
import { MdShareLocation } from 'react-icons/md'
import LocationCard from '../_components/locations-card'
import Breadcrumb from '../_components/breadcrumb'
import { LOCATIONS_LIST } from '@/config/api-path'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css'

const Map = dynamic(() => import('../_components/map'), {
  ssr: false,
})

export default function LocationsPage() {
  const [locations, setLocations] = useState([])
  const [filteredLocations, setFilteredLocations] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const breadcrumb = ['home', '營業GYM點']
  const searchParams = useSearchParams()
  const [showMap, setShowMap] = useState(false)
  const center = [23.7577054, 120.8964954]
  const zoom = 8

  // 處理數據獲取和搜索
  useEffect(() => {
    const location = searchParams.get('location') || ''
    const branch = searchParams.get('branch') || ''
    const searchTerm = `${location} ${branch}`.trim()

    const url = `${LOCATIONS_LIST}?location=${location}&branch=${branch}`

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched data:', data)
        setLocations(data.rows)

        // 處理搜索和排序
        if (!searchTerm) {
          setFilteredLocations(data.rows)
          return
        }

        const searchParts = searchTerm
          .toLowerCase()
          .split(' ')
          .filter((part) => part.length > 0)

        // 獲取選擇的地區和分店
        const selectedLocation = searchParts[0] || ''
        const selectedBranch = searchParts[1] || ''

        // 過濾出同地區的所有分店
        const filtered = data.rows.filter((location) => {
          const locationName = location.location?.toLowerCase() || ''
          return locationName === selectedLocation
        })

        // 根據選擇進行排序
        const sorted = filtered.sort((a, b) => {
          const aBranch = a.branch?.toLowerCase() || ''
          const bBranch = b.branch?.toLowerCase() || ''

          // 如果選擇了特定分店，將該分店排在最前面
          if (selectedBranch) {
            if (aBranch === selectedBranch) return -1
            if (bBranch === selectedBranch) return 1
          }

          // 按字母順序排序
          return aBranch.localeCompare(bBranch)
        })

        setFilteredLocations(sorted)
      })
      .catch((error) => console.error('獲取locations數據失敗:', error))
  }, [searchParams])

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

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
              <Search onSearch={handleSearch} />
            </div>
          </div>
          <div
            className={styles.mapContainer}
            role="button"
            tabIndex={0}
            onClick={() => setShowMap(true)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setShowMap(true)
              }
            }}
          >
            <>
              <div className={styles.mapIcon}>
                <MdShareLocation />
              </div>
              <h3>點擊尋找最近的據點</h3>
            </>
          </div>
          <div className={styles.resultsContainer}>
            {showMap && <Map center={center} zoom={zoom} />}
          </div>
        </div>
        <div className={styles.toolsContainer}>
          <Breadcrumb breadcrumb={breadcrumb} />
        </div>
        <div className={styles.locationsContainer}>
          {filteredLocations.length === 0 ? (
            <div className={styles.emptyResults}>
              <p>
                {searchTerm
                  ? '未找到符合條件的據點'
                  : '請輸入搜索條件以顯示據點'}
              </p>
            </div>
          ) : (
            filteredLocations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))
          )}
        </div>
      </div>
    </>
  )
}
