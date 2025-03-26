'use client'

import React, { useState, useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css'
import 'leaflet.locatecontrol'
import 'leaflet-minimap'
import styles from './_styles/map.module.css'
import LocationCard from './locations-card'
import { AVATAR_PATH, LOCATIONS_LIST } from '../../../config/api-path'

const Map = ({ center = [23.0252956, 120.226376], zoom = 18 }) => {
  const mapRef = useRef(null)
  const containerRef = useRef(null)
  const miniOSMRef = useRef(null)
  const miniMapRef = useRef(null)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [locations, setLocations] = useState([])
  const [userPosition, setUserPosition] = useState(null)
  const [markers, setMarkers] = useState([])

  // 計算距離
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371 // 地球半徑，單位公里
    const dLat = (lat2 - lat1) * (Math.PI / 180)
    const dLon = (lon2 - lon1) * (Math.PI / 180)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c // 返回距離，單位公里
  }

  useEffect(() => {
    if (!containerRef.current) return

    // 建立地圖
    const map = L.map(containerRef.current).setView(center, zoom)
    mapRef.current = map

    // 地圖圖層
    const darkLayer = L.tileLayer(
      'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
      { attribution: '© Stadia Maps' }
    )

    const lightLayer = L.tileLayer(
      'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
      { attribution: '© Stadia Maps' }
    )

    // 初始圖層
    darkLayer.addTo(map)

    // 切換地圖模式按鈕
    L.Control.MapToggle = L.Control.extend({
      onAdd: function () {
        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control')
        const button = L.DomUtil.create('a', '', container)
        button.innerHTML = isDarkMode ? '☀️' : '🌙'
        button.style.width = '30px'
        button.style.height = '30px'
        button.style.lineHeight = '30px'
        button.style.textAlign = 'center'
        button.style.cursor = 'pointer'

        L.DomEvent.on(button, 'click', () => {
          setIsDarkMode((prevMode) => {
            const newMode = !prevMode
            console.log('切換模式:', newMode ? '黑夜' : '白天')

            // 更新按鈕圖標
            button.innerHTML = newMode ? '☀️' : '🌙'

            // 更新主地圖圖層
            if (newMode) {
              map.removeLayer(lightLayer)
              darkLayer.addTo(map)
            } else {
              map.removeLayer(darkLayer)
              lightLayer.addTo(map)
            }

            // 更新小地圖圖層
            console.log('切換小地圖模式:', newMode ? '黑夜' : '白天')

            // 移除舊圖層
            if (miniOSMRef.current) {
              console.log('移除舊圖層')
              miniMapRef.current._miniMap.removeLayer(miniOSMRef.current)
              miniOSMRef.current = null
            }

            // 創建新圖層
            const newLayer = new L.TileLayer(
              newMode
                ? 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png' // 主地圖黑夜時，小地圖白天
                : 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', // 主地圖白天時，小地圖黑夜
              { attribution: '© Stadia Maps' }
            )
            console.log('創建新圖層:', newLayer._url)

            // 更新引用並添加新圖層
            miniOSMRef.current = newLayer
            miniMapRef.current._miniMap.addLayer(newLayer)
            console.log('新圖層已添加')

            // 更新小地圖圖層
            miniMapRef.current._miniMap.removeLayer(miniOSMRef.current)
            miniOSMRef.current = newLayer
            miniMapRef.current._miniMap.addLayer(newLayer)

            // 強制刷新小地圖
            miniMapRef.current._miniMap._container.style.display = 'none'
            miniMapRef.current._miniMap._container.offsetHeight // 觸發重繪
            miniMapRef.current._miniMap._container.style.display = ''

            return newMode
          })
        })

        return container
      },
    })

    new L.Control.MapToggle({ position: 'topright' }).addTo(map)

    // 客製化 icon
    const customIcon = L.icon({
      iconUrl: '/gymdot.svg',
      iconSize: [65, 65],
    })

    // 獲取locations數據並創建marker
    fetch(`${LOCATIONS_LIST}`)
      .then((res) => res.json())
      .then((data) => {
        setLocations(data.rows)
        const newMarkers = []
        data.rows.forEach((location) => {
          console.log('location:', location)

          const marker = L.marker([location.lat, location.lng], {
            icon: customIcon,
          }).addTo(map)

          // 簡單的popup內容
          marker.bindPopup(
            `
             <img src="${AVATAR_PATH}/${location.avatar}" alt="${location.location}" width=200px/>
              <h3>${location.location}${location.branch}</h3>
              <div style="display: flex; align-items: center; margin: 0.5rem 0">
                <svg style="width: 1.2rem; height: 1.2rem; margin-right: 0.3rem ; color: black" viewBox="0 0 24 24"><path fill="currentColor" d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9A2.5 2.5 0 0 1 12 11.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Z"/></svg>
                <span>${location.address}</span>
              </div>
              <div style="display: flex; align-items: center; margin: 0.5rem 0">
                <svg style="width: 1.2rem; height: 1.2rem; margin-right: 0.3rem ; color: black" viewBox="0 0 24 24"><path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24c1.12.37 2.33.57 3.57.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1c-9.39 0-17-7.61-17-17c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02l-2.2 2.2Z"/></svg>
                <span>${location.phone}</span>
              </div>
              <div style="display: flex; align-items: center; margin: 0.5rem 0">
                <svg style="width: 1.2rem; height: 1.2rem; margin-right: 0.3rem ; color: black" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m.5-13H11v6l5.2 3.2l.8-1.3l-4.5-2.7V7z"/></svg>
                <span>${location.business_hours}</span>
              </div>
            `,
            {
              className: styles.customPopup,
              maxWidth: 300,
              minWidth: 250,
            }
          )

          // 保存marker引用
          newMarkers.push({ id: location.id, marker })
        })
        setMarkers(newMarkers)
      })
      .catch((error) => console.error('獲取locations數據失敗:', error))

    // 自動定位
    if (navigator.geolocation) {
      const locateControl = L.control
        .locate({
          position: 'topleft',
          locateOptions: {
            enableHighAccuracy: true,
            setView: 'false', // 只在首次定位時移動地圖
            watch: true, // 持續監控位置變化
          },
          strings: {
            title: '定位我的位置',
            metersUnit: '公尺',
            feetUnit: '英尺',
            popup: '距離誤差：{distance}{unit}以內',
          },
          clickBehavior: {
            inView: 'setView',
            outOfView: 'setView',
            inViewNotFollowing: 'inView',
          },
          onLocationError: (e) => {
            console.error('定位失敗:', e.message)
            alert('無法獲取您的位置，請確保已啟用地理位置權限。')
          },
        })
        .addTo(map)

      // 自動啟動定位
      locateControl.start()

      // 監聽位置變化
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserPosition({ lat: latitude, lng: longitude })
        },
        (error) => {
          console.error('定位失敗:', error.message)
        }
      )
    } else {
      console.warn('您的瀏覽器不支持地理位置功能')
      alert('您的瀏覽器不支持地理位置功能')
    }

    // 加入小地圖
    const miniWidth = document.body.clientWidth <= 640 ? 75 : 150
    const miniHeight = document.body.clientWidth <= 640 ? 75 : 150
    miniOSMRef.current = new L.TileLayer(
      isDarkMode
        ? 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png' // 主地圖黑夜時，小地圖白天
        : 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', // 主地圖白天時，小地圖黑夜
      { attribution: '© Stadia Maps' }
    )
    miniMapRef.current = new L.Control.MiniMap(miniOSMRef.current, {
      width: miniWidth,
      height: miniHeight,
      position: 'bottomleft',
    }).addTo(map)

    // 清理函數
    return () => {
      map.remove()
    }
  }, [])

  // 根據距離排序並只顯示最近的五筆
  const sortedLocations = userPosition
    ? [...locations]
        .map((location) => ({
          ...location,
          distance: calculateDistance(
            userPosition.lat,
            userPosition.lng,
            location.lat,
            location.lng
          ),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5)
    : locations.slice(0, 5)

  return (
    <div className={styles.mapContainer}>
      <div className={styles.sidebar}>
        <div className={styles.locationsList}>
          {sortedLocations.map((location) => (
            <div
              key={location.id}
              role="button"
              tabIndex={0}
              onClick={() => {
                const marker = markers.find((m) => m.id === location.id)?.marker
                if (marker) {
                  marker.openPopup()
                  mapRef.current.setView(
                    marker.getLatLng(),
                    mapRef.current.getZoom()
                  )
                }
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  const marker = markers.find(
                    (m) => m.id === location.id
                  )?.marker
                  if (marker) {
                    marker.openPopup()
                    mapRef.current.setView(
                      marker.getLatLng(),
                      mapRef.current.getZoom()
                    )
                  }
                }
              }}
              style={{ cursor: 'pointer' }}
            >
              <LocationCard
                location={location}
                distance={calculateDistance(
                  userPosition?.lat,
                  userPosition?.lng,
                  location.lat,
                  location.lng
                )}
              />
            </div>
          ))}
        </div>
      </div>
      <div ref={containerRef} className={styles.map} />
    </div>
  )
}

export default Map
