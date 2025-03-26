'use client'
import { useEffect, useState } from 'react'
import styles from './_styles/sort.module.css'
import ClassesIntro from '@/app/_components/classes-intro'

function Sort({ category, classTypes }) {
  const [showClasses, setShowClasses] = useState(false)
  const [sortType, setSortType] = useState('')
  
  

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
    <div>
        {sortedClasses?.map((classType, index) => (
          <ClassesIntro 
            key={index}
            classType={classType}
            variant={index % 2 === 0 ? 'type1' : 'type2'}
          />
        ))}
      </div>
    </>
  )
}

export default Sort
