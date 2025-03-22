'use client'
import { useEffect, useState } from 'react';
import styles from './_styles/search.module.css';
import { useRouter, useSearchParams } from 'next/navigation';

function Search({ onSearch }) {
  const router = useRouter();
  const searchParams = useSearchParams()
  const [showLocation, setShowLocation] = useState(false);
  const [showBranch, setShowBranch] = useState(false);
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [branch, setBranch] = useState(searchParams.get('branch') || '');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.dropdown}`)) {
        setShowLocation(false);
        setShowBranch(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.replace(`/classes/list?location=${location}&branch=${branch}`, {
      scroll: false // 防止自動滾動到頂部
    });
  };

  return (
    <div className={styles.searchContainer}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <div className={styles.dropdown}>
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowLocation(!showLocation);
              setShowBranch(false);
            }}
          >
            {location || '地區'}
          </button>
          <div className={`${styles.dropdownContent} ${showLocation ? styles.show : ''}`}>
            <button 
              type="button"
              onClick={() => {
                setLocation('台北市');
                setShowLocation(false);
              }}
            >
              台北市
            </button>
            <button
              type="button" 
              onClick={() => {
                setLocation('新北市');
                setShowLocation(false);
              }}
            >
              新北市
            </button>
          </div>
        </div>

        <div className={styles.dropdown}>
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowBranch(!showBranch);
              setShowLocation(false);
            }}
          >
            {branch || '分店'}
          </button>
          <div className={`${styles.dropdownContent} ${showBranch ? styles.show : ''}`}>
            <button
              type="button"
              onClick={() => {
                setBranch('中華店');
                setShowBranch(false);
              }}
            >
              中華店
            </button>
            <button
              type="button"
              onClick={() => {
                setBranch('中山店');
                setShowBranch(false);
              }}
            >
              中山店
            </button>
          </div>
        </div>

        <button type="submit" className={styles.button}>搜尋</button>
      </form>
    </div>
  );
}

export default Search;