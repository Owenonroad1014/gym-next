'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { z } from 'zod'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { FaRegEye, FaRegEyeSlash, FaHome } from 'react-icons/fa'
import { RESET_PASS_TOKEN_PUT } from '@/config/api-path'
import memberCss from '../_styles/member.module.css'

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams() // ✅ 取得 Query String
  const urlToken = searchParams.get('token') // ✅ 讀取 token

  const storageKey = 'gymboo-reset'

  const MySwal = withReactContent(Swal)
  const showError = (message) => {
    return new Promise((res) => {
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
          router.push('/member/forget-password')
        }
      })
    })
  }
  const successModal = (message) => {
    return new Promise((res) => {
      document.body.style.overflow = 'hidden' //畫面不要偏移使用
      MySwal.fire({
        text: message,
        icon: 'success',
        confirmButtonColor: '#0b3760',
        confirmButtonText: '確定',
        didClose: () => {
          //畫面不要偏移使用
          document.body.style.overflow = '' // 恢復頁面滾動
        },
      }).then((result) => {
        if (result.isConfirmed) {
          res()
          router.push('/member/login')
        }
      })
    })
  }

  // 呈現密碼核取方塊(勾選盒) 布林值
  const [show, setShow] = useState(false)

  const [errors, setErrors] = useState({})

  const [resetPassForm, setResetPassForm] = useState({
    newPassword: '',
    confirmPassword: '',
  })

  useEffect(() => {
    if (!urlToken) return
    const storedData = localStorage.getItem(storageKey)

    if (!storedData) {
      showError('重設密碼連結已過期，請重新請求')
      return
    }

    try {
      const { token: localToken, expiresAt } = JSON.parse(storedData)
      const now = Date.now()
      //  || now > Number(expiresAt)
      if (!localToken || !expiresAt) {
        localStorage.removeItem(storageKey)
        showError('重設密碼連結已失效，請重新申請重設密碼！')
        return
      }
      if (urlToken !== localToken) {
        localStorage.removeItem(storageKey)
        showError('驗證失敗，請重新請求重設密碼')
      }

      const timeRemaining = Number(expiresAt) - now
      if (timeRemaining <= 0) {
        localStorage.removeItem(storageKey)
        showError('重設密碼連結已過期，請重新請求重設密碼')
        return
      }

      // 設定定時器，讓 localStorage 自動清除
      const timeoutId = setTimeout(() => {
        localStorage.removeItem(storageKey)
        showError('重設密碼連結已過期，請重新請求重設密碼')
      }, timeRemaining)

      return () => clearTimeout(timeoutId)
    } catch (err) {
      showError(err.message)
      setTimeout(() => router.push('/member/forget-password'), 2000)
    }
  }, [urlToken])

  const rsSchema = z
    .object({
      newPassword: z
        .string()
        .min(1, { message: '請輸入新密碼' })
        .min(8, {
          message:
            '密碼至少8個字元且需包含大小寫英文字母、數字、及特殊字元 @$!%*?&#',
        })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/, {
          message:
            '密碼至少8個字元且需包含大小寫英文字母、數字、及特殊字元 @$!%*?&#',
        }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: '密碼不一致',
      path: ['confirmPassword'], //message on confirmPassword
    })
  const ResetPassChangeForm = (e) => {
    setResetPassForm({ ...resetPassForm, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setErrors({}) // 清空舊錯誤

    const zResult = rsSchema.safeParse(resetPassForm)

    if (!zResult.success) {
      const newErrors = {
        newPassword: '',
        confirmPassword: '',
      }

      const errMap = new Map()

      zResult.error?.issues.forEach((item) => {
        const pathKey = item.path[0]
        if (!errMap.has(pathKey)) {
          errMap.set(pathKey, item.message)
          newErrors[pathKey] = item.message
        }
      })
      setErrors(newErrors)
      return // 阻止發送 API 請求
    }
    console.log(resetPassForm)
    const { token } = JSON.parse(localStorage.getItem(storageKey) || '{}')
    try {
      const r = await fetch(RESET_PASS_TOKEN_PUT, {
        method: 'PUT',
        body: JSON.stringify({ token, newPassword: resetPassForm.newPassword }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const result = await r.json()

      if (result.success) {
        successModal('密碼重設成功')
        localStorage.removeItem(storageKey)
      } else {
        console.warn(result)
      }
    } catch (err) {
      console.warn(err.message)
    }
  }
  return (
    <div className={memberCss.flexContainer}>
      <div className={memberCss.forgetPassContainer}>
        <div className={memberCss.content}>
          <Link className={memberCss.home} href="/">
            <FaHome style={{ cursor: 'pointer' }} />
            <span>回首頁</span>
          </Link>
          <div className={memberCss.titleGroup}>
            <h1>請重新設置密碼</h1>
          </div>
          <div className={memberCss.form}>
            <form method="post" onSubmit={onSubmit}>
              <div className={memberCss.formGroup}>
                <label htmlFor="newPassword"> 密碼</label>
                <input
                  type={show ? 'text' : 'password'}
                  name="newPassword"
                  id="newPassword"
                  value={resetPassForm.newPassword}
                  onChange={ResetPassChangeForm}
                  placeholder="請輸入密碼，密碼至少8個字元且需包含大小寫英文字母、數字、及特殊字元 @$!%*?&#"
                />
                <div className={memberCss.point}>
                  {errors.newPassword && (
                    <span className={memberCss.textDanger}>
                      {errors.newPassword}
                    </span>
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
              <div className={memberCss.formGroup}>
                <label htmlFor="confirmPassword">確認密碼</label>
                <input
                  type={show ? 'text' : 'password'}
                  name="confirmPassword"
                  id="confirmPassword"
                  value={resetPassForm.confirmPassword}
                  onChange={ResetPassChangeForm}
                  placeholder="請再次輸入密碼"
                />
                <div className={memberCss.point}>
                  {errors.confirmPassword && (
                    <span className={memberCss.textDanger}>
                      {errors.confirmPassword}
                    </span>
                  )}
                  <button className={memberCss.visibility} type="button">
                    <FaRegEye />
                  </button>
                </div>
              </div>
              <div className={memberCss.loginBtns}>
                <button type="submit" className={memberCss.loginBtn}>
                  重設密碼
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
