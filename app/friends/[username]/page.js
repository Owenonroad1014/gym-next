'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import friendStyle from './_styles/friend.module.css'
import FriendBanner from '../_components/friend-banner'
import Breadcrumb from '../_components/breadcrumb'
import { useAuth } from '@/contexts/auth-context'
import { FRIEND_REQUEST } from '@/config/api-path'

export default function PersonPage() {
  // **************** TODO 處理發送邀請後刷新步要改變狀態
  const breadcrumb = ['首頁', '找GYM友', '王小明']
  const { auth, getAuthHeader } = useAuth()
  const [isSend, setIsSend] = useState(false)
  const sendFriendRequest = async (receiverId) => {
    try {
      const response = await fetch(FRIEND_REQUEST, {
        method: 'POST',
        headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ receiver_id: receiverId }),
      })
      if (!response.ok) {
        throw new Error('請求失敗')
      }
      const result = await response.json()
      console.log(result)
      if (result.success) {
        console.log('好友請求已發送')
        setIsSend(true)
      } else {
        console.log('發送失敗:', result.error)
      }
    } catch (error) {
      console.error('發送請求時發生錯誤:', error)
    }
  }

  return (
    <>
      <FriendBanner />
      <Breadcrumb breadcrumb={breadcrumb} />
      <div className={friendStyle.personContainer}>
        <div className={friendStyle.user_info}>
          <div className={friendStyle.user_avatar}>
            <Image
              src="https://xsgames.co/randomusers/avatar.php?g=male"
              alt="avatar"
              width={250}
              height={250}
            />
          </div>
          <div className={friendStyle.user_detail}>
            <p className={friendStyle.username}>王小明</p>
            <hr />
            <ul>
              <li>
                <span>性別</span>：男
              </li>
              <li>
                <span>運動項目</span> ：重訓、跑步
              </li>
              <li>
                <span>簡短介紹</span>
                ：我是一名重訓愛好者，最近正在增肌訓練，平時每週3次跑步，想找一個可以一起訓練的夥伴，喜歡挑戰自己的極限，並且希望能一起互相鼓勵進步。
              </li>
            </ul>
            <div className={friendStyle.hastag}>
              <ul>
                <li>#增肌</li>
                <li>#健康維持</li>
                <li>#健康維持</li>
              </ul>
            </div>
          </div>
          {isSend ? (
            <>
              <div className={friendStyle.sendBtn}>
                <button className={friendStyle.btn} disabled>
                  <div class={friendStyle.svgWrapper - 1}>
                    <div class={friendStyle.svgWrapper}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path
                          fill="currentColor"
                          d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <span>已發送邀請</span>
                </button>
              </div>

              <div className={friendStyle.success}>
                <svg
                  className={friendStyle.checkmark}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                >
                  <circle
                    className={friendStyle.checkmarkCircle}
                    cx={26}
                    cy={26}
                    r={25}
                    fill="none"
                  />
                  <path
                    className={friendStyle.checkmarkCheck}
                    fill="none"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  />
                </svg>
              </div>
              <div className={friendStyle.msg}>
                <pre>正在等待對方同意...</pre>
              </div>
            </>
          ) : (
            <>
              <div
                className={friendStyle.sendBtn}
                onClick={() => {
                  sendFriendRequest(2)
                }}
              >
                <button className={friendStyle.btn}>
                  <div class={friendStyle.svgWrapper - 1}>
                    <div class={friendStyle.svgWrapper}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path
                          fill="currentColor"
                          d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <span>發送邀請</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
