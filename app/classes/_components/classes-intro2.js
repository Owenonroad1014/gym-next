'use client'

import React, { useState, useEffect } from 'react'
import styles from './_styles/classes-intro2.module.css';
import Image from 'next/image';

export default function ClassesIntro2(props) {
    const {
      avatarUrl = '',
      title = "",
      description = "",

    } = props;
    return (
        <div className={styles['classes-intro-container']}>

      
            <div className={styles['classes-content']}>
            <div className={styles['classes-info']}>
              <h3 className={styles['classes-title']}>{title}</h3>
              <div className={styles['classes-info']}>
                <p className={styles.description}>{description}</p>
              </div>
              <div className={styles['cta-container']}>
                <button className={styles['classes-button']}>+</button>
              </div>
            </div>
            
            <div className={styles['classes-image-container']}>
            <Image 
            src={avatarUrl}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
          />
            </div>
          </div>
        </div>
    
    
      );
    }

