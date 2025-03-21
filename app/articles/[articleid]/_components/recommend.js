'use client'
import React, { useEffect, useState } from 'react'
import articleStyle from '../article.module.css'
import Slider from 'react-slick'
import Card from '../../_components/card'
import Link from 'next/link'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { GrArticle } from 'react-icons/gr'
import { ARTICLE_RECOMMAND } from '@/config/api-path'
import { useAuth } from '@/context/auth-context'

export default function Recommend({ articleid = 0 }) {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    centerMode: true,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  const { auth, getAuthHeader } = useAuth()
  const [recommand, setRecommand] = useState([])
  useEffect(() => {
    const headers = auth ? { ...getAuthHeader() } : {}
    fetch(`${ARTICLE_RECOMMAND}/${articleid}`, {
      headers,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        setRecommand(result.data)
      })
  }, [articleid, auth])
  return (
    <>
      <div className={articleStyle.sliderContainer}>
        <h5>
          <GrArticle /> &nbsp;分類精選文章
        </h5>
        <hr />
        {recommand.length === 0 ? (
          <p>目前沒有更多推薦文章。</p>
        ) : (
          <Slider {...settings}>
            {recommand.map((article, i) => {
              return (
                <div className={articleStyle.sliderItem} key={article.id}>
                  <Link href={`/article/${article.id}`}>
                    <Card articles={article} />
                  </Link>
                </div>
              )
            })}
          </Slider>
        )}
      </div>
    </>
  )
}
