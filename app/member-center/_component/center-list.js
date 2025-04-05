'use client'
import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import selectStyle from '../_styles/member.module.css'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { FaHome } from 'react-icons/fa'
import { MdLogout, MdLogin, MdMenu, MdMenuOpen } from 'react-icons/md'
import { useAuth } from '@/context/auth-context'
import { MEMBER_CENTER_NAME } from '@/config/api-path'
import styles from '../_styles/member-layout.module.css'
import { SiOpenaigym } from 'react-icons/si'

export default function CenterList() {
  const { auth, logout, getAuthHeader } = useAuth()
  const pathname = usePathname()
  const [menuShow, setMenuShow] = useState(true)
  const [name, setName] = useState('')
  const router = useRouter()
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
  useEffect(() => {
    const fetchName = async () => {
      const res = await fetch(MEMBER_CENTER_NAME, {
        headers: { ...getAuthHeader() },
      })
      if (!res.ok) {
        console.log('資料無法fetch')
      }
      const data = await res.json()
      setName(data?.data)
    }
    fetchName()
  }, [auth, getAuthHeader])
  if (!auth.id) return null
  return (
    <>
      <div className={styles.centerSidebar}>
        <section
          className={selectStyle.selectArea}
          style={{
            display: menuShow ? 'block' : 'none',
          }}
        >
          {auth ? (
            <>
              <Link href="/" className={selectStyle.welcome}>
                <img
                  src="/gymdot.svg"
                  alt="gym-icon"
                  className={selectStyle.welcomeicon}
                />
                WELCOME !{auth.name}
              </Link>
            </>
          ) : (
            ''
          )}
          <hr />
          <ul className={selectStyle.selectPart}>
            <li
              className={
                pathname === '/member-center/myfriends'
                  ? selectStyle.active
                  : ''
              }
            >
              <Link href="/member-center/myfriends">我的好友</Link>
            </li>
          </ul>
          <ul className={selectStyle.selectPart}>
            <li
              className={
                pathname === '/member-center/reservation'
                  ? selectStyle.active
                  : ''
              }
            >
              <Link href="/member-center/reservation">我的預約</Link>
            </li>
          </ul>
          <ul className={selectStyle.selectPart}>
            <li
              className={
                pathname === '/member-center/articles' ? selectStyle.active : ''
              }
            >
              <Link href="/member-center/articles">收藏文章</Link>
            </li>
            <li
              className={
                pathname === '/member-center/videos' ? selectStyle.active : ''
              }
            >
              <Link href="/member-center/videos">收藏影片</Link>
            </li>
            <li
              className={
                pathname === '/member-center/products' ? selectStyle.active : ''
              }
            >
              <Link href="/member-center/products">收藏產品</Link>
            </li>
          </ul>
          <ul className={selectStyle.selectPart}>
            <li
              className={
                pathname === '/member-center/rated-reviews'
                  ? selectStyle.active
                  : ''
              }
            >
              <Link href="/member-center/rated-reviews">我的評價</Link>
            </li>
            <li
              className={
                pathname === '/member-center/unrated-reviews'
                  ? selectStyle.active
                  : ''
              }
            >
              <Link href="/member-center/unrated-reviews">尚未評價</Link>
            </li>
          </ul>
          <ul className={selectStyle.selectPart}>
            <li
              className={
                pathname === '/member-center/person' ? selectStyle.active : ''
              }
            >
              <Link href="/member-center/person">個人檔案</Link>
            </li>
            <li
              className={
                pathname === '/member-center/change-password'
                  ? selectStyle.active
                  : ''
              }
            >
              <Link href="/member-center/change-password">修改密碼</Link>
            </li>
          </ul>

          <div className={selectStyle.icons}>
            <Link href="/">
              {' '}
              <FaHome style={{ cursor: 'pointer' }} />
            </Link>
            {auth.id ? (
              <MdLogout
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                  e.preventDefault()
                  logout()
                }}
              />
            ) : (
              <MdLogin
                onClick={(e) => {
                  e.preventDefault()
                  router.push('/member/login')
                }}
              />
            )}
          </div>
        </section>
      </div>
    </>
  )
}
