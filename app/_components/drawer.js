'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import styles from './_styles/drawer.module.css'
import Link from 'next/link'
import { FaHome } from 'react-icons/fa'
import { GiMuscleUp } from "react-icons/gi";
import { FaBook } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { BiSolidVideos } from "react-icons/bi";
import SpotlightCard from "./SpotlightCard";

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
        <span>查看更多</span>
      </button>

      <div ref={drawerRef} className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
        <SpotlightCard className={styles.drawerInner}>
          <div className={styles.drawerContent}>
            <nav>
              <ul className={styles.navList}>
                <li 
                  role="button"
                  tabIndex={0}
                  onClick={() => { router.push('/'); handleLinkClick(); }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      router.push('/');
                      handleLinkClick();
                    }
                  }}
                >
                  <div className={styles.navLink}>
                    <FaHome />
                  </div>
                </li>
                <li 
                  role="button"
                  tabIndex={0}
                  onClick={() => { router.push('/coaches/list'); handleLinkClick(); }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      router.push('/coaches/list');
                      handleLinkClick();
                    }
                  }}
                >
                  <div className={styles.navLink}>
                    <GiMuscleUp/>  找GYM身教練
                  </div>
                </li>
                <li 
                  role="button"
                  tabIndex={0}
                  onClick={() => { router.push('/articles'); handleLinkClick(); }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      router.push('/articles');
                      handleLinkClick();
                    }
                  }}
                >
                  <div className={styles.navLink}>
                    <FaBook/> GYM享知識
                  </div>
                </li>
                <li 
                  role="button"
                  tabIndex={0}
                  onClick={() => { router.push('/locations'); handleLinkClick(); }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      router.push('/locations');
                      handleLinkClick();
                    }
                  }}
                >
                  <div className={styles.navLink}>
                    <MdPlace/> 找GYM點
                  </div>
                </li>
                <li 
                  role="button"
                  tabIndex={0}
                  onClick={() => { router.push('/videos'); handleLinkClick(); }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      router.push('/videos');
                      handleLinkClick();
                    }
                  }}
                >
                  <div className={styles.navLink}>
                    <BiSolidVideos/> 影片教學
                  </div>
                </li>
              </ul>
            </nav>

          </div>
        </SpotlightCard>
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
