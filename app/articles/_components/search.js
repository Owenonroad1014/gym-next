'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import articlesStyle from '../styles/articles.module.css'
export default function Search() {
  const router = useRouter()
  const searchRef = useRef()
  const handleSubmit = (e) => {
    e.preventDefault()
    router.push(`?keyword=${searchRef.current.value}`)
  }
  const clearSearch = () => {
    router.replace('/articles')  
  }
  return (
    <>
      <div className={articlesStyle.searchContainer}>
        <form className={articlesStyle.searchForm} onSubmit={handleSubmit}>
          <input
            placeholder="輸入關鍵字"
            name="keyword"
            ref={searchRef}
          ></input>
          <button type="submit">搜尋</button>
        </form>
      </div>
      <pre className={articlesStyle.clearSearch} onClick={clearSearch}>清除搜尋</pre>
    </>
  )
}
