'use client'
import React, { useState } from 'react'
import styles from './_styles/modal.module.css'
import { ShareSocial } from 'react-share-social'
export default function ShareModal({ isOpen, onClose }) {
  if (!isOpen) return null
  const url = window.location.href
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
        </div>
          <ShareSocial
            url={url}
            socialTypes={['facebook', 'twitter', 'reddit', 'linkedin']}
            title={'連結分享'} 
          />
        </div>
      </div>
    </div>
  )
}
