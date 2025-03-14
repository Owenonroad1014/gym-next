'use client'
import styles from './_styles/breadcrumb.module.css'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Breadcrumb({ breadcrumb = ["首頁","商品列表","熱門商品","拳擊手套"] }) {
  const pathname = usePathname()
  const [activeIndex, setActiveIndex] = useState(null)
  const breadcrumbLinks = ['/', '/products', '/products/hot',""]

  useEffect(() => {
    const index = breadcrumbLinks.findIndex(link => pathname.startsWith(link))
    setActiveIndex(index !== -1 ? index : null)
  }, [pathname])

  return (
    <div className={styles.breadcrumbContainer}>
      <nav className={styles.breadcrumb}>
        {breadcrumb.map((v, index) => (
          <div
            key={index}
            className={`${styles.breadcrumbItem} ${index === activeIndex ? styles.active : ''}`}
          >
            <Link href={breadcrumbLinks[index]}>{v}</Link>
          </div>
        ))}
      </nav>
    </div>
  )
}
