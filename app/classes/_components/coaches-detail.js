'use client'
import React from 'react';
import styles from './_styles/coach-detail.module.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import Sort from './sort';

const CoachDetail = ({
  avatarUrl = '',
  name = "",
  title = "",
  email = "",
  phone = "",
  skills = [],
  socialMedia = {
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: ""
  },
  description = "",
  certifications = []
}) => {

    const sortItems = ['home', '教練列表', '教練資訊']

  return (
    <div className={styles['coach-detail-container']}>
    
      <Sort items={sortItems}/>

       
      <div className={styles['coach-content']}>
        <div className={styles['coach-image-container']}>
          <img 
            src={avatarUrl} 
            alt={`${name} 教練照片`} 
            className={styles['coach-image']} 
          />
          <div className={styles['social-media']}>
            {socialMedia.facebook && (
              <a href={socialMedia.facebook} target="_blank" rel="noopener noreferrer" className={styles['social-icon']}>
                <FaFacebookF />
              </a>
            )}
            {socialMedia.instagram && (
              <a href={socialMedia.instagram} target="_blank" rel="noopener noreferrer" className={styles['social-icon']}>
                <FaInstagram />
              </a>
            )}
            {socialMedia.twitter && (
              <a href={socialMedia.twitter} target="_blank" rel="noopener noreferrer" className={styles['social-icon']}>
                <FaTwitter />
              </a>
            )}
            {socialMedia.linkedin && (
              <a href={socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className={styles['social-icon']}>
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
              <span className={styles['info-label']}>電子郵件：</span>
              <span>{email}</span>
            </div>
            <div className={styles['info-item']}>
              <span className={styles['info-label']}>電話：</span>
              <span>{phone}</span>
            </div>
          </div>
          
          <div className={styles['skills-section']}>
            <h4 className={styles['section-title']}>專長領域</h4>
            <div className={styles['skills-list']}>
              {skills.map((skill, index) => (
                <span key={index} className={styles['skill-tag']}>{skill}</span>
              ))}
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
                <li key={index} className={styles['certification-item']}>{cert}</li>
              ))}
            </ul>
          </div>
          
          <div className={styles['cta-container']}>
            <button className={styles['contact-button']}>聯絡教練</button>
            <button className={styles['schedule-button']}>預約課程</button>
          </div>
        </div>
      </div>
    </div>


  );
};

export default CoachDetail;
