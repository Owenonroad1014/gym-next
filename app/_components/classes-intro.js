'use client'
import React from 'react'
import styles from './_styles/classes-intro.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function ClassesIntro({
  classType,
  variant = 'type1',
}) {
  return (
    <div className={styles['classes-intro-container']}>
      <div className={`${styles['classes-content']} ${styles[variant]}`}>
        <div className={styles['classes-image-container']}>
          {/* <Image
            // src={classType.avatarUrl}
            alt={classType.type_name}
            fill
            style={{ objectFit: 'cover' }}
          /> */}
        </div>

        <div className={styles['classes-info']}>
          <Link href="/classes/list/detail">
            
            <div className={styles['classes-info']}>
            <h3 className={styles['classes-title']}>{classType.type_name}</h3>
              <p className={styles.description}>{classType.description}</p>
            </div>
          </Link>

          <div className={styles['cta-container']}>
            <button className={styles['classes-button']}>+</button>
          </div>
        </div>
      </div>
    </div>
  )
}
