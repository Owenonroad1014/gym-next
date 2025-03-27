'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import chatStyle from './chatroom.module.css'
import { CHATS_MSG, CHATS_ITEM, CHATS_LIST, READ_CHAT } from '@/config/api-path'
import { IoPerson } from 'react-icons/io5'
import moment from 'moment'
import EmojiPicker from 'emoji-picker-react'
import io from 'socket.io-client'
import { FaRegSmile, FaRegSmileWink } from 'react-icons/fa'
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
    console.log('Socket.io 連接已創建')
  }
}

export default function ChatRoomPage() {
  const params = useParams()
  const { auth, getAuthHeader } = useAuth()
  const { chatroomId } = params

  // 聊天狀態
  const [error, setError] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [messages, setMessages] = useState([]) // 獲取聊天內容
  const [chatItem, setChatItem] = useState([]) //聊天室
  const [inputMsg, setInputMsg] = useState('') //正在輸入得文字內容
  const user = auth.id
  // const messagesEndRef = useRef(null)
  const [socketStatus, setSocketStatus] = useState('等待連接...')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isRead, setIsRead] = useState(false) //刷新用
  const [someoneInto, setSomeoneInto] = useState(false) //刷新用
  const chatBoxRef = useRef(null)
  // 自動滾動到訊息底部
  const scrollToBottom = () => {
    const chatBox = chatBoxRef.current
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight
    }
  }

  // 訊息變化時滾動
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // 處理 Socket 連接
  useEffect(() => {
    if (!socket || !user || !chatroomId) return

    // 連接事件處理
    const handleConnect = () => {
      console.log('已連接到 Socket.io 服務器')
      setIsConnected(true)
      setSocketStatus('已連接')

      // 先離開其他房間，避免接收到其他聊天室的消息
      socket.emit('leave_all_rooms')

      // 發送用户 ID
      socket.emit('userId', user)

      // 加入聊天室
      socket.emit('join_room', String(chatroomId))
      console.log(`已嘗試加入聊天室: ${chatroomId}`)
    }

    // 斷開連接處理
    const handleDisconnect = (reason) => {
      console.log('與 Socket.io 服務器斷開連接:', reason)
      setIsConnected(false)
      setSocketStatus(`已斷開連接: ${reason}`)
    }

    // 連接錯誤處理
    const handleConnectError = (err) => {
      console.error('連接錯誤:', err)
      setSocketStatus(`連接錯誤: ${err.message}`)
    }

    // 系統消息處理
    const handleSystemMessage = (msg) => {
      console.log('系統消息:', msg)
      setSocketStatus('已連接 - ' + msg)
    }

    // 房間加入確認
    const handleRoomJoined = (data) => {
      console.log('房間加入確認:', data)
      setSocketStatus(`已加入聊天室 ${data.room}`)

      // 當用戶加入聊天室時，發送已讀請求
      if (data.room === chatroomId) {
        // 獲取所有未讀訊息
        const unreadMessages = messages.filter(
          (msg) => msg.sender_id !== user && msg.is_read === 0
        )

        if (unreadMessages.length > 0) {
          const messageIds = unreadMessages.map((msg) => msg.id)
          console.log('發送已讀請求:', {
            messageIds,
            chat_id: chatroomId,
            userId: user,
          })

          // 立即更新本地訊息狀態
          setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              messageIds.includes(msg.id) ? { ...msg, is_read: 1 } : msg
            )
          )

          // 發送已讀請求到伺服器
          socket.emit('markAsRead', {
            messageIds,
            chat_id: chatroomId,
            userId: user,
          })
        }
      }
    }

    // 接收聊天消息
    const handleChatMessage = (messageData) => {
      console.log('收到聊天消息:', messageData, '當前用戶:', user)

      // 如果是自己發送的訊息，且我們已添加了臨時版本，則僅更新該臨時訊息
      if (messageData.sender_id === user) {
        console.log('這是自己發送的訊息，檢查是否需要更新臨時訊息')

        setMessages((prevMessages) => {
          // 檢查是否有匹配的臨時訊息
          const hasTempMessage = prevMessages.some(
            (msg) =>
              msg.isTemp &&
              msg.sender_id === messageData.sender_id &&
              msg.message === messageData.message
          )

          // 如果有臨時訊息，則更新它
          if (hasTempMessage) {
            console.log('找到匹配的臨時訊息，更新它')
            return prevMessages.map((msg) =>
              msg.isTemp &&
              msg.sender_id === messageData.sender_id &&
              msg.message === messageData.message
                ? { ...messageData, isTemp: false }
                : msg
            )
          }

          // 如果沒有臨時訊息，則檢查是否已經有相同的訊息（防止重複）
          const hasDuplicate = prevMessages.some(
            (msg) =>
              !msg.isTemp &&
              msg.sender_id === messageData.sender_id &&
              msg.message === messageData.message &&
              Math.abs(
                new Date(msg.created_at) - new Date(messageData.created_at)
              ) < 5000
          )

          // 如果沒有重複訊息，則添加新的訊息
          if (!hasDuplicate) {
            console.log('沒有找到臨時或重複訊息，添加新訊息')
            return [...prevMessages, messageData]
          }

          console.log('找到重複訊息，不做任何更改')
          return prevMessages
        })
      } else {
        // 如果是其他人發送的訊息，檢查是否重複然後添加
        console.log('這是其他人發送的訊息')

        setMessages((prevMessages) => {
          // 檢查是否已存在相同訊息
          const isDuplicate = prevMessages.some(
            (msg) =>
              (msg.id && msg.id === messageData.id) ||
              (!msg.id &&
                msg.sender_id === messageData.sender_id &&
                msg.message === messageData.message &&
                Math.abs(
                  new Date(msg.created_at) - new Date(messageData.created_at)
                ) < 5000)
          )

          if (!isDuplicate) {
            console.log('添加其他人的新訊息')
            return [...prevMessages, messageData]
          }

          console.log('其他人的重複訊息，不做任何更改')
          return prevMessages
        })
      }
    }

    // 錯誤消息處理
    const handleErrorMessage = (error) => {
      console.error('伺服器錯誤:', error)
      setError(`伺服器錯誤: ${error}`)
    }

    // 處理已讀更新
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
        setIsRead(!isRead)
      } catch (err) {
        setError(err.message || 'Something went wrong')
      }
    }

    // 設置訊息為已讀
    const handleReadMessage = ({ messageIds, userId }) => {
      console.log('收到已讀更新:', { messageIds, userId })

      // 當接收到已讀訊息時，更新訊息的狀態
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          messageIds.includes(msg.id)
            ? { ...msg, is_read: 1 } // 設置已讀
            : msg
        )
      )

      // 如果是自己發送的訊息被標記為已讀，更新未讀數量
      if (
        messageIds.some((id) =>
          messages.find((msg) => msg.id === id && msg.sender_id === user)
        )
      ) {
        console.log('自己的訊息被標記為已讀，更新未讀數量')
        // 重新獲取聊天列表以更新未讀數量
        fetchChatsList()
      }
      fetchRead(chatroomId)
      console.log(`訊息 ${messageIds} 已被用戶 ${userId} 標記為已讀`)
    }

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
      } catch (err) {
        setError(err.message || 'Something went wrong')
      }
    }

    // 有人進入房間
    const handlesomeoneIntoRoom = (msg) => {
      console.log(msg)
      setSomeoneInto(!someoneInto)
    }

    // 註冊事件監聽器
    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)
    socket.on('connect_error', handleConnectError)
    socket.on('sysmsg', handleSystemMessage)
    socket.on('room_joined', handleRoomJoined)
    socket.on('receive_message_chat', handleChatMessage)
    socket.on('error_message', handleErrorMessage)
    socket.on('messageRead', handleReadMessage)
    socket.on('someoneIntoRoom', handlesomeoneIntoRoom)

    // 如果已連接則手動執行處理函數
    if (socket.connected) {
      handleConnect()
    }

    // 清理函數
    return () => {
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
      socket.off('connect_error', handleConnectError)
      socket.off('sysmsg', handleSystemMessage)
      socket.off('room_joined', handleRoomJoined)
      socket.off('receive_message_chat', handleChatMessage)
      socket.off('error_message', handleErrorMessage)
      socket.off('messageRead', handleReadMessage)
      socket.off('someoneIntoRoom', handlesomeoneIntoRoom)

      // 離開聊天室但不斷開連接
      socket.emit('leave_room', chatroomId)
    }
  }, [chatroomId, user, isRead])

  // 獲取聊天數據
  useEffect(() => {
    // 獲取聊天室單一數據
    const fetchChatItem = async () => {
      try {
        const res = await fetch(`${CHATS_ITEM}/${chatroomId}`, {
          headers: { ...getAuthHeader() },
        })
        if (!res.ok) {
          setError('無法獲取聊天室資訊')
          return
        }
        const data = await res.json()
        setChatItem(data.data[0] || {})
      } catch (err) {
        setError(err.message || '獲取聊天室資訊時發生錯誤')
      }
    }
    // 修改已讀狀態

    // 獲取聊天內容

    const fetchMsg = async () => {
      try {
        const res = await fetch(`${CHATS_MSG}/${chatroomId}`, {
          headers: { ...getAuthHeader() },
        })
        if (!res.ok) {
          setError('無法獲取聊天訊息')
          return
        }
        const data = await res.json()
        setMessages(data.data || [])
      } catch (err) {
        setError(err.message || '獲取聊天訊息時發生錯誤')
      }
    }

    if (chatroomId) {
      fetchChatItem()
      fetchMsg()
    }
  }, [chatroomId, getAuthHeader, someoneInto])

  // 發送訊息處理
  const handleOnclickSend = (event) => {
    event.preventDefault()
    if (!socket || !isConnected) {
      setError('尚未連接到聊天伺服器')
      return
    }

    if (inputMsg.trim() === '') return

    // 防止重複發送
    const sendButton = document.querySelector('button[type="submit"]')
    if (sendButton) sendButton.disabled = true

    const now = new Date()

    // 確保 chat_id 是數字
    const chatIdNum = parseInt(chatroomId, 10)

    if (isNaN(chatIdNum)) {
      setError('聊天室 ID 無效')
      if (sendButton) sendButton.disabled = false
      return
    }

    // 構建訊息數據
    const messageData = {
      sender_id: user,
      chat_id: chatIdNum,
      message: inputMsg,
      created_at: now.toISOString(),
      is_read: 0,
    }

    console.log('發送訊息:', messageData)

    // 添加臨時訊息到界面（樂觀更新）
    const tempId = `temp-${Date.now()}`
    setMessages((prevMessages) => [
      ...prevMessages,
      { ...messageData, id: tempId, isTemp: true },
    ])

    // 發送訊息
    socket.emit('send_message', messageData)

    // 清空輸入框
    setInputMsg('')

    // 1秒後恢復按鈕
    setTimeout(() => {
      if (sendButton) sendButton.disabled = false
    }, 1000)
  }

  // 處理 emoji 點擊
  const handleEmojiClick = (emojiObject, event) => {
    console.log(emojiObject)

    setInputMsg((prevMsg) => prevMsg + emojiObject.emoji)
    setShowEmojiPicker(false)
  }

  return (
    <>
      <div className={chatStyle.tempbody}>
        <div className={chatStyle.chatContainer}>
          <div className={chatStyle.friendName}>
            <IoPerson /> &nbsp;
            {chatroomId == 'official'
              ? 'GYM部空間官方'
              : chatItem.user1_id == user
              ? chatItem.user2_name
              : chatItem.user1_name}
          </div>
          <div className={chatStyle.chatBox} ref={chatBoxRef}>
            {/* 顯示錯誤 */}
            {error && <div className={chatStyle.errorMessage}>{error}</div>}
            {/* 顯示消息 */}
            <ul className={chatStyle.messages}>
              {messages?.length > 0 ? (
                messages?.map((v, index) => (
                  <li
                    key={v.id || index}
                    className={v.isTemp ? chatStyle.tempMessage : ''}
                  >
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
                      {user == v.sender_id && v.is_read === 1 ? (
                        <span style={{ color: '#f87808', marginRight: '5px' }}>
                          Read
                        </span>
                      ) : (
                        ''
                      )}
                      {typeof v.created_at === 'string'
                        ? moment(v.created_at).format('HH:mm')
                        : moment(v.created_at).isValid()
                        ? moment(v.created_at).format('HH:mm')
                        : ''}
                    </pre>
                  </li>
                ))
              ) : (
                <li className={chatStyle.noMessages}>暫無消息</li>
              )}
              {/* 滾動錨點
              <div ref={messagesEndRef} /> */}
            </ul>
          </div>
          {/* 訊息輸入區域 */}
          <div className={chatStyle.inputArea}>
            {/* 顯示表情符號選擇器 */}
            <div className={chatStyle.emojiArea}>
              <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                {showEmojiPicker ? <FaRegSmileWink /> : <FaRegSmile />}
              </button>

              {showEmojiPicker && (
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  style={{ position: 'absolute', bottom: '50px' }}
                />
              )}
            </div>

            <input
              className={chatStyle.textInput}
              type="text"
              placeholder="輸入消息..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleOnclickSend(e)
                }
              }}
              disabled={!isConnected}
            />
            <button
              className={chatStyle.sendButton}
              onClick={handleOnclickSend}
              disabled={!isConnected}
              type="submit"
            >
              發送
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
