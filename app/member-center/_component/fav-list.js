'use client'

import React from 'react'
import { useSearchParams, usePathname } from 'next/navigation'
import Link from 'next/link'
import Card from '../_component/card'
import memberCss from '../_styles/member.module.css'
import { useAuth } from '@/context/auth-context'

export default function FavList() {
  const { auth } = useAuth()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const category = searchParams.get('category') || ''

  return (
    <>
      {auth > 0 ? (
        <>
          <h2>{category}</h2>
          <Card />
        </>
      ) : (
        <>
          <div className={memberCss.memberNoAdmin}>
            <div className={memberCss.memberSpan}>
              <h1>您好，請先登入</h1>
              <span>若您尚未成為會員，請先註冊</span>
            </div>
            <div className={memberCss.memberBtns}>
              <Link
                className={memberCss.memberBtn}
                href={`/member/login?callbackUrl=${encodeURIComponent(
                  pathname
                )}`}
              >
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
