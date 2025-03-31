'use client'
import { useEffect, useState } from 'react'
import styles from './_styles/sort.module.css'
import ClassesIntro from '@/app/_components/classes-intro'
import { motion, AnimatePresence } from "framer-motion"




function Sort({ category, classTypes,  }) {
  const [showClasses, setShowClasses] = useState(false)
  const [sortType, setSortType] = useState('')

  useEffect(() => {
    // 當 category 改變時重置 sortType
    setSortType('查看課程')
    setShowClasses(false)
  }, [category]) 

  // 點擊頁面其他地方時關閉下拉選單
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.dropdown}`)) {
        setShowClasses(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
    document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  // 根據選擇的課程類型過濾要顯示的課程
  const sortedClasses = classTypes?.sort((a, b) => {
    if (a.type_name === sortType) return -1
    if (b.type_name === sortType) return 1
    return 0
  })

  



  return (
    <>
    <div className={styles.sortContainer}>
      <form className={styles.sortForm} >
        <div className={styles.dropdown}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setShowClasses(!showClasses)
            }}
          >
            {sortType || '查看課程'}
          </button>
          <div
            className={`${styles.dropdownContent} ${
              showClasses ? styles.show : ''
            }`}
          >
          {classTypes?.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setSortType(item.type_name)
                  setShowClasses(false)
                }}
              >
                {item.type_name}
              </button>
            ))}
            
          </div>
        </div>
      </form>
    </div>
    <AnimatePresence mode="wait">
        <motion.div
          key={sortType || category} // 當這些值改變時觸發動畫
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            {sortedClasses?.map((classType, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  ease: "easeOut"
                }}
              >
                <ClassesIntro
                  classType={classType}
                  variant={index % 2 === 0 ? 'type1' : 'type2'}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default Sort
