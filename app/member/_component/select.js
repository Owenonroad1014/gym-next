import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import articleStyle from '../_styles/member.module.css'
import { MdMenu, MdMenuOpen } from 'react-icons/md'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
export default function Select() {
  const pathname =usePathname()
  const [menuShow, setMenuShow] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const selectArea1 = [
    '聊天室',
    '好友列表',
    
  ]
  const selectArea2 = ['文章', '影片']
  const selectArea3 = ['個人檔案', '修改密碼']
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
  }else{

    return (
      <>
        <button
          onClick={() => setMenuShow(!menuShow)}
          className={articleStyle.selectBtn}
        >
          {menuShow ? <MdMenuOpen /> : <MdMenu />}
        </button>
        <section
          className={articleStyle.selectArea}
          style={{
            display: menuShow ? 'block' : 'none',
          }}
        >
          
          <ul className={articleStyle.selectPart}>
            <span className={articleStyle.categoryTitle}>我的GYM友</span>
            {selectArea1.map((v, i) => {
              return (
                <li
                  key={i}
                  className={v === category ? articleStyle.active : ''}
                  onClick={(e) => {
                    e.preventDefault()
                    router.push(`?category=${v}`)
                    if (window.innerWidth < 960) {
                      setMenuShow(false)
                    }
                  }}
                >
                  {v}
                </li>
              )
            })}
          </ul>
          <ul className={articleStyle.selectPart}>
            <span className={articleStyle.categoryTitle}>我的預約</span>
            <li
              onClick={(e) => {
                e.preventDefault()
                if (window.innerWidth < 960) {
                  setMenuShow(false)
                }
              }}
            >
              <Link href="/articles">我的預約</Link>
            </li>
          </ul>
          <ul className={articleStyle.selectPart}>
            <span className={articleStyle.categoryTitle}>GYM享收藏</span>
            {selectArea2.map((v, i) => {
              return (
                <li
                  key={i}
                  className={v === category ? articleStyle.active : ''}
                  onClick={(e) => {
                    e.preventDefault()
                    router.push(`?category=${v}`)
                    if (window.innerWidth < 960) {
                      setMenuShow(false)
                    }
                  }}
                >
                  {v}
                </li>
              )
            })}
          </ul>
          <ul className={articleStyle.selectPart}>
            <span className={articleStyle.categoryTitle}>個人檔案</span>
            {selectArea3.map((v, i) => {
              return (
                <li
                  key={i}
                  className={v === category ? articleStyle.active : ''}
                  onClick={(e) => {
                    e.preventDefault()
                    router.push(`?category=${v}`)
                    if (window.innerWidth < 960) {
                      setMenuShow(false)
                    }
                  }}
                >
                  {v}
                </li>
              )
            })}
          </ul>
        </section>
      </>
    )
  }
}
