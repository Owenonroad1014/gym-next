'use client'

import styles from "../_styles/button.module.css"
import Link from 'next/link'

export default function ComponentsButton() {
  return (
    <>
    <div className={styles.container}>
    <Link href="/carts">
      <button href="#" className={styles.pseudo}>
        <span>回上一頁</span>
      </button>
      </Link>

      <Link href="/carts/complete">
      <button href="#" className={styles.pseudo2}>
        <span>送出訂單</span>
      </button>
      </Link>
    </div>

    </>
  )
}
