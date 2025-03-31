'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MdOutlineArticle } from 'react-icons/md'
import cardStyle from '../_styles/member.module.css'
import { useAuth } from '@/context/auth-context'
import { ARTICLE_MEMBER_FAV } from '@/config/api-path'
import styles from '../_styles/article-default.module.css'
import loaderStyle from "@/app/_components/_styles/loading.module.css"
import Search from './_components/search'
import { useSearchParams } from 'next/navigation'

export default function ArticleList() {
  const { auth, getAuthHeader } = useAuth()
  const [error, setError] = useState('')
  const [isloading, setIsloading] = useState(true)
  const [articlesData, setArticlesData] = useState({})
  const searchParams = useSearchParams()
  useEffect(() => {
    // 獲取文章列表
    const fetchArticles = async () => {
      try {
        const headers = auth ? { ...getAuthHeader() } : {}
        const res = await fetch(`${ARTICLE_MEMBER_FAV}${location.search}`, {
          headers,
        })
        if (!res.ok) {
          setError('Failed to fetch articles')
        }
        setIsloading(false)
        const data = await res.json() // 解析 JSON
        setArticlesData(data) // 儲存文章資料
      } catch (err) {
        setError(err.message || 'Something went wrong') // 儲存錯誤信息
        setIsloading(false)
      }
    }
    fetchArticles()
  }, [auth, getAuthHeader,searchParams])
  return (
    <>
      {isloading ? (
        <>
          <div className={styles.loaderContainer}>
            <div className={loaderStyle.loader}></div>
          </div>
        </>
      ) : (
        <>
          {articlesData?.total == 0 ? (
            <div className={styles.noFavArticle}>
              <p>目前沒有收藏文章</p>
              <Link href="/articles">
                <MdOutlineArticle style={{ fontSize: '30px' }} />{' '}
                &nbsp;&nbsp;前往找GYM享知識，找知識!
              </Link>
            </div>
          ) : (
            <div className={styles.articleList}>
            <Search/>
            <br />
            {articlesData?.data?.map((v, i) => {
              return (
                <Link href={`/articles/${v.article_id}`} key={v.like_id}>
                  <div className={cardStyle.favCard}>
                    <div className={cardStyle.images}>
                      <Image
                        src={v.imageURL}
                        width={300}
                        height={200}
                        alt={v.title}
                        className={cardStyle.cardImage}
                      />
                    </div>
                    <div className={cardStyle.content}>
                      <div className={cardStyle.cardBody}>
                        <h3>{v.title}</h3>
                        <div className={cardStyle.cardDesc}>
                          <p>{v.intro}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
            </div>
            
          )}
        </>
      )}
    </>
  )
}
