import React from 'react'
import ArticlesBanner from './_components/articles-banner'
import Card from './_components/card'
import articlecss from './styles/articles.module.css'

export default function ArticlesPage() {
  return (
    <>
      <ArticlesBanner />
      <div className={articlecss.articlesssContainer}>
        <Card/>
      </div>
     
    </>
  )
}
