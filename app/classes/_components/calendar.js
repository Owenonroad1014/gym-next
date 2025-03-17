// CourseCalendar.js
import styles from './_styles/calendar.module.css'
import { useState } from 'react'

export default function CourseCalendar({
  currentDate = new Date(),
  courses = [],
}) {
  const [selectedDate, setSelectedDate] = useState(currentDate)
  
  // 計算週期範圍
  const getWeekRange = (date) => {
    const start = new Date(date)
    start.setDate(date.getDate() - date.getDay())
    const end = new Date(start)
    end.setDate(start.getDate() + 6)
    return { start, end }
  }
  
  // 生成週曆天數陣列
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(selectedDate)
    day.setDate(selectedDate.getDate() - selectedDate.getDay() + i)
    return day
  })
  
  // 處理週期切換
  const handleNextWeek = () => {
    const next = new Date(selectedDate)
    next.setDate(selectedDate.getDate() + 7)
    setSelectedDate(next)
  }
  
  const handlePrevWeek = () => {
    const prev = new Date(selectedDate)
    prev.setDate(selectedDate.getDate() - 7)
    setSelectedDate(prev)
  }
  
  // 根據日期過濾課程
  const getCoursesByDay = (day) => {
    return courses.filter(
      (course) =>
        course.date.getDate() === day.getDate() &&
        course.date.getMonth() - 1 === day.getMonth() &&
        course.date.getFullYear() === day.getFullYear()
    )
  }

  return (
    <div className={styles.container}>
      <h2>課程表</h2>
      <div className={styles.header}>
        <button onClick={handlePrevWeek} className={styles.nextWeek}>
          ＜
        </button>
        <div className={styles.dateInfo}>
          {selectedDate.getFullYear()}年{selectedDate.getMonth() + 1}月第
          {Math.ceil(selectedDate.getDate() / 7)}週
        </div>
        <button onClick={handleNextWeek} className={styles.nextWeek}>
          ＞
        </button>
      </div>
      
      <div className={styles.calendar}>
        {/* 先渲染所有日期 */}
        <div className={styles.days}>
          {weekDays.map((day) => (
            <div key={day.getTime()} className={styles.day}>
              <div className={styles.dayNumber}>{day.getDate()}</div>
              <div className={styles.weekday}>
                {
                  [
                    '星期日',
                    '星期一',
                    '星期二',
                    '星期三',
                    '星期四',
                    '星期五',
                    '星期六',
                  ][day.getDay()]
                }
              </div>
            </div>
          ))}
        </div>
        
        {/* 再渲染所有課程 */}
        <div className={styles.eventsWrapper}>
          {weekDays.map((day) => {
            const dayCourses = getCoursesByDay(day);
            return (
              <div key={`events-${day.getTime()}`} className={`${styles.eventsContainer} ${dayCourses?.length > 0 ? styles.hasEvent : ''}`}>
                {dayCourses.length > 0 ? (
                  dayCourses.map((course) => (
                    <div key={course.id} className={styles.event}>
                      {course.title}
                      <div className={styles.time}>{course.time}</div>
                    </div>
                  ))
                ) : (
                  <div className={styles.noEvent}>本日尚無課程</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}