import React from "react";
import { AiOutlineForm } from "react-icons/ai"; // 填寫資料
import { GrCart } from "react-icons/gr"; // 訂單確認
import { MdOutlineCheckCircle } from "react-icons/md"; // 訂單完成
import styles from "./_styles/CheckoutProgress.module.css";
import { HiArrowSmallRight } from "react-icons/hi2";

function CheckoutProgress() {
  return (
    <section className={styles.progress}>

    {/* 訂單確認 */}
    <div className={styles.progressItem}>
        <span style={{color: "orange"}}>step1</span>
        <GrCart size={50} color="orange"/>
        <span style={{color: "orange"}}>訂單確認</span>
      </div>

      {/* <div className={styles.progressLine} /> */}
      <HiArrowSmallRight size={50}/>

      {/* 填寫資料 */}
      <div className={styles.progressItem}>
        <span>step2</span>
        <AiOutlineForm size={50}/>
        <span>填寫資料</span>
      </div>

      {/* <div className={styles.progressLine} /> */}
      <HiArrowSmallRight size={50}/>

      {/* 完成訂單 */}
      <div className={styles.progressItem}>
        <span>step3</span>
        <MdOutlineCheckCircle size={50} />
        <span>完成訂單</span>
      </div>
    </section>
  );
}

export default CheckoutProgress;
