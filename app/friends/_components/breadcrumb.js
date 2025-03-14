'use client'

import friendStyle from '../_styles/friends.module.css'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Breadcrumb({ breadcrumb = [] }) {
  const pathname = usePathname()
  const [activeIndex, setActiveIndex] = useState(null)
  useEffect(() => {
    if (pathname.includes('/friends/:username')) {
      setActiveIndex(2)
    } else {
      if (pathname.includes('/friends')) {
        setActiveIndex(1)
      } else {
        setActiveIndex(null)
      }
    }
  }, [pathname])
  const breadcrumbLinks = ['/', '/friends', '/friends/:username']

  return (
    <>
      <div className={friendStyle.breadcrumbContainer}>
        <nav className={friendStyle.breadcrumb}>
          {breadcrumb.map((v, index) => (
            <div
              key={index}
              className={`${friendStyle.breadcrumbItem} ${
                index === activeIndex ? friendStyle.active : ''
              }`}
            >
              <a href={breadcrumbLinks[index]}>{v}</a>
            </div>
          ))}
        </nav>
      </div>
    </>
  )
}
