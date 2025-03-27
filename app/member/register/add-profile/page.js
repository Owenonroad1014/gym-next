'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useRouter } from 'next/navigation'
import addProfileCss from '../../_styles/add-profile.module.css'
import { useAuth } from '@/context/auth-context'
import { pfSchema } from '@/utils/schema/schema'
import { REGISTER_PROFILE_POST } from '@/config/api-path'

export default function AddProfileJsPage() {
  const { auth, getAuthHeader } = useAuth()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const [status, setStatus] = useState(true)
  const router = useRouter()
  const [previewAvatar, setPreviewAvatar] = useState(
    '/imgs/avatar/default-avatar.png'
  ) // 預設頭貼
  const [profileForm, setProfileForm] = useState({
    pname: '',
    avatar: previewAvatar,
    sex: '',
    mobile: '',
    intro: '',
    item: [],
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
  const confirmIntro = () => {
    return new Promise((resolve, reject) => {
      document.body.style.overflow = 'hidden' //畫面不要偏移使用
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        text: '未填寫自我簡介將影響您使用GYM友功能，確定暫不填寫嗎?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0b3760',
        cancelButtonColor: '#f87808',
        confirmButtonText: '確定',
        cancelButtonText: '返回表單',
        didClose: () => {
          //畫面不要偏移使用
          document.body.style.overflow = '' // 恢復頁面滾動
        },
      }).then((result) => {
        if (result.isConfirmed) {
          resolve()
        } else {
          reject()
        }
      })
    })
  }
  const confirmStatus = () => {
    return new Promise((resolve, reject) => {
      document.body.style.overflow = 'hidden' //畫面不要偏移使用
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        text: '選擇不公開檔案將影響您使用GYM友功能，確定暫不公開嗎?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0b3760',
        cancelButtonColor: '#f87808',
        confirmButtonText: '確定',
        cancelButtonText: '返回表單',
        didClose: () => {
          //畫面不要偏移使用
          document.body.style.overflow = '' // 恢復頁面滾動
        },
      }).then((result) => {
        if (result.isConfirmed) {
          resolve()
        } else {
          reject()
        }
      })
    })
  }
  const sendFormData = async () => {
    const formData = new FormData()
    if (profileForm.avatar && profileForm.avatar instanceof File) {
      formData.append('avatar', profileForm.avatar)
    }
    Object.keys(profileForm).forEach((key) => {
      if (key === 'avatar') return
      if (key === 'goal' && Array.isArray(profileForm[key])) {
        profileForm[key].forEach((item) => formData.append(`${key}[]`, item))
      } else if (key === 'status') {
        formData.append(key, profileForm[key] === 'true')
      } else {
        formData.append(key, profileForm[key])
      }
    })
    console.log('appendFormData:', ...formData)
    const r = await fetch(`${REGISTER_PROFILE_POST}?folder=avatar`, {
      method: 'PUT',
      body: formData,
      headers: {
        ...getAuthHeader(),
      },
    })
    const result = await r.json()
    if (result.success) {
      alert('個人檔案已建立')
      // router.push('/')
      console.log('回傳結果', result)
      router.replace(callbackUrl)
    } else {
      alert('個人檔案建立失敗')
      console.warn(result)
    }
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    setErrors({})

    let formData = { ...profileForm }

    if (typeof profileForm.item === 'string' && formData.item.length > 0) {
      formData.item = formData.item
        .split(/[\s、,]+/)
        .filter((s) => s.length > 0)
    } else if (!Array.isArray(formData.item)) {
      // Make sure item is an array even if it's null/undefined
      formData.item = []
    }
    const zResult = pfSchema.safeParse(formData)
    console.log(JSON.stringify(zResult, null, 4))

    if (!zResult.success) {
      console.log("zResult's formData:", profileForm)
      const newErrors = {
        pname: '',
        avatar: '',
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

      if (newErrors.status && formData.intro == '') {
        newErrors.intro =
          '檔案狀態為公開時，自我簡介需為必填，且至少需要30個字元'
      }
      setErrors(newErrors)
      console.log(newErrors)
      return
    }

    try {
      if (profileForm.status === false) {
        await confirmStatus()
      } else {
        await sendFormData()
        return
      }
      if (profileForm.intro.length <= 0) {
        await confirmIntro()
      }

      await sendFormData()
    } catch (ex) {
      console.log('取消送出，返回表單')
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
              <div>
                {errors.avatar && (
                  <span className={addProfileCss.textDanger}>
                    {errors.avatar}
                  </span>
                )}
              </div>
            </div>
            <div className={addProfileCss.formGroup}>
              <label htmlFor="name">姓名</label>
              <input
                type="text"
                name="pname"
                id="name"
                value={profileForm.pname}
                onChange={profileChangeForm}
                placeholder="此欄為必填，請輸入完整姓名"
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
                  <span className={addProfileCss.textDanger}>{errors.sex}</span>
                )}
              </div>
            </div>
            <div className={addProfileCss.formGroup}>
              <label htmlFor="mobile">手機</label>
              <input
                type="tel"
                name="mobile"
                id="mobile"
                placeholder="此欄為必填，手機格式為09xxxxxx"
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
              <textarea
                className={addProfileCss.intro}
                name="intro"
                id="intro"
                rows="5"
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
                type="text"
                name="item"
                id="item"
                placeholder="跑步、抱石...，最多填寫五個項目"
                value={profileForm.item}
                onChange={profileChangeForm}
              />
              <div>
                {errors.item && (
                  <span className={addProfileCss.textDanger}>
                    {errors.item}
                  </span>
                )}
              </div>
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
              <div className={addProfileCss.status}>
                <label>是否公開檔案</label>
                <input
                  type="checkbox"
                  name="status"
                  id="public"
                  checked={status}
                  onChange={statusChangeForm}
                />
                <label htmlFor="public" className={addProfileCss.switch}>
                  <span className={addProfileCss.switchBtn}></span>
                </label>
                <span>{status ? '公開' : '不公開'}</span>
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
