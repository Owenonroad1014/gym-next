import React from "react";
import AddToCartButton from "./AddToCartButton";
import { FaRegHeart } from "react-icons/fa";
import styles from "./_styles/ProductCard.module.css";
import { useState } from "react";



const ProductCard = ({ name, price, description,variant }) => {
  const cardClass = variant === "light" ? styles.cardLight : styles.cardDark;
  const [isFullscreen, setIsFullscreen] = useState(false);

const toggleFullscreen = () => {
  setIsFullscreen(!isFullscreen);
};

  return (

    <>
        {isFullscreen &&(
        <div className={styles.overlay} onClick={toggleFullscreen}></div>
      )}
    <article className={`${styles.card} ${cardClass}`}>
      <div className={`${styles.imageContainer} ${
          isFullscreen ? styles.fullscreen : ""
        }`} >
      <iframe width="100%" height="315" src="https://www.youtube.com/embed/Fs1MMJ3X4Rc?si=zS9o-H5uSNJQ6ZZb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>{name}</h2>
          <p className={styles.price}>{price}</p>
        </div>
        <hr className={styles.divider} />
        <p className={styles.description}>{description}</p>
        <div className={styles.btns}>
        <AddToCartButton variant={variant}     />
        <FaRegHeart className={styles.heart}/>

        </div>
      </div>
    </article>

    </>
  );
};

export default ProductCard;