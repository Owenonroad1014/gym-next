'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import articleListStyle from '../articleList.module.css'
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
    router.replace('/member-center/articles')
    searchRef.current.value = ''
    setIsShow(false)
  }
  return (
    <>
      <div className={articleListStyle.searchContainer}>
        <form className={articleListStyle.searchForm} onSubmit={handleSubmit}>
          <input
            placeholder="輸入關鍵字"
            name="keyword"
            ref={searchRef}
          ></input>
          <button type="submit"><FaSearch/></button>
        </form>
      </div>
      {isShow ? (
        <pre className={articleListStyle.clearSearch} 
        role="button" // 指定角色為按鈕
        tabIndex={0}    // 使元素可聚焦
        onKeyDown={(e) => {
          if (e.key === 'Enter') { // 監聽 Enter 鍵事件
            clearSearch()
          }}
          }
        onClick={clearSearch}>
          清除搜尋
        </pre>
      ) : (
        ''
      )}
    </>
  )
}
