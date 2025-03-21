'use client'

import React, { useState, useEffect } from 'react'
import ArticlesBanner from './_components/articles-banner'
import List from './_components/list'
import Breadcrumb from './_components/breadcrumb'
import Select from './_components/select'
import articlecss from './styles/articles.module.css'
import Search from './_components/search'
import { useAuth } from '@/context/auth-context'
import { ARTICLES_LIST } from '@/config/api-path'
import { useSearchParams } from 'next/navigation'

export default function ArticlesPage() {
  const breadcrumb = ['首頁', 'GYM享知識']
  const { auth, getAuthHeader } = useAuth()
  const [articlesData, setArticlesData] = useState([])
  const [error, setError] = useState('')
  const [refresh, setRefresh] = useState(false)
  const searchParams = useSearchParams()
  const [isLike, setIsLike] = useState()
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
        const data = await res.json() // 解析 JSON
        setArticlesData(data || {}) // 儲存文章資料
        setRefresh((v) => !v)
      } catch (err) {
        setError(err.message || 'Something went wrong') // 儲存錯誤信息
      }
    }

    fetchArticles()
  }, [auth, getAuthHeader, searchParams])

  return (
    <>
      <ArticlesBanner />
      <Breadcrumb breadcrumb={breadcrumb} />
      <div className={articlecss.articlesContainer}>
        <Search />
        <div className={articlecss.articleBottom}>
          <Select />
          <List
            articlesData={articlesData}
            setRefresh={setRefresh}
            refresh={refresh}
          />
        </div>
      </div>
      {/* // modal */}
    </>
  )
}
