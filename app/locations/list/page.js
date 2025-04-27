'use client'
import styles from '../_styles/locations.module.css'
import loaderStyle from '@/app/_components/_styles/loading.module.css'
import React, { useState, useEffect } from 'react'
import Search from '../_components/search'
import Banner from '../_components/banner'
import { MdShareLocation } from 'react-icons/md'
import LocationCard from '../_components/locations-card'
import Breadcrumb from '../_components/breadcrumb'
import { LOCATIONS_LIST } from '@/config/api-path'
import { useSearchParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css'


const Map = dynamic(() => import('../_components/map'), {
  ssr: false,
})
// 將直接導入改為動態導入
const MapModal = dynamic(() => import('../_components/map-modal'), {
  ssr: false
})


export default function LocationsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState([])
  const [locations, setLocations] = useState([])
  const [filteredLocations, setFilteredLocations] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [showMap, setShowMap] = useState(false)
  const [showLocations, setShowLocations] = useState(true)
  
  const breadcrumb = ['home', '營業GYM點']
  const searchParams = useSearchParams()
  const Router = useRouter()
  const center = [23.7577054, 120.8964954]
  const zoom = 8

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const location = searchParams.get('location') || ''
        const branch = searchParams.get('branch') || ''
        const searchTerm = `${location} ${branch}`.trim()
        const url = `${LOCATIONS_LIST}?location=${location}&branch=${branch}`
        
        const res = await fetch(url)
        if (!res.ok) throw new Error('Network response was not ok')
        
        const data = await res.json()
        if (data?.success) {
          setLocations(data.rows || [])
          if (!searchTerm) {
            setFilteredLocations(data.rows || [])
          } else {
            const searchParts = searchTerm.toLowerCase().split(' ').filter(Boolean)
            const [selectedLocation, selectedBranch] = searchParts
            
            const filtered = data.rows.filter(location => 
              location.location?.toLowerCase() === selectedLocation
            )
            
            const sorted = filtered.sort((a, b) => {
              const aBranch = a.branch?.toLowerCase() || ''
              const bBranch = b.branch?.toLowerCase() || ''
              if (selectedBranch) {
                if (aBranch === selectedBranch) return -1
                if (bBranch === selectedBranch) return 1
              }
              return aBranch.localeCompare(bBranch)
            })
            
            setFilteredLocations(sorted)
          }
        } else {
          setLocations([])
          setFilteredLocations([])
        }
      } catch (error) {
        console.error('獲取locations數據失敗:', error)
        setLocations([])
        setFilteredLocations([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [searchParams])

  const handleSearch = (term) => {
    setSearchTerm(term)
    setShowMap(false)
    setShowLocations(true)
  }

  const handleLocationClick = (location) => {
    setSelectedAddress(location)
    setIsModalOpen(true)
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
            onClick={() => {
              setShowMap(true)
              setShowLocations(false)
              Router.push('/locations/list', { scroll: false })
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setShowMap(true)
                setShowLocations(false)
                Router.push('/locations/list', { scroll: false })
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

        {showLocations && (
          <>
            <div className={styles.toolsContainer}>
              <Breadcrumb breadcrumb={breadcrumb} />
            </div>
            
            {loading ? (
              <div className={styles.loaderContainer}>
                <div className={loaderStyle.loader}></div>
              </div>
            ) : filteredLocations.length === 0 ? (
              <div className={styles.locationsContainer}>
                <div className={styles.emptyResults}>
                  <p>
                    {searchTerm
                      ? '未找到符合條件的據點'
                      : '請輸入搜索條件以顯示據點'}
                  </p>
                </div>
              </div>
            ) : (
              <div className={styles.locationsContainer}>
                {filteredLocations.map((location) => (
                  <div key={location.id} className={styles.cardWrapper}>
                    <div
                      className={styles.cardContent}
                      role="button"
                      tabIndex={0}
                      onClick={() => handleLocationClick(location)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleLocationClick(location)
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <LocationCard location={location} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <MapModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedAddress={selectedAddress}
      />
    </>
  )
}
