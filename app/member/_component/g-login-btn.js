'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { GOOGLE_LOGIN_POST } from '@/config/api-path'
import useFirebase from '../user/_hooks/use-firebase'

export default function GoogleLoginPopup() {
  const { loginGoogle, logoutFirebase } = useFirebase()
  const { setAuth } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackGoogleLoginPopup = async (providerData) => {
    try {
      const res = await fetch(GOOGLE_LOGIN_POST, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          google_uid: providerData.uid,
          email: providerData.email,
          name: providerData.displayName,
          avatar: providerData.photoURL,
        }),
      })

      const result = await res.json()
      console.log(result)
      if (result.success) {
        setAuth(result.data)
        localStorage.setItem(storageKey, JSON.stringify(result.data))
        return { success: true }
      } else {
        return { success: false, error: result.error, code: result.code }
      }
    } catch (error) {
      console.error('登入錯誤:', error.message)
      alert('登入失敗，請稍後再試！')
    }
  }
  return (
    <>
      <button
        onClick={() => {
          callbackGoogleLoginPopup
        }}
      >
        Google 登入
      </button>
    </>
  )
}
