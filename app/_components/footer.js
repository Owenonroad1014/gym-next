// Footer.js

'use client'

import React from 'react'
import styles from './_styles/footer.module.css'
import { usePathname } from 'next/navigation'
import { FaYoutube,FaFacebookF } from "react-icons/fa";

export default function Footer() {
  const pathname = usePathname() // 使用 Next.js 的 usePathname 來取得當前路徑
  if (pathname.startsWith('/member' || '/member/register')) {
    return null
    // `/member` 底下的頁面不顯示 Footer
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.top}>
          <section className={styles.part}>
            <div className={styles.title}>
            CONTACT  &  FOLLOW  US!</div>
            <div className={styles.group}>
              <div className={styles.contactItem}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.66211 1.44151C9.21094 0.351663 8.02148 -0.228415 6.88477 0.0821317L1.72852 1.48838C0.708984 1.76963 0 2.69541 0 3.7501C0 18.2462 11.7539 30.0001 26.25 30.0001C27.3047 30.0001 28.2305 29.2911 28.5117 28.2716L29.918 23.1153C30.2285 21.9786 29.6484 20.7892 28.5586 20.338L22.9336 17.9942C21.9785 17.5958 20.8711 17.8712 20.2207 18.6739L17.8535 21.5626C13.7285 19.6114 10.3887 16.2716 8.4375 12.1466L11.3262 9.78526C12.1289 9.12901 12.4043 8.02744 12.0059 7.07237L9.66211 1.44737V1.44151Z"
                    fill="#F5FFF6"
                  />
                </svg>
                {/* <div className={styles.contactText}>0998981798</div> */}
              </div>
              <div className={styles.contactItem}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.8125 3.75C1.25977 3.75 0 5.00977 0 6.5625C0 7.44727 0.416016 8.2793 1.125 8.8125L13.875 18.375C14.543 18.873 15.457 18.873 16.125 18.375L28.875 8.8125C29.584 8.2793 30 7.44727 30 6.5625C30 5.00977 28.7402 3.75 27.1875 3.75H2.8125ZM0 10.3125V22.5C0 24.5684 1.68164 26.25 3.75 26.25H26.25C28.3184 26.25 30 24.5684 30 22.5V10.3125L17.25 19.875C15.9141 20.877 14.0859 20.877 12.75 19.875L0 10.3125Z"
                    fill="#F5FFF6"
                  />
                </svg>
                {/* <div className={styles.contactText}>0998981798</div> */}
              </div>
              <div className={styles.contactItem}>
                <FaYoutube style={{width:"18px",height:"18px",color:"#fff"}}/>
              </div>
              <div className={styles.contactItem}>
                <FaFacebookF style={{width:"18px",height:"18px",color:"#fff"}}/>
              </div>
            </div>
          </section>
        </div>

        <div className={styles.bottom}>Copyright © 2025 GYM步空間 GYMBOO</div>
      </div>
    </>
  )
}
