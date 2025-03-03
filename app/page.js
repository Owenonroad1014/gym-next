import React from 'react';
import styles from './_styles/home.module.css';


export default function Home() {
    return (
      <>
      
        <div>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>GYM 步空間</h1>
          <p>找教練、居家健身，找GYM友，GYM在這裡，GYM情享受！</p>
        </div>
      </div>
      <section className={styles.section}>
      </section>

      <section className={styles.section}>
        <h2>GYM學知識</h2>
        <p>認識更多健身知識</p>
        <div className={styles.grid}>
          <div className={styles.card}>
            <img src="/gym-basics.jpg" alt="GYM基本功" />
            <h3>GYM基本功</h3>
          </div>
          <div className={styles.card}>
            <img src="/gym-equipment.jpg" alt="GYM教學器材" />
            <h3>GYM教學器材</h3>
          </div>
        </div>
      </section>

      <section className={styles.section}>
  <h2>找GYM點</h2>
  <div className={styles.grid}>
  <div className={styles.gymCard}>
    <img src="/gym-location.jpg" alt="中華據點" />
    <div className={styles.gymCardContent}>
      <h3>中華據點</h3>
      <p>台南市中華東路100號</p>
      <p>營業時間: 06:00-22:00</p>
      <div className={styles.gymCardButtons}>
        <button className={styles.gymButton}>課程預約</button>
        <button className={styles.gymButton}>課表查詢</button>
      </div>
    </div>
  </div>
  <div className={styles.gymCard}>
    <img src="/gym-location.jpg" alt="中華據點" />
    <div className={styles.gymCardContent}>
      <h3>中華據點</h3>
      <p>台南市中華東路100號</p>
      <p>營業時間: 06:00-22:00</p>
      <div className={styles.gymCardButtons}>
        <button className={styles.gymButton}>課程預約</button>
        <button className={styles.gymButton}>課表查詢</button>
      </div>
    </div>
  </div>
  <div className={styles.gymCard}>
    <img src="/gym-location.jpg" alt="中華據點" />
    <div className={styles.gymCardContent}>
      <h3>中華據點</h3>
      <p>台南市中華東路100號</p>
      <p>營業時間: 06:00-22:00</p>
      <div className={styles.gymCardButtons}>
        <button className={styles.gymButton}>課程預約</button>
        <button className={styles.gymButton}>課表查詢</button>
      </div>
    </div>
  </div>
  </div>
  
  
</section>
    </div>
      </>
    )
  }