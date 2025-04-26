'use client'
import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import articleStyle from '../article.module.css'
import { FaList, FaRegHeart, FaHeart } from 'react-icons/fa'
import { IoShareSocialSharp } from 'react-icons/io5'
import Link from 'next/link'
import { ARTICLE_ITEM_FAV, ARTICLE_ITEM_FAVTOGGLE } from '@/config/api-path'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useAuth } from '@/context/auth-context'
import ShareModal from './share-modal'
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
  const { articleid } = useParams()
  const Swal = require('sweetalert2')
  const [like, setLike] = useState(false)
  const { auth, getAuthHeader } = useAuth()
  const [error, setError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
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

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }
  useEffect(() => {
    const getFetchFav = async () => {
      try {
        const res = await fetch(`${ARTICLE_ITEM_FAV}/${articleid}`, {
          headers: { ...getAuthHeader() },
        })
        if (!res.ok) {
          setError('Failed to fetch fav')
        }
        const data = await res.json()
        if (data.data[0].like_id > 0) {
          setLike(true)
        }
      } catch (err) {
        setError(err.message || 'Something went wrong')
      }
    }
    getFetchFav()
  }, [articleid, auth, getAuthHeader, like])

  const toggleLike = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${ARTICLE_ITEM_FAVTOGGLE}/${articleid}`, {
        headers: { ...getAuthHeader() },
      })
      if (!res.ok) {
        setError('Failed to fetch fav')
      }
      const data = await res.json()
      console.log(data)
      if (data.error == '需要登入會員') {
        needlogin()
        return
      }
      if (data.success) {
        setLike(data.action == 'add' ? true : false)
      }
    } catch (error) {
      console.error('Error while updating favorite status:', error)
    }
  }
  const needlogin = () => {
    document.body.style.overflow = 'hidden' //畫面不要偏移使用
    const MySwal = withReactContent(Swal)
    MySwal.fire({
      title: '登入會員即可收藏!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f87808',
      cancelButtonColor: '#333',
      confirmButtonText: '登入',
      cancelButtonText: '取消',
      didClose: () => {
        //畫面不要偏移使用
        document.body.style.overflow = '' // 恢復頁面滾動
      },
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/member/login')
      }
    })
  }
  return (
    <>
      <div className={articleStyle.shareSidebar}>
        {/* <div
        className={`${articleStyle.shareSidebar} ${
          isShow ? articleStyle.show : ''
        }`}
      > */}
        <ul className={articleStyle.wrapper}>
          <li className={articleStyle.icon}>
            <span className={articleStyle.tooltip}>菜單</span>
            <Link href="/articles">
              <FaList />
            </Link>
          </li>
          <li
            className={articleStyle.icon}
            role="button" // 指定角色為按鈕
            tabIndex={0} // 使元素可聚焦
            onClick={() => handleOpenModal()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                // 支援鍵盤 Enter 或 Space 鍵點擊
                handleOpenModal()
              }
            }}
          >
            <span className={articleStyle.tooltip}>分享</span>
            <IoShareSocialSharp />
          </li>

          <li
            className={`${articleStyle.icon} ${
              like ? articleStyle.heartActive : ''
            }`}
            role="button" // 指定角色為按鈕
            tabIndex={0}
            onClick={(e) => toggleLike(e)}
            onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {  // 支援鍵盤 Enter 或 Space 鍵點擊
      toggleLike(e);
    }
  }}
          >
            <span className={articleStyle.tooltip}>
              {like ? '取消收藏' : '收藏'}
            </span>
            {like ? <FaHeart /> : <FaRegHeart />}
          </li>
        </ul>
      </div>
      <ShareModal
        setIsModalOpen={setIsModalOpen}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
