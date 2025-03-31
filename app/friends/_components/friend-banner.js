'use client'

import friendStyle from '../_styles/friends.module.css'
import BlurText from '@/app/_components/blur-text'

export default function FriendBanner() {
  return (
    <>
      <div className={friendStyle.banner}>
        <BlurText text="找GYM友" className={friendStyle.title} />
        <BlurText
          text="尋找有相同運動愛好的朋友，一起GYM步吧！"
          className={friendStyle.subtitle}
        />
      </div>
    </>
  )
}
