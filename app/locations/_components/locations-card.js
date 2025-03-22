'use client'
import React from 'react';
import Image from 'next/image';
import styles from './_styles/locations-card.module.css';

const LocationCard = ({ location }) => {
  return (
    <div className={styles.innerContainer}>
      <div className={styles.imageWrapper}>
        {/* <Image 
          src={location.avatar || "https://placehold.co/225x200"}
          alt="場地照片"
          width={225}
          height={200}
        /> */}
      </div>
      
      <div className={styles.contentWrapper}>
        <div className={styles.titleSection}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>{location.location}</h1>
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
