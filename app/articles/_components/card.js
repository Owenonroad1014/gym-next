import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import articlecss from '../styles/articles.module.css'
import { FaHeart } from 'react-icons/fa'
export default function Card() {
  return (
    <>
      {' '}
      <div className={articlecss.card}>
        <div className={articlecss.images}>
          <Image
            src="/imgs/article001.jpg"
            width={240}
            height={170}
            alt="如何開始健身：初學者指南"
          />
          <FaHeart className={articlecss.faHeart}/>
        </div>
        <div className={articlecss.content}>
          <h5><Link href='#'>如何開始健身：初學者指南</Link></h5>
          <hr />
          <p>
            <Link href='#'>健身對許多人來說是個全新的挑戰，對於初學者而言，最重要的是從基礎開始，避免過度訓練而受傷。本文將介紹...</Link>
          </p>
          
        </div>
      </div>
    </>
  )
}
