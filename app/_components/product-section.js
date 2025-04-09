"use client"
import styles from './_styles/home.module.css';
import Image from 'next/image';

const ProductSection = () => {
  const products = [
    {
      id: 1,
      name: '瑜珈墊',
      price: 'NT$1,200',
      image: '/images/yoga-mat.jpg',
      description: '專業防滑瑜珈墊，舒適耐用'
    },
    {
      id: 2,
      name: '重訓啞鈴組',
      price: 'NT$3,500',
      image: '/images/dumbbell-set.jpg',
      description: '可調節式啞鈴，適合居家訓練'
    },
    {
      id: 3,
      name: '彈力帶組合',
      price: 'NT$800',
      image: '/images/resistance-bands.jpg',
      description: '多段式阻力帶，全身肌群訓練'
    },
    {
      id: 4,
      name: '運動護具套組',
      price: 'NT$1,500',
      image: '/images/protection-gear.jpg',
      description: '專業運動防護，安全有保障'
    }
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>精選商品</h2>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.imageContainer}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                className={styles.productImage}
              />
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productPrice}>{product.price}</p>
              <p className={styles.description}>{product.description}</p>
              <button className={styles.addToCartButton}>加入購物車</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;