"use client";

import React, { useState, useEffect } from 'react';
import styles from './_styles/sort.module.css';
import { MdMenu, MdMenuOpen } from 'react-icons/md'
import { useRouter, useSearchParams } from 'next/navigation';

const Sort = ({ items = ['熱門商品','健身器材', '瑜珈輔具', '拳擊用品'] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [menuShow, setMenuShow] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const category = searchParams.get('category_name');
    if (category) {
      const index = items.findIndex(item => item === category);
      setActiveIndex(index >= 0 ? index : null);
    } else {
      setActiveIndex(null);
    }
  }, [searchParams]);

  const handleClick = (index) => {
    setActiveIndex(index);
    const selectedCategory = items[index];
    router.push(`?category_name=${selectedCategory}`, { scroll: false });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 960) {
        setMenuShow(false)
      } else {
        setMenuShow(true)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <button
        onClick={() => setMenuShow(!menuShow)}
        className={styles.selectBtn}
      >
        {menuShow ? <MdMenuOpen /> : <MdMenu />}
      </button>
      <div className={styles.container}
        style={{
          display: menuShow ? 'block' : 'none',
        }}
      >
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
    </>
  );
};

export default Sort;