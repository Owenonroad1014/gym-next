'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { z } from 'zod'
import { FaRegEye, FaHome } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import memberCss from '../_styles/member.module.css'
import { FORGET_PASS_POST } from '@/config/api-path'

export default function ForgetPasswordPage() {
  const router = useRouter()
  const storageKey = 'gymboo-reset'
  
  const MySwal = withReactContent(Swal)
  const errorModal = () => {
    return new Promise((res) => {
      document.body.style.overflow = 'hidden' //畫面不要偏移使用
      MySwal.fire({
        text: '此電子信箱尚未註冊',
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#0b3760',
        cancelButtonColor: '#f87808',
        confirmButtonText: '註冊帳號',
        cancelButtonText: '重新查詢',
        didClose: () => {
          //畫面不要偏移使用
          document.body.style.overflow = '' // 恢復頁面滾動
        },
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/member/register')
          res()
        }
      })
    })
  }
  const sendedModal = () => {
    document.body.style.overflow = 'hidden' //畫面不要偏移使用
    MySwal.fire({
      text: '重設密碼連結已發送到您的信箱!',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
      didClose: () => {
        //畫面不要偏移使用
        document.body.style.overflow = '' // 恢復頁面滾動
        setResetForm({
          email: '',
        })
      },
    })
  }

  const [errors, setErrors] = useState({})
  const [resetForm, setResetForm] = useState({
    email: '',
  })
  const fgSchema = z.object({
    email: z
      .string()
      .min(1, { message: '請輸入電子信箱' })
      .email({ message: '請填寫正確的電子信箱格式' }),
  })
  const ResetChangeForm = (e) => {
    setResetForm({ ...resetForm, [e.target.name]: e.target.value })
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    setErrors({}) // 清空舊錯誤

    const zResult = fgSchema.safeParse(resetForm)

    if (!zResult.success) {
      const newErrors = {
        email: '',
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
    const r = await fetch(FORGET_PASS_POST, {
      method: 'POST',
      body: JSON.stringify(resetForm),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const result = await r.json()

    if (!result.success) {
      await errorModal()
    } else {
      if (result.token?.token && result.token?.expiresAt) {
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            token: result.token.token,
            expiresAt: result.token.expiresAt,
          })
        )
        await sendedModal()
      }
    }
  }
  return (
    <>
      <div className={memberCss.registerContainer}>
        <div className={memberCss.form}>
          <Link className={memberCss.home} href="/">
            <FaHome style={{ cursor: 'pointer' }} />
            <span>回首頁</span>
          </Link>
          <div className={memberCss.titleGroup}>
            <h1>忘記密碼</h1>
          </div>
          <form method="post" onSubmit={onSubmit}>
            <div className={memberCss.formGroup}>
              <label htmlFor="email">帳號</label>
              <input
                type="text"
                name="email"
                id="email"
                value={resetForm.email}
                onChange={ResetChangeForm}
                placeholder="請輸入郵件"
              />
              <div>
                {errors.email && (
                  <span className={memberCss.textDanger}>{errors.email}</span>
                )}
                <button className={memberCss.visibility} type="button">
                  <FaRegEye />
                </button>
              </div>
            </div>

            <div className={memberCss.registerBtns}>
              <button type="submit" className={memberCss.registerBtn}>
                查詢
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
