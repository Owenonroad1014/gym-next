'use client'
import React, { useState } from 'react'
import styles from '../_styles/modal.module.css'
import Image from 'next/image'
import { useAuth } from '@/context/auth-context'
import { FRIEND_REQUEST } from '@/config/api-path'

export default function GymdetailModal({
  isOpen,
  onClose,
  name = '',
  sex = '',
  intro = '',
  item = '',
  goal = '',
  member_id = 0,
  avatar = '',
}) {
  const { auth, getAuthHeader } = useAuth()
  if (!isOpen) return null
  const newgoal = goal.split(',')
  const [isSend, setIsSend] = useState('')

  const goalItems = newgoal.map((v, i) => {
    return (
      <li key={i}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M181.3 32.4c17.4 2.9 29.2 19.4 26.3 36.8L197.8 128l95.1 0 11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3s29.2 19.4 26.3 36.8L357.8 128l58.2 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-68.9 0L325.8 320l58.2 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-68.9 0-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8l9.8-58.7-95.1 0-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8L90.2 384 32 384c-17.7 0-32-14.3-32-32s14.3-32 32-32l68.9 0 21.3-128L64 192c-17.7 0-32-14.3-32-32s14.3-32 32-32l68.9 0 11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3zM187.1 192L165.8 320l95.1 0 21.3-128-95.1 0z" />
        </svg>{' '}
        {v}
      </li>
    )
  })
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
      if (result.error === '已發送過請求') {
        setIsSend('已發送過請求')
      }
      if (result.error === '已是好友') {
        setIsSend('已是好友')
      }
      if (result.success) {
        console.log('好友請求已發送')
        setIsSend('好友請求已發送')
      } else {
        console.log('發送失敗:', result.error)
      }
    } catch (error) {
      console.error('發送請求時發生錯誤:', error)
    }
  }

  return (
    // 添加點外部關閉modal
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <button onClick={onClose} className={styles.closeButton}>
            ✕
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.topsection}>
            <Image
              src={`/imgs/avatar/${avatar}`}
              alt="avatar"
              width={200}
              height={200}
            />
            <div className={styles.rightsection}>
              <p className={styles.uername}>{name}</p>
              {isSend === '好友請求已發送' ? (
                <div className={styles.bottomsection}>
                  <div className={styles.sendBtn}>
                    <button
                      className={styles.btn}
                      style={{ backgroundColor: '#333' }}
                      disabled
                    >
                      <div className={styles.svgWrapper}>
                        <div className={styles.svgWrapper}>
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
                  {/* success */}
                  <div className={styles.success}>
                    <svg
                      className={styles.checkmark}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 52 52"
                    >
                      <circle
                        className={styles.checkmarkCircle}
                        cx={26}
                        cy={26}
                        r={25}
                        fill="none"
                      />
                      <path
                        className={styles.checkmarkCheck}
                        fill="none"
                        d="M14.1 27.2l7.1 7.2 16.7-16.8"
                      />
                    </svg>
                  </div>
                </div>
              ) : isSend === '已發送過請求' ? (
                <>
                  <div className={styles.bottomsection}>
                    <div
                      className={styles.sendBtn}
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <button className={styles.btn} disabled>
                        <div className={styles.svgWrapper}>
                          <div className={styles.svgWrapper}>
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
                        <span>已發送過邀請</span>
                      </button>
                    </div>
                  </div>
                  <pre>正在等待對方同意...</pre>
                </>
              ) : isSend === '已是好友' ? (
                <div className={styles.bottomsection}>
                  <div
                    className={styles.sendBtn}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <button className={styles.btn} disabled>
                      <div className={styles.svgWrapper}>
                        <div className={styles.svgWrapper}>
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
                      <span>已是好友</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className={styles.sendBtn}>
                  <button
                    className={styles.btn}
                    onClick={() => {
                      sendFriendRequest(parseInt(member_id))
                    }}
                  >
                    <div className={styles.svgWrapper}>
                      <div className={styles.svgWrapper}>
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
              )}
            </div>
          </div>
          <hr />
          <div className={styles.userInfo}>
            <p>
              <span>性別：</span>
              {sex == 'male' ? '男' : '女'}
            </p>
            <p>
              <span>喜愛運動項目：</span>
              {item}
            </p>
            <p>
              <span>簡短介紹：</span>
              {intro}
            </p>
            <div className={styles.hastag}>
              <ul>{goalItems}</ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
