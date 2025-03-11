"use client";
import React, { useState } from "react";
import styles from "./_styles/PickupStoreSection.module.css";

function PickupStoreSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedStore, setSelectedStore] = useState(""); // 儲存選擇的門市

  const storeOptions = ["台北信義店", "台中中港店", "高雄夢時代店"];

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleStoreChange = (event) => {
    setSelectedStore(event.target.value);
  };

  return (
    <div className={styles.sectionContainer}>
      <h3 className={styles.sectionTitle}>取貨門市</h3>

      {/* 選擇門市 */}
      <div className={styles.dropdownContainer}>
        <select
          className={styles.storeDropdown}
          value={selectedStore}
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
        <i className={styles.chevronIcon} />
      </button>
    </div>
  );
}

export default PickupStoreSection;
