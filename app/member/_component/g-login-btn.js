'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import useFirebase from '../user/_hooks/use-firebase'
import { useAuth } from '@/context/auth-context'
import btnCss from '../_styles/member.module.css'

export default function GoogleLoginPopup() {
  const { loginGoogle, auth } = useFirebase()
  const [isLoading, setIsLoading] = useState(false)
  const { GoogleLogin } = useAuth()

  // 使用 useSearchParams 和 useRouter 這些 hooks 在組件中
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const callbackGoogleLoginPopup = async (providerData) => {
    setIsLoading(true)
    const { success } = await GoogleLogin(providerData)
    setIsLoading(false) // 在這裡確保 loading 狀態重置

  // 檢查 auth 是否存在
  if (!auth) {
    console.error('auth 未定義，等待更新...')
    return
  }

    // 確保 auth.add_status 存在再執行跳轉
    if (auth?.add_status === 0) {
      router.push('/member/register/add-profile')
    } else if (auth?.add_status === 1) {
      router.push(callbackUrl)
    }
  }

  return (
    <>
      <button
        className={btnCss.googleLoginBtn}
        onClick={async () => {
          setIsLoading(true)
          await loginGoogle(callbackGoogleLoginPopup)
          setIsLoading(false)
        }}
        disabled={isLoading}
      >
        {isLoading ? '登入中...' : 'Google 登入'}
      </button>
    </>
  )
}
