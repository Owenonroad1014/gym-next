'use client'
import articlecss from '../styles/articles.module.css'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'

import Card from './card'

export default function List() {
  return (
    <>
      <div className={articlecss.articleList}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div class={articlecss.pagination}>
        <a href="#" class={articlecss.disabled}>
          <MdArrowBackIos />
        </a>
        <a href="#" class={articlecss.active}>
          1
        </a>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
        <a href="#">
          <MdArrowForwardIos />
        </a>
      </div>
    </>
  )
}
