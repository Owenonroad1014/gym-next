'use client'

import React, { useState, useEffect } from 'react'
import Breadcrumb from './_component/breadcrumb'
import memberCss from './_styles/member.module.css'
import Select from './_component/select'
// import { useAuth } from '@/context/auth-context'

export default function MemberLayout({children}) {
    const breadcrumb = ['首頁', '會員中心']
  return (
    <>
    <Breadcrumb breadcrumb={breadcrumb}/>
    <div className={memberCss.memberContainer} >
    <Select/>
    <div className={memberCss.memberContent}>
      {children}
    </div>
    </div>
    </>
  )
}
