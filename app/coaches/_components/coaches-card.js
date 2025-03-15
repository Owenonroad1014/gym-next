'use client'

import React, { useState } from 'react';
import styles from './_styles/coaches-card.module.css';
import { AVATAR_PATH } from '../../../config/api-path';

const CoachesCard = ({
    id = "1",
    avatar,
    name,
    email,
    phone,
    skill,
    description,
  }) => {
    const [isHovered, setIsHovered] = useState(false);


    const truncateDescription = (text, limit = 20) => {
        if (text.length <= limit) return text;
        return text.slice(0, limit) + '...';
      };

  
    return (
      <>
        <div 
          className={`${styles['coaches-card']} ${isHovered ? styles.hovered : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={styles['card-left']}>
            <div className={styles['avatar-container']}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${AVATAR_PATH}/${avatar}`} alt={name} className={styles.avatar} />
            </div>
          </div>
          <div className={styles['card-right']}>
            <h2 className={styles.name}>{name}</h2>
            <div className={styles.divider}></div>
            <p className={styles.contact}>email:{email}</p>
            <p className={styles.contact}>電話:{phone}</p>
            <p className={styles.skill}>專長:{skill}</p>
            <p className={styles.description}>資訊:{truncateDescription(description)}</p>
            <a href={`/coaches/list/${id}`} className={styles['arrow-circle']}>
              <span className={styles.arrow}>→</span>
            </a>
          </div>
        </div>
      </>
    );
  };
  

export default CoachesCard;
