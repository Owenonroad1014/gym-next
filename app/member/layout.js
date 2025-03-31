'use client'

import React from 'react'
// import { useSearchParams } from 'next/navigation'
// import Breadcrumb from './_component/breadcrumb'
// import memberCss from './_styles/member.module.css'
// import Select from './_component/select'


export default function MemberLayout({children}) {
  // const searchParams = useSearchParams()
  // const category = searchParams.get('category') || '' // 確保 category 存在
  // const breadcrumb = ['首頁', '會員中心', category].filter(Boolean) // 避免空值
  return (
    <>
    {children}
{/*    
    <div className={memberCss.memberContainer} >
    <Select/>
    <div className={memberCss.memberContent}>
    <Breadcrumb breadcrumb={breadcrumb}/>
      {children}
    </div>
    </div> */}
    </>
  )
}
