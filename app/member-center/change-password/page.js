'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Link from 'next/link'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { useAuth } from '@/context/auth-context'
import { CONFIRM_PASS_POST } from '@/config/api-path'
import memberCss from '../_styles/member.module.css'

export default function ResetPasswordPage() {
  const router = useRouter()
  const pathname = usePathname()
  const { auth, getAuthHeader } = useAuth()

  const MySwal = withReactContent(Swal)
  const showError = (message) => {
    document.body.style.overflow = 'hidden' //畫面不要偏移使用
    MySwal.fire({
      text: message,
      icon: 'error',
      confirmButtonColor: '#0b3760',
      confirmButtonText: '確定',
      didClose: () => {
        //畫面不要偏移使用
        document.body.style.overflow = '' // 恢復頁面滾動
        setResetPassForm({ password: '' })
      },
    })
  }
  // 呈現密碼核取方塊(勾選盒) 布林值
  const [show, setShow] = useState(false)

  const [errors, setErrors] = useState({})

  const [resetPassForm, setResetPassForm] = useState({
    password: '',
  })

  const ResetPassChangeForm = (e) => {
    setResetPassForm({ ...resetPassForm, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setErrors({}) // 清空舊錯誤

    if (!resetPassForm.password) {
      const newErrors = {}
      newErrors.password = '請輸入舊密碼'
      setErrors(newErrors)
      return
    }
    const r = await fetch(CONFIRM_PASS_POST, {
      method: 'POST',
      body: JSON.stringify({ password: resetPassForm.password }),
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    })
    const result = await r.json()

    if (!result.success) {
      showError('密碼錯誤，請重新輸入')
      console.warn(result)
    } else {
      router.push('/member-center/change-password/reset')
    }
  }
  if (!auth.id)
    return (
      <>
        <div className={memberCss.memberNoAdmin}>
          <div className={memberCss.memberSpan}>
            <h1>您好，請先登入</h1>
            <span>若您尚未成為會員，請先註冊</span>
          </div>
          <div className={memberCss.memberBtns}>
            <Link
              className={memberCss.memberBtn}
              href={`/member/login?callbackUrl=${encodeURIComponent(pathname)}`}
            >
              會員登入
            </Link>
            <Link
              className={`${memberCss.memberBtn} ${memberCss.memberBtnRegister}`}
              href="/member/register"
            >
              註冊會員
            </Link>
          </div>
        </div>
      </>
    )
  return (
    <div className={memberCss.changePassContainer}>
      <div className={memberCss.titleGroup}>
        <h2>修改密碼</h2>
        <h3>請輸入舊密碼</h3>
      </div>
      <div className={memberCss.form}>
        <form method="post" onSubmit={onSubmit}>
          <div className={memberCss.formGroup}>
            <label htmlFor="password">舊密碼</label>
            <input
              type={show ? 'text' : 'password'}
              name="password"
              id="password"
              value={resetPassForm.password}
              onChange={ResetPassChangeForm}
              placeholder="請輸入舊密碼"
            />
            <div className={memberCss.point}>
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
              驗證密碼
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
