'use client'
import React, { useState, useEffect } from 'react'
import articleStyle from '../article.module.css'
import { FaList, FaRegHeart } from 'react-icons/fa'
import { IoShareSocialSharp } from 'react-icons/io5'
import Swal from 'sweetalert2'

export default function ShareSidebar() {
  const Swal = require('sweetalert2')
  const [isShow, setIsShow] = useState(false)
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer
      toast.onmouseleave = Swal.resumeTimer
    },
  })

  const copyUrl = () => {
    // 獲取當前頁面的 URL
    const url = window.location.href

    // 使用 clipboard API 複製 URL 到剪貼簿
    navigator.clipboard.writeText(url).then(
      () => {
        Toast.fire({
          icon: 'success',
          title: '已複製成功',
        })
      },
      (err) => {
        Toast.fire({
          icon: 'warning',
          title: '複製網址時發生錯誤',
        })
      }
    )
  }
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
          <li className={articleStyle.icon} onClick={copyUrl}>
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
