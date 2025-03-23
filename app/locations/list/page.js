'use client'

import styles from '../_styles/locations.module.css';
import React, { useState, useEffect } from 'react';
import Search from '../_components/search';
import Banner from '../_components/banner';
import { MdShareLocation } from 'react-icons/md';
import LocationCard from '../_components/locations-card';
import Breadcrumb from '../_components/breadcrumb';
import { LOCATIONS_LIST } from '@/config/api-path';

export default function LocationsPage() {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const breadcrumb = ['home', '營業GYM點'];

  // 獲取初始數據
  useEffect(() => {
    fetch(`${LOCATIONS_LIST}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched data:', data);
        setLocations(data.rows);
        setFilteredLocations(data.rows);
      })
      .catch((error) => console.error('獲取locations數據失敗:', error));
  }, []);

  // 處理搜索
  const handleSearch = (term) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      setFilteredLocations(locations);
      return;
    }

    const searchParts = term.toLowerCase().split(' ').filter(part => part.length > 0);
    
    // 根據location和branch進行過濾
    const filtered = locations.filter(location => {
      const locationName = location.location?.toLowerCase() || '';
      const branchName = location.branch?.toLowerCase() || '';
      
      // 檢查每個搜索部分是否匹配location或branch
      return searchParts.every(part => 
        locationName.includes(part) || 
        branchName.includes(part)
      );
    });

    // 根據匹配程度進行排序
    const sorted = filtered.sort((a, b) => {
      const aMatch = `${a.location} ${a.branch}`.toLowerCase();
      const bMatch = `${b.location} ${b.branch}`.toLowerCase();
      const search = term.toLowerCase();
      
      // 完全匹配優先
      if (aMatch === search) return -1;
      if (bMatch === search) return 1;
      
      // 部分匹配按匹配程度排序
      const aScore = aMatch.split(' ').filter(word => search.includes(word)).length;
      const bScore = bMatch.split(' ').filter(word => search.includes(word)).length;
      
      return bScore - aScore;
    });
    
    setFilteredLocations(sorted);
  };

  return (
    <>
      <Banner
        title="營業GYM點"
        subtitle="尋找有相同運動愛好的朋友，一起GYM步吧！"
      />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.searchSection}>
            <div className={styles.locationIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </div>
            <h2 className={styles.secTitle}>尋找據點</h2>
            <div className={styles.filterContainer}>
              <Search onSearch={handleSearch} />
            </div>
          </div>
          <div className={styles.mapContainer}>
            <div className={styles.mapIcon}>
              <MdShareLocation />
            </div>
            <h3> 點擊尋找最近的據點</h3>
          </div>
        </div>
        <div className={styles.toolsContainer}>
          <Breadcrumb breadcrumb={breadcrumb} />
        </div>
        <div className={styles.locationsContainer}>
          {filteredLocations.length === 0 ? (
            <div className={styles.emptyResults}>
              <p>{searchTerm ? '未找到符合條件的據點' : '請輸入搜索條件以顯示據點'}</p>
            </div>
          ) : (
            filteredLocations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))
          )}
        </div>
      </div>
    </>
  );
}
