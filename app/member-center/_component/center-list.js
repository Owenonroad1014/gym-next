'use client'
import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import selectStyle from '../_styles/member.module.css'
import { MdMenu, MdMenuOpen } from 'react-icons/md'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { FaHome } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'
import { useAuth } from '@/context/auth-context'
export default function CenterList() {
  const { auth, logout, getAuthHeader } = useAuth()
  const pathname = usePathname()
  const [menuShow, setMenuShow] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1140) {
        setMenuShow(false)
      } else {
        setMenuShow(true)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  const hideSelectPages = [
    '/member/login',
    '/member/register',
    '/member/register/add-profile',
  ]
  if (hideSelectPages.includes(pathname)) {
    return null // 這些頁面不顯示 Header
  } else {
    return (
      <>
        <section
          className={selectStyle.selectArea}
          style={{
            display: menuShow ? 'block' : 'none',
          }}
        >
          {auth ? (
            <div className={selectStyle.welcome}>
              WELCOME! &nbsp; &nbsp;{auth.id}
            </div>
          ) : (
            ''
          )}
          <hr />
          <ul className={selectStyle.selectPart}>
            <li>
              <Link href="/member-center/friend-list">好友列表</Link>
            </li>
            <li>
              <Link href="/member-center/chat">聊天室</Link>
            </li>
          </ul>
          <ul className={selectStyle.selectPart}>
            <li>
              <Link href="/member-center/reservation">我的預約</Link>
            </li>
          </ul>
          <ul className={selectStyle.selectPart}>
            <li>
              <Link href="/member-center/articles">收藏文章</Link>
            </li>
            <li>
              <Link href="/member-center/videos">收藏影片</Link>
            </li>
            <li>
              <Link href="/member-center/products">收藏產品</Link>
            </li>
          </ul>
          <ul className={selectStyle.selectPart}>
            <li>
              <Link href="/member-center/person">個人檔案</Link>
            </li>
            <li>
              <Link href="/member-center/sedit-password">修改密碼</Link>
            </li>
          </ul>

          <div className={selectStyle.icons}>
            <Link href="/">
              {' '}
              <FaHome style={{ cursor: 'pointer' }} />
            </Link>
            <MdLogout
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                e.preventDefault()
                logout()
              }}
            />
          </div>
        </section>
      </>
    )
  }
}
