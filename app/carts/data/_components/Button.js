"use client";

import styles from "./_styles/button.module.css";
import Link from "next/link";

export default function Button({ isFormValid }) {
  const handleSubmit = (e) => {
    e.preventDefault();// 防止默認的表單提交行為

    if (!isFormValid) {
      alert("請確認表單填寫正確！");
    } else {
      alert("表單提交成功！");
    }
  };

  return (
    <div className={styles.container}>
      <Link href="/carts">
        <button className={styles.pseudo}>
          <span>回上一頁</span>
        </button>
      </Link>

      <button className={styles.pseudo2} onClick={handleSubmit} disabled={!isFormValid}>
        <span>送出訂單</span>
      </button>
    </div>
  );
}
