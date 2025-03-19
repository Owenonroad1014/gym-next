'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { JWT_LOGIN_POST } from '@/config/api-path'

const AuthContext = createContext()

const emptyAuth = {
  id: 0,
  account: '',
  nickname: '',
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
    }
    return result.success
  }

  const getAuthHeader = () => {
    if(!auth.token) return{}
    return { Authorization: 'Bearer ' + auth.token }
  }

  useEffect(() => {
    const data = localStorage.getItem(storageKey)
    if (data) {
      try {
        const authData = JSON.parse(data)
        setAuth(authData)
      } catch (ex) {}
    }
  }, [])

  return (
    <AuthContext.Provider value={{ auth, logout, login, getAuthHeader }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthContext
