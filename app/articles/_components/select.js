import React, { useState, useEffect } from 'react'
import articleStyle from '../styles/articles.module.css'
import { MdMenu, MdMenuOpen } from 'react-icons/md'
import Link from 'next/link'
export default function Select() {
  const [menuShow, setMenuShow] = useState(true)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 960) {
        setMenuShow(false)
      } else {
        setMenuShow(true)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <>
      <button
        onClick={() => setMenuShow(!menuShow)}
        className={articleStyle.selectBtn}
      >
        {menuShow ? <MdMenuOpen /> : <MdMenu />}
      </button>
      <section
        className={articleStyle.selectArea}
        style={{
          display: menuShow ? 'block' : 'none',
        }}
      >
        <ul className={articleStyle.selectPart}>
          <span className={articleStyle.categoryTitle}>健身</span>
          <li>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (window.innerWidth < 960) {
                  setMenuShow(false)
                }
              }}
            >
              {' '}
              新手上路
            </Link>
          </li>
          <li>重量訓練</li>
          <li>徒手訓練</li>
          <li>柔軟度訓練</li>
          <li>有氧運動</li>
          <li>伸展運動</li>
          <li>健康維持</li>
        </ul>
        <ul className={articleStyle.selectPart}>
          <span className={articleStyle.categoryTitle}>飲食</span>
          <li>素食專區</li>
          <li>飲食營養</li>
        </ul>
        <ul className={articleStyle.selectPart}>
          <span className={articleStyle.categoryTitle}>GYM友怎麼做</span>
          <li>名人專訪</li>
          <li>資深GYM友</li>
        </ul>
      </section>
    </>
  )
}
