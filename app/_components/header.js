'use client'
import React, { useState } from 'react'
import headerstyles from './_styles/header.module.css'
import Link from 'next/link'


export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('搜尋：', searchQuery)
  }
  return (
    <>
      <div className={headerstyles.header}>
        {/* LOGO */}
        <div>
          <Link href="/" className={headerstyles.logo}>
            LOGO
          </Link>
        </div>

        {/* 導航選單 */}
        <div className={headerstyles.navMenu}>
          <Link href="/trainers" className={headerstyles.navLink}>
            找GYM身教練
          </Link>
          <Link href="/trainers" className={headerstyles.navLink}>
            GYM享知識
          </Link>
          <Link href="/trainers" className={headerstyles.navLink}>
            找GYM點
          </Link>
          <Link href="/gymFriend" className={headerstyles.navLink}>
            找GYM友
          </Link>
        </div>

        {/* 右側圖示與搜尋欄 */}
        <div className={headerstyles.rightSection}>
          {/* 搜尋欄 */}
          <form onSubmit={handleSubmit} className={headerstyles.searchForm}>
            <input
              type="text"
              placeholder="請輸入課程名稱/商品名稱"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={headerstyles.searchInput}
            />
            <button type="submit" className={headerstyles.searchButton}>
              搜尋
            </button>
          </form>

          {/* 登入按鈕 */}
          <Link href="/login" className={headerstyles.navLink}>
            登入
          </Link>

          {/* 註冊按鈕 */}
          <Link href="/register" className={headerstyles.navLink}>
            註冊
          </Link>
        </div>
      </div>
    </>
  )
}