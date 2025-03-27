'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaHeart } from 'react-icons/fa'
import cardStyle from '../_styles/member.module.css'
import { useAuth } from '@/context/auth-context'

export default function Card() {
  const { auth, getAuthHeader } = useAuth()
  const [error, setError] = useState('')
  const [isloading, setIsloading] = useState(true)
  const [articlesData, setArticlesData] = useState([])

  useEffect(() => {
    // 獲取文章列表
    const fetchArticles = async () => {
      try {
        const headers = auth ? { ...getAuthHeader() } : {}
        const res = await fetch(`${ARTICLES_LIST}${location.search}`, {
          headers,
        })
        if (!res.ok) {
          setError('Failed to fetch articles')
        }
        setIsloading(false)
        const data = await res.json() // 解析 JSON
        setArticlesData(data || {}) // 儲存文章資料
      } catch (err) {
        setError(err.message || 'Something went wrong') // 儲存錯誤信息
        setIsloading(false)
      }
    }

    fetchArticles()
  }, [auth, getAuthHeader])
  return (
    <>
      <Link href={`/articles/${articles.id}`}>
        <div className={cardStyle.favCard}>
          <div className={cardStyle.images}>
            <Image
              src={
                'https://images.unsplash.com/photo-1726064855757-ac8720008fe0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              }
              width={300}
              height={200}
              alt={articles.title}
              className={cardStyle.cardImage}
            />
          </div>
          <div className={cardStyle.content}>
            <div className={cardStyle.cardBody}>
              <h3>專家級增肌飲食秘訣，打造理想肌肉線條</h3>

              <div className={cardStyle.cardDesc}>
                {/* <p>{`${price}元/天`}</p> */}
                <p>
                  對於許多人來說，增肌不僅僅是每週幾次的健身訓練。事實上，飲食在增肌過程中佔據了至關重要的地位。正確的飲食策略能夠為肌肉生長提供所需的能量和營養，同時加速恢復和提升運動表現。如果你希望打造理想的肌肉線條，專家級的增肌飲食秘訣是你不可忽視的關鍵。
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </Link>
    </>
  )
}
