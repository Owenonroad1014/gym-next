'use client'
import React, { useState, useEffect } from 'react'
import headerstyles from './_styles/header.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { FaCartPlus } from 'react-icons/fa'
import { useAuth } from '@/context/auth-context'
import { usePathname } from 'next/navigation'

export default function Header() {

  const { auth, logout } = useAuth()
  const pathname = usePathname() 


  // 判斷是否要隱藏 Header
  if (pathname.startsWith('/member' || '/member/register')) {
    return null 
  }
  // const hideHeaderPages = [
  //   '/member/login',
  //   '/member/register',
  //   '/member',
  //   '/member/forgot-password',
  //   '/member/register/add-profile',
  // ]
  // if (hideHeaderPages.includes(pathname)) {
  //   return null // 這些頁面不顯示 Header
  // }

  return (
    <>
      <div
        className={headerstyles.header} 
      >
        {/* LOGO */}
        <div>
          <Link href="/" className={headerstyles.logo}>
            <Image
              src="/gym-logo-white.svg"
              alt="Logo"
              width={130}
              height={40}
            />
          </Link>
        </div>

        {/* 導航選單 */}
        <div className={headerstyles.navMenu}>
          <Link href="/coaches" className={headerstyles.navLink}>
            找GYM身教練
          </Link>
          <Link href="/articles" className={headerstyles.navLink}>
            GYM享知識
          </Link>
          <Link href="/locations" className={headerstyles.navLink}>
            找GYM點
          </Link>
          <Link href="/friends" className={headerstyles.navLink}>
            找GYM友
          </Link>
        </div>

        {/* 右側圖示與搜尋欄 */}
        <div className={headerstyles.rightSection}>
          {auth.id ? (
            <>
              <Link href="/member" className={headerstyles.navLink}>
                <div className={headerstyles.navAvatar}>
                  <img
                    src={
                      auth.avatar
                        ? `img/${auth.avatar}`
                        : '/imgs/avatar/default-avatar.png'
                    }
                    alt=""
                  />
                </div>
              </Link>
              <a
                href="/qs"
                onClick={(e) => {
                  e.preventDefault()
                  logout()
                }}
                className={headerstyles.navLink}
              >
                登出
              </a>
            </>
          ) : (
            <>
              {/* 登入按鈕 */}
              <Link href="/member/login" className={headerstyles.navLink}>
                登入
              </Link>
              {/* 註冊按鈕 */}
              <Link href="member/register" className={headerstyles.navLink}>
                註冊
              </Link>
            </>
          )}
          <Link href="/carts" className={headerstyles.navLink}>
            <FaCartPlus />
          </Link>
        </div>
      </div>
    </>
  )
}
