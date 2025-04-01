'use client'

import { useState } from 'react'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { RESET_PASS_PUT } from '@/config/api-path'
import { useAuth } from '@/context/auth-context'
import memberCss from '@/app/member/_styles/member.module.css'

export default function ResetPasswordPage() {
  const router = useRouter()
  const { auth, getAuthHeader } = useAuth()
  const storageKey = 'gymboo-reset'

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
      },
    })
  }
  const successModal = (message) => {
    document.body.style.overflow = 'hidden' //畫面不要偏移使用
    MySwal.fire({
      text: message,
      icon: 'success',
      showConfirmButton:false,
      timer: 1500,
      didClose: () => {
        //畫面不要偏移使用
        document.body.style.overflow = '' // 恢復頁面滾動
        router.replace('/member-center/change-password')
      },
    })
  }

  // 呈現密碼核取方塊(勾選盒) 布林值
  const [show, setShow] = useState(false)
  const [errors, setErrors] = useState({})
  const [resetPassForm, setResetPassForm] = useState({
    newPassword: '',
    confirmPassword: '',
  })

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

    try {
      const r = await fetch(RESET_PASS_PUT, {
        method: 'PUT',
        body: JSON.stringify({ newPassword: resetPassForm.newPassword }),
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
      })
      const result = await r.json()

      if (result.success) {
        successModal('密碼修改成功')
        setResetPassForm({
          newPassword: '',
          confirmPassword: '',
        })
        localStorage.removeItem(storageKey)
      } else {
        showError('密碼修改失敗，請稍後再試')
        setResetPassForm({
          newPassword: '',
          confirmPassword: '',
        })
        console.warn(result)
      }
    } catch (err) {
      showError('密碼修改失敗，請稍後再試')
      console.warn(err.message)
    }
  }
  return (
    <div className={memberCss.registerContainer}>
      <div className={memberCss.form}>
        <div className={memberCss.titleGroup}>
          <h2>修改密碼</h2>
          <h3>請輸入新密碼</h3>
        </div>
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
            <div>
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
            <div>
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
          <div className={memberCss.registerBtns}>
            <button type="submit" className={memberCss.registerBtn}>
              修改密碼
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
