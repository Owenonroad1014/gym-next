'use client'
import React, { useState, useRef } from 'react'
import styles from './_styles/search-form.module.css'
import { useRouter, useSearchParams } from 'next/navigation'
import { FaSearch } from 'react-icons/fa'

const SearchForm = () => {
  const router = useRouter()
  const searchRef = useRef()
  const searchParams = useSearchParams()
  const [location, setLocation] = useState(searchParams.get('location') || '')
  const [branch, setBranch] = useState(searchParams.get('branch') || '')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!searchRef.current.value.trim()) return

    // 如果已有 location 和 branch，繼續使用現有值
    const currentLocation = searchParams.get('location')
    const currentBranch = searchParams.get('branch')

    const queryParams = new URLSearchParams()
    if (currentLocation) queryParams.append('location', currentLocation)
    if (currentBranch) queryParams.append('branch', currentBranch)
    queryParams.append('keyword', searchRef.current.value.trim())

    router.push(`?${queryParams.toString()}`, {
      scroll: false,
    })
  }

  // 新增清除按鈕的處理函數
  const handleClear = () => {
    searchRef.current.value = ''

    const currentLocation = searchParams.get('location')
    const currentBranch = searchParams.get('branch')

    const queryParams = new URLSearchParams()
    if (currentLocation) queryParams.append('location', currentLocation)
    if (currentBranch) queryParams.append('branch', currentBranch)

    router.push(`?${queryParams.toString()}`, {
      scroll: false,
    })
  }

  return (
    <>
      <div className={styles.searchContainer}>
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <input
            ref={searchRef}
            type="search"
            aria-label="Search"
            className={styles.select}
            placeholder=" 輸入教練名稱 / 專長"
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
        {searchParams.get('keyword') && (
          <button
            type="button"
            className={styles.clearSearch}
            onClick={handleClear}
          >
            清除搜尋
          </button>
        )}
      </div>
    </>
  )
}

export default SearchForm
