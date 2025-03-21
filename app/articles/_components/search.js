'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import articlesStyle from '../styles/articles.module.css'
import { FaSearch } from "react-icons/fa";
export default function Search() {
  const router = useRouter()
  const searchRef = useRef()
  const [isShow, setIsShow] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    router.push(`?keyword=${searchRef.current.value}`)
    setIsShow(true)
  }
  const clearSearch = () => {
    router.replace('/articles')
    searchRef.current.value = ''
    setIsShow(false)
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
          <button type="submit"><FaSearch/></button>
        </form>
      </div>
      {isShow ? (
        <pre className={articlesStyle.clearSearch} onClick={clearSearch}>
          清除搜尋
        </pre>
      ) : (
        ''
      )}
    </>
  )
}
