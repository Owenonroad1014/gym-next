'use client'
import React, { useState } from 'react'
import styles from './_styles/modal.module.css'
import { ShareSocial } from 'react-share-social'
export default function ShareModal({ isOpen, onClose }) {
  if (!isOpen) return null
  const url = window.location.href
  const style = {
    
    copyContainer: {
      border: '1px solid #333',
      backgroundColor: '#f6f6f6',
      color: '#333',
    },
    title: {
      color: '#333',
      fontSize:'30px'
    },
    copyIcon:{
      color:"#333",
    },
    copyUrl:{
      color:"#333",

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
          <div className={styles.topsection}></div>
          <ShareSocial
            style={style}
            url={url}
            socialTypes={['facebook', 'twitter', 'line', 'email']}
            title={'文章連結分享'}
          />
        </div>
      </div>
    </div>
  )
}
