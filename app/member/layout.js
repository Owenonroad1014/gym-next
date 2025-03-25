'use client'

import React, { useState, useEffect } from 'react'
import Breadcrumb from './_component/breadcrumb'
 import Select from './_component/select'
import { useAuth } from '@/context/auth-context'

export default function MemberLayout({children}) {
    const breadcrumb = ['首頁', '會員中心']
  return (
    <>
    <Breadcrumb breadcrumb={breadcrumb}/>
    <Select/>
      {children}
    </>
  )
}
