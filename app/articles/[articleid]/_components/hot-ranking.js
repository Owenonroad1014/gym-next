'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import articleStyle from '../article.module.css'
import { FaMedal } from 'react-icons/fa6'
import { ARTICLE_TOP5 } from '@/config/api-path'

export default function HotRanking() {
  const [top5, setTop5] = useState([])
  const [error, setError] = useState({})
  useEffect(() => {
    const fetchTop5 = async () => {
      try {
        const response = await fetch(`${ARTICLE_TOP5}`)
        const data = await response.json()
        if (response.ok) {
          setTop5(data.data)
        } else {
          setError('連接Top5失敗')
        }
      } catch (err) {
        setError('連接Top5失敗')
      }
    }

    fetchTop5()
  }, [])
  return (
    <>
      <section className={articleStyle.hotRankingArea}>
        <h4>
          <FaMedal />
          &nbsp;&nbsp;TOP FIVE
        </h4>
        <div className={articleStyle.dash}></div>
        <ol>
          {top5.map((v, i) => {
            return (
              <li>
                <Link href={`/articles/${v.id}`}>
                  <span>{i+1}</span>
                  <span>{v.title}</span>
                </Link>
              </li>
            )
          })}
        </ol>
      </section>
    </>
  )
}
