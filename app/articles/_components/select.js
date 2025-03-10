'use client'
import React, { useState } from 'react'
import articlecss from '../styles/articles.module.css'

export default function Select() {
  const [fitness, setFitness] = useState('');
  const [diet, setDiet] = useState('');
  const [gymBuddy, setGymBuddy] = useState('');

  return (
    <>
      <section className={articlecss.selectArea}>
        <div className={articlecss.selectPart}>
          <div className={articlecss.selectTitle}>健身</div>
          <select
            value={fitness}
            onChange={(e) => setFitness(e.target.value)}
          >
            <option value="">選擇健身類型</option>
            <option value="重量訓練">重量訓練</option>
            <option value="徒手訓練">徒手訓練</option>
            <option value="柔軟度訓練">柔軟度訓練</option>
            <option value="有氧運動">有氧運動</option>
            <option value="伸展運動">伸展運動</option>
            <option value="健康維持">健康維持</option>
          </select>
        </div>

        <div className={articlecss.selectPart}>
          <div className={articlecss.selectTitle}>飲食</div>
          <select
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
          >
            <option value="">選擇飲食類型</option>
            <option value="素食專區">素食專區</option>
            <option value="飲食營養">飲食營養</option>
          </select>
        </div>

        <div className={articlecss.selectPart}>
          <div className={articlecss.selectTitle}>GYM友怎麼做</div>
          <select
            value={gymBuddy}
            onChange={(e) => setGymBuddy(e.target.value)}
          >
            <option value="">選擇 GYM 友類型</option>
            <option value="名人專訪">名人專訪</option>
            <option value="資深GYM友">資深GYM友</option>
          </select>
        </div>
      </section>
    </>
  )
}
