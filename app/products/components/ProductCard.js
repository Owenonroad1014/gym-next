import AddToCartButton from "./AddToCartButton";
import styles from "./_styles/ProductCard.module.css";
import { IMG_PATH } from "@/config/api-path";
import Link from "next/link";
import FavoriteButton from "./favorite-button";
import { useAuth } from '@/context/auth-context'


const ProductCard = ({ id, product_name, price, description, image_url, variant, like_id, setIsLiked, average_rating  }) => {
  const cardClass = variant === "light" ? styles.cardLight : styles.cardDark;

  return (
    <Link href={`/products/${id}`} className={`${styles.card} ${cardClass}`}>
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
          
          <div className={styles.rating}>
  {average_rating !== null ? (
    [1, 2, 3, 4, 5].map((star) => (
      <span key={star} className={styles.star}>
        {average_rating >= star 
          ? "★" 
          : average_rating >= star - 0.5 
          ? "✭"  // 改用較為普遍的半顆星符號
          : "☆"}
      </span>
    ))
  ) : (
    <div></div>
  )}
</div>
          <div className={styles.btns}>
            <AddToCartButton variant={variant} />
      <FavoriteButton product_id={id} like_id={like_id} setIsLiked={setIsLiked}/>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
