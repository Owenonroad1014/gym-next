'use client'

<<<<<<< HEAD
import React, { useState, useEffect } from 'react'
import gymfriendcss from '../_styles/gymfrenid.module.css'

export default function Breadcrumb() {
=======
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

>>>>>>> 3cd4b2afd3708ace1e55cada6db5a5616acc3373
  return (
    <>
      <div className={gymfriendcss.breadcrumbContainer}>
        <nav className={gymfriendcss.breadcrumb}>
<<<<<<< HEAD
          <div className={gymfriendcss.breadcrumbItem}>
            <a href="#">首頁</a>
          </div>
          <div className={gymfriendcss.breadcrumbItem}>
            <a href="#">button</a>
          </div>
          <div className={gymfriendcss.breadcrumbItem}>
            <a href="#">健身教練</a>
          </div>
=======
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
>>>>>>> 3cd4b2afd3708ace1e55cada6db5a5616acc3373
        </nav>
      </div>
    </>
  )
}
