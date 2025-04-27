'use client'

import React, { Suspense } from 'react'
import ArticlesBanner from './_components/articles-banner'
import List from './_components/list'
import Breadcrumb from './_components/breadcrumb'
import Select from './_components/select'
import articlecss from './styles/articles.module.css'
import Search from './_components/search'


export default function ArticlesPage() {
  const breadcrumb = ['首頁', 'GYM享知識']
  

  return (
    <>
      <ArticlesBanner />
      <Breadcrumb breadcrumb={breadcrumb} />
      <div className={articlecss.articlesContainer}>
        <Search />
        <div className={articlecss.articleBottom}>
        <Suspense fallback={<div>Loading...</div>}>
          <Select />
        </Suspense>
        
        <Suspense fallback={<div>Loading...</div>}>
          <List />
        </Suspense>
        </div>
      </div>
      {/* // modal */}
    </>
  )
}
