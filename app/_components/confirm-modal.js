'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './_styles/confirm-modal.module.css'


const ConfirmationModal = ({ isOpen, onClose, location }) => {
  const router = useRouter()

  const handleConfirm = (e) => {
    e.stopPropagation() // 阻止事件冒泡
    router.push(
      `/classes/list?location=${encodeURIComponent(
        location.location
      )}&branch=${encodeURIComponent(location.branch)}`
    )
  }

  if (!isOpen) return null

  return (
    
  <div
    className={styles.overlay}
    role="button"
    tabIndex={0}
    onClick={onClose}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onClose();
      }
    }}
  >
      <div
        className={styles.modal}
      >
        <h2 className={styles.title}>前往課表查詢</h2>
        <p className={styles.message}>
          您即將前往 {location.location}
          {location.branch} 的課表查詢頁面
        </p>
        <div className={styles.buttonGroup}>
          <button className={styles.confirmButton} onClick={handleConfirm}>
            確認前往
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            取消
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
