"use client"

import { Suspense } from 'react'

export default function Layout({ children }) {
  return (
    <Suspense fallback={<div>載入中...</div>}>
      {children}
    </Suspense>
  )
}
