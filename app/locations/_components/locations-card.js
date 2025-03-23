'use client'
import React from 'react';
import Image from 'next/image';
import styles from './_styles/locations-card.module.css';
import { AVATAR_PATH } from '../../../config/api-path';

const LocationCard = ({ location }) => {
  return (
    <div className={styles.innerContainer}>
      <div className={styles.imageWrapper}>
        <Image 
          src={`${AVATAR_PATH}/${location.avatar}`}
          alt="場地照片"
          width={296}
          height={212}
        />
      </div>
      
      <div className={styles.contentWrapper}>
        <div className={styles.titleSection}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>{location.location}{location.branch}</h1>
          </div>
          
          <div className={styles.infoContainer}>
            <div className={styles.info}>
              {location.address}<br/>
              營業時間: {location.business_hours}
            </div>
          </div>
        </div>
        
        <div className={styles.buttonContainer}>
          <button className={styles.button}>
            課程預約
          </button>
          <button className={styles.button}>
            課表查詢
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
