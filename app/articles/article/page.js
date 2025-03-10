import React from 'react'
import ArticlesBanner from '../_components/articles-banner'
import Breadcrumb from '../_components/breadcrumb'
import HotRanking from './_components/hot-ranking'
import Content from './_components/content'
import articleCss from './article.module.css'
import ShareSidebar from './_components/share-sidebar'
import Recommend from './_components/recommend'
export default function ArticlesPage() {
  const breadcrumb = ['首頁', 'GYM享知識', '如何開始健身：初學者指南']
  return (
    <>
      <ArticlesBanner />
      <Breadcrumb breadcrumb={breadcrumb} />
      <div className={articleCss.articleContainer}>
        <ShareSidebar />
        <div className={articleCss.topSection}>
          <Content />
          <HotRanking />
        </div>
        <div className={articleCss.bottomSection}>
          <Recommend />
        </div>
      </div>
    </>
  )
}
