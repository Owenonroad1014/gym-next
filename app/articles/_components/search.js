'use client'

import articleStyle from '../styles/articles.module.css'
export default function Search() {
  return (
    <>
      <div className={articleStyle.searchContainer}>
        <form className={articleStyle.searchForm}>
          <input placeholder="輸入關鍵字"></input>
          <button type="submit">搜尋</button>
        </form>
      </div>
    </>
  )
}
