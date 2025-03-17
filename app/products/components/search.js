// SearchForm.jsx
import React, { useRef } from 'react';
import styles from './_styles/search.module.css';
import { useRouter } from "next/navigation";

const SearchForm = ({searchParams}) => {
  const router = useRouter();
  const searchRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const usp = new URLSearchParams(searchParams.toString());
    usp.set("keyword", searchRef.current.value);
    router.push(`/products?${usp.toString()}`,{ shallow: true, scroll: false }); 
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