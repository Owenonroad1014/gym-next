'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import useFirebase from '../user/_hooks/use-firebase'
import { useAuth } from '@/context/auth-context'
import btnCss from '../_styles/member.module.css'

export default function GoogleLoginPopup() {
  const { loginGoogle } = useFirebase()
  const [isLoading, setIsLoading] = useState(false)
  const { GoogleLogin} = useAuth()

  // 使用 useSearchParams 和 useRouter 這些 hooks 在組件中
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const callbackGoogleLoginPopup = async (providerData) => {
    setIsLoading(true)
    const res = await GoogleLogin(providerData)
    setIsLoading(false) // 在這裡確保 loading 狀態重置

   
  if (res.success) {
    router.push(callbackUrl)
  }
  }

  return (
    <>
      <button className={btnCss.googleLoginBtn}
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
