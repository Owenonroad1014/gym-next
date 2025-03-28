'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styles from './_styles/locations-card.module.css'
import { IMGS_PATH } from '../../../config/api-path'
import { MdLocationOn, MdPhone, MdAccessTime } from 'react-icons/md'
import ConfirmationModal from '@/app/_components/confirm-modal'

const LocationCard = ({ location }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = (e) => {
    e.stopPropagation(); // 阻止事件冒泡
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.innerContainer}>
        <div className={styles.imageWrapper}>
          <Image
            src={`${IMGS_PATH}/${location.avatar}`}
            alt="場地照片"
            fill
            sizes="(max-width: 440px) 200px, 296px"
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.titleSection}>
            <div className={styles.titleContainer}>
              <h1 className={styles.title}>
                {location.location}
                {location.branch}
              </h1>
            </div>
            <div className={styles.infoContainer}>
              <div className={styles.info}>
                <div className={styles.infoItem}>
                  <MdLocationOn className={styles.icon} />
                  <span>{location.address}</span>
                </div>
                <div className={styles.infoItem}>
                  <MdPhone className={styles.icon} />
                  <span>{location.phone}</span>
                </div>
                <div className={styles.infoItem}>
                  <MdAccessTime className={styles.icon} />
                  <span>{location.business_hours}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={(e) => {
                console.log('Button clicked - stopping propagation')
                e.stopPropagation()
                console.log('Opening modal')
                handleOpenModal()
              }}
            >
              課表查詢 / 預約
            </button>
          </div>
        </div>
      </div>
      <ConfirmationModal
        id="testModal"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        location={location}
      />
    </>
  )
}
export default LocationCard
