'use client'

import gymfriendcss from '../_styles/gymfrenid.module.css'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Breadcrumb({ breadcrumb = [] }) {
  const pathname = usePathname()
  const [activeIndex, setActiveIndex] = useState(null)
  useEffect(() => {
    if (pathname.includes('/gymFriend/person')) {
      setActiveIndex(2)
    } else {
      if (pathname.includes('/gymFriend')) {
        setActiveIndex(1)
      } else {
        setActiveIndex(null)
      }
    }
  }, [pathname])
  const breadcrumbLinks = ['/', '/gymFriend', '/gymFriend/person']

  return (
    <>
      <div className={gymfriendcss.breadcrumbContainer}>
        <nav className={gymfriendcss.breadcrumb}>
          {breadcrumb.map((v, index) => (
            <div
              key={index}
              className={`${gymfriendcss.breadcrumbItem} ${
                index === activeIndex ? gymfriendcss.active : ''
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
