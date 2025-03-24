'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import chatListStyle from '../_styles/chatList.module.css'
import { useAuth } from '@/context/auth-context'
import {
  CHATS_LIST,
  FRIEND_REQ_LIST,
  FRIEND_ACCEPT,
  FRIEND_REJECT,
  FRIEND_DELETE,
} from '@/config/api-path'
import { FaTrash } from 'react-icons/fa'
export default function FriendListPage() {
  const { auth, getAuthHeader } = useAuth()
  const [user, setUser] = useState(0) //正在使用者
  const [chatListData, setChatListData] = useState({})
  const [friendRequestListData, setFriendRequestListData] = useState({})
  const [friendAccept, setFriendAccept] = useState({})
  const [isAccept, setIsAccept] = useState(false) //控制更新狀態刷新
  const [isDelete, setIsDelete] = useState(false) //控制更新狀態刷新
  const [error, setError] = useState('')

  useEffect(() => {
    setUser(auth.id)
    // 獲取聊天室列表
    const fetchChatsList = async () => {
      try {
        const res = await fetch(CHATS_LIST, {
          headers: { ...getAuthHeader() },
        })
        if (!res.ok) {
          setError('Failed to fetch chats')
        }
        const data = await res.json()
        setChatListData(data || {})
      } catch (err) {
        setError(err.message || 'Something went wrong')
      }
    }
    fetchChatsList()
  }, [auth, getAuthHeader, isAccept, isDelete])

  // 刪除好友
  const deleteFriend = async (user, username) => {
    try {
      const res = await fetch(FRIEND_DELETE, {
        method: 'DELETE',
        headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ user }),
      })
      if (!res.ok) {
        setError('無法刪除好友')
        alert(`無法刪除好友${username}`)
      }
      const data = await res.json()
      alert(`成功刪除好友${username}`)
      setIsDelete(!isDelete)
      //************* */ 好友邀請刪除
      console.log(data)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    }
  }

  // 接受好友邀請
  const acceptFriendRequest = async (sender_id) => {
    try {
      const res = await fetch(FRIEND_ACCEPT, {
        method: 'POST',
        headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender_id }),
      })
      if (!res.ok) {
        setError('無法接受好友邀請')
      }
      const data = await res.json()
      setFriendAccept(data || {})
      setIsAccept(!isAccept)
      console.log(data)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    }
  }
  // 拒絕好友邀請
  const rejectFriendRequest = async (sender_id) => {
    try {
      const res = await fetch(FRIEND_REJECT, {
        method: 'POST',
        headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender_id }),
      })
      if (!res.ok) {
        setError('無法接受好友邀請')
      }
      const data = await res.json()
      setFriendAccept(data || {})
      setIsAccept(!isAccept)
      console.log(data)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    }
  }

  return (
    <>
      <div className={chatListStyle.chatsPage}>
        <h1>聊天室列表</h1>
        <div className={chatListStyle.search}>
          <input type="text" placeholder="搜尋聊天內容" />
        </div>
        <h2>我的聊天室</h2>
        <ul>
          {chatListData.totalRows > 0 ? (
            chatListData?.rows?.map((v, i) => {
              return (
                <li key={v.id}>
                  <Link href={`/chat/${v.id}`}>
                    <div className={chatListStyle.name}>
                      {user == v.user1_id ? v.user2_name : v.user1_name}{' '}
                    </div>
                    <div className={chatListStyle.btngroup}>
                      <button style={{ backgroundColor: '#c97d7d' }}>
                        <FaTrash />
                      </button>
                    </div>
                  </Link>
                </li>
              )
            })
          ) : (
            <p>目前沒有聊天內容</p>
          )}
        </ul>
      </div>
    </>
  )
}
