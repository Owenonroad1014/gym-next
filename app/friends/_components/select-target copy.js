'use client'

import React, { useState } from 'react'
import friendStyle from '../_styles/friends.module.css'
import { PiGenderMaleBold, PiGenderFemaleBold } from 'react-icons/pi'
import { useRouter } from 'next/navigation'
export default function SelectTarget() {
  const [selectedGoal, setSelectedGoal] = useState('')
  const router = useRouter()
  const handleGoalChange = (event) => {
    const goal = event.target.value
    setSelectedGoal(goal)

    if (goal) {
      router.push(`/friends?category=${goal}`)
    }
  }

  return (
    <>
      <div className={friendStyle.selectTarget}>
        <div className={friendStyle.gender}>
          <PiGenderMaleBold
            onClick={() => {
              router.push(`/friends?gender=男性`)
            }}
          />
          <PiGenderFemaleBold
            onClick={() => {
              router.push(`/friends?gender=女性`)
            }}
          />
        </div>

        <div className={friendStyle.dropdown}>
          {/* <label htmlFor="goals">選擇健身目標</label> */}
          <select id="goals" value={selectedGoal} onChange={handleGoalChange}>
            <option value="">選擇健身目標</option>
            <option value="增肌">增肌</option>
            <option value="減脂">減脂</option>
            <option value="提高耐力">提高耐力</option>
            <option value="增強體能">增強體能</option>
            <option value="健康維持">健康維持</option>
            <option value="提高核心能量">提高核心能量</option>
          </select>
        </div>
      </div>
    </>
  )
}
