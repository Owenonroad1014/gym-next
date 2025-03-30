'use client'

import React, { useState } from 'react';
import styles from './_styles/coaches-card.module.css';
import { IMGS_PATH } from '../../../config/api-path';
import { MdEmail, MdPhone, MdSportsHandball } from 'react-icons/md';
import { FaInfoCircle } from 'react-icons/fa';

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
    <div 
      className={`${styles['coaches-card']} ${isHovered ? styles.hovered : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles['card-left']}>
        <div className={styles['avatar-container']}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${IMGS_PATH}/${avatar}`} alt={name} className={styles.avatar} />
        </div>
      </div>
      
      <div className={styles['card-right']}>
        <h2 className={styles.name}>{name}</h2>
        <div className={styles.divider}></div>
        
        <div className={styles.contact}>
          <div className={styles.contactItem}>
            <MdEmail className={styles.icon}/>
            <span>{email}</span>  
          </div>
          <div className={styles.contactItem}>
            <MdPhone  className={styles.icon}/>
            <span>{phone}</span>
          </div>
        </div>
        
        <div className={styles.skill}>
          <MdSportsHandball className={styles.icon}/>
          <span>{skill}</span>
        </div>
        
        <div className={styles.description}>
          <FaInfoCircle className={styles.icon} />
          <span>{truncateDescription(description)}</span>
        </div>

        <a href={`/coaches/list/${id}`} className={styles['arrow-circle']}>
          <span className={styles.arrow}>→</span>
        </a>
      </div>
    </div>
  );
};

export default CoachesCard;
