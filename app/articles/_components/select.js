'use client'
import React, { useState, useEffect } from 'react'
import articleStyle from '../styles/articles.module.css'
import { MdMenu, MdMenuOpen } from 'react-icons/md'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
export default function Select() {
  const [menuShow, setMenuShow] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const selectArea1 = [
    '健身基礎與入門',
    '燃脂與減重',
    '增肌與力量訓練',
    '有氧與心肺運動',
    '訓練計劃與挑戰',
    '運動傷害與恢復',
    '健康維持',
  ]
  const selectArea2 = ['素食專區', '飲食專區']
  const selectArea3 = ['名人專訪', '資深GYM友']
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
          <span className={articleStyle.categoryTitle}>全部分類</span>
          <li
            role="button" // 告訴輔助技術這個元素是一個按鈕
            tabIndex={0} // 使這個元素可以接受鍵盤焦點
            onClick={(e) => {
              e.preventDefault()
              if (window.innerWidth < 960) {
                setMenuShow(false)
              }
            }}
            onKeyDown={(e) => {
              // 支援鍵盤事件
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                if (window.innerWidth < 960) {
                  setMenuShow(false)
                }
              }
            }}
          >
            <Link href="/articles">全部分類</Link>
          </li>
        </ul>
        <ul className={articleStyle.selectPart}>
          <span className={articleStyle.categoryTitle}>健身</span>
          {selectArea1.map((v, i) => {
            return (
              <li
                key={i}
                className={v === category ? articleStyle.active : ''}
                role="button" // 添加 role="button" 表示這是可交互的元素
                tabIndex={0} // 使這個元素可以接受鍵盤焦點
                onClick={(e) => {
                  e.preventDefault()
                  router.push(`?category=${v}`)
                  if (window.innerWidth < 960) {
                    setMenuShow(false)
                  }
                }}
                onKeyDown={(e) => {
                  // 支援鍵盤事件
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    router.push(`?category=${v}`)
                    if (window.innerWidth < 960) {
                      setMenuShow(false)
                    }
                  }
                }}
              >
                {v}
              </li>
            )
          })}
        </ul>
        <ul className={articleStyle.selectPart}>
          <span className={articleStyle.categoryTitle}>飲食</span>
          {selectArea2.map((v, i) => {
            return (
              <li
                key={i}
                className={v === category ? articleStyle.active : ''}
                role="button" // 告訴輔助技術這個元素是一個按鈕
                tabIndex={0} // 使這個元素可以接受鍵盤焦點
                onKeyDown={(e) => {
                  // 監聽 Enter 鍵事件
                  if (e.key === 'Enter' || e.key ==='') {
                    e.preventDefault()
                    router.push(`?category=${v}`)
                    if (window.innerWidth < 960) {
                      setMenuShow(false)
                    }
                  }
                } }
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
          <span className={articleStyle.categoryTitle}>GYM友怎麼做</span>
          {selectArea3.map((v, i) => {
            return (
              <li
                key={i}
                className={v === category ? articleStyle.active : ''}
                role="button" // 告訴輔助技術這個元素是一個按鈕
                tabIndex={0} // 使這個元素可以接受鍵盤焦點
                onKeyDown={(e) => {
                  // 監聽 Enter 鍵事件
                  if (e.key === 'Enter' || e.key ==='') {
                    e.preventDefault()
                    router.push(`?category=${v}`)
                    if (window.innerWidth < 960) {
                      setMenuShow(false)
                    }
                  }
                } }
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
