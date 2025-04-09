'use client'

import React, { useState, useEffect } from 'react'
import chatListStyle from '../_styles/chatList.module.css'
import { useAuth } from '@/context/auth-context'
import { CHATS_LIST, GYMFRIEND_AVATAR } from '@/config/api-path'
import { useRouter } from 'next/navigation'

import Image from 'next/image'
import moment from 'moment'
import Link from 'next/link'
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5'
export default function ChatListPage(props) {
  const { auth, getAuthHeader } = useAuth()
  const [chatListData, setChatListData] = useState({})
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
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
  }, [auth, getAuthHeader])
  return (
    <>
      {auth.id ? (
        <div className={chatListStyle.friendsPage}>
          <p className={chatListStyle.title}>
            <IoChatbubbleEllipsesSharp />
            &nbsp; 聊天室列表
          </p>
          <div className={chatListStyle.dash}></div>
          <ul>
            {chatListData.totalRows > 0 ? (
              chatListData?.rows?.map((v, i) => {
                const msgdate = moment(v.newMsgTime)
                const today = moment()
                let formattedDate
                if (msgdate.isSame(today, 'day')) {
                  formattedDate = msgdate.format('HH:mm')
                } else {
                  formattedDate = msgdate.format('YYYY/MM/DD')
                }
                if (
                  (auth.id == v.user1_id && v.user1_delete == 1) ||
                  (auth.id == v.user2_id && v.user2_delete == 1)
                ) { 
                  return null
                }
                return (
                  <li key={v.id}>
                    <Link href={`/member-center/myfriends/chat-list/${v.id}`}>
                      <div className={chatListStyle.leftsection}>
                        <div className={chatListStyle.avatar}>
                          <Image
                            src={`${GYMFRIEND_AVATAR}/${
                              auth.id == v.user1_id
                                ? v.user2_avatar
                                : v.user1_avatar
                            }`}
                            alt="avatar"
                            width={35}
                            height={35}
                          />
                        </div>
                      </div>
                      <div className={chatListStyle.middlesection}>
                        <div className={chatListStyle.name}>
                          {auth.id == v.user1_id ? v.user2_name : v.user1_name}
                        </div>
                        <div className={chatListStyle.content}>{v.message}</div>
                      </div>
                      <div className={chatListStyle.rightSection}>
                        <div className={chatListStyle.rightTopSection}>
                          {formattedDate}
                        </div>
                        {v.unread_count != 0 ? (
                          <div className={chatListStyle.rightBottomSection}>
                            {v.unread_count}
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    </Link>
                  </li>
                )
              })
            ) : (
              <p className={chatListStyle.nofriReq}>目前沒有好友...</p>
            )}
          </ul>
          <br />
        </div>
      ) : (
        router.push('/member-center')
      )}
    </>
  )
}
