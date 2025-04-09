"use client"
import { useState } from "react";
import styles from "./_styles/video-Card.module.css";
import FavoriteButton from "./favorite-button";


const VideoCard = ({ id, video_title, description, url, variant, like_id, setIsLiked }) => {
  const cardClass = variant === "light" ? styles.cardLight : styles.cardDark;
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = (e) => {
    // 檢查點擊目標是否為收藏按鈕或加入購物車按鈕
    if (!e.target.closest(`.${styles.btn}`)) {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div 
        className={`${styles.card} ${cardClass}`} 
        onClick={handleCardClick}
        onKeyDown={(e) => e.key === 'Enter' && handleCardClick(e)}
        role="button"
        tabIndex={0}
        aria-label={`播放影片: ${video_title}`}
      >
            <div className={styles.btn}>
            <FavoriteButton video_id={id} like_id={like_id} setIsLiked={setIsLiked}/>
          </div>
        <div className={styles.imageContainer}>
          <iframe 
            width="100%" 
            height="350" 
            src={url} 
            style={{ border: 'none' }}
            title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
          ></iframe>
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.title}>{video_title}</h2>
          </div>
          <hr className={styles.divider} />
          <p className={styles.description}>{description}</p>
          {/* <div className={styles.btns}>
          <AddToCartButton />
          </div> */}
        </div>
      </div>

      {showModal && (
        <div 
          className={styles.modalOverlay} 
          role="dialog"
          aria-modal="true"
          aria-label="影片播放器"
        >
        <iframe 
            width="80%" 
            height="510" 
            style={{ border: 'none', borderRadius: '5px' }}
            src={url} 
            title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
          ></iframe>
          <div className={styles.modalContent}>
            {/* <h1 className={styles.video_header}>About</h1> */}
            <div className={styles.video_title}>
              {video_title}
            </div>
            <hr className={styles.divder}/>
            <p className={styles.video_description}>{description}</p>
          </div>
          <button className={styles.closeButton} onClick={closeModal}>
            &times;
          </button>
        </div>
      )}
    </>
  );
};

export default VideoCard;
