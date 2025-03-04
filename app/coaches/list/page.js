'use client'

import React, { useState, useEffect } from 'react'
import CoachesCard from '../_components/coaches-card'
import Sort from '../_components/sort'

export default function CoachesListPage(props) {
  const sortItems = ['home', '教練列表', '教練資訊']
  return (
    <>
      {/* <div>
        <Sort items={sortItems} />
      </div>
      <div className={styles.coachesContainer}>
        <CoachesCard
          avatarUrl="https://avatar.iran.liara.run/public/boy?username=Scott"
          skill="瑜伽"
          name="王小明"
          email="123@gmail.com"
          phone ="0900111222"
          description = "專業瑜珈教練, 擁有10年教學經驗..."
          detailsUrl = "#"
          />
          <CoachesCard
          avatarUrl="https://avatar.iran.liara.run/public/boy?username=Scott"
          skill="瑜伽"
          name="王小明"
          email="123@gmail.com"
          phone ="0900111222"
          description = "專業瑜珈教練, 擁有10年教學經驗..."
          detailsUrl = "#"
          />
          <CoachesCard
          avatarUrl="https://avatar.iran.liara.run/public/boy?username=Scott"
          skill="瑜伽"
          name="王小明"
          email="123@gmail.com"
          phone ="0900111222"
          description = "專業瑜珈教練, 擁有10年教學經驗..."
          detailsUrl = "#"
          />
          <CoachesCard
          avatarUrl="https://avatar.iran.liara.run/public/boy?username=Scott"
          skill="瑜伽"
          name="王小明"
          email="123@gmail.com"
          phone ="0900111222"
          description = "專業瑜珈教練, 擁有10年教學經驗..."
          detailsUrl = "#"
          />
          <CoachesCard
          avatarUrl="https://avatar.iran.liara.run/public/boy?username=Scott"
          skill="瑜伽"
          name="王小明"
          email="123@gmail.com"
          phone ="0900111222"
          description = "專業瑜珈教練, 擁有10年教學經驗..."
          detailsUrl = "#"
          />
          <CoachesCard
          avatarUrl="https://avatar.iran.liara.run/public/boy?username=Scott"
          skill="瑜伽"
          name="王小明"
          email="123@gmail.com"
          phone ="0900111222"
          description = "專業瑜珈教練, 擁有10年教學經驗..."
          detailsUrl = "#"
          />
      </div> */}
    </>
  )
}
