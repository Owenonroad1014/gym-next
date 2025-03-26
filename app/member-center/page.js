'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import memberCss from './_styles/member.module.css'
import { useAuth } from '@/context/auth-context'
import FavList from './_component/fav-list'


export default function MemberPage() {
  const pathname = usePathname()
  
  const { auth } = useAuth()
  return (
    <>
      {auth.id ? (
        <>
          <div className={memberCss.memberAdmin}>
            <FavList />
          </div>
        </>
      ) : (
        <>
          <div className={memberCss.memberNoAdmin}>
            <div className={memberCss.memberSpan}>
              <h1>您好，請先登入</h1>
              <span>若您尚未成為會員，請先註冊</span>
            </div>
            <div className={memberCss.memberBtns}>
              <Link className={memberCss.memberBtn} href={`/member/login?callbackUrl=${encodeURIComponent(pathname)}`}>
                會員登入
              </Link>
              <Link
                className={`${memberCss.memberBtn} ${memberCss.memberBtnRegister}`}
                href="/member/register"
              >
                註冊會員
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  )
}
