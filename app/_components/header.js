'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import headerstyles from './_styles/header.module.css'
import { FaCartPlus } from 'react-icons/fa'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useAuth } from '@/context/auth-context'
import { useCart } from '@/context/cart-context'
import { AVATAR_PATH } from '@/config/api-path'
import Drawer from './drawer'

export default function Header() {
  const router = useRouter()
  const [isScrolling, setIsScrolling] = useState(false)
  const { auth, logout } = useAuth()
  const { cartQuantity } = useCart()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname() // 使用 Next.js 的 usePathname 來取得當前路徑
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 36) {
        setIsScrolling(true)
      } else {
        setIsScrolling(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    // 清理事件監聽器
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  // 判斷是否要隱藏 Header
  if (pathname.startsWith('/member')) {
    return null // `/member` 底下的頁面不顯示 Header
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
  const MySwal = withReactContent(Swal)
  const hasLogout = () => {
    return new Promise((res) => {
      document.body.style.overflow = 'hidden' //畫面不要偏移使用
      MySwal.fire({
        imageUrl: '/gymdot.svg',
        imageHeight: 150,
        imageAlt: 'gym-boo-logo',
        text: '已登出，即將跳轉至首頁',
        showConfirmButton: false,
        timer: 1500,
        didClose: () => {
          //畫面不要偏移使用
          document.body.style.overflow = '' // 恢復頁面滾動
          res()
          router.push('/')
        },
      })
    })
  }
  const getHeaderStyle = () => {
    if (/^\/coaches\/list\/\d+/.test(pathname)) {
      return headerstyles.secondHeader
    }
    if (/^\/products\/\d+/.test(pathname)) {
      return headerstyles.secondHeader
    }
    if (pathname.startsWith('/carts')) {
      return headerstyles.secondHeader
    }
    if (pathname === '/') {
      return headerstyles.homeHeader
    }
    return headerstyles.defaultHeader
  }

  return (
    <>
      <div
        className={`${headerstyles.header} ${
          isScrolling ? headerstyles.hscrolling : ''
        } ${getHeaderStyle()}`}
      >
        {/* LOGO */}
        <div>
          <Link href="/" className={headerstyles.logo}>
            <Image
              src={
                mounted && pathname === '/'
                  ? isScrolling
                    ? '/gym-logo-white.svg'
                    : '/gym-logo.svg'
                  : '/gym-logo-white.svg'
              }
              alt="Logo"
              width={130}
              height={40}
            />
          </Link>
        </div>

        {/* 導航選單 */}

        {/* 右側圖示與搜尋欄 */}

        <div className={headerstyles.rightSection}>
          {' '}
          <Link href="/products" className={headerstyles.navLink}>
            租借器具
          </Link>
          
          <Link href="/friends" className={headerstyles.navLink}>
            找GYM友
          </Link>
          <Link href="/classes" className={headerstyles.navLink}>
            課程預約
          </Link>
          <Drawer />
          {auth.id ? (
            <>
              <Link
                href="/member-center"
                className={`${headerstyles.navLink} ${headerstyles.navDropdown}`}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
              >
                {auth.name}
                {isOpen && (
                  <ul>
                    <Link
                      rel="stylesheet"
                      href="/member-center"
                      onClick={() => setIsOpen(false)}
                    >
                      <li>前往會員中心</li>
                    </Link>
                    <Link
                      rel="stylesheet"
                      href="/member-center/myfriends"
                      onClick={() => setIsOpen(false)}
                    >
                      <li>我的好友</li>
                    </Link>
                    <Link
                      rel="stylesheet"
                      href="/member-center/reservation"
                      onClick={() => setIsOpen(false)}
                    >
                      <li>我的預約</li>
                    </Link>
                    <Link
                      rel="stylesheet"
                      href="/member-center/articles"
                      onClick={() => setIsOpen(false)}
                    >
                      <li>我的收藏</li>
                    </Link>
                    <Link
                      rel="stylesheet"
                      href="/member-center/carts"
                      onClick={() => setIsOpen(false)}
                    >
                      <li>我的訂單</li>
                    </Link>
                    <Link
                      rel="stylesheet"
                      href="/member-center/person"
                      onClick={() => setIsOpen(false)}
                    >
                      <li>帳號管理</li>
                    </Link>
                  </ul>
                )}
              </Link>
              <a
                href="/qs"
                onClick={(e) => {
                  e.preventDefault()
                  logout()
                  hasLogout()
                }}
                className={headerstyles.navLink}
              >
                登出
              </a>
            </>
          ) : (
            <>
              {/* 登入按鈕 */}
              <Link
                href={`/member/login?callbackUrl=${encodeURIComponent(
                  pathname
                )}`}
                className={headerstyles.navLink}
              >
                登入
              </Link>
              {/* 註冊按鈕 */}
              <Link href="member/register" className={headerstyles.navLink}>
                註冊
              </Link>
            </>
          )}
          <Link href="/carts" className={headerstyles.navLink}>
            <div className={headerstyles.cartIcon}>
              <FaCartPlus />
              {cartQuantity > 0 && (
                <span className={headerstyles.cartCount}>{cartQuantity}</span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}
