'use client'

import React, { useState, useEffect } from 'react'
import styles from './_styles/filter.module.css'
import { TbTargetArrow } from 'react-icons/tb'
import { CLASSES_CATEGORY_GET } from '../../../config/api-path'
import Sort from './sort'

export default function Filter() {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('入門課程')
  const [classTypes, setClassTypes] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(CLASSES_CATEGORY_GET)
        const data = await response.json()
        setCategories(data)

         // 同時獲取預設類別的課程類型
      const typeResponse = await fetch(
        `${CLASSES_CATEGORY_GET}?category_name=入門課程`
      )
      const typeData = await typeResponse.json()
      setClassTypes(typeData)

      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchCategories()
  }, [])

  const handleCategorySelect = async (categoryName) => {
    setSelectedCategory(categoryName)
    try {
      const response = await fetch(
        `${CLASSES_CATEGORY_GET}?category_name=${categoryName}`
      )
      const data = await response.json()
      setClassTypes(data)
    } catch (error) {
      console.error('Error fetching class types:', error)
    }
  }

  return (
    <>
      <div className={styles.filter}>
        <ul>
          {categories
            // 先用 filter 過濾掉重複的類別
            .filter(
              (category, index, self) =>
                index ===
                self.findIndex(
                  (c) => c.category_name === category.category_name
                )
            )
            .map((category, index) => (
              <li key={index} className={styles.listItem}>
                <button
                  className={`${
                    selectedCategory === category.category_name
                      ? styles.active
                      : ''
                  }`}
                  onClick={() => handleCategorySelect(category.category_name)}
                >
                  {category.category_name}
                </button>
              </li>
            ))}
        </ul>
      </div>
      <h2>{selectedCategory || '所有課程'}</h2>
      <Sort category={selectedCategory} classTypes={classTypes} onCategoryChange={handleCategorySelect}/>
    </>
  )
}
