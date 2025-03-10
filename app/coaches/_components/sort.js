'use client'
import React, { useState } from 'react';
import styles from './_styles/sort.module.css';

const Sort = ({ items = ['home', 'label', 'label'] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

return (
    <div className={styles.container}>
        {items.map((item, index) => (
            <div
                key={index}
                className={`${styles.btnHome} ${index === activeIndex ? styles.active : ''}`}
                onClick={() => handleClick(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        handleClick(index);
                    }
                }}
            >
                {item}
            </div>
        ))}
    </div>
);
};

export default Sort;
