'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import chatListStyle from '../_styles/chatList.module.css'
import { useAuth } from '@/context/auth-context'
import { CHATS_LIST, DELETE_CHAT } from '@/config/api-path'
import { FaTrash } from 'react-icons/fa'
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function FriendListPage() {
  const { auth, getAuthHeader } = useAuth()
  const [user, setUser] = useState(0) //正在使用者
  const [chatListData, setChatListData] = useState({})
  const [error, setError] = useState('')
  const [isdelete, setisdelete] = useState('')
  const notifydeleteChat = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer
        toast.onmouseleave = Swal.resumeTimer
      },
    })
    Toast.fire({
      icon: 'success',
      title: `已成功刪除聊天室`,
    })
  }
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
  }, [auth, getAuthHeader, isdelete])
  const deleteChatRoom = async (id) => {
    try {
      const res = await fetch(DELETE_CHAT, {
        method: 'POST',
        headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: id }),
      })
      if (!res.ok) {
        setError('Failed to delete chat room')
      }
      const data = await res.json()
      notifydeleteChat()
      setisdelete(!isdelete)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    }
  }

  return (
    <>
      <div className={chatListStyle.chatsPage}>
        <h5>
          <IoChatbubbleEllipsesSharp />
          &nbsp; 我的聊天室
        </h5>
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
                <li key={v.id}>
                  <Link href={`/chat/${v.id}`}>
                    <div className={chatListStyle.name}>
                      {user == v.user1_id ? v.user2_name : v.user1_name}{' '}
                    </div>
                    <div className={chatListStyle.btngroup}>
                      <button
                        style={{ backgroundColor: '#c97d7d' }}
                        onClick={(e) => {
                          e.preventDefault()
                          deleteChatRoom(v.id)
                        }}
                      >
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
