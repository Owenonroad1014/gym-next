import React from "react";
import styles from "./components/_styles/RentalPage.module.css";
import HeroSection from "./components/HeroSection";
// import backgroundImg from './img/noctice_background.jpg';

const NoticeItem = ({ number, title, description, image }) => (
  <article className={styles.noticeItem}>
    <span className={styles.noticeNumber}>{number}</span>
    <div className={styles.noticeContent}>
      <h3 className={styles.noticeTitle}>{title}</h3>
      <p className={styles.noticeDescription}>{description}</p>
    </div>
  </article>
);

const RentalNoticeSection = () => {
  const notices = [
    {
      number: "1",
      title: "預約與訂金",
      description: "租借前需提前預約，並支付租金的30%作為訂金。",
    },
    {
      number: "2",
      title: "租借與歸還時間",
      description:
        "最短租借期限為1天，器材須於約定時間內歸還，逾期將收取額外費用（每日按租金10%計算）。",
    },
    {
      number: "3",
      title: "設備保養與責任",
      description:
        "承租人須妥善使用與維護器材，如有明顯損壞或遺失，承租人需照價賠償或支付維修費用。",
    },
    {
      number: "4",
      title: "取消與退款政策",
      description:
        "若需取消租借，請至少提前48小時通知，可退還訂金；未提前通知者，訂金不予退還。",
    },
    {
      number: "5",
      title: "租借文件與押證",
      description: "承租人需出示有效證件（身分證、駕照或護照）進行登記。",
    },
  ];

  return (
    <>

    <HeroSection />
    <section className={styles.noticeSection}>
      <div className={styles.noticeContainer}>
        <div className={styles.noticeGrid}>
          {notices.map((notice) => (
            <NoticeItem key={notice.number} {...notice} />
          ))}
        </div>
      </div>
      <aside className={styles.noticeSidebar}>
        <h2 className={styles.sidebarTitle}>
          <span className={styles.rental}>RENTAL</span>
          <br />
          <span className={styles.not}>NOT</span>
          <br />
          <span className={styles.ice}>ICE</span>
        </h2>
      </aside>
    </section>
    </>
  );
};

export default RentalNoticeSection;
