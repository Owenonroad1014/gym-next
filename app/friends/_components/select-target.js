'use client'

import React, { useState, useEffect } from 'react'
import friendStyle from '../_styles/friends.module.css'
import { PiGenderMaleBold, PiGenderFemaleBold } from 'react-icons/pi'
import { MdMenu, MdMenuOpen } from 'react-icons/md'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
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
            onClick={(e) => {
              e.preventDefault()
              router.push(`/friends`)
              if (window.innerWidth < 960) {
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
            onClick={(e) => {
              e.preventDefault()
              handleFilterChange(null, gender)
              handleFilterChange(category, 'male')
              if (window.innerWidth < 960) {
                setMenuShow(false)
              }
            }}
          >
            <PiGenderMaleBold /> 男性
          </li>
          <li
            className={gender == 'female' ? friendStyle.active : ''}
            onClick={(e) => {
              e.preventDefault()
              handleFilterChange(category, 'female')
              if (window.innerWidth < 960) {
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
                onClick={(e) => {
                  e.preventDefault()
                  handleFilterChange(v, gender)
                  // router.push(`?category=${v}`)
                  if (window.innerWidth < 960) {
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
