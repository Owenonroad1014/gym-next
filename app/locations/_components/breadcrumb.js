'use client'

import sytles from './_styles/breadcrumb.module.css'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Breadcrumb({ breadcrumb = [] }) {
  const pathname = usePathname()
  const [activeIndex, setActiveIndex] = useState(null)
  useEffect(() => {
    if (pathname.includes('/locations/list/detail')) {
      setActiveIndex(2)
    } else {
      if (pathname.includes('/locations/list')) {
        setActiveIndex(1)
      } else {
        setActiveIndex(null)
      }
    }
  }, [pathname])
  const breadcrumbLinks = ['/', '/locations/list', '/locations/list/detail']

  return (
    <>
      <div className={sytles.breadcrumbContainer}>
        <nav className={sytles.breadcrumb}>
          {breadcrumb.map((v, index) => (
            <div
              key={index}
              className={`${sytles.breadcrumbItem} ${
                index === activeIndex ? sytles.active : ''
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
