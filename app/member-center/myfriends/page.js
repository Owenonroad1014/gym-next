'use client'

import React, { useState, useEffect } from 'react'
import FriendListPage from './_components/friend-list'
import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/navigation'

export default function ChatPage() {
  const { auth, getAuthHeader } = useAuth()
  const router = useRouter()

  return <>{auth.id ? <FriendListPage /> : router.push('/member-center')}</>
}
