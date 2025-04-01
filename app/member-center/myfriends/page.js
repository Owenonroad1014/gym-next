'use client'

import React, { useState, useEffect } from 'react'
import FriendListPage from './_components/friend-list'
import styles from './_styles/chatList.module.css'
import Link from 'next/link'
import { LiaUserFriendsSolid } from 'react-icons/lia'
export default function ChatPage() {
  return (
    <>
      <FriendListPage />
    </>
  )
}
