import React, { useState } from 'react';
import styles from './_styles/sort.module.css';

const Sort = ({ items = ['熱門商品','健身器材', '瑜珈輔具', '拳擊用品'] }) => {
  const [activeIndex, setActiveIndex] = useState("");

  const handleClick = (index) => {
    setActiveIndex(index);
  };

return (
    <div className={styles.container}>
    <div className={styles.sortTitle}>商品分類</div>
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
