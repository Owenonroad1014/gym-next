import React from "react";
import AddToCartButton from "./AddToCartButton";
import { FaRegHeart } from "react-icons/fa";
import styles from "./_styles/ProductCard.module.css";
import { PRODUCTS_LIST , IMG_PATH} from "@/config/api-path";

const ProductCard = ({ product_name, price, description, image_url, variant }) => {
  const cardClass = variant === "light" ? styles.cardLight : styles.cardDark;

  return (
    <article className={`${styles.card} ${cardClass}`}>
      <div className={styles.imageContainer}>
        <img src={`${IMG_PATH}/${image_url}`} alt={product_name} className={styles.productImage} />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>{product_name}</h2>
          <p className={styles.price}>{`${price}元/天`}</p>
        </div>
        <hr className={styles.divider} />
        <p className={styles.description}>{description}</p>
        <div className={styles.btns}>
        <AddToCartButton variant={variant}     />
        <FaRegHeart className={styles.heart}/>

        </div>
      </div>
    </article>
  );
};

export default ProductCard;