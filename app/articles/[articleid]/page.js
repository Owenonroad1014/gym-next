'use client'

import React, { useState, useEffect } from 'react'
import ArticlesBanner from '../_components/articles-banner'
import Breadcrumb from '../_components/breadcrumb'
import HotRanking from './_components/hot-ranking'
import Content from './_components/content'
import articleCss from './article.module.css'
import ShareSidebar from './_components/share-sidebar'
import Recommend from './_components/recommend'
import { useParams } from 'next/navigation'
import { ARTICLE_ITEM } from '@/config/api-path'
import moment from 'moment'

export default function ArticlesPage() {
  const { articleid } = useParams()
  const [breadcrumb, setBreadcrumb] = useState(['首頁', 'GYM享知識'])
  const [article, setArticle] = useState({
    id: 1,
    title: '',
    intro: '',
    content: '',
    imageURL: '',
    category_id: 3,
    created_at: '',
    updated_at: '',
    views: 0,
  })
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!articleid) return

    const fetchArticle = async () => {
      try {
        const response = await fetch(`${ARTICLE_ITEM}/${articleid}`)
        const data = await response.json()
        if (response.ok) {
          setArticle(data.data)
          setBreadcrumb((pre) => [...pre, data.data.title])
        } else {
          setError('連接文章失敗')
        }
      } catch (err) {
        setError('連接文章失敗')
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
      <Breadcrumb breadcrumb={breadcrumb} articleid={articleid}/>
      <div className={articleCss.articleContainer}>
        <ShareSidebar />
        <div className={articleCss.topSection}>
          <Content article={article} date={date} />
          <HotRanking />
        </div>
        <div className={articleCss.bottomSection}>
          <Recommend articleid={articleid} />
        </div>
      </div>
    </>
  )
}
