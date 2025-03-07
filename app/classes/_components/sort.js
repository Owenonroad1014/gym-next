'use client'
import { useEffect, useState } from 'react';
import styles from './_styles/sort.module.css';

function Sort({ onSort }) {
  const [showClasses, setShowClasses] = useState(false);
  const [classes, setClasses] = useState('');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.dropdown}`)) {
        setShowClasses(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSort({ classes });
  };

  return (
    <div className={styles.sortContainer}>
      <form className={styles.sortForm} onSubmit={handleSubmit}>
        <div className={styles.dropdown}>
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowClasses(!showClasses);
            }}
          >
            {classes || '查看課程'}
          </button>
          <div className={`${styles.dropdownContent} ${showClasses ? styles.show : ''}`}>
            <button 
              type="button"
              onClick={() => {
                setClasses('課程名稱');
                setShowClasses(false);
              }}
            >
              課程名稱
            </button>
            <button
              type="button" 
              onClick={() => {
                setClasses('課程名稱');
                setShowClasses(false);
              }}
            >
              課程名稱
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Sort;