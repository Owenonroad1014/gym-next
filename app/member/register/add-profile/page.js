'use client'

import React, { useState, useEffect } from 'react'
import addProfileCss from '../../_styles/add-profile.module.css'
import { useAuth } from '@/context/auth-context'
import { pfSchema } from '@/utils/schema/schema'
import { REGISTER_PROFILE_POST } from '@/config/api-path'

export default function AddProfileJsPage() {
  const { auth, getAuthHeader } = useAuth()
  const [status, setStatus] = useState(false)
  const [previewAvatar, setPreviewAvatar] = useState(
    '/imgs/avatar/default-avatar.png'
  ) // 預設頭貼
  const [profileForm, setProfileForm] = useState({
    pname: '',
    avatar: previewAvatar,
    sex: '',
    mobile: '',
    intro: '',
    item: '',
    goal: [],
    status: status,
  })
  const [errors, setErrors] = useState({})

  const profileChangeForm = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value })
  }
  const avatarChangeForm = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileForm({ ...profileForm, avatar: file })
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewAvatar(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }
  const statusChangeForm = () => {
    setStatus((prevStatus) => !prevStatus)
    setProfileForm((prev) => ({ ...prev, status: !prev.status }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const zResult = pfSchema.safeParse(profileForm)
    console.log(JSON.stringify(zResult, null, 4))

    if (!zResult.success) {
      const newErrors = {
        pname: '',
        avatar: previewAvatar,
        sex: '',
        mobile: '',
        intro: '',
        item: '',
        goal: '',
        status: status,
      }

      const errMap = new Map()

      zResult.error?.issues.forEach((item) => {
        const pathKey = item.path[0]
        if (!errMap.has(pathKey)) {
          errMap.set(pathKey, item.message)
          newErrors[pathKey] = item.message
        }
      })
      setErrors(newErrors)
      console.log(newErrors);
      return
    }

    if (profileForm.intro.length<=0) {
      alert("未填自我簡介，將影響您使用平台內部分功能，確定暫不填寫嗎?")
    }
    const r = await fetch(REGISTER_PROFILE_POST, {
      method: 'POST',
      body: JSON.stringify(profileForm),
      headers: {
        'Content-Type': 'application/json',
        // ...getAuthHeader(),
      },
    })

    const result = await r.json()
    if (result.success) {
      alert('個人檔案填寫完成')
    } else {
      console.warn(result)
    }
  }
  return (
    <>
      <div className={addProfileCss.container}>
        {/* {auth.id?():()} */}
        <div className={addProfileCss.form}>
          <form method="POST" onSubmit={onSubmit}>
            <h2>填寫個人檔案</h2>
            <div
              className={`${addProfileCss.formGroup} ${addProfileCss.avatarGroup}`}
            >
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={avatarChangeForm}
                hidden
              />
              <label htmlFor="avatar" className={addProfileCss.avatar}>
                <img src={previewAvatar} alt="頭貼預覽" />
              </label>
              <label htmlFor="avatar">上傳大頭貼</label>
            </div>
            <div className={addProfileCss.formGroup}>
              <label htmlFor="name">姓名</label>
              <input
                type="text"
                name="pname"
                id="name"
                value={profileForm.pname}
                onChange={profileChangeForm}
                placeholder="此欄為必填"
              />
              <div>
                {errors.pname && (
                  <span className={addProfileCss.textDanger}>
                    {errors.pname}
                  </span>
                )}
              </div>
            </div>
            <div className={addProfileCss.formGroup}>
              <label htmlFor="sex">性別</label>
              <div className={addProfileCss.radios}>
                <div className={addProfileCss.radioItem}>
                  <input
                    type="radio"
                    name="sex"
                    id="male"
                    value="male"
                    checked={profileForm.sex === 'male'}
                    onChange={profileChangeForm}
                  />
                  <label htmlFor="male">男性</label>
                </div>
                <div className={addProfileCss.radioItem}>
                  <input
                    type="radio"
                    name="sex"
                    id="female"
                    value="female"
                    checked={profileForm.sex === 'female'}
                    onChange={profileChangeForm}
                  />
                  <label htmlFor="female">女性</label>
                </div>
              </div>
              <div>
                {errors.sex && (
                  <span className={addProfileCss.textDanger}>
                    {errors.sex}
                  </span>
                )}
              </div>
            </div>
            <div className={addProfileCss.formGroup}>
              <label htmlFor="mobile">手機</label>
              <input
                type="tel"
                name="mobile"
                id="mobile"
                value={profileForm.mobile}
                onChange={profileChangeForm}
              />
               <div>
                {errors.mobile && (
                  <span className={addProfileCss.textDanger}>
                    {errors.mobile}
                  </span>
                )}
              </div>
            </div>
            <div className={addProfileCss.formGroup}>
              <label htmlFor="intro">自我簡介</label>
              <input
                className={addProfileCss.intro}
                type="textarea"
                name="intro"
                id="intro"
                placeholder="我是一名瑜珈老師，最近正在增肌訓練，想找一個可以一起訓練的夥伴，並且希望能一起互相鼓勵進步。"
                value={profileForm.intro}
                onChange={profileChangeForm}
              />
              <div>
                {errors.intro && (
                  <span className={addProfileCss.textDanger}>
                    {errors.intro}
                  </span>
                )}
              </div>
            </div>
            <div className={addProfileCss.formGroup}>
              <label htmlFor="item">喜愛運動項目</label>
              <input
                className={addProfileCss.item}
                type="textarea"
                name="item"
                id="item"
                placeholder="跑步、抱石...，請填寫15字以內"
                value={profileForm.item}
                onChange={profileChangeForm}
              />
            </div>
            <div className={addProfileCss.formGroup}>
              <label>健身目標</label>
              <div className={addProfileCss.checkboxes}>
                {[
                  '增肌',
                  '減脂',
                  '提高耐力',
                  '增強體能',
                  '健康維持',
                  '提高核心能量',
                ].map((goal, index) => {
                  const goalId = `goal${index + 1}` // 產生 id: goal1, goal2, ...
                  return (
                    <div key={index} className={addProfileCss.current}>
                      <input
                        type="checkbox"
                        name="goal"
                        value={goal}
                        id={goalId}
                        checked={profileForm.goal.includes(goal)}
                        onChange={(e) => {
                          const newGoals = e.target.checked
                            ? [...profileForm.goal, goal]
                            : profileForm.goal.filter((item) => item !== goal)
                          setProfileForm({ ...profileForm, goal: newGoals })
                        }}
                      />
                      <label htmlFor={goalId}>{goal}</label>
                    </div>
                  )
                })}
              </div>
            </div>

            <div
              className={`${addProfileCss.formGroup} ${addProfileCss.status}`}
            >
              <label>是否公開檔案</label>
              <div className={addProfileCss.status}>
                <input
                  type="checkbox"
                  name="status"
                  id="public"
                  onChange={statusChangeForm}
                />
                <label htmlFor="public" className={addProfileCss.switch}>
                  <span className={addProfileCss.switchBtn}></span>
                </label>
                <span class="text">{status?"公開":"不公開"}</span>
              </div>
            </div>
            <div>
              <button className={addProfileCss.btn} type="submit">
                送出
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
