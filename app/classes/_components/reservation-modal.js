// components/reservation-modal.js
'use client'
import React from 'react'
import styles from './_styles/reservation-modal.module.css'
import moment from 'moment-timezone'

export default function ReservationModal({ 
  isOpen, 
  onClose, 
  classData,
  onSubmit 
}) {
  if (!isOpen) return null

  const formattedDate = classData ? moment(classData.date).tz('Asia/Taipei').format("YYYY年MM月DD日") : '';

  const handleSubmit = async (e) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>課程預約</h2>
          <button onClick={onClose} className={styles.closeButton}>✕</button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.classInfo}>
            <h3>{classData.title}</h3>
            <p>上課時間：{formattedDate} {classData.time}</p>
            <p>教練：{classData.coach_name}</p>
            <p>地點：{classData.location} {classData.branch}</p>
            <p>報名人數：{classData.current_capacity} / {classData.max_capacity}</p>
          </div>

          <div className={styles.reservationForm}>
            <form onSubmit={handleSubmit}>
              <div className={styles.confirmMessage}>
                確認要預約此課程嗎？
              </div>
              <div className={styles.buttonGroup}>
              <button type="submit" className={styles.submitButton}>
                  確認預約
                </button>
                <button type="button" onClick={onClose} className={styles.cancelButton}>
                  取消
                </button>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
