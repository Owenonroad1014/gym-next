'use client'
import React, { useEffect, useState } from 'react'
import articleStyle from '../styles/articles.module.css'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import Link from 'next/link'
import Card from './card'
import { ARTICLES_LIST } from '@/config/api-path'
import { useSearchParams } from 'next/navigation'
import loaderStyle from '@/app/_components/_styles/loading.module.css'
import { useAuth } from '@/context/auth-context'

export default function List() {
  const searchParams = useSearchParams()
  const { auth, getAuthHeader } = useAuth()
  const [articlesData, setArticlesData] = useState([])
  const [error, setError] = useState('')
  const [islike, setIsLike] = useState(false) //刷新用
  const [isloading, setIsloading] = useState(true)
  useEffect(() => {
    // 獲取文章列表
    const fetchArticles = async () => {
      try {
        const headers = auth ? { ...getAuthHeader() } : {}
        const res = await fetch(`${ARTICLES_LIST}${location.search}`, {
          headers,
        })
        if (!res.ok) {
          setError('Failed to fetch articles')
        }
        setIsloading(false)
        const data = await res.json() // 解析 JSON
        setArticlesData(data || {}) // 儲存文章資料
      } catch (err) {
        setError(err.message || 'Something went wrong') // 儲存錯誤信息
        setIsloading(false)
      }
    }

    fetchArticles()
  }, [auth, getAuthHeader, searchParams, islike])
  return (
    <>
      {isloading ? (
        <>
          <div className={articleStyle.loaderContainer}>
            <div className={loaderStyle.loader}></div>
          </div>
        </>
      ) : (
        <>
          {articlesData.totalRows <= 0 ? (
            <div className={articleStyle.noarticle}>
              <p>尚無文章...</p>
            </div>
          ) : (
            <section className={articleStyle.articleRight}>
              <div className={articleStyle.articleList}>
                {articlesData.rows?.map((v, i) => {
                  return <Card key={v.id} articles={v} setIsLike={setIsLike} />
                })}
              </div>
              <div className={articleStyle.pagination}>
                <Link
                  href={`?page=${articlesData.page - 1}`}
                  className={
                    articlesData.page == 1 ? articleStyle.disabled : ''
                  }
                  onClick={(e) => {
                    if (articlesData.page == 1) {
                      e.preventDefault()
                    }
                  }}
                >
                  <MdArrowBackIos />
                </Link>
                {Array(articlesData.totalPages)
                  .fill(1)
                  .map((v, i) => {
                    if (
                      articlesData.page < 1 ||
                      articlesData.page > articlesData.totalPages
                    )
                      return null
                    const usp = new URLSearchParams(searchParams.toString())
                    usp.set('page', i + 1)
                    return (
                      <Link
                        href={`?${usp}`}
                        className={
                          i + 1 === articlesData.page ? articleStyle.active : ''
                        }
                        key={i}
                      >
                        {i + 1}
                      </Link>
                    )
                  })}

                <Link
                  href={`?page=${articlesData.page + 1}`}
                  className={
                    articlesData.page == articlesData.totalPages
                      ? articleStyle.disabled
                      : ''
                  }
                  onClick={(e) => {
                    if (articlesData.page == articlesData.totalPages) {
                      e.preventDefault()
                    }
                  }}
                >
                  <MdArrowForwardIos />
                </Link>
              </div>
            </section>
          )}
        </>
      )}
    </>
  )
}
