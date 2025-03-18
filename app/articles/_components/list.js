'use client'
import React, { useEffect, useState } from 'react'
import articleStyle from '../styles/articles.module.css'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import Link from 'next/link'
import Card from './card'
import { ARTICLES_LIST } from '@/config/api-path'
import { useSearchParams } from 'next/navigation'

export default function List({ articlesData = {} },setRefresh=false,refresh=false) {
  const searchParams = useSearchParams()
  return (
    <>
      <section className={articleStyle.articleRight}>
        <div className={articleStyle.articleList}>
          {articlesData.rows?.map((v, i) => {
            return (
              <Card key={v.id} articles={v} setRefresh={setRefresh} refresh={refresh}/>
            )
          })}
        </div>
        <div className={articleStyle.pagination}>
          <Link
            href={`?page=${articlesData.page - 1}`}
            className={articlesData.page == 1 ? articleStyle.disabled : ''}
          >
            <MdArrowBackIos />
          </Link>
          {Array(articlesData.totalPages)
            .fill(1)
            .map((v, i) => {
              if (articlesData.page < 1 || articlesData.page > articlesData.totalPages) return null
              const usp = new URLSearchParams(searchParams.toString())
              usp.set('page', i+1)
              return (
                <Link
                  href={`?${usp}`}
                  className={i+1 === articlesData.page ? articleStyle.active : ''}
                  key={i}
                >
                  {i+1}
                </Link>
              )
            })}

          <Link
            href={`?page=${articlesData.page + 1}`}
            className={
              articlesData.page == articlesData.totalPages
                ? articleStyle.disabled
                : ''
            }
          >
            <MdArrowForwardIos />
          </Link>
        </div>
      </section>
    </>
  )
}
