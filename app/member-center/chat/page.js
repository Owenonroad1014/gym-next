'use client'

import React, { useState, useEffect } from 'react'
import styles from './_styles/chatList.module.css'
import Link from 'next/link'
import { LiaUserFriendsSolid } from 'react-icons/lia'
export default function ChatPage() {
  return (
    <>
      <div className={styles.intoChatRoom}>
        {' '}
        <p>點選聊天訊息，開始聊天吧!!</p>
        <Link href="/friends">
          <LiaUserFriendsSolid style={{ fontSize: '30px' }} />{' '}
          &nbsp;&nbsp;前往找GYM友加好友
        </Link>
      </div>
    </>
  )
}
