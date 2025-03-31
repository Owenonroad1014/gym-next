'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import memberCss from '../_styles/member.module.css'
import { useAuth } from '@/context/auth-context'
import GoogleLoginPopup from '@/app/member/_component/g-login-btn'

export default function LoginPage() {
  // 呈現密碼核取方塊(勾選盒) 布林值
  const [show, setShow] = useState(false)
  const { auth, login } = useAuth()
  const searchParams = useSearchParams()
  const [errors, setError] = useState('')
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const router = useRouter()
  const [loginForm, setLoginChangeForm] = useState({
    account: '',
    password: '',
  })
  useEffect(() => {
    if (auth.id) {
      router.push(callbackUrl) // 已登入就直接跳轉
    }
  }, [auth, callbackUrl, router])

  const LoginChangeForm = (e) => {
    setLoginChangeForm({ ...loginForm, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    const newErrors = {
      account: '',
      password: '',
    }
    e.preventDefault()
    if (!loginForm.password && !loginForm.account) {
      newErrors.account = '帳號不能為空'
      newErrors.password = '密碼不能為空'
      setError(newErrors)
      return
    }
    if (!loginForm.account) {
      newErrors.account = '帳號不能為空'
      setError(newErrors)
      return
    }
    if (!loginForm.password) {
      newErrors.password = '密碼不能為空'
      setError(newErrors)
      return
    }
    const { success, error, code } = await login(
      loginForm.account,
      loginForm.password
    )

    if (success) {
      // modal.show()
      console.log('登入成功', { auth })
      if (
        router.push(callbackUrl) === '/member/register' ||
        router.push(callbackUrl) === '/member/login'
      ) {
        router.replace('/')
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
    <div className={memberCss.loginContainer}>
      <div className={memberCss.form}>
        <form method="post" onSubmit={onSubmit}>
          <div className={memberCss.titleGroup}>
            <h2>歡迎回來!</h2>
            <h1>登入GYM步空間</h1>
          </div>
          <div className={memberCss.formGroup}>
            <label htmlFor="account">帳號</label>
            <input
              type="text"
              name="account"
              id="account"
              value={loginForm.account}
              onChange={LoginChangeForm}
              placeholder="請輸入郵件"
            />
            <div>
              {errors.account && (
                <span className={memberCss.textDanger}>{errors.account}</span>
              )}
              <button className={memberCss.visibility} type="button">
                <FaRegEye />
              </button>
            </div>
          </div>
          <div className={memberCss.formGroup}>
            <label htmlFor="password"> 密碼</label>
            <input
              type={show ? 'text' : 'password'}
              name="password"
              id="password"
              value={loginForm.password}
              onChange={LoginChangeForm}
              placeholder="請輸入密碼"
            />
            <div>
              {errors.password && (
                <span className={memberCss.textDanger}>{errors.password}</span>
              )}
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
          </div>
          <div className={memberCss.loginBtns}>
            <button type="submit" className={memberCss.loginBtn}>
              登入
            </button>
            <Link href="/member/forget-password">忘記密碼</Link>
          </div>
        </form>
        <div>
          <GoogleLoginPopup />
        </div>
      </div>
      {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
    </div>
  )
}
