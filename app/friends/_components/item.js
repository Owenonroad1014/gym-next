'use client'
import { useState } from 'react'
import friendStyle from '../_styles/friends.module.css'
import '../_styles/modal.css'
import Link from 'next/link'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useAuth } from '@/context/auth-context'
import { FRIEND_REQUEST } from '@/config/api-path'

export default function List({
  listData = [
    {
      name: '',
      profile_id: 0,
      member_id: 0,
      avatar: '',
      sex: '',
      mobile: '',
      intro: '',
      item: '',
      goal: '',
      status: 0,
      created_at: '',
      update_at: '',
    },
  ],
}) {
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

  const getMore = (name, sex, intro, item, goal, member_id) => {
    const newgoal = goal.split(',')
    const goalItems = newgoal
      .map((v, i) => {
        return `<li key=${i}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M181.3 32.4c17.4 2.9 29.2 19.4 26.3 36.8L197.8 128l95.1 0 11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3s29.2 19.4 26.3 36.8L357.8 128l58.2 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-68.9 0L325.8 320l58.2 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-68.9 0-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8l9.8-58.7-95.1 0-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8L90.2 384 32 384c-17.7 0-32-14.3-32-32s14.3-32 32-32l68.9 0 21.3-128L64 192c-17.7 0-32-14.3-32-32s14.3-32 32-32l68.9 0 11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3zM187.1 192L165.8 320l95.1 0 21.3-128-95.1 0z"/></svg> ${v}</li>`
      })
      .join('')

    const MySwal = withReactContent(Swal)
    MySwal.fire({
      html: `
        <div class="user-detail">
          <p class="username">${name}</p>
          <hr />
          <ul>
            <li><span>● 性別</span>：${sex}</li>
            <li><span>● 喜愛運動項目</span> ：${item}</li>
            <li><span>● 簡短介紹</span>${intro}</li>
          </ul>
          <div class="hastag">
            <ul>${goalItems}</ul>
          </div>
        </div>
        ${
          isSend
            ? `
            <div class="sendBtn">
              <button class="btn" disabled>
                <div class="svgWrapper - 1">
                  <div class="svgWrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                    </svg>
                  </div>
                </div>
                <span>已發送邀請</span>
              </button>
            </div>
            <div class="success">
              <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle class="checkmarkCircle" cx="26" cy="26" r="25" fill="none"></circle>
                <path class="checkmarkCheck" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"></path>
              </svg>
            </div>
            <div class="msg">
              <pre>正在等待對方同意...</pre>
            </div>`
            : `
            <div class="sendBtn">
              <button class="btn" onClick="sendFriendRequest(${member_id})">
                <div class="svgWrapper - 1">
                  <div class="svgWrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                    </svg>
                  </div>
                </div>
                <span>發送邀請</span>
              </button>
            </div>`
        }
      `,
      imageUrl: 'https://unsplash.it/400/200',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
      showConfirmButton: false,
    })
  }

  return (
    <>
      {listData.map((v, i) => (
        <div key={v.member_id} className={friendStyle.profileCard}>
          <div className={friendStyle.profileCard_container}>
            <div className={friendStyle.circle}>
              <div className={friendStyle.profileImage}></div>
            </div>
            <p className={friendStyle.profileName}>{v.name}</p>
            <hr className={friendStyle.profile_divider} />
            <section className={friendStyle.profile_description_wrapper}>
              <p className={friendStyle.profile_description}>{v.intro}</p>
              <button
                className={friendStyle.favorite_button}
                onClick={() => {
                  getMore(v.name, v.sex, v.intro, v.item, v.goal, v.member_id)
                }}
              >
                查看更多
              </button>
            </section>
          </div>
        </div>
      ))}
    </>
  )
}
