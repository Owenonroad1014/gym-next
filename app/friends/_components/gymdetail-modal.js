'use client'
import React, { useState } from 'react'
import styles from '../_styles/modal.module.css'
import moment from 'moment/moment'
import Image from 'next/image'
import { useAuth } from '@/context/auth-context'
import { FRIEND_REQUEST } from '@/config/api-path'

export default function GymdetailModal({
  isOpen,
  onClose,
  setIsModalOpen,
  name = '',
  sex = '',
  intro = '',
  item = '',
  goal = '',
  member_id = '',
}) {
  const { auth, getAuthHeader } = useAuth()
  if (!isOpen) return null
  const newgoal = goal.split(',')
  const [isSend, setIsSend] = useState(false)

  const goalItems = newgoal.map((v, i) => {
    return (
      <>
        <li key={i}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M181.3 32.4c17.4 2.9 29.2 19.4 26.3 36.8L197.8 128l95.1 0 11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3s29.2 19.4 26.3 36.8L357.8 128l58.2 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-68.9 0L325.8 320l58.2 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-68.9 0-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8l9.8-58.7-95.1 0-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8L90.2 384 32 384c-17.7 0-32-14.3-32-32s14.3-32 32-32l68.9 0 21.3-128L64 192c-17.7 0-32-14.3-32-32s14.3-32 32-32l68.9 0 11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3zM187.1 192L165.8 320l95.1 0 21.3-128-95.1 0z" />
          </svg>{' '}
          {v}
        </li>
      </>
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
        alert('已發送過請求')
      }
      if (result.success) {
        console.log('好友請求已發送')
        alert('好友請求已發送')
        setIsSend(true)
      } else {
        console.log('發送失敗:', result.error)
      }
    } catch (error) {
      console.error('發送請求時發生錯誤:', error)
    }
  }
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <button onClick={onClose} className={styles.closeButton}>
            ✕
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.topsection}>
            <Image
              src="/imgs/avatar.jpg"
              alt="avatar"
              width={200}
              height={200}
            />
            <div className={styles.rightsection}>
              <p className={styles.uername}>{name}</p>
            </div>
          </div>
          <hr />
          <div className={styles.userInfo}>
            <p>
              <span>性別：</span>
              {sex}
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
          <div className={styles.sendBtn}>
            <button
              className={styles.btn}
              onClick={() => sendFriendRequest(member_id)}
            >
              <div className={styles.svgWrapper - 1}>
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
        </div>
      </div>
    </div>
  )
}
