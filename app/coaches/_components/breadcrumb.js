'use client'

import sytles from './_styles/breadcrumb.module.css'
import { useState, useEffect } from 'react'
import { usePathname, useParams } from 'next/navigation'

export default function Breadcrumb({ breadcrumb = [] }) {
  const { id } = useParams();
  const pathname = usePathname()
  const [activeIndex, setActiveIndex] = useState(null)
  useEffect(() => {
    if (pathname.includes(`/coaches/list/${id}`)) {
      setActiveIndex(2)
    } else {
      if (pathname.includes('/coaches/list')) {
        setActiveIndex(1)
      } else {
        setActiveIndex(null)
      }
    }
  }, [pathname])
  const breadcrumbLinks = ['/', '/coaches/list', `/coaches/list/${id}`]

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
