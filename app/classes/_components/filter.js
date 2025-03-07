'use client'

import React, { useState, useEffect } from 'react'
import styles from './_styles/filter.module.css'
import { TbTargetArrow } from 'react-icons/tb'
export default function SelectTarget() {
  return (
    <>
      <div className={styles.filter}>
        <ul>
          <li className={styles.active}>靜態課程</li>
          <li>飛輪課程</li>
          <li>心肺耐力課程</li>
          <li>重訓課程</li>
          <li>舞蹈課程</li>
          <li>其他課程</li>
        </ul>
      </div>
    </>
  )
}
