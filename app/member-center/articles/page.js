'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import cardStyle from '../_styles/member.module.css'
import styles from './articleList.module.css'
import noArticlceStyles from './article-default.module.css'
import { useAuth } from '@/context/auth-context'
import { ARTICLE_MEMBER_FAV, ARTICLE_FAV } from '@/config/api-path'
import loaderStyle from '@/app/_components/_styles/loading.module.css'
import Search from './_components/search'
import { useSearchParams, useRouter } from 'next/navigation'

import {
  MdOutlineArticle,
  MdArrowBackIos,
  MdArrowForwardIos,
} from 'react-icons/md'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

export default function ArticleList() {
  const { auth, getAuthHeader } = useAuth()
  const [error, setError] = useState('')
  const [isloading, setIsloading] = useState(true)
  const [articlesData, setArticlesData] = useState({})
  const [islike, setIsLike] = useState(false) // 刷新
  const router = useRouter()
  const searchParams = useSearchParams()
  useEffect(() => {
    // 獲取文章列表
    const fetchArticles = async () => {
      try {
        const headers = auth ? { ...getAuthHeader() } : {}
        const res = await fetch(`${ARTICLE_MEMBER_FAV}${searchParams.toString()}`, {
          headers,
        })
        if (!res.ok) {
          setError('Failed to fetch articles')
        }
        setIsloading(false)
        const data = await res.json() // 解析 JSON
        console.log(data)
        if (data.error == '沒有收藏的文章') {
          setError('沒有收藏的文章')
        }

        setArticlesData(data) // 儲存文章資料
      } catch (err) {
        setError(err.message || 'Something went wrong') // 儲存錯誤信息
        // setIsloading(false)
      }
    }
    fetchArticles()
  }, [auth, getAuthHeader, searchParams, islike])

  const toggleLike = (e, article_id) => {
    e.preventDefault()
    fetch(`${ARTICLE_FAV}/${article_id}`, { headers: { ...getAuthHeader() } })
      .then((r) => r.json())
      .then((result) => {
        console.log(result)
        if (result.success) {
          setIsLike(!islike)
        }
      })
      .catch((error) => {
        console.error('Error while updating favorite status:', error)
      })
  }

  return (
    <>
      {auth.id ? (
        isloading ? (
          <>
            <div className={styles.loaderContainer}>
              <div className={loaderStyle.loader}></div>
            </div>
          </>
        ) : (
          <>
            {articlesData?.totalRows == 0 ? (
              <div className={noArticlceStyles.noFavArticle}>
                <p>目前沒有收藏文章...</p>
                <Link href="/articles">
                  <MdOutlineArticle style={{ fontSize: '30px' }} />{' '}
                  &nbsp;&nbsp;前往找GYM享知識，找知識!
                </Link>
              </div>
            ) : (
              <div className={styles.articleList}>
                <div className={styles.topSection}>
          
                  <Search />
      
                  <br />
                  {articlesData?.data?.map((v, i) => {
                    return (
                      <Link href={`/articles/${v.article_id}`} key={v.like_id}>
                        <div className={styles.favCard}>
                          <div className={styles.images}>
                            <Image
                              src={v.imageURL}
                              width={300}
                              height={200}
                              alt={v.title}
                              className={styles.cardImage}
                            />
                          </div>
                          <div className={styles.content}>
                            <div className={styles.cardBody}>
                              <h3>{v.title}</h3>
                              <div className={styles.cardDesc}>
                                <p>{v.intro}</p>
                              </div>
                            </div>
                          </div>
                          <div className={styles.heartArea}>
                            {v.like_id > 0 ? (
                              <FaHeart
                                className={styles.heartActive}
                                onClick={(e) => toggleLike(e, v.article_id)}
                              />
                            ) : (
                              <FaRegHeart
                                className={styles.heart}
                                onClick={(e) => toggleLike(e, v.article_id)}
                              />
                            )}
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>

                <div className={styles.pagination}>
                  <Link
                    href={`?page=${articlesData.page - 1}`}
                    className={articlesData.page == 1 ? styles.disabled : ''}
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
                            i + 1 === articlesData.page ? styles.active : ''
                          }
                          key={i}
                        >
                          {v}
                        </Link>
                      )
                    })}

                  <Link
                    href={`?page=${articlesData.page + 1}`}
                    className={
                      articlesData.page == articlesData.totalPages
                        ? styles.disabled
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
              </div>
            )}
          </>
        )
      ) : (
        router.push('/member-center')
      )}
    </>
  )
}
