'use client'
import React, { useState } from 'react'
import { useCart } from "@/context/cart-context";
import styles from './_styles/pickup-store-section.module.css'

function PickupStoreSection() {
  const { pickupMethod, updatePickupMethod } = useCart(); 
  const [isExpanded, setIsExpanded] = useState(false)

  const storeOptions = ['台南中西店', '台南中華店', '台南永康店']

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const handleStoreChange = (event) => {
    updatePickupMethod(event.target.value)
  }

  return (
    <div className={styles.sectionContainer}>
      <h3 className={styles.sectionTitle}>取貨門市</h3>

      {/* 選擇門市 */}
      <div className={styles.dropdownContainer}>
        <select
          className={styles.storeDropdown}
          value={pickupMethod}
          onChange={handleStoreChange}
        >
          <option value="">請選擇門市</option>
          {storeOptions.map((store, index) => (
            <option key={index} value={store}>
              {store}
            </option>
          ))}
        </select>
      </div>

      {/* 展開/收起按鈕 */}
      <button
        className={styles.expandButton}
        onClick={toggleExpanded}
        aria-expanded={isExpanded}
      >
        
      </button>
    </div>
  )
}

export default PickupStoreSection
