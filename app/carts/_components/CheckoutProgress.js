import React from "react";
import styles from "../_styles/carts.module.css";

function CheckoutProgress() {
  return (
    <section className={styles.progress}>
      <div className={styles.progressItem}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/be1df1e94a91e6333b4746629c51437d279b540165b96963d1fbe8e6a2bbdcba?placeholderIfAbsent=true"
          alt="Step 1"
          className={styles.img}
        />
        <span>訂單確認</span>
      </div>
      <div className={styles.progressLine} />
      <div className={styles.progressItem}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5c2c52197f86eee3350a8b86173a6cd71b7471534f53ccbd17f78254d3d980d8?placeholderIfAbsent=true"
          alt="Step 2"
          className={styles.img2}
        />
      </div>
      <div className={styles.progressLine} />
      <div className={styles.progressItem}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b13dfedbc7412b5757e67bddef0776ed450f7f5d25a019544968c2a65fc5637c?placeholderIfAbsent=true"
          alt="Step 3"
          className={styles.img}
        />
        <span>完成訂單</span>
      </div>
    </section>
  );
}

export default CheckoutProgress;
