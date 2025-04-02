'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import styles from './_styles/drawer.module.css'
import Link from 'next/link'

export default function Drawer() {
  const [isOpen, setIsOpen] = useState(false)
  const drawerRef = useRef(null)
  const buttonRef = useRef(null)
  const router = useRouter()
  
  const toggleDrawer = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }
    
    const handleClickOutside = (event) => {
      if (
        isOpen && 
        drawerRef.current && 
        !drawerRef.current.contains(event.target) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
      
    }
    
    window.addEventListener('keydown', handleEsc)
    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      window.removeEventListener('keydown', handleEsc)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <>
      <button ref={buttonRef} className={styles.menuButton} onClick={toggleDrawer}>
        <span>選單</span>
      </button>

      <div ref={drawerRef} className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
        <div className={styles.drawerInner}>
          <div className={styles.drawerContent}>
            <nav>
              <ul className={styles.navList}>
                <li>
                  <Link href="/" className={styles.navLink} onClick={handleLinkClick}>
                    首頁
                  </Link>
                </li>
                <li>
                  <Link href="/coaches/list" className={styles.navLink} onClick={handleLinkClick}>
                    找GYM身教練
                  </Link>
                </li>
                <li>
                  <Link href="/articles" className={styles.navLink} onClick={handleLinkClick}>
                    GYM享知識
                  </Link>
                </li>
                <li>
                  <Link href="/locations" className={styles.navLink} onClick={handleLinkClick}>
                    找GYM點
                  </Link>
                </li>
                <li>
                  <Link href="/friends" className={styles.navLink} onClick={handleLinkClick}>
                    找GYM友
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {isOpen && (
        <div 
          className={styles.overlay}
          role="button"
          tabIndex={0}
          onClick={toggleDrawer}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              toggleDrawer()
            }
          }}
        ></div>
      )}
    </>
  )
}