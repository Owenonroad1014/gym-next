'use client'

import memberCss from '../_styles/member.module.css'
import Link from 'next/link'
import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { REGISTER_POST } from '@/config/api-path'
import { useAuth } from '@/context/auth-context'
import { rgSchema } from '@/utils/schema/schema'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  // 呈現密碼核取方塊(勾選盒) 布林值
  const [show, setShow] = useState(false)
  const [errors, setErrors] = useState({})
  const { login } = useAuth()

  const router = useRouter()
  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const RegisterChangeForm = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setErrors({}) // 清空舊錯誤

    const zResult = rgSchema.safeParse(registerForm)

    if (!zResult.success) {
      const newErrors = {
        email: '',
        password: '',
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
    const r = await fetch(REGISTER_POST, {
      method: 'POST',
      body: JSON.stringify(registerForm),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const result = await r.json()

    if (result.success) {
      // modal.show()
      alert('註冊成功')
      setRegisterForm({
        email: '',
        password: '',
        confirmPassword: '',
      })
      const success = await login(
        result.bodyData.email,
        result.bodyData.password
      )
      if (success) {
        router.push('/member/register/add-profile')
      } else {
        alert('登入失敗')
      }
    } else {
      console.warn(result)
      if (result.error === '用戶已註冊') {
        // modal.show()
        alert(result.error)
      }
    }
  }
  return (
    <div className={memberCss.registerContainer}>
      <div className={memberCss.form}>
        <div className={memberCss.titleGroup}>
          <h2>初次見面，您好!</h2>
          <h1>GYM步空間 &nbsp; 陪您GYM步</h1>
        </div>
        <form method="post" onSubmit={onSubmit}>
          <div className={memberCss.formGroup}>
            <label htmlFor="email">帳號</label>
            <input
              type="text"
              name="email"
              id="email"
              value={registerForm.email}
              onChange={RegisterChangeForm}
              placeholder="請輸入郵件"
            />
            <div>
              {errors.email && (
                <span className={memberCss.textDanger}>{errors.email}</span>
              )}
              <button
                className={memberCss.visibility}
                type="button"
               >
               <FaRegEye/> 
              </button>
            </div>
          </div>
          <div className={memberCss.formGroup}>
            <label htmlFor="password"> 密碼</label>
            <input
              type={show ? 'text' : 'password'}
              name="password"
              id="password"
              value={registerForm.password}
              onChange={RegisterChangeForm}
              placeholder="請輸入密碼，密碼至少8個字元且需包含大小寫英文字母、數字、及特殊字元 @$!%*?&#"
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
          <div className={memberCss.formGroup}>
            <label htmlFor="confirmPassword">確認密碼</label>
            <input
              type={show ? 'text' : 'password'}
              name="confirmPassword"
              id="confirmPassword"
              value={registerForm.confirmPassword}
              onChange={RegisterChangeForm}
              placeholder="請再次輸入密碼"
            />
            <div>
              {errors.confirmPassword && (
                <span className={memberCss.textDanger}>
                  {errors.confirmPassword}
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
          <div className={memberCss.registerBtns}>
            <button type="submit" className={memberCss.registerBtn}>
              註冊帳號
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
