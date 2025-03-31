'use client'
import { useEffect, useState } from 'react'
import styles from './_styles/search.module.css'
import { useRouter, useSearchParams } from 'next/navigation'
import { LOCATIONS_LIST } from '../../../config/api-path'
import { FaSearch } from 'react-icons/fa'


function Search({ onSearch }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showLocation, setShowLocation] = useState(false)
  const [showBranch, setShowBranch] = useState(false)
  const [location, setLocation] = useState(searchParams.get('location') || '')
  const [branch, setBranch] = useState(searchParams.get('branch') || '')
  const [stores, setStores] = useState([])

  useEffect(() => {
    // 取得所有門市資料
    fetch(`${LOCATIONS_LIST}`)
      .then((res) => res.json())
      .then((data) => setStores(data.rows))
      .catch((error) => console.error('Error:', error))
  }, [])

  // 根據選擇的地區過濾分店
  const locationsList = [...new Set(stores.map((store) => store.location))]
  const branchList = stores
    .filter((store) => store.location === location)
    .map((store) => store.branch)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.dropdown}`)) {
        setShowLocation(false)
        setShowBranch(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    router.replace(`/locations/list?location=${location}&branch=${branch}`, {
      scroll: false,
    })
    // 觸發搜索回調
    if (onSearch) {
      const searchTerm = `${location} ${branch}`.trim()
      onSearch(searchTerm)
    }
  }

  return (
    <div className={styles.searchContainer}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <div className={styles.dropdown}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setShowLocation(!showLocation)
              setShowBranch(false)
            }}
          >
            {location || '地區'}
          </button>
          <div
            className={`${styles.dropdownContent} ${
              showLocation ? styles.show : ''
            }`}
          >
            {locationsList.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => {
                  setLocation(loc)
                  setBranch('') // 重置分店選擇
                  setShowLocation(false)
                }}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.dropdown}>
          <button
            type="button"
            disabled={!location} // 如果沒有選地區就禁用
            onClick={(e) => {
              e.stopPropagation()
              setShowBranch(!showBranch)
              setShowLocation(false)
            }}
          >
            {branch || '分店'}
          </button>
          <div
            className={`${styles.dropdownContent} ${
              showBranch ? styles.show : ''
            }`}
          >
            {branchList.map((br) => (
              <button
                key={br}
                type="button"
                onClick={() => {
                  setBranch(br)
                  setShowBranch(false)
                }}
              >
                {br}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className={styles.button}
          disabled={!location} // 只需選擇地區即可送出
        >
          <FaSearch />
        </button>
      </form>
    </div>
  )
}
export default Search
