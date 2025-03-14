'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import articlesStyle from '../styles/articles.module.css'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
export default function Card({ articles = {} }) {
  const [like, setLike] = useState(false)
  const toggle = (event) => {
    event.preventDefault()
    setLike(!like)
  }
  return (
    <>
      {' '}
      <div className={articlesStyle.card}>
        <Link href={`/articles/${articles.id}`}>
          <div className={articlesStyle.images}>
            <Image
              src={`${articles.imageURL}`}
              width={240}
              height={170}
              alt="揭開健身與飲食間的神秘聯繫，輕鬆達成理想身形！"
            />
            <div className={articlesStyle.heartArea}>
              {like ? (
                <FaHeart
                  className={articlesStyle.heartActive}
                  onClick={toggle}
                />
              ) : (
                <FaRegHeart className={articlesStyle.heart} onClick={toggle} />
              )}
            </div>
          </div>
          <div className={articlesStyle.content}>
            <h5>{articles.title}</h5>
            <hr />
            <p>{articles.intro}</p>
          </div>
        </Link>
      </div>
    </>
  )
}
