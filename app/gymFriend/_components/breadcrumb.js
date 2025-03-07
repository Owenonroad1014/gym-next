'use client'

import React, { useState, useEffect } from 'react'
import gymfriendcss from '../_styles/gymfrenid.module.css'

export default function Breadcrumb() {
  return (
    <>
      <div className={gymfriendcss.breadcrumbContainer}>
        <nav className={gymfriendcss.breadcrumb}>
          <div className={gymfriendcss.breadcrumbItem}>
            <a href="#">首頁</a>
          </div>
          <div className={gymfriendcss.breadcrumbItem}>
            <a href="#">button</a>
          </div>
          <div className={gymfriendcss.breadcrumbItem}>
            <a href="#">健身教練</a>
          </div>
        </nav>
      </div>
    </>
  )
}
