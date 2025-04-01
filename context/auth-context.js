'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { JWT_LOGIN_POST, GOOGLE_LOGIN_POST } from '@/config/api-path'

const AuthContext = createContext()

const emptyAuth = {
  id: 0,
  account: '',
  google_uid: '',
  avatar: '',
  name: '',
  token: '',
}
const storageKey = 'gymboo-auth'

export function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState({ ...emptyAuth })

  const logout = () => {
    localStorage.removeItem(storageKey)
    setAuth({ ...emptyAuth })
  }

  const login = async (account, password) => {
    const r = await fetch(JWT_LOGIN_POST, {
      method: 'POST',
      body: JSON.stringify({ account, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const result = await r.json()
    if (result.success) {
      localStorage.setItem(storageKey, JSON.stringify(result.data))
      setAuth(result.data)
      return { success: true }
    } else {
      return { success: false, error: result.error, code: result.code }
    }
  }

  const GoogleLogin = async (providerData) => {
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
      if (!res.ok) {
        throw new Error(result.message || '登入失敗')
      }
      const data = result.data
      localStorage.setItem(storageKey, JSON.stringify(data))
      setAuth(data)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const getAuthHeader = () => {
    if (!auth.token) return {}
    return { Authorization: 'Bearer ' + auth.token }
  }

  useEffect(() => {
    const data = localStorage.getItem(storageKey)
    if (data) {
      try {
        const authData = JSON.parse(data)
        setAuth(authData || emptyAuth)
      } catch (ex) {
        setAuth(emptyAuth)
      }
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{ auth, logout, login, getAuthHeader, GoogleLogin }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthContext
