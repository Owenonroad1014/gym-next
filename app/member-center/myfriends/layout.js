'use client'
import React, { useState, useEffect } from 'react'

import '@/styles/globals.css'
import Menubar from './_components/menubar'
import styles from './_styles/chatLayout.module.css'

export default function ChatLayout({ children }) {
  return (
    <div className={styles.chatLayout}>
      <div className={styles.sidebar}>
        <Menubar />
      </div>
      <div className={styles.messageArea}>
        {children} {/* 這裡插入訊息區域的內容 */}
      </div>
    </div>
  )
}
