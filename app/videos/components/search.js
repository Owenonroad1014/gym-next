"use client"
import React, { useRef, useState } from 'react';
import styles from './_styles/search.module.css';
import { useRouter } from "next/navigation";
import { FaSearch, FaTimes } from 'react-icons/fa'

const SearchForm = ({searchParams}) => {
  const router = useRouter();
  const searchRef = useRef();
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const usp = new URLSearchParams(searchParams.toString());
    usp.set("keyword", searchRef.current.value);
    setSearchValue(searchRef.current.value);
    router.push(`/videos?${usp.toString()}`,{ shallow: true, scroll: false }); 
  };

  const handleClearSearch = () => {
    setSearchValue('');
    searchRef.current.value = '';
    const usp = new URLSearchParams(searchParams.toString());
    usp.delete("keyword");
    router.push(`/videos?${usp.toString()}`,{ shallow: true, scroll: false });
  };

  return (
    <div className={styles.searchContainer}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
      
      <div className={styles.searchItem}>
        <input
          ref={searchRef}
          type="search"
          aria-label="Search"
          className={styles.select}
          placeholder='輸入影片名稱'
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button 
          type="submit" 
          className={styles.button}
        >
          <FaSearch />
        </button>
      </div>
        {searchValue && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClearSearch}
          >
            清除搜尋
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchForm;
