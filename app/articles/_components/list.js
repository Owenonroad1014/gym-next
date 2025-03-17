'use client'
import articleStyle from '../styles/articles.module.css'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import Link from 'next/link'
import Card from './card'

export default function List() {
  return (
    <>
      <section className={articleStyle.articleRight}>
        <div className={articleStyle.articleList}>
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
        <div class={articleStyle.pagination}>
          <Link href="#" class={articleStyle.disabled}>
            <MdArrowBackIos />
          </Link>
          <Link href="#" class={articleStyle.active}>
            1
          </Link>
          <Link href="#">2</Link>
          <Link href="#">3</Link>
          <Link href="#">4</Link>
          <Link href="#">5</Link>
          <Link href="#">
            <MdArrowForwardIos />
          </Link>
        </div>
      </section>
    </>
  )
}
