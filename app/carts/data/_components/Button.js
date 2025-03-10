'use client'

import styles from "../_styles/button.module.css"

export default function ComponentsButton() {
  return (
    <>
    <div className={styles.container}>
      <button href="#" className={styles.pseudo}>
        <span>回上一頁</span>
      </button>
      <button href="#" className={styles.pseudo2}>
        <span>送出訂單</span>
      </button>
    </div>

    </>
  )
}
