'use client'
import React from 'react'
import Link from 'next/link'
import articleStyle from '../article.module.css'
import { FaMedal } from "react-icons/fa6";

export default function HotRanking() {
  return (
    <>
      <section className={articleStyle.hotRankingArea}>
        <h4><FaMedal/>&nbsp;&nbsp;TOP FIVE</h4>
        <div className={articleStyle.dash}></div>
        <ol>
          <li>
            <Link href="#">
              <span>1</span>
              <span>揭開健身與飲食間的神秘聯繫，輕鬆達成理想身形！</span>
            </Link>
          </li>
          <li>
            <Link href="#">
              <span>2</span>
              <span>燃脂速度翻倍！高效運動方式助你迅速甩掉脂肪</span>
            </Link>
          </li>
          <li>
            <Link href="#">
              <span>3</span>
              <span>專家級增肌飲食秘訣，打造理想肌肉線條</span>
            </Link>
          </li>
          <li>
            <Link href="#">
              <span>4</span>
              <span>遠離傷害！學會如何避免過度訓練與身體崩潰</span>
            </Link>
          </li>
          <li>
            <Link href="#">
              <span>5</span>
              <span>每週健身計劃定制，從零開始逐步實現目標</span>
            </Link>
          </li>
        </ol>
      </section>
    </>
  )
}
