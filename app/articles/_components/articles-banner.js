'use client'

import articlesStyle from '../styles/articles.module.css'
import BlurText from '@/app/_components/blur-text'

export default function ArticlesBanner() {
  return (
    <>
      <div className={articlesStyle.banner}>
        <BlurText text="GYM享知識" className={articlesStyle.title} />
        <BlurText
          text="每天看一點，健身知識提升每一天！"
          className={articlesStyle.subtitle}
        />
      </div>
    </>
  )
}
