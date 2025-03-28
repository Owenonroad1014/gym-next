'use client'

import registerCss from '../_styles/register.module.css'
import Link from 'next/link'
import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { REGISTER_POST } from '@/config/api-path'
import { useAuth } from '@/context/auth-context'
import { rgSchema } from '@/utils/schema/schema'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  // 呈現密碼核取方塊(勾選盒) 布林值
  const [passwordVisible, setPasswordVisible] = useState(false);
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
    <div className={registerCss.container}>
      <div className={registerCss.left}>
        <h2>初次見面，您好!</h2>
        <div>
          <span>已有會員嗎?</span>
          <Link className={registerCss.switchBtn} href="/member/login">
            登入帳號
          </Link>
        </div>
      </div>
      <div className={registerCss.right}>
        <h1>登入GYM步空間</h1>
        <form method="post" onSubmit={onSubmit}>
          <div className={registerCss.formGroup}>
            <label htmlFor="email">帳號</label>
            <div className={registerCss.inputGroup}>
              <input
                type="text"
                value={registerForm.email}
                onChange={RegisterChangeForm}
                placeholder="請輸入郵件"
                name="email"
                id="email"
              />
              <div>
                {errors.email && (
                  <span className={registerCss.textDanger}>{errors.email}</span>
                )}
              </div>
            </div>
            <button
              className={registerCss.iconBtn}
              type="button"
              onClick={() => setPasswordVisible((prev) => !prev)}
            >
              {passwordVisible? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>

          <div className={registerCss.formGroup}>
            <label htmlFor="password">密碼</label>
            <div className={registerCss.inputGroup}>
              <input
                type={passwordVisible ? 'text' : 'password'}
                value={registerForm.password}
                onChange={RegisterChangeForm}
                placeholder="請輸入密碼"
                name="password"
                id="password"
              />
              <div>
                {errors.password && (
                  <span className={registerCss.textDanger}>
                    {errors.password}
                  </span>
                )}
              </div>
            </div>
            <button
              className={registerCss.iconBtn}
              type="button"
              onClick={() => {
                setPasswordVisible((prev) => !prev)
              }}
            >
              {passwordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
          <div className={registerCss.formGroup}>
            <label htmlFor="confirmPassword">確認密碼</label>
            <div className={registerCss.inputGroup}>
              <input
                type={passwordVisible? 'text' : 'password'}
                value={registerForm.confirmPassword}
                onChange={RegisterChangeForm}
                placeholder="請再次輸入密碼"
                name="confirmPassword"
                id="confirmPassword"
              />
              <div>
                {errors.confirmPassword && (
                  <span className={registerCss.textDanger}>
                    {errors.confirmPassword}
                  </span>
                )}
              </div>
            </div>
            
          </div>
          <div className={registerCss.btns}>
            <button type="submit" className={registerCss.registerBtn}>
              註冊帳號
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
