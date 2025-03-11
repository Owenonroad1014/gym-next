"use client";
import React, { useState } from "react";
import styles from "./_styles/PickupStoreSection.module.css";

function PickupStoreSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.sectionContainer}>
      <h3 className={styles.sectionTitle}>取貨門市</h3>
      <div className={styles.sectionContent} />
      <button
        className={styles.expandButton}
        onClick={toggleExpanded}
        aria-expanded={isExpanded}
        aria-label={
          isExpanded ? "Collapse store options" : "Expand store options"
        }
      >
        <i className={styles.chevronIcon} />
      </button>
    </div>
  );
}

export default PickupStoreSection;
