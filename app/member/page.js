'use client'

import React from 'react'
import Link from 'next/link'
import memberCss from './_styles/member.module.css'
import { useAuth } from '@/context/auth-context'
import Card from './_component/card'
// import FavList from './_component/fav-list'
export default function MemberPage() {
  const { auth, getAuthHeader } = useAuth()
  return (
    <>
      {auth.id ? (
        <>
          <div className={memberCss.memberAdmin}><Card/></div>
        </>
      ) : (
        <>
          <div className={memberCss.memberNoAdmin}>
            <div className={memberCss.memberSpan}>
              <h1>您好，請先登入</h1>
              <span>若您尚未成為會員，請先註冊</span>
            </div>
            <div className={memberCss.memberBtns}>
              <Link className={memberCss.memberBtn} href="/member/login">
                會員登入
              </Link>
              <Link className={memberCss.memberBtn} href="/member/register">
                註冊會員
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  )
}
