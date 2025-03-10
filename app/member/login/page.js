'use client'

import MemberCss from '../_styles/member.module.css'
import Link from 'next/link'
import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // 呈現密碼核取方塊(勾選盒) 布林值
  const [show, setShow] = useState(false)
  return (
    <div className={MemberCss.container}>
      <div className={MemberCss.left}>
        <h2>歡迎回來</h2>
        <div>
          <span>還沒成為會員嗎?</span>
          <Link className={MemberCss.switchBtn} href="/member/register">
            註冊帳號
          </Link>
        </div>
      </div>
      <div className={MemberCss.right}>
        <h1>登入GYM步空間</h1>
        <form action="">
          <div className={MemberCss.formGroup}>
            帳號
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="請輸入郵件"
              name="email"
            />
          </div>
          <div className={MemberCss.formGroup}>
            密碼
            <input
              type={show ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="請輸入密碼"
              name="password"
            />
            <button
              className={MemberCss.iconBtn}
              type="button"
              onClick={() => {
                setShow(!show)
              }}
            >
              {show ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
          <div className={MemberCss.btns}>
            <button type="submit" className={MemberCss.loginBtn}>
              登入
            </button>
            <Link href='/member/forget-password'>忘記密碼</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
