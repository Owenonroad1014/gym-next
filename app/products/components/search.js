// SearchForm.jsx
import React, { useState, useEffect, useRef } from 'react';
import styles from './_styles/search.module.css';
import { useRouter, useSearchParams } from "next/navigation";

const SearchForm = () => {

  const router = useRouter();
  const searchRef = useRef();
  

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`?keyword=${searchRef.current.value}`);
  };

  return (
    <div className={styles.searchContainer}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          ref={searchRef}
          type="search"
          aria-label="Search"
          className={styles.select}
          placeholder='輸入商品名稱'
        >
        </input>
        <button 
          type="submit" 
          className={styles.button}
        >
          搜尋
        </button>
      </form>
    </div>
  );
};

export default SearchForm;