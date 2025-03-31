'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import io from 'socket.io-client'

import chatListStyle from '../_styles/chatList.module.css'
import { useAuth } from '@/context/auth-context'
import { CHATS_LIST, DELETE_CHAT, READ_CHAT } from '@/config/api-path'
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { SiOpenaigym } from 'react-icons/si'

// 创建单例 socket 连接
let socket

// 確保只有在客戶端才初始化 socket
if (typeof window !== 'undefined') {
  // 檢查是否已經有連接
  if (!socket) {
    socket = io('http://localhost:3006/chat', {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })
    console.log('聊天列表 Socket.io 連接已創建')
  }
}

export default function FriendListPage() {
  const { auth, getAuthHeader } = useAuth()
  const [user, setUser] = useState(0) //正在使用者
  const [chatListData, setChatListData] = useState({})
  const [error, setError] = useState('')
  const [isdelete, setisdelete] = useState('') //刷新用
  const [isRead, setisRead] = useState('')//刷新用
  // const notifydeleteChat = () => {
  //   const Toast = Swal.mixin({
  //     toast: true,
  //     position: 'top-end',
  //     showConfirmButton: false,
  //     timer: 3000,
  //     timerProgressBar: false,
  //     didOpen: (toast) => {
  //       toast.onmouseenter = Swal.stopTimer
  //       toast.onmouseleave = Swal.resumeTimer
  //     },
  //   })
  //   Toast.fire({
  //     icon: 'success',
  //     title: `已成功刪除聊天室`,
  //   })
  // }

  const fetchRead = async (id) => {
    try {
      const res = await fetch(READ_CHAT, {
        method: 'POST',
        headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: id }),
      })
      if (!res.ok) {
        setError('Failed to read chat room')
      }
      const data = await res.json()
      setisRead(!isRead)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    }
  }

  // 處理 Socket 連接
  useEffect(() => {
    if (!socket || !user) return

    // 連接事件處理
    const handleConnect = () => {
      console.log('聊天列表已連接到 Socket.io 服務器')
      // 發送用户 ID
      socket.emit('userId', user)
    }

    // 斷開連接處理
    const handleDisconnect = (reason) => {
      console.log('聊天列表與 Socket.io 服務器斷開連接:', reason)
    }

    // 處理未讀數量更新
    const handleUnreadUpdate = ({ chat_id, unread_count }) => {
      console.log('收到未讀數量更新:', { chat_id, unread_count })
      setChatListData(prevData => {
        if (!prevData.rows) return prevData
        return {
          ...prevData,
          rows: prevData.rows.map(chat => 
            chat.id === chat_id 
              ? { ...chat, unread_count } 
              : chat
          )
        }
      })
    }

    // 註冊事件監聽器
    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)
    socket.on('unread_update', handleUnreadUpdate)

    // 如果已連接則手動執行處理函數
    if (socket.connected) {
      handleConnect()
    }

    // 清理函數
    return () => {
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
      socket.off('unread_update', handleUnreadUpdate)
    }
  }, [user])

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
  }, [auth, getAuthHeader, isdelete,isRead])
  // const deleteChatRoom = async (id) => {
  //   try {
  //     const res = await fetch(DELETE_CHAT, {
  //       method: 'POST',
  //       headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ chat_id: id }),
  //     })
  //     if (!res.ok) {
  //       setError('Failed to delete chat room')
  //     }
  //     const data = await res.json()
  //     // notifydeleteChat()
  //     setisdelete(!isdelete)
  //   } catch (err) {
  //     setError(err.message || 'Something went wrong')
  //   }
  // }

  return (
    <>
      <div className={chatListStyle.chatsPage}>
        <h5>
          <IoChatbubbleEllipsesSharp />
          &nbsp; 我的聊天室
        </h5>
        <div className={chatListStyle.dash}></div>
        <div className={chatListStyle.official}>
          <Link href={`/chat/official`}>
            <div className={chatListStyle.name}>
              <SiOpenaigym /> &nbsp; GYM步空間官方
            </div>
          </Link>
        </div>
        <div className={chatListStyle.dash}></div>
        <ul>
          {chatListData.totalRows > 0 ? (
            chatListData?.rows?.map((v, i) => {
              if (
                (user == v.user1_id && v.user1_delete == 1) ||
                (user == v.user2_id && v.user2_delete == 1)
              ) {
                return null
              }
              return (
                <li
                  key={v.id}
                  onClick={() => {
                    fetchRead(v.id)
                  }}
                >
                  <Link href={`/chat/${v.id}`}>
                    <div className={chatListStyle.name}>
                      {user == v.user1_id ? v.user2_name : v.user1_name}{' '}
                    </div>
                    {v.unread_count > 0 ? (
                      <div
                        className={chatListStyle.unread}
                        
                      >{v.unread_count}</div>
                    ) : (
                      ''
                    )}
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
