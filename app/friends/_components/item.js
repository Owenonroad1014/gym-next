'use client'
import { useState } from 'react'
import friendStyle from '../_styles/friends.module.css'
import Link from 'next/link'

export default function List() {
  
  return (
    <>
      <div className={friendStyle.profileCard}>
        <div className={friendStyle.profileCard_container}>
          <div className={friendStyle.circle}>
            <div className={friendStyle.profileImage}></div>
          </div>
          <p className={friendStyle.profileName}>楊曉晴</p>
          <hr className={friendStyle.profile_divider} />
          <section className={friendStyle.profile_description_wrapper}>
            <p className={friendStyle.profile_description}>
              我是一名重訓愛好者，最近正在增肌訓練，平時每週3次跑步，...
            </p>
            <button className={friendStyle.favorite_button}>
              <Link href="/friends/person">查看更多</Link>
            </button>
          </section>
        </div>
      </div>
    </>
  )
}
