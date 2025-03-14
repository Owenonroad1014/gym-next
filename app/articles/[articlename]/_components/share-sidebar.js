'use client'
import React, { useState, useEffect } from 'react'
import articleStyle from '../article.module.css'
import { FaList, FaRegHeart } from 'react-icons/fa'
import { IoShareSocialSharp } from 'react-icons/io5'
export default function ShareSidebar() {
  const [isShow, setIsShow] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const distanceToBottom = documentHeight - scrollPosition - windowHeight // 到頁面底部的距離
      if (window.scrollY > 300 && distanceToBottom > 220) {
        setIsShow(true)
      } else {
        setIsShow(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <>
      <div
        className={`${articleStyle.shareSidebar} ${
          isShow ? articleStyle.show : ''
        }`}
      >
        <ul className={articleStyle.wrapper}>
          <li className={articleStyle.icon}>
            <span className={articleStyle.tooltip}>菜單</span>
            <FaList />
          </li>
          <li className={articleStyle.icon}>
            <span className={articleStyle.tooltip}>分享</span>
            <IoShareSocialSharp />
          </li>
          <li className={articleStyle.icon}>
            <span className={articleStyle.tooltip}>收藏</span>
            <FaRegHeart />
          </li>
        </ul>
      </div>
    </>
  )
}
