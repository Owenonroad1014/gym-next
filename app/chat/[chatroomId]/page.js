'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import chatStyle from './chatroom.module.css'
import { CHATS_MSG, CHATS_ITEM } from '@/config/api-path'
import { IoPerson } from 'react-icons/io5'
import moment from 'moment'

export default function ChatRoomPage() {
  const { auth, getAuthHeader } = useAuth()
  const params = useParams()
  const { chatroomId } = params

  const [user, setUser] = useState(0) //正在使用者
  const [chatroomData, setChatroomData] = useState(null)
  const [error, setError] = useState('')

  const [messages, setMessages] = useState([])
  const [chatItem, setChatItem] = useState([])

  useEffect(() => {
    setUser(auth.id)
    // 獲取聊天室單一數據
    const fetchChatItem = async () => {
      try {
        const res = await fetch(`${CHATS_ITEM}/${chatroomId}`, {
          headers: { ...getAuthHeader() },
        })
        if (!res.ok) {
          setError('Failed to fetch chats')
        }
        const data = await res.json()
        setChatItem(data.data[0] || {})
      } catch (err) {
        setError(err.message || '獲取單一聊天室 Something went wrong')
      }
    }
    // 獲取聊天內容
    const fetchMsg = async () => {
      try {
        const res = await fetch(CHATS_MSG, {
          headers: { ...getAuthHeader() },
        })
        if (!res.ok) {
          setError('Failed to fetch chats messages')
        }
        const data = await res.json()
        setMessages(data || {})
      } catch (err) {
        setError(err.message || '獲取聊天內容Something went wrong')
      }
    }
    fetchChatItem()
    fetchMsg()
  }, [auth, getAuthHeader])

  return (
    <>
      <div className={chatStyle.tempbody}>
        <div className={chatStyle.chatContainer}>
          <div className={chatStyle.friendName}>
            <IoPerson /> &nbsp;
            {chatItem.user1_id == user
              ? chatItem.user2_name
              : chatItem.user1_name}
          </div>
          <div className={chatStyle.chatBox}>
            {/* 顯示消息 */}
            <div className={chatStyle.messages}>
              {messages?.data?.length > 0 ? (
                messages?.data?.map((message, index) => (
                  <div key={index}>
                    <div
                      // style={{
                      //   textAlign: user == message.sender_id ? 'right' : 'left',
                      // }}
                      className={`${chatStyle.message} ${
                        user == message.sender_id
                          ? chatStyle.sent
                          : chatStyle.received
                      }`}
                    >
                      {message.message}
                    </div>
                    <pre
                      className={chatStyle.time}
                      style={{
                        textAlign: user == message.sender_id ? 'right' : 'left',
                      }}
                    >
                      {moment(message.created_at).format('HH:mm')}
                    </pre>
                  </div>
                ))
              ) : (
                <div className={chatStyle.noMessages}>暫無消息</div>
              )}
            </div>

            {/* 用戶輸入區域 */}
            <div className={chatStyle.inputArea}>
              <input
                className={chatStyle.textInput}
                type="text"
                placeholder="輸入消息..."
              />
              <button>發送</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
