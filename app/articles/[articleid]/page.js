'use client'

import React, { useState, useEffect } from 'react'
import ArticlesBanner from '../_components/articles-banner'
import Breadcrumb from '../_components/breadcrumb'
import HotRanking from './_components/hot-ranking'
import Content from './_components/content'
import articleStyle from './article.module.css'
import ShareSidebar from './_components/share-sidebar'
import Recommend from './_components/recommend'
import { useParams } from 'next/navigation'
import { ARTICLE_ITEM } from '@/config/api-path'
import moment from 'moment'
import loaderStyle from '@/app/_components/_styles/loading.module.css'

export default function ArticlesPage() {
  const { articleid } = useParams()

  const [breadcrumb, setBreadcrumb] = useState(['首頁', 'GYM享知識'])
  const [totalArticle, setTotalArticle] = useState(0)

  const [article, setArticle] = useState({
    id: 0,
    title: '',
    intro: '',
    content: '',
    imageURL: '',
    category_id: 0,
    created_at: '',
    updated_at: '',
    views: 0,
  })

  const [error, setError] = useState(null)
  const [isloading, setIsloading] = useState(true)

  useEffect(() => {
    if (!articleid) return
    const fetchTotalArticle = async () => {
      try {
        const response = await fetch(`${ARTICLE_ITEM}`)
        const data = await response.json()
        if (response.ok) {
          setTotalArticle(data.totalRows)
        } else {
          setError('連接總筆數錯誤')
        }
      } catch (err) {
        setError('連接總筆數失敗')
      }
    }
    fetchTotalArticle()
    const fetchArticle = async () => {
      try {
        const response = await fetch(`${ARTICLE_ITEM}/${articleid}`)
        const data = await response.json()
        if (response.ok) {
          setIsloading(false)
          setArticle(data.data)
          setBreadcrumb((pre) => [...pre, data.data.title])
        } else {
          setError('連接文章失敗')
        }
      } catch (err) {
        setError('連接文章失敗')
        setIsloading(false)
      }
    }

    fetchArticle()
  }, [articleid])

  if (error) return <p>Error: {error}</p>
  if (!article) return <p>此文章不存在</p>

  const date = moment(article.created_at).format('YYYY/MM/DD')
  return (
    <>
      <ArticlesBanner />
      <Breadcrumb breadcrumb={breadcrumb} articleid={articleid} />
      {isloading ? (
        <>
          <div className={articleStyle.loaderContainer}>
            <div className={loaderStyle.loader}></div>
          </div>
        </>
      ) : (
        <>
          <div className={articleStyle.articleContainer}>
            <div className={articleStyle.topSection}>
              <ShareSidebar />
              <Content
                article={article}
                date={date}
                totalArticle={totalArticle}
              />
              <HotRanking />
            </div>

            <div className={articleStyle.bottomSection}>
              <Recommend articleid={articleid} />
            </div>
          </div>
        </>
      )}
    </>
  )
}
