'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import friendListStyle from './friendList.module.css'
import { useAuth } from '@/context/auth-context'
import {
  FRIEND_LIST,
  FRIEND_REQ_LIST,
  FRIEND_ACCEPT,
  FRIEND_REJECT,
  FRIEND_DELETE,
} from '@/config/api-path'

export default function FriendListPage() {
  const { auth, getAuthHeader } = useAuth()
  const [friendListData, setfriendListData] = useState({})
  const [friendRequestListData, setFriendRequestListData] = useState({})
  const [friendAccept, setFriendAccept] = useState({})
  const [isAccept, setIsAccept] = useState(false) //控制更新狀態刷新
  const [isDelete, setIsDelete] = useState(false) //控制更新狀態刷新
  const [error, setError] = useState('')

  useEffect(() => {
    // 獲取好友列表
    const fetchFriendList = async () => {
      try {
        const res = await fetch(FRIEND_LIST, {
          headers: { ...getAuthHeader() },
        })
        if (!res.ok) {
          setError('Failed to fetch friends')
        }
        const data = await res.json()
        setfriendListData(data || {})
      } catch (err) {
        setError(err.message || 'Something went wrong')
      }
    }
    // 獲取邀請好友列表
    const fetchFriendRequestList = async () => {
      try {
        const res = await fetch(FRIEND_REQ_LIST, {
          headers: { ...getAuthHeader() },
        })
        if (!res.ok) {
          setError('Failed to fetch friend request')
        }
        const data = await res.json()
        setFriendRequestListData(data || {})
      } catch (err) {
        setError(err.message || 'Something went wrong')
      }
    }

    fetchFriendList()
    fetchFriendRequestList()
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
  const acceptFriendRequest = async (sender_id, username) => {
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
      alert('已接受好友邀請')
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
  // 點擊好友進入到聊天室
  // const handleFriendClick = (friendId) => {
  //   router.push(`/chat/${friendId}`)
  // }

  return (
    <>
      <div className={friendListStyle.friendsPage}>
        <h1>好友列表</h1>
        <div className={friendListStyle.search}>
          <input type="text" placeholder="搜尋好友" />
        </div>

        {/* 顯示訊息 */}
        {/* {message && <p>{message}</p>} */}
        <h2>好友請求</h2>
        <ul>
          {friendRequestListData.totalRows > 0 ? (
            friendRequestListData?.data?.map((v, i) => {
              return (
                <li key={i}>
                  <div className={friendListStyle.name}>{v.sender_name}</div>
                  <div className={friendListStyle.btngroup}>
                    <button
                      onClick={() =>
                        acceptFriendRequest(
                          v.sender_id,
                          v.name == v.user1_name ? v.user2_name : v.user1_name
                        )
                      }
                      disabled={isAccept}
                    >
                      同意
                    </button>
                    <button
                      onClick={() => rejectFriendRequest(v.sender_id)}
                      disabled={isAccept}
                    >
                      拒絕
                    </button>
                  </div>
                </li>
              )
            })
          ) : (
            <p>尚未有好友邀請...</p>
          )}
        </ul>
        <br />
        <hr />
        <h2>我的好友</h2>
        <ul>
          {friendListData.totalRows > 0 ? (
            friendListData?.rows?.map((v, i) => {
              return (
                <li key={i}>
                  <div className={friendListStyle.name}>
                    {v.member_id == v.user1_id ? v.user2_name : v.user1_name}{' '}
                  </div>
                  <div className={friendListStyle.btngroup}>
                    <button>
                      {' '}
                      <Link href="/chat">發送訊息...</Link>
                    </button>
                    <button
                      style={{ backgroundColor: '#c97d7d' }}
                      onClick={() => {
                        deleteFriend(
                          v.member_id === v.user1_id ? v.user2_id : v.user1_id,
                          v.member_id === v.user1_id ? v.user2_name : v.user1_name
                        )
                      }}
                    >
                      刪除好友
                    </button>
                  </div>
                </li>
              )
            })
          ) : (
            <p>目前沒有好友</p>
          )}
        </ul>
      </div>
    </>
  )
}
