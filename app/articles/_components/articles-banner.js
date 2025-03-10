'use client'

import articlecss from '../styles/articles.module.css'

export default function ArticlesBanner() {
  return (
    <>
      <div className={articlecss.banner}>
        <h3>GYM享知識</h3>
        <p>每天看一點，健身知識提升每一天！</p>
      </div>
    </>
  )
}
