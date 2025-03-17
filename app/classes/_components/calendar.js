// CourseCalendar.js
import styles from './_styles/calendar.module.css'
import { useState } from 'react'
import moment from 'moment-timezone'
import ReservationModal from './reservation-modal'
import moment from 'moment-timezone'

export default function CourseCalendar({
  currentDate = new Date(),
  classes = [],
  location = '',
  branch = '',
}) {
  const [selectedClass, setSelectedClass] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(currentDate)
  const today = moment().tz('Asia/Taipei').startOf('day')

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

    if (!isPastWeek()) {
      setSelectedDate(prev)
    }
  }

  // 根據日期過濾課程
  const getCoursesByDay = (day) => {
    return courses.filter(
      (course) =>
        course.date.getDate() === day.getDate() &&
        course.date.getMonth()  === day.getMonth() &&
        course.date.getFullYear() === day.getFullYear()
    )
  }

  const isPastWeek = () => {
    const today = moment().tz('Asia/Taipei').endOf('day');
    
    const selectedWeekStart = moment(selectedDate)
      .tz('Asia/Taipei')
      .startOf('week')
      .endOf('day');
      
    
    return selectedWeekStart.isSameOrBefore(today);
  }
  
  
  
  
  
const handlePrevWeek = () => {
  const prev = new Date(selectedDate);
  prev.setDate(selectedDate.getDate() - 7);
 
  if (!isPastWeek()) {
    setSelectedDate(prev);
  }
}

  
  
  
  
  

  return (
    <>
      <div className={styles.container}>
        <h2>{`${location}${branch}課程表`}</h2>
        <div className={styles.header}>
          <button
            onClick={handlePrevWeek}
            className={styles.nextWeek}
            disabled={isPastWeek(selectedDate)}
          
          disabled={isPastWeek(selectedDate)}>
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
            {weekDays.map((day) => {
              // 將每個日期轉換為當地時區的開始時間
              const localDay = moment(day).tz('Asia/Taipei').startOf('day') // 當地時間的開始 (00:00)

              return (
                <div
                  key={day.getTime()}
                  className={`${styles.day} ${
                    localDay.isSame(today, 'day') ? styles.today : ''
                  }`} // 比較日期
                >
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
              )
            })}
          </div>

          {/* 再渲染所有課程 */}
          <div className={styles.eventsWrapper}>
            {weekDays.map((day) => {
              const dayCourses = getCoursesByDay(day)
              return (
                <div
                  key={`events-${day.getTime()}`}
                  className={`${styles.eventsContainer} ${
                    dayCourses?.length > 0 ? styles.hasEvent : ''
                  }`}
                >
                  {dayCourses.length > 0 ? (
                    dayCourses.map((course) => (
                      <div
                        key={course.id}
                        className={`${styles.event} ${
                          course.current_capacity >= course.max_capacity
                            ? styles.full
                            : ''
                        }`}
                        role="button"
                        tabIndex={
                          course.current_capacity >= course.max_capacity
                            ? -1
                            : 0
                        }
                        onClick={() =>
                          course.current_capacity >= course.max_capacity
                            ? null
                            : handleCardClick(course)
                        }
                        onKeyPress={(e) => {
                          if (course.current_capacity >= course.max_capacity)
                            return
                          if (e.key === 'Enter' || e.key === ' ') {
                            handleCardClick(course)
                          }
                        }}
                      >
                        {course.title}
                        <div className={styles.time}>{course.time}</div>
                        <div className={styles.name}>{course.coach_name}</div>
                        <div className={styles.capacity}>
                          {course.current_capacity >= course.max_capacity ? (
                            <span className={styles.full}>已額滿</span>
                          ) : (
                            <span className={styles.available}>
                              人數 :
                              {course.max_capacity - course.current_capacity} / {course.max_capacity}
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={styles.noEvent}>本日尚無課程</div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        classData={selectedClass}
        onSubmit={handleReservationSubmit}
      />
    </>
  )
}
