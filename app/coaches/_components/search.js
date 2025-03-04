// SearchForm.jsx
import React, { useState } from 'react';
import styles from './_styles/search.module.css';

const SearchForm = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [branch, setBranch] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ location, branch });
  };

  return (
    <div className={styles.searchContainer}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <select 
          className={styles.select}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">地區</option>
          <option value="taipei">台北市</option>
          <option value="newtaipei">新北市</option>
        </select>
        
        <select 
          className={styles.select}
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
        >
          <option value="">分店</option>
          <option value="chunghua">中華店</option>
          <option value="chungshan">中山店</option>
        </select>
        
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