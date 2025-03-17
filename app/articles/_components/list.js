'use client'
import React, { useEffect, useState } from 'react'
import articleStyle from '../styles/articles.module.css'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import Link from 'next/link'
import Card from './card'
import useSWR from 'swr'
import { ARTICLES_LIST } from '@/config/api-path'

export default function List() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data, isLoading, error } = useSWR(ARTICLES_LIST, fetcher)
  console.log(data)
  const articles = data?.data?.articles

  // const [articlesData, setArticleData] = useState({
  //   status: '',
  //   data: {},
  // })
  // useEffect(() => {
  //   fetch(ARTICLES_LIST)
  //     .then((r) => r.json())
  //     .then((obj) => {
  //       console.log(obj)
  //       setArticleData(obj)
  //     })
  // }, [])
  return (
    <>
      <section className={articleStyle.articleRight}>
        <div className={articleStyle.articleList}>
          {articles?.map((v, i) => {
            return <Card key={v.id} articles={v} />
          })}
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
