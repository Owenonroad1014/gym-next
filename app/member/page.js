'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function MemberPage() {
  const pathname = usePathname()
  const router = useRouter()
  if (pathname === '/member') return router.replace('/member-center')
  return <></>
}
