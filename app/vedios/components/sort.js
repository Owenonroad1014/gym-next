import React, { useState } from 'react';
import styles from './_styles/sort.module.css';

const Sort = ({ items = ['熱門影片','徒手訓練', '居家有氧', '器械訓練'] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

return (
    <div className={styles.container}>
    <div className={styles.sortTitle}>影片分類</div>
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
