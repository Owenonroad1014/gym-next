'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaUserFriends } from 'react-icons/fa'
import {
  IoChatbubbleEllipsesSharp,
  IoPersonSharp,
  IoLogoWechat,
} from 'react-icons/io5'
import styles from '../_styles/menubar.module.css'
import { useAuth } from '@/context/auth-context'
import { usePathname } from 'next/navigation'
export default function Menubar() {
  const { auth, getAuthHeader } = useAuth()

  const currentRoute = usePathname()

  return (
    <>
      <div className={styles.container}>
        <Link href="/member-center/myfriends">
          <div className={`${styles.icon}`}>
            {currentRoute === '/member-center/myfriends' ? (
              <FaUserFriends style={{ fontSize: '30px', color: '#fff' }} />
            ) : (
              <IoPersonSharp />
            )}
          </div>
          <pre>friends</pre>
        </Link>
        <Link href="/member-center/myfriends/chat-list">
          <div className={styles.icon}>
            {/^\/member-center\/myfriends(\/.*)/.test(currentRoute) ? (
              <IoLogoWechat style={{ fontSize: '30px', color: '#fff' }} />
            ) : (
              <IoChatbubbleEllipsesSharp />
            )}
          </div>
          <pre>chats</pre>
        </Link>
      </div>
    </>
  )
}
