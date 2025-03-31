'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { MdOutlineArticle } from 'react-icons/md'
import { BsCalendar2Date, BsClockFill, BsPersonFill, BsGeoAltFill } from 'react-icons/bs'
import { useAuth } from '@/context/auth-context'
import styles from '../_styles/reservations.module.css'
import loaderStyle from '@/app/_components/_styles/loading.module.css'
import Swal from 'sweetalert2'

export default function ArticleList() {
  const { auth, getAuthHeader } = useAuth()
  const [error, setError] = useState('')
  const [isloading, setIsloading] = useState(true)
  const [reservationsData, setReservationsData] = useState([])
  const [filter, setFilter] = useState('all')

  // Toast 設定
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: false,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer
    toast.onmouseleave = Swal.resumeTimer
  },
})
const filterReservations = reservationsData.filter(reservation => {
  if (filter === 'all') return true;
  return reservation.status === 'confirmed';
})

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const headers = auth ? { ...getAuthHeader() } : {}
        const res = await fetch('http://localhost:3005/classes/api/reservations', {
          headers,
        })
        
        
        if (!res.ok) {
          throw new Error('Failed to fetch reservations')
        }
        
        const data = await res.json()
        console.log(data);
        
        setReservationsData(data.rows)
      } catch (err) {
        setError(err.message || 'Something went wrong')
      } finally {
        setIsloading(false)
      }
    }

    fetchReservations()
  }, [auth, getAuthHeader])

  const handleCancel = async (class_id) => {
    const selectedClass = reservationsData.find((v) => v.id === class_id)
    
    // 確認 Modal
    document.body.style.overflow = 'hidden' //畫面不要偏移使用
  const result = await Swal.fire({
    title: '確認取消預約？',
    text: '取消後將無法恢復',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#f87808',
    cancelButtonColor: '#ccc',
    confirmButtonText: '確認取消',
    cancelButtonText: '返回',
    didClose: () => {
      //畫面不要偏移使用
      document.body.style.overflow = '' // 恢復頁面滾動
    },
  })
  

  if (result.isConfirmed) {
    try {
      const res = await fetch('http://localhost:3005/classes/api/reservations', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify({
          class_id: selectedClass.class_id,
          status: 'cancelled',
        })
      })

      if (!res.ok) {
        throw new Error('取消預約失敗')
      }
      
      // 更新本地資料
      setReservationsData(prev => 
        prev.map(item => 
          item.id === class_id 
            ? {...item, status: 'cancelled'}
            : item
        )
      )

      // 顯示成功提示
      Toast.fire({
        icon: 'success',
        title: '已成功取消預約'
      })
    } catch (err) {
      // 顯示錯誤提示
      Toast.fire({
        icon: 'error',
        title: err.message || '取消預約失敗'
      })
    }
  }
}

  if (isloading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={loaderStyle.loader}></div>
      </div>
    )
  }

  if (reservationsData?.length === 0) {
    return (
      <div className={styles.noReservations}>
        <p>目前沒有預約紀錄</p>
        <Link href="/classes">
          <MdOutlineArticle style={{ fontSize: '30px' }} />
          &nbsp;&nbsp;前往找課程專區，開始運動吧!
        </Link>
      </div>
    )
  }
  if (filterReservations?.length === 0) {
    return (
      <>
      <div className={styles.filterButtons}>
      <button 
        onClick={() => setFilter('all')}
        className={filter === 'all' ? styles.active : ''}
      >
        全部預約
      </button>
      <button 
        onClick={() => setFilter('confirmed')}
        className={filter === 'confirmed' ? styles.active : ''}
      >
        目前預約
      </button>
    </div>
      <div className={styles.noReservations}>
        <p>目前沒有預約紀錄</p>
      </div>
      </>
    )
  }

  return (
    <>
    <div className={styles.filterButtons}>
  <button 
    onClick={() => setFilter('all')}
    className={filter === 'all' ? styles.active : ''}
  >
    全部預約
  </button>
  <button 
    onClick={() => setFilter('confirmed')}
    className={filter === 'confirmed' ? styles.active : ''}
  >
   目前預約
  </button>
</div>
      {filterReservations.map((v) => (
        <div 
          key={v.id}
          className={`${styles.favCard} ${v.status === 'cancelled' ? styles.cancelled : ''}`}
        >
          <div className={styles.cardBody}>
            <h3>{v.type_name}</h3>
            <div className={styles.cardDesc}>
              <p><BsCalendar2Date /> {new Date(v.class_date).toLocaleDateString()}</p>
              <p><BsClockFill /> {`${v.start_time.slice(0, 5)}-${v.end_time.slice(0, 5)}`}</p>
              <p><BsPersonFill /> {v.coach_name}</p>
              <p><BsGeoAltFill /> {`${v.location}${v.branch}`}</p>
            </div>
            <button 
              className={styles.cancelBtn} 
              disabled={v.status === 'cancelled'}
              onClick={() => handleCancel(v.class_id)}
            >
              {v.status === 'cancelled' ? '已取消' : '取消預約'}
            </button>
          </div>
        </div>
      ))}
    </>
  )
}
