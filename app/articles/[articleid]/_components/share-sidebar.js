'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import articleStyle from '../article.module.css'
import { FaList, FaRegHeart } from 'react-icons/fa'
import { IoShareSocialSharp } from 'react-icons/io5'
import Link from 'next/link'
import Swal from 'sweetalert2'

export default function ShareSidebar({
  articles = {
    category_id: 0,
    content: '',
    created_at: '',
    id: 0,
    imageURL: '',
    intro: '',
    title: '',
    updated_at: '',
    views: 0,
  },
}) {
  const router = useRouter()
  const Swal = require('sweetalert2')
  const [isShow, setIsShow] = useState(false)
  const [like, setLike] = useState(articles.like_id || false)
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

  const toggleLike = (e, article_id) => {
    e.preventDefault()

    fetch(`${ARTICLE_FAV}/${article_id}`, { headers: { ...getAuthHeader() } })
      .then((r) => r.json())
      .then((result) => {
        console.log(result)
        if (result.success) {
          // setRefresh(!refresh)//充新抓資料
          //另一種作法
          const newListData = structuredClone(listData)
          newListData.rows.forEach((r) => {
            if (r.id == result.article_id) {
              r.like_id = result.action == 'add' ? true : false
            }
          })
          setListData(newListData)
        }
      })
      .catch((error) => {
        console.error('Error while updating favorite status:', error)
      })
  }

  const copyUrl = () => {
    // 獲取當前頁面的 URL
    const url = window.location.href

    // 使用 clipboard API 複製 URL 到剪貼簿
    navigator.clipboard.writeText(url).then(
      () => {
        Toast.fire({
          icon: 'success',
          title: '複製成功!',
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
            <Link href="/articles">
              <span className={articleStyle.tooltip}>菜單</span>
              <FaList />
            </Link>
          </li>
          <li className={articleStyle.icon} onClick={copyUrl}>
            <span className={articleStyle.tooltip}>分享</span>
            <IoShareSocialSharp />
          </li>

          <li className={articleStyle.icon}>
            <span className={articleStyle.tooltip}>收藏</span>
            {like ? (
              <FaHeart
                className={articleStyle.heartActive}
                onClick={(e) => toggleLike(e, articles.id)}
              />
            ) : (
              <FaRegHeart onClick={(e) => toggleLike(e, articles.id)} />
            )}
          </li>
        </ul>
      </div>
    </>
  )
}
