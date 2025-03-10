import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import articlecss from '../styles/articles.module.css'
import { FaHeart,FaRegHeart } from 'react-icons/fa'
export default function Card() {
  return (
    <>
      {' '}
      <div className={articlecss.card}>
        <Link href="/articles/article">
          <div className={articlecss.images}>
            <Image
              src="/imgs/article001.jpg"
              width={240}
              height={170}
              alt="揭開健身與飲食間的神秘聯繫，輕鬆達成理想身形！"
            />
            <div className={articlecss.heartArea}>
              <FaRegHeart className={articlecss.faHeart} />
            </div>
          </div>
          <div className={articlecss.content}>
            <h5>
              <Link href="/articles/article">
                如何開始健身：初學者指南揭開健身與飲食間的神秘聯繫，輕鬆達成理想身形！
              </Link>
            </h5>
            <hr />
            <p>
              健身是一個改變生活方式的過程，無論是為了增強體能、提高健康水平，還是簡單地希望擁有更好的外觀。對於初學者來說，開始健身可能會感覺有些困難，因為健身的選擇和資訊琳瑯滿目。然而，只要掌握一些基本原則和步驟，你就能夠在這條道路上順利啟航。這篇文章將為你提供一個清晰的健身入門指南，幫助你輕鬆開始健身並建立長期的健身習慣。
            </p>
          </div>
        </Link>
      </div>
    </>
  )
}
