'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { FaRegEye, FaRegEyeSlash, FaHome } from 'react-icons/fa'
import GradientText from '../_component/title-group'
import { REGISTER_POST } from '@/config/api-path'
import memberCss from '../_styles/member.module.css'
import { useAuth } from '@/context/auth-context'
import { rgSchema } from '@/utils/schema/schema'

export default function RegisterPage() {
  // 呈現密碼核取方塊(勾選盒) 布林值
  const [show, setShow] = useState(false)
  const [errors, setErrors] = useState({})
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const { auth, login } = useAuth()

  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  useEffect(() => {
    if (auth.id) {
      router.push(callbackUrl) // 已登入就直接跳轉
    }
  }, [auth, callbackUrl, router])
  const RegisterChangeForm = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value })
  }

  const MySwal = withReactContent(Swal)

  const showError = (message) => {
    return new Promise((res) => {
      document.body.style.overflow = 'hidden' //畫面不要偏移使用
      MySwal.fire({
        text: message,
        icon: 'error',
        showCancelButton: true,
        cancelButtonColor: '#f87808',
        cancelButtonText: '',
        confirmButtonColor: '#0b3760',
        confirmButtonText: '確定',
        didClose: () => {
          //畫面不要偏移使用
          document.body.style.overflow = '' // 恢復頁面滾動
          res()
        },
      })
    })
  }
  const successModal = (message) => {
    return new Promise((res) => {
      document.body.style.overflow = 'hidden' //畫面不要偏移使用

      MySwal.fire({
        text: message,
        showConfirmButton: false,
        allowOutsideClick: false, // 禁止點擊外部關閉
        timer: 1500,
        imageUrl: '/gymdot.svg',
        imageHeight: 80,
        imageAlt: 'gym-boo-logo',
        didClose: () => {
          //畫面不要偏移使用
          document.body.style.overflow = '' // 恢復頁面滾動
        },
      }).then(() => res())
    })
  }
  const showErrorLogin = (message) => {
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
          res()
          router.push('/member/login')
        },
      })
    })
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
      // 顯示成功彈窗，並在期間內開始登入
      const loginPromise = login(
        result.bodyData.email,
        result.bodyData.password
      )

      await successModal('註冊成功，即將自動登入').then(async () => {
        setRegisterForm({
          email: '',
          password: '',
          confirmPassword: '',
        })

        try {
          const success = await loginPromise // 等待登入結果
          if (success) {
            Swal.close() // 登入成功後關閉 Modal
            router.push('/member/register/add-profile')
          } else {
            showErrorLogin('登入失敗')
          }
        } catch (error) {
          console.error('登入錯誤', error)
          showErrorLogin('登入過程發生錯誤')
        }
      })
    } else {
      if (result.error === '用戶已註冊') {
        showErrorLogin('您已註冊，請前往登入')
      } else {
        showError('註冊失敗')
      }
      console.warn(result)
    }
  }
  return (
    <div className={memberCss.flexContainer}>
      <div className={memberCss.registerContainer}>
        <div className={memberCss.content}>
          <Link className={memberCss.home} href="/">
            <FaHome style={{ cursor: 'pointer' }} />
            <span>回首頁</span>
          </Link>
          <div className={memberCss.right}>
            <div className={memberCss.form}>
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
                  <div className={memberCss.point}>
                    {errors.email && (
                      <span className={memberCss.textDanger}>
                        {errors.email}
                      </span>
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
                    value={registerForm.password}
                    onChange={RegisterChangeForm}
                    placeholder="請輸入密碼，密碼至少8個字元且需包含大小寫英文字母、數字、及特殊字元 @$!%*?&#"
                  />
                  <div className={memberCss.point}>
                    {errors.password && (
                      <span className={memberCss.textDanger}>
                        {errors.password}
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
                    value={registerForm.confirmPassword}
                    onChange={RegisterChangeForm}
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
                    註冊帳號
                  </button>
                </div>

                <div className={memberCss.rgBtn}>
                  <div>
                    <span>已有會員嗎?</span>
                    <Link className={memberCss.switchBtn} href="/member/login">
                      <span>登入帳號</span>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className={memberCss.titleGroup}>
            <GradientText
              colors={['#f3b681', '#f87808', '#f3b681', '#f87808', '#f3b681']}
              animationSpeed={4}
              showBorder={false}
              className="custom-class"
            >
              <h2>初次見面，您好!</h2>
              <h1>GYM步空間 &nbsp; 陪您GYM步</h1>
            </GradientText>
          </div>
        </div>
      </div>
    </div>
  )
}
