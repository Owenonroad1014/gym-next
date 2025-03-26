'use client'

import { useState,useEffect } from 'react'
import { useSearchParams,useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import memberCss from '../_styles/member.module.css'
import { useAuth } from '@/context/auth-context'

export default function LoginPage() {
  // 呈現密碼核取方塊(勾選盒) 布林值
  const [show, setShow] = useState(false)
  const { auth, login } = useAuth()
  const searchParams=useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')||'/'
  const router = useRouter()
  const [loginForm, setLoginForm] = useState({
    account: '',
    password: '',
  })
  const LoginForm = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    if (auth.id) {
      router.push(callbackUrl) // 已登入就直接跳轉
    }
  }, [auth, callbackUrl, router])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!loginForm.account) {
      alert('帳號不能為空')
      return
    }
    if (!loginForm.password) {
      alert('密碼不能為空')
      return
    }
    const { success, error, code } = await login(
      loginForm.account,
      loginForm.password
    )

    if (success) {
      // modal.show()
      console.log('登入成功', { auth })
      if (router.back() === '/member/register') {
        router.push('/')
      }
      router.push(callbackUrl) // 已登入就直接跳轉
    } else {
      // modal.show()
      if (code === 404) {
        alert(error || '用戶未註冊')
      } else if (code === 410 || code === 420) {
        alert(error || '帳號或密碼錯誤')
      } else {
        alert(error || '登入失敗，請稍後再試')
      }
    }
  }

  return (
    <div className={memberCss.container}>
      <div className={memberCss.left}>
        <h2>歡迎回來</h2>
        <div>
          <span>還沒成為會員嗎?</span>
          <Link className={memberCss.switchBtn} href="/member/register">
            註冊帳號
          </Link>
        </div>
      </div>
      <div className={memberCss.right}>
        <h1>登入GYM步空間</h1>
        <form method="post" onSubmit={onSubmit}>
          <div className={memberCss.formGroup}>
            帳號
            <input
              type="text"
              value={loginForm.account}
              onChange={LoginForm}
              placeholder="請輸入郵件"
              name="account"
            />
          </div>
          <div className={memberCss.formGroup}>
            密碼
            <input
              type={show ? 'text' : 'password'}
              value={loginForm.password}
              onChange={LoginForm}
              placeholder="請輸入密碼"
              name="password"
            />
            <button
              className={memberCss.iconBtn}
              type="button"
              onClick={() => {
                setShow(!show)
              }}
            >
              {show ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
          <div className={memberCss.btns}>
            <button type="submit" className={memberCss.loginBtn}>
              登入
            </button>
            <Link href="/member/forget-password">忘記密碼</Link>
          </div>
        </form>
      </div>
      {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
    </div>
  )
}
