'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import articlesStyle from '../styles/articles.module.css'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { ARTICLE_FAV } from '@/config/api-path'
import { useAuth } from '@/contexts/auth-context'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
export default function Card({
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
  },setRefresh=false,refresh=false
}) {
  const { auth, getAuthHeader } = useAuth()
  const router = useRouter()
  const [like, setLike] = useState(articles.like_id || false)
  const [listData, setListData] = useState({
    success: false,
    perpage: 0,
    totalRows: 0,
    totalPages: 0,
    page: 0,
    rows: [],
    keyword: '',
  })

  const toggleLike = (e, article_id) => {
    e.preventDefault()
    fetch(`${ARTICLE_FAV}/${article_id}`, { headers: { ...getAuthHeader() } })
      .then((r) => r.json())
      .then((result) => {
        console.log(result)
        if (result.error == '需要登入會員') {
          needlogin()
          return
        }
        if (result.success) {
          setRefresh(!refresh)//充新抓資料
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
  // ==== TODO 加入或移除收藏自動渲染
  useEffect(() => {
    // 每次文章內容變更後，重新顯示最新的收藏狀態
    setLike(articles.like_id || false)
  }, [articles])
  const needlogin = () => {
    const MySwal = withReactContent(Swal)
    MySwal.fire({
      title: '登入會員即可收藏!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f87808',
      cancelButtonColor: '#0b3760',
      confirmButtonText: '登入',
      cancelButtonText:'取消'
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/quick-login')
      }
    })
  }
  return (
    <>
      <div className={articlesStyle.card}>
        <Link href={`/articles/${articles.id}`}>
          <div className={articlesStyle.images}>
            <Image
              src={`${articles.imageURL}`}
              width={240}
              height={170}
              alt={articles.title}
            />
            <div className={articlesStyle.heartArea}>
              {like ? (
                <FaHeart
                  className={articlesStyle.heartActive}
                  onClick={(e) => toggleLike(e, articles.id)}
                />
              ) : (
                <FaRegHeart
                  className={articlesStyle.heart}
                  onClick={(e) => toggleLike(e, articles.id)}
                />
              )}
            </div>
          </div>
          <div className={articlesStyle.content}>
            <h5>{articles.title}</h5>
            <hr />
            <p>{articles.intro}</p>
          </div>
        </Link>
      </div>
    </>
  )
}
