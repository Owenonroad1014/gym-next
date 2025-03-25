import React from "react";
import styles from "../_styles/data.module.css";
import { IMG_PATH } from "@/config/api-path";

function CartItem({ item }) {
  const { name, weight, quantity, image, rentalStartDate, rentalEndDate, price } = item;

  const rentalDays =
    (new Date(rentalEndDate) - new Date(rentalStartDate)) /
      (1000 * 60 * 60 * 24) || 1;
  const totalPrice = price * quantity * rentalDays;
  return (
    <article className={styles.cartItem}>
      <div className={styles.content}>
      <img src={`${IMG_PATH}/${image}`} alt={name} className={styles.img} />
        <div className={styles.info}>
          <div className={styles.product}>
            <h3 className={styles.div4}>{name}</h3>
            <p className={styles.kg}>{weight}</p>
            <p className={styles.x1}>x{quantity}</p>
          </div>
          <div className={styles.dayprice}>
            <div className={styles.css20250411202504154}>
              開始:{rentalStartDate}
              <br />
              結束:{rentalEndDate}
              <br />
              天數:{rentalDays}天
            </div>
            <p className={styles.css500}>{price}/天</p>
            <p className={styles.css2000}>${totalPrice}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default CartItem;
