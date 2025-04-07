'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import memberCss from './_styles/member.module.css'
import { useAuth } from '@/context/auth-context'
import MemberNoAdmin from './_component/member-no-admin'
import SplitText from './_component/spring-text'
export default function MemberPage() {
  const pathname = usePathname()
  const { auth } = useAuth()
  const handleAnimationComplete = () => {
    console.log('All letters have animated!')
  }
  return (
    <>
      {auth.id ? (
        <>
          <div className={memberCss.memberAdmin}>
            <SplitText
              text="歡迎來到GYM步空間會員中心 !"
              className="text-2xl font-semibold text-center"
              delay={150}
              animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
              easing="easeOutCubic"
              threshold={0.2}
              rootMargin="-50px"
              onLetterAnimationComplete={handleAnimationComplete}
            />
          </div>
        </>
      ) : (
        <MemberNoAdmin/>
      )}
    </>
  )
}
