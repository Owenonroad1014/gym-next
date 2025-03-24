'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import styles from './_styles/coaches-calendar.module.css'
import { COACHES_CLASSES } from '@/config/api-path'
import moment from 'moment-timezone'
import ReservationModal from '../../classes/_components/reservation-modal'
import { CLASSES_CAPACITY_GET } from '@/config/api-path'
import { CLASSES_RESERVATION_POST } from '@/config/api-path'
import gsap from 'gsap'

const CoachCalendar = ({name="", isOpen}) => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [courses, setCourses] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState(null);
  const { id } = useParams()
  const calendarRef = useRef(null)

 const fetchCoachCourses = async () => {
      try {
      
        const response = await fetch(`${COACHES_CLASSES}/${id}/classes`)
        const data = await response.json()
        console.log('Fetched courses:', data.rows);
        setCourses(data.rows)
      } catch (error) {
        console.error('獲取課程資料失敗:', error)
      }
    }

  // 獲取教練課程資料
  useEffect(() => {
    const calendar = calendarRef.current
    if(!isOpen) return;
    fetchCoachCourses()
    if (isOpen) {
      gsap.fromTo(calendar,
        {
          opacity: 0,
          y: 100,
          height: 0,
          duration: 0
        },
        {
          opacity: 1,
          y: 0,
          height: 'auto',
          duration: 0.8,
          ease: 'power2.out',
          clearProps: 'all' // 確保動畫結束後清除樣式
        }
      );
      
    }
    if (isOpen && calendarRef.current) {
      // 加入偏移量，確保完整顯示
      const offset = 100; // 可依需求調整
      const elementPosition = calendarRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    
    
  }, [id, isOpen])
  

  if (!isOpen) return null;

  // 取得當月第一天和天數
  const firstDay = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  )
  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate()

  // 產生日曆格子陣列(包含空白日期)
  const calendarDays = [
    ...Array(firstDay.getDay()).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  // 處理上下個月
  const handlePrevMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1)
    )
  }

  const handleNextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1));
  };

  // 判斷上個月過了就不能按
  const isPastMonth = (date) => {
    const currentDate = new Date()
    return date.getFullYear() < currentDate.getFullYear() ||
      (date.getFullYear() === currentDate.getFullYear() &&
        date.getMonth() < currentDate.getMonth() + 1) 
  }
  


  // 根據日期過濾課程
  const getCoursesByDay = (day) => {
    const dayMoment = moment(day).tz('Asia/Taipei').startOf('day')
    return courses.filter((course) => {
      const courseMoment = moment(course.date || course.class_date)
        .tz('Asia/Taipei')
        .startOf('day')
      return dayMoment.isSame(courseMoment, 'day')
    })
  }

  

  // 處理卡片點擊
  const handleCardClick = (classData) => {
    if (!classData || !classData.class_date) {
      console.error('Error: classData or date is undefined')
      return
    }
    console.log('Clicked classData:', classData);
    
    const selectedClassData = {
      ...classData,
      date: classData.class_date,
      time: `${classData.start_time.slice(0, 5)} - ${classData.end_time.slice(0, 5)}`
    }
    
    console.log('處理後的 selectedClassData:', selectedClassData)
    setSelectedClass(selectedClassData)
    
    setIsModalOpen(true)
  }
  

  // 處理預約提交
    const handleReservationSubmit = async () => {
      try {
        
        const capacityRes = await fetch(`${CLASSES_CAPACITY_GET}/${selectedClass.id}`);
        const capacity = await capacityRes.json()
        if (capacity.current_capacity >= capacity.max_capacity) {
          throw new Error('課程已額滿')
        }
        
        // 提交預約
        const res = await fetch(`${CLASSES_RESERVATION_POST}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            member_id: 1,
            class_id: selectedClass.id,
            coach_id: selectedClass.coach_id,
            reservation_date: moment(selectedClass.date).format('YYYY-MM-DD'),
            reservation_time: selectedClass.start_time,
          }),
        })
        console.log('Submitting reservation for:', selectedClass)
  
        // 重複預約
        if(res.status === 400) {
          throw new Error('您已預約過此課程') 
        }
  
        if (!res.ok) {
          throw new Error('預約失敗')
        }
        
        setIsModalOpen(false)
        alert('預約成功')
        fetchCoachCourses();// 重新獲取課程資料以更新狀態
        // fetchCoachCourses();
  
      } catch (error) {
        console.error('Reservation failed:', error)
        alert(error.message)
      }
    }
  

  return (
    <>
    <div ref={calendarRef} style={{ overflow: 'hidden' }}>
    <div className={styles.container}>
    <h2 className={styles.containerH2}>{ name ? `${name}教練課程表` : '教練課程表'}</h2>
      <div className={styles.header}>
      
        <button
            onClick={handlePrevMonth}
            className={styles.nextWeek}
            disabled={isPastMonth(selectedDate)}
          >
            ＜
          </button>
        <div className={styles.dateInfo}>
          {selectedDate.getFullYear()}年{selectedDate.getMonth() + 1}月
        </div>
        <button
            onClick={handleNextMonth}
            className={styles.nextWeek}
            
          >
            ＞
          </button>

      </div>

      <div className={styles.calendar}>
        <div className={styles.weekdays}>
          {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
            <div key={day} className={styles.weekday}>
              {day}
            </div>
          ))}
        </div>

        <div className={styles.days}>
          {calendarDays.map((day, index) => (
            <div key={index} className={styles.day}>
              {day ? (
                <>
                  <span className={styles.dayNumber}>{day}</span>
                  <div className={styles.eventsWrapper}>
                    {getCoursesByDay(
                      new Date(
                        selectedDate.getFullYear(),
                        selectedDate.getMonth(),
                        day
                      )
                    ).map((course) => (
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
                        <div className={styles.title}>{course.title}</div>
                        <div className={styles.time}>
                          {course.start_time.slice(0, 5)} -{' '}
                          {course.end_time.slice(0, 5)}
                        </div>
                        <div className={styles.capacity}>
                          {course.current_capacity >= course.max_capacity ? (
                            <span className={styles.full}>已額滿</span>
                          ) : (
                            <span className={styles.available}>
                              人數:{' '}
                              {course.max_capacity - course.current_capacity} /{' '}
                              {course.max_capacity}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                    {getCoursesByDay(
                      new Date(
                        selectedDate.getFullYear(),
                        selectedDate.getMonth(),
                        day
                      )
                    ).length === 0 && (
                      <div className={styles.noEvent}></div>
                    )}
                  </div>
                </>
              ) : (
                <span className={styles.empty}></span>
              )}
            </div>
          ))}
        </div>
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

export default CoachCalendar
