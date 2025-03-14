'use client'
import React from 'react'
import articleStyle from '../article.module.css'
import Slider from 'react-slick'
import Card from '../../_components/card'
import Link from 'next/link'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrArticle } from 'react-icons/gr'



export default function Recommend() {
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
  return (
    <>
      <div className={articleStyle.sliderContainer}>
        <h5>
          <GrArticle /> &nbsp;分類精選文章
        </h5>
        <hr />
        <Slider {...settings}>
          <div className={articleStyle.sliderItem}>
            <Link href="#">
              <Card />
            </Link>
          </div>
          <div className={articleStyle.sliderItem}>
            <Link href="#">
              <Card />
            </Link>
          </div>
          <div className={articleStyle.sliderItem}>
            <Link href="#">
              <Card />
            </Link>
          </div>
          <div className={articleStyle.sliderItem}>
            <Link href="#">
              <Card />
            </Link>
          </div>
        </Slider>
      </div>
    </>
  )
}
