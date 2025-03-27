'use client'
import React, { useState, useEffect } from 'react'

import '@/Styles/globals.css'
import { FaUserFriends } from 'react-icons/fa'
import FriendListPage from './_components/friend-list'
import styles from './_styles/chatLayout.module.css'

export default function ChatLayout({ children }) {
  const [menuShow, setMenuShow] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1140) {
        setMenuShow(false)
      } else {
        setMenuShow(true)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <div className={styles.chatLayout}>
      <button
        onClick={() => setMenuShow(!menuShow)}
        className={styles.selectBtn}
      >
        <FaUserFriends />
      </button>
      <div
        className={styles.friendSidebar}
        style={{
          display: menuShow ? 'block' : 'none',
        }}
      >
        <FriendListPage />
      </div>
      <div className={styles.messageArea}>
        {children} {/* 這裡插入訊息區域的內容 */}
      </div>
    </div>
  )
}
