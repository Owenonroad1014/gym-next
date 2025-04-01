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
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const { auth, login } = useAuth()
  // 呈現密碼核取方塊(勾選盒) 布林值
  const [show, setShow] = useState(false)
  const [errors, setError] = useState('')
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
      await loginSuccess()
      await Swal.close() // 登入成功後關閉 Modal

      setTimeout(() => {
        if (callbackUrl === '/member/register' || callbackUrl === '/member/login') {
          router.replace('/')
        } else {
          router.push(callbackUrl)
        }
      }, 1600)  // 已登入就直接跳轉
    } else {
      // modal.show()
      if (code === 404) {
        showError(error || '用戶未註冊')
      } else if (code === 410 || code === 420) {
        showError(error || '帳號或密碼錯誤')
      } else {
        showError(error || '登入失敗，請稍後再試')
      }
    }
  }

  const MySwal = withReactContent(Swal)
  const showError = (message) => {
    return new Promise((res, rej) => {
      document.body.style.overflow = 'hidden' //畫面不要偏移使用
      MySwal.fire({
        text: message,
        icon: 'error',
        confirmButtonColor: '#0b3760',
        confirmButtonText: '確定',
        didClose: () => {
          //畫面不要偏移使用
          document.body.style.overflow = '' // 恢復頁面滾動
        },
      }).then((result) => {
        if (result.isConfirmed) {
          res()
        } else {
          rej()
        }
      })
    })
  }

  const loginSuccess = () => {
    return new Promise(() => {
      document.body.style.overflow = 'hidden' //畫面不要偏移使用
      MySwal.fire({
        imageUrl: '/gymdot.svg',
        imageHeight: 150,
        imageAlt: 'gym-boo-logo',
        text: '登入成功!',
        showConfirmButton: false,
        timer: 1500,
        didClose: () => {
          //畫面不要偏移使用
          document.body.style.overflow = '' // 恢復頁面滾動
        },
      })
    })
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
        <hr />
        <div className={memberCss.loginBtns}>
          <GoogleLoginPopup />
        </div>
      </div>
    </div>
  )
}
