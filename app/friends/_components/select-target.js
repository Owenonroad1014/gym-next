'use client'

import React, { useState } from 'react'
import friendStyle from '../_styles/friends.module.css'
import { PiGenderMaleBold, PiGenderFemaleBold } from 'react-icons/pi'

export default function SelectTarget() {
  const [selectedGoal, setSelectedGoal] = useState('')
  
  const handleGoalChange = (event) => {
    setSelectedGoal(event.target.value)
  }

  return (
    <>
      <div className={friendStyle.selectTarget}>
        <div className={friendStyle.gender}>
          <PiGenderMaleBold />
          <PiGenderFemaleBold />
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
