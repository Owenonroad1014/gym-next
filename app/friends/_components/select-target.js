'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import friendStyle from '../_styles/friends.module.css'
import { PiGenderMaleBold, PiGenderFemaleBold } from 'react-icons/pi'
import { MdMenu, MdMenuOpen } from 'react-icons/md'
export default function Select() {
  const [menuShow, setMenuShow] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const gender = searchParams.get('gender')
  const selectArea = [
    '增肌',
    '減脂',
    '提高耐力',
    '增強體能',
    '健康維持',
    '提高核心能量',
  ]

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1140) {
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

  const isMobile = () => {
    return typeof window !== 'undefined' && window.innerWidth < 960
  }


  const handleFilterChange = (newCategory, newGender) => {
    const params = new URLSearchParams(searchParams.toString())

    if (newCategory) {
      params.set('category', newCategory)
    }

    if (newGender) {
      params.set('gender', newGender)
    }

    router.push(`?${params.toString()}`)
  }
  return (
    <>
      <button
        onClick={() => setMenuShow(!menuShow)}
        className={friendStyle.selectBtn}
      >
        {menuShow ? <MdMenuOpen /> : <MdMenu />}
      </button>
      <section
        className={friendStyle.selectArea}
        style={{
          display: menuShow ? 'block' : 'none',
        }}
      >
        <ul className={friendStyle.selectPart}>
          <span className={friendStyle.categoryTitle}>全部分類</span>
          <li
          role='button' // 告訴輔助技術這個元素是一個按鈕
          tabIndex={0} // 使這個元素可以接受鍵盤焦點
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              // 監聽 Enter 鍵事件
              router.push(`/friends`)
              if (isMobile()) {
                setMenuShow(false)
              }
            }
          }}
            onClick={(e) => {
              e.preventDefault()
              router.push(`/friends`)
              if (isMobile()) {
                setMenuShow(false)
              }
            }}
          >
            <Link href="/friends">全部分類</Link>
          </li>
        </ul>
        <ul className={friendStyle.selectPart}>
          <span className={friendStyle.categoryTitle}>選擇性別</span>
          <li
            className={gender == 'male' ? friendStyle.active : ''}
            role='button' // 告訴輔助技術這個元素是一個按鈕
            tabIndex={0} // 使這個元素可以接受鍵盤焦點
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                // 監聽 Enter 鍵事件
                handleFilterChange(category, 'male')
                if (isMobile()) {
                  setMenuShow(false)
                }
              } 
            }}
            onClick={(e) => {
              e.preventDefault()
              handleFilterChange(null, gender)
              handleFilterChange(category, 'male')
              if (isMobile()) {
                setMenuShow(false)
              }
            }}
          >
            <PiGenderMaleBold /> 男性
          </li>
          <li
            className={gender == 'female' ? friendStyle.active : ''}
            role='button' // 告訴輔助技術這個元素是一個按鈕
            tabIndex={0} // 使這個元素可以接受鍵盤焦點
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                // 監聽 Enter 鍵事件
                handleFilterChange(category,'female')
                if (isMobile()) {
                  setMenuShow(false)
                }
              } 
            }}
            onClick={(e) => {
              e.preventDefault()
              handleFilterChange(category, 'female')
              if (isMobile()) {
                setMenuShow(false)
              }
            }}
          >
            <PiGenderFemaleBold /> 女性
          </li>
        </ul>
        <ul className={friendStyle.selectPart}>
          <span className={friendStyle.categoryTitle}>選擇健身目標</span>
          {selectArea.map((v, i) => {
            return (
              <li
                key={i}
                className={v === category ? friendStyle.active : ''}
                role='button' // 告訴輔助技術這個元素是一個按鈕
                tabIndex={0} // 使這個元素可以接受鍵盤焦點
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    // 監聽 Enter 鍵事件
                    handleFilterChange(v, gender)
                    if (isMobile()) {
                      setMenuShow(false)
                    }
                  } 
                }}
                onClick={(e) => {
                  e.preventDefault()
                  handleFilterChange(v, gender)
                  // router.push(`?category=${v}`)
                  if (isMobile()) {
                    setMenuShow(false)
                  }
                }}
              >
                {v}
              </li>
            )
          })}
        </ul>
      </section>
    </>
  )
}
