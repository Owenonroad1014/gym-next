// SearchForm.jsx
import React, { useState } from 'react';
import styles from './_styles/search.module.css';

const SearchForm = ({ onSearch }) => {
  const [products, setProducts] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ products });
  };

  return (
    <div className={styles.searchContainer}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input 
          className={styles.select}
          placeholder='輸入商品名稱'
          onChange={(e) => setProducts(e.target.value)}
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