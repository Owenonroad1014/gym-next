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
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function FriendListPage() {
  const { auth, getAuthHeader } = useAuth()
  const [friendListData, setfriendListData] = useState({})
  const [friendRequestListData, setFriendRequestListData] = useState({})
  const [friendAccept, setFriendAccept] = useState({})
  const [isAccept, setIsAccept] = useState(false) //控制更新狀態刷新
  const [isDelete, setIsDelete] = useState(false) //控制更新狀態刷新
  const [error, setError] = useState('')
  // 通知接受好友邀請
  const notifyacceptRequest = (username) => {
    setIsAccept(!isAccept)
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
      title: `已接受${username}的好友邀請`,
    })
  }
  // 無法接受好友邀請
  const notifyacceptRequestError = (username) => {
    setIsAccept(!isAccept)
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
      icon: 'error',
      title: `無法接受${username}的好友邀請`,
    })
  }
  // 通知刪除好友
  const notifydeleteFriend = (user,username) => {
    setIsAccept(!isAccept)
    Swal.fire({
      title: `確定要刪除好友${username}?`,
      text: "刪除後無法復原",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgba(0, 0, 0, 0.5)",
      cancelButtonColor: "#f87808",
      confirmButtonText: "是",
      cancelButtonText: "否",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFriend(user,username)
        Swal.fire({
          title: `已成功刪除好友${username}`,
          icon: "success",
          confirmButtonColor: "#f87808",
        });
      }
    });
    
  }
  // 無法刪除好友
  const notifydeleteFriendError = (username) => {
    setIsAccept(!isAccept)
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
      icon: 'error',
      title: `無法刪除${username}的好友`,
    })
  }
  // 拒絕好友邀請
  const notifyrejectFriend = (username) => {
    setIsAccept(!isAccept)
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
      title: `已拒絕${username}的好友邀請`,
    })
  }
  // 無法拒絕好友邀請
  const notifyrejectFriendError = (username) => {
    setIsAccept(!isAccept)
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
      icon: 'error',
      title: `無法拒絕${username}的好友邀請`,
    })
  }

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
        method: 'POST',
        headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ user }),
      })
      if (!res.ok) {
        setError('無法刪除好友')
      }
      const data = await res.json()
      setIsDelete(!isDelete)
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
        notifyacceptRequestError(username)
      }
      const data = await res.json()
      setFriendAccept(data || {})
      setIsAccept(!isAccept)
      console.log(data)
      notifyacceptRequest(username)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    }
  }
  // 拒絕好友邀請
  const rejectFriendRequest = async (sender_id, username) => {
    try {
      const res = await fetch(FRIEND_REJECT, {
        method: 'POST',
        headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender_id }),
      })
      if (!res.ok) {
        setError('無法接受好友邀請')
        notifyrejectFriendError(username)
      }
      const data = await res.json()
      setFriendAccept(data || {})
      setIsAccept(!isAccept)
      notifyrejectFriend(username)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    }
  }

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
                        acceptFriendRequest(v.sender_id, v.sender_name)
                      }
                      disabled={isAccept}
                    >
                      同意
                    </button>
                    <button
                      onClick={() =>
                        rejectFriendRequest(v.sender_id, v.sender_name)
                      }
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
              if (
                (auth.id == v.user1_id && v.user1_delete == 1) ||
                (auth.id == v.user2_id && v.user2_delete == 1)
              ) {
                return null
              }
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
                        notifydeleteFriend( v.member_id === v.user1_id ? v.user2_id : v.user1_id,
                          v.member_id === v.user1_id
                            ? v.user2_name
                            : v.user1_name)
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
