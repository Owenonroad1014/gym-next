'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useAuth } from '@/context/auth-context'
import { edSchema } from '@/utils/schema/schema.js'
import editCss from './_style/person.module.css'
import memberCss from '../_styles/member.module.css'
import { PROFILE_GET, PROFILE_PUT, AVATAR_PATH } from '@/config/api-path'

export default function ProfileTable() {
  const pathname = usePathname()
  const { auth, getAuthHeader } = useAuth()
  const [previewAvatar, setPreviewAvatar] = useState() // 預設頭貼
  const [status, setStatus] = useState()
  const [profileData, setProfileData] = useState({
    name: '',
    avatar: '',
    sex: '',
    mobile: '',
    intro: '',
    item: '',
    goal: [],
    status: '',
  })

  // 表單資料
  const editChangeForm = (e) => {
    const { name, value } = e.target
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  const avatarChangeForm = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileData({ ...profileData, avatar: file })
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewAvatar(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }
  const statusChangeForm = () => {
    setStatus((prevStatus) => !prevStatus)
    setProfileData((prev) => ({ ...prev, status: !prev.status }))
  }
  const [errors, setErrors] = useState({})

  const [isEditable, setIsEditable] = useState({
    name: false,
    avatar: true,
    sex: false,
    mobile: false,
    intro: true,
    item: true,
    goal: true,
    status: true,
  })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(PROFILE_GET, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader(),
          },
        })
        const data = await res.json()

        if (data.success) {
          const profile = data.data

          // 如果 goal 是字串，則將其拆分為陣列
          const goals =
            typeof profile.goal === 'string'
              ? profile.goal.split(/[\s、,]+/)
              : profile.goal
          const status = Boolean(profile.status)
          setProfileData({
            ...profile,
            goal: goals, // 確保 goal 是陣列
            status: status,
          })
        } else {
          console.error('Profile fetch failed:', data.message)
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
      }
    }
    fetchProfile()
  }, [getAuthHeader])
  console.log('data.data:', profileData)

  if (!profileData) {
    return <p>Loading...</p> // 或者顯示 loading 畫面
  }

  const MySwal = withReactContent(Swal)
  const showError = (message) => {
    return new Promise((res) => {
      document.body.style.overflow = 'hidden' //畫面不要偏移使用
      MySwal.fire({
        text: message,
        icon: 'error',
        confirmButtonColor: '#0b3760',
        confirmButtonText: '確定',
        didClose: () => {
          //畫面不要偏移使用
          document.body.style.overflow = '' // 恢復頁面滾動
        },
      }).then((result) => {
        if (result.isConfirmed) {
          res()
        }
      })
    })
  }
  const successModal = (message) => {
    document.body.style.overflow = 'hidden' //畫面不要偏移使用
    MySwal.fire({
      text: message,
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
      didClose: () => {
        //畫面不要偏移使用
        document.body.style.overflow = '' // 恢復頁面滾動
      },
    })
  }

  const confirmIntro = () => {
    return new Promise((resolve) => {
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
        }
      })
    })
  }
  const confirmStatus = () => {
    return new Promise((resolve) => {
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
        }
      })
    })
  }
  const sendFormData = async () => {
    const formData = new FormData()

    // 只傳送必要的欄位
    const { avatar, intro, item, goal, status } = profileData

    if (profileData.avatar && profileData.avatar instanceof File) {
      formData.append('avatar', profileData.avatar)
    }
    // 處理資料格式
    formData.append('intro', intro || '')
    formData.append('status', Boolean(status))

    // 確保item是陣列
    if (Array.isArray(item)) {
      item.forEach((val) => formData.append('item[]', val))
    } else if (typeof item === 'string') {
      item
        .split(/[\s、,]+/)
        .filter((s) => s.length > 0)
        .forEach((val) => formData.append('item[]', val))
    }

    // 確保goal是陣列
    if (Array.isArray(goal)) {
      goal.forEach((val) => formData.append('goal[]', val))
    } else if (typeof goal === 'string') {
      goal
        .split(/[\s、,]+/)
        .filter((s) => s.length > 0)
        .forEach((val) => formData.append('goal[]', val))
    }

    // 檢查FormData內容
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value)
    }
    console.log('appendFormData:', ...formData)

    try {
      const r = await fetch(`${PROFILE_PUT}?folder=avatar`, {
        method: 'PUT',
        body: formData,
        headers: {
          ...getAuthHeader(),
        },
      })

      const result = await r.json()

      // 確保伺服器回應成功
      if (result.success) {
        successModal('個人檔案已建立')
      } else {
        // 顯示伺服器返回的錯誤訊息
        showError(`個人檔案建立失敗: ${result.message || '未知錯誤'}`)
        console.warn('Error details:', result) // 在控制台顯示更多錯誤細節
      }
    } catch (error) {
      // 捕捉網路或請求錯誤
      showError(`請求發生錯誤: ${error.message || '未知錯誤'}`)
      console.error('Network or request error:', error)
    }
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    setErrors({})

    let formData = { ...profileData }

    if (typeof profileData.item === 'string' && formData.item.length > 0) {
      formData.item = formData.item
        .split(/[\s、,]+/)
        .filter((s) => s.length > 0)
    } else if (!Array.isArray(formData.item)) {
      // Make sure item is an array even if it's null/undefined
      formData.item = []
    }
    const zResult = edSchema.safeParse(formData)
    console.log(JSON.stringify(zResult, null, 4))

    if (!zResult.success) {
      console.log("zResult's formData:", profileData)
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
      if (profileData.status === false) {
        await confirmStatus()
      } else {
        await sendFormData()
        return
      }
      if (profileData.intro.length <= 0) {
        await confirmIntro()
      }

      await sendFormData()
    } catch (ex) {
      console.log('取消送出，返回表單')
    }
  }
  return (
    <>
      {auth.id ? (
        <div className={editCss.personContainer}>
          <h2>個人資料</h2>
          <div className={editCss.form}>
            <form action="post" onSubmit={(e) => onSubmit(e)}>
              <table>
                <tbody>
                  <div className={editCss.left}>
                    <tr>
                      <td>
                        <div
                          className={`${editCss.formGroup} ${editCss.avatarGroup}`}
                        >
                          <input
                            type="file"
                            name="avatar"
                            id="avatar"
                            onChange={avatarChangeForm}
                            hidden
                          />
                          <label htmlFor="avatar" className={editCss.avatar}>
                            <img
                              src={
                                previewAvatar // 如果有預覽頭貼（使用者剛上傳）
                                  ? previewAvatar
                                  : auth.google_uid
                                  ? profileData?.avatar ||
                                    '/imgs/avatar/default-avatar.png' // 確保 profileData.avatar 存在
                                  : profileData?.avatar
                                  ? `${AVATAR_PATH}/${profileData.avatar}`
                                  : '/imgs/avatar/default-avatar.png' // 預設圖片
                              }
                              alt="頭貼預覽"
                            />
                          </label>
                          <label htmlFor="avatar">上傳大頭貼</label>
                          <div>
                            {errors.avatar && (
                              <span className={editCss.textDanger}>
                                {errors.avatar}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </div>
                  <div className={editCss.right}>
                    <div className={editCss.disable}>
                      <tr>
                        <th>名稱</th>
                        <td>{profileData?.name}</td>
                      </tr>
                      <tr>
                        <th>性別</th>
                        <td>
                          {profileData.sex == 'male'
                            ? '男性'
                            : '女性' || '未設定'}
                        </td>
                      </tr>
                      <tr>
                        <th>手機號碼</th>
                        <td>{profileData.mobile||'未填寫'}</td>
                      </tr>
                    </div>
                    <tr>
                      {isEditable.intro ? (
                        <td>
                          <div className={editCss.formGroup}>
                            <label className={editCss.titleLabel} htmlFor="intro">個人簡介</label>
                            <textarea
                              className={editCss.intro}
                              name="intro"
                              id="intro"
                              rows="5"
                              maxLength={300}
                              placeholder="我是一名瑜珈老師，最近正在增미訓練，想找一個可以一起訓練的夥伴，並且希望能一起互相鼓勵進步。(至少30個字元，最多300個字元)"
                              value={profileData.intro}
                              onChange={editChangeForm}
                            />
                            <div>
                              {errors.intro && (
                                <span className={editCss.textDanger}>
                                  {errors.intro}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                      ) : (
                        <>
                          <th>個人簡介</th>
                          <td>{profileData.intro || '未設定'}</td>
                        </>
                      )}
                    </tr>
                    <tr>
                      {isEditable.item ? (
                        <td>
                          <div className={editCss.formGroup}>
                            <label className={editCss.titleLabel}  htmlFor="item">喜愛運動項目</label>
                            <input
                              className={editCss.item}
                              type="text"
                              name="item"
                              id="item"
                              placeholder="跑步、抱石...，最多填寫五個項目"
                              value={profileData.item}
                              onChange={editChangeForm}
                            />
                            <div>
                              {errors.item && (
                                <span className={editCss.textDanger}>
                                  {errors.item}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                      ) : (
                        <>
                          <th>喜愛運動項目</th>
                          <td>{profileData.item || '未設定'}</td>
                        </>
                      )}
                    </tr>
                    <tr>
                      {isEditable.goal ? (
                        <td>
                          <div className={editCss.formGroup}>
                            <label className={editCss.titleLabel} >健身目標</label>
                            <div className={editCss.checkboxes}>
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
                                  <div key={index} className={editCss.current}>
                                    <input
                                      type="checkbox"
                                      name="goal"
                                      value={goal}
                                      id={goalId}
                                      checked={profileData.goal.includes(goal)}
                                      onChange={(e) => {
                                        const newGoals = e.target.checked
                                          ? [...profileData.goal, goal]
                                          : profileData.goal.filter(
                                              (item) => item !== goal
                                            )
                                        setProfileData({
                                          ...profileData,
                                          goal: newGoals,
                                        })
                                      }}
                                    />
                                    <label htmlFor={goalId}>{goal}</label>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </td>
                      ) : (
                        <>
                          <th>健身目標</th>
                          <td>{profileData.goal || '暫無目標'}</td>
                        </>
                      )}
                    </tr>
                    <tr>
                      {isEditable.status ? (
                        <td>
                          <div className={editCss.status}>
                            <label className={editCss.titleLabel} >是否公開檔案</label>
                            <input
                              type="checkbox"
                              name="status"
                              id="public"
                              checked={profileData.status}
                              onChange={statusChangeForm}
                            />
                            <label htmlFor="public" className={editCss.switch}>
                              <span className={editCss.switchBtn}></span>
                            </label>
                            <span>{status ? '公開' : '不公開'}</span>
                          </div>
                        </td>
                      ) : (
                        <>
                          <th>是否公開檔案</th>
                          <td>
                            {profileData.status === true
                              ? '公開檔案'
                              : '不公開檔案'||'不公開'}
                          </td>
                        </>
                      )}
                    </tr>
                  </div>
                </tbody>
              </table>
              <div>
                <button className={editCss.btn} type="submit">
                 編輯檔案
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div className={memberCss.memberNoAdmin}>
            <div className={memberCss.memberSpan}>
              <h1>您好，請先登入</h1>
              <span>若您尚未成為會員，請先註冊</span>
            </div>
            <div className={memberCss.memberBtns}>
              <Link
                className={memberCss.memberBtn}
                href={`/member/login?callbackUrl=${encodeURIComponent(
                  pathname
                )}`}
              >
                會員登入
              </Link>
              <Link
                className={`${memberCss.memberBtn} ${memberCss.memberBtnRegister}`}
                href="/member/register"
              >
                註冊會員
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  )
}
