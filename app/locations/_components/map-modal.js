// components/MapModal.js
'use client'
import { useEffect, useRef } from 'react'
import styles from './_styles/map-modal.module.css'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { IMGS_PATH } from '@/config/api-path'

export default function MapModal({ isOpen, onClose, selectedAddress }) {
  const mapRef = useRef(null)
  const markerRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      if (!mapRef.current) {
        // 初始化地圖
        const coords = [23.0252956, 120.226376] // 預設座標
        mapRef.current = L.map('map').setView([selectedAddress.lat, selectedAddress.lng], 15)

        // 加入圖層
        L.tileLayer(
          'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
          {
            attribution: '© Stadia Maps',
            zoomControl: true,
          }
        ).addTo(mapRef.current)

        // 自訂標記圖示
        const customIcon = L.icon({
          iconUrl: '/gymdot.svg',
          iconSize: [65, 65],
          iconAnchor: [32, 65],
          popupAnchor: [0, -65],
        })

        // 加入標記
        // 如果沒有經緯度，使用預設座標
        if (!selectedAddress.lat || !selectedAddress.lng) {
          markerRef.current = L.marker(coords, {
            icon: customIcon,
            title: selectedAddress.address,
          }).addTo(mapRef.current)
        }

        markerRef.current = L.marker([selectedAddress.lat, selectedAddress.lng], {
          icon: customIcon,
          title: selectedAddress.address,
        }).addTo(mapRef.current)

        markerRef.current.bindPopup(`<b>${selectedAddress.address}</b>`).openPopup()

      
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [isOpen, selectedAddress])

  if (!isOpen) return null

  return (
    <div className={styles.overlay}>
     
      <div className={styles.modal}>
      <div className={styles.content}>

        <div className={styles.title}>
          <h2>店家資訊</h2>
        </div>
        <img src={`${IMGS_PATH}/${selectedAddress.avatar}`} />
        <div className={styles.address}>
        <p>{selectedAddress.location}{selectedAddress.branch}</p>
          <p>{selectedAddress.address}</p>
          <p>{selectedAddress.phone}</p>
        </div>

      </div>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div className={styles.mapContainer}>
          <div id="map" className={styles.map} />
        </div>
      </div>
    </div>
  )
}
