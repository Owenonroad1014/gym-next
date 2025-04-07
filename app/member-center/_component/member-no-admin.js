'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import memberCss from '../_styles/member.module.css'

export default function MemberNoAdmin() {
  const pathname = usePathname()
  return (
        <>
          <div className={memberCss.memberNoAdmin}>
            <div className={memberCss.memberSpan}>
              <h1>您好，<span>請先登入</span></h1>
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
  )
}
