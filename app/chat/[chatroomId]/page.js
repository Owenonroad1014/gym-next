'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import chatStyle from './chatroom.module.css'
import { CHATS_MSG, CHATS_ITEM } from '@/config/api-path'
import { IoPerson } from 'react-icons/io5'
import moment from 'moment'
import io from 'socket.io-client'
export default function ChatRoomPage() {
  const params = useParams()
  const { auth, getAuthHeader } = useAuth()
  const { chatroomId } = params

  // const [user, setUser] = useState(0) //正在使用者
  const [error, setError] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [messages, setMessages] = useState([]) // 獲取聊天內容
  const [chatItem, setChatItem] = useState([]) //聊天室
  const [inputMsg, setInputMsg] = useState('') //正在輸入得文字內容
  const [username, setUsername] = useState('')
  const user = auth.id

  let socket
  socket = io('http://localhost:3006/chat')
  useEffect(() => {
    socket.on('sysmsg', (msg) => {
      console.log(msg)
      setIsConnected(true)
    })
    console.log(user)
    socket.emit('userId', user)
    socket.emit('join_room', chatroomId) // 傳給後端房間號
    socket.on('message', (msg) => {
      console.log(msg)
    })
    socket.on('receive_message', (messageData) => {
      console.log('receive_message', messageData)
      setMessages((prevMessages) => [...prevMessages, messageData])
    })
    return () => {
      socket.disconnect()
    }
  }, [auth, chatroomId])
  useEffect(() => {
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
        const res = await fetch(`${CHATS_MSG}/${chatroomId}`, {
          headers: { ...getAuthHeader() },
        })
        if (!res.ok) {
          setError('Failed to fetch chats messages')
        }
        const data = await res.json()
        setMessages(data.data || {})
      } catch (err) {
        setError(err.message || '獲取聊天內容Something went wrong')
      }
    }

    fetchChatItem()
    fetchMsg()
  }, [auth, getAuthHeader])

  const handleOnclickSend = async () => {
    const now = new Date()
    if (inputMsg.trim() === '') return
    const messageData = {
      sender_id: user,
      chat_id: parseInt(chatroomId),
      message: inputMsg,
      created_at: moment(now),
    }

    socket.emit('send_message', messageData)
    console.log(messageData)
    setInputMsg('')
  }

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
          <div
            className={isConnected ? chatStyle.connect : chatStyle.disconnect}
          >
            {isConnected ? 'connection' : 'disconnection'}
          </div>
          <div className={chatStyle.chatBox}>
            {/* 顯示消息 */}
            <ul className={chatStyle.messages}>
              {messages?.length > 0 ? (
                messages?.map((v, index) => (
                  <li key={index}>
                    <div
                      className={`${chatStyle.message} ${
                        user == v.sender_id
                          ? chatStyle.sent
                          : chatStyle.received
                      }`}
                    >
                      {v.message}
                    </div>
                    <pre
                      className={chatStyle.time}
                      style={{
                        textAlign: user == v.sender_id ? 'right' : 'left',
                      }}
                    >
                      {moment(v.created_at).format('HH:mm')}
                    </pre>
                  </li>
                ))
              ) : (
                <li className={chatStyle.noMessages}>暫無消息</li>
              )}
            </ul>

            {/* 用戶輸入區域 <button onClick={sendMessage}>發送</button>*/}
            <div
              className={chatStyle.inputArea}
              // onSubmit={(e) => {
              //   e.preventDefault()
              // }}
            >
              <input
                className={chatStyle.textInput}
                type="text"
                placeholder="輸入消息..."
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
              />

              <button onClick={handleOnclickSend}>發送</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
