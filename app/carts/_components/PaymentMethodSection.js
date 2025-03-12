"use client";
import React, { useState } from "react";
import styles from "./_styles/PaymentMethodSection.module.css";

function PaymentMethodSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.sectionContainer}>
      <h3 className={styles.sectionTitle}>付款方式</h3>
      <div className={styles.sectionContent} />
      <button
        className={styles.expandButton}
        onClick={toggleExpanded}
        aria-expanded={isExpanded}
        aria-label={
          isExpanded ? "Collapse payment methods" : "Expand payment methods"
        }
      >
        <i className={styles.chevronIcon} />
      </button>
    </div>
  );
}

export default PaymentMethodSection;
