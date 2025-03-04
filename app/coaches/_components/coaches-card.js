'use client'

import React, { useState } from 'react';
import styles from './_styles/coaches-card.module.css';

const CoachesCard = ({
  avatarUrl = 'https://avatar.iran.liara.run/public/boy?username=Scott',
  skill = "",
  name ="",
  email ="",
  phone ="",
  description = "",
  detailsUrl = "#",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
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
                <img src={avatarUrl} alt={name} className={styles.avatar} />
            </div>
        </div>
        <div className={styles['card-right']}>
            <h2 className={styles.name}>{name}</h2>
            <div className={styles.divider}></div>
            <p className={styles.contact}>email:{email}</p>
            <p className={styles.contact}>電話:{phone}</p>
            <p className={styles.skill}>專長:{skill}</p>
            <p className="description">資訊:{description}</p>
            <a href={detailsUrl} className={styles['arrow-circle']}>
                <span className={styles.arrow}>→</span>
            </a>
        </div>
    </div>
    </>
);
};

export default CoachesCard;
