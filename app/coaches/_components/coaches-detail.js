'use client'
import React from 'react'
import styles from './_styles/coach-detail.module.css'
import { useState } from 'react'
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from 'react-icons/fa'
import Breadcrumb from './bread'
import CoachCalendar from './coaches-calendar'
import { IMGS_PATH } from '../../../config/api-path'
import { MdEmail, MdPhone } from 'react-icons/md'

const CoachDetail = ({
  avatar = '',
  name = '',
  title = '',
  email = '',
  phone = '',
  skill = '',
  socialMedia = {
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
  },
  description = '',
  certifications = [],
}) => {
  console.log('Received props:', {
    avatar,
    name,
    title,
    email,
    phone,
    skill,
    socialMedia,
    description,
    certifications,
  })

  const breadcrumb = ['home', '教練列表', '教練資訊']
  const [isOpen, setIsOpen] = useState(false)
  const handleClose = () => {
    setIsOpen(!isOpen) 
  }

  return (
    <>
    <div className={styles['coach-detail-container']}>
      <Breadcrumb breadcrumb={breadcrumb} />

      <div className={styles['coach-content']}>
        <div className={styles['coach-image-container']}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${IMGS_PATH}/${avatar}`}
            alt={`${name} 教練照片`}
            className={styles['coach-image']}
          />
          <div className={styles['social-media']}>
            {socialMedia.facebook && (
              <a
                href={socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={styles['social-icon']}
              >
                <FaFacebookF />
              </a>
            )}
            {socialMedia.instagram && (
              <a
                href={socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={styles['social-icon']}
              >
                <FaInstagram />
              </a>
            )}
            {socialMedia.twitter && (
              <a
                href={socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className={styles['social-icon']}
              >
                <FaTwitter />
              </a>
            )}
            {socialMedia.linkedin && (
              <a
                href={socialMedia.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles['social-icon']}
              >
                <FaLinkedinIn />
              </a>
            )}
          </div>
        </div>

        <div className={styles['coach-info']}>
          <h2 className={styles['coach-name']}>{name}</h2>
          <h3 className={styles['coach-title']}>{title}</h3>

          <div className={styles['contact-info']}>
            <div className={styles['info-item']}>
              <MdEmail style={{ width: '1.2rem', height: '1.2rem', marginRight: '0.5rem'}} />
              <a href={`mailto:${email}`} className={styles['contact-link']}>{email}</a>
            </div>
            <div className={styles['info-item']}>
              <MdPhone style={{ width: '1.2rem', height: '1.2rem', marginRight: '0.5rem'}} />
              <a href={`tel:${phone}`} className={styles['contact-link']}>{phone}</a>
            </div>
          </div>

          <div className={styles['skill-section']}>
            <h4 className={styles['section-title']}>專長領域</h4>
            <div className={styles['skill-list']}>
              <span className={styles['skill-tag']}>{skill}</span>
            </div>
          </div>

          <div className={styles['description-section']}>
            <h4 className={styles['section-title']}>個人簡介</h4>
            <p className={styles.description}>{description}</p>
          </div>

          <div className={styles['certifications-section']}>
            <h4 className={styles['section-title']}>專業證照</h4>
            <ul className={styles['certifications-list']}>
              {certifications.map((cert, index) => (
                <li key={index} className={styles['certification-item']}>
                  {cert}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles['cta-container']}>
            {/* <button className={styles['contact-button']}>聯絡教練</button> */}
            <button className={styles['schedule-button']} onClick={handleClose}> {isOpen ? '關閉課程表' : '預約課程'}</button>
          </div>
        </div>
      </div>
     
    </div>
 <CoachCalendar name={name} isOpen={isOpen} />
 </>
  )
}

export default CoachDetail
