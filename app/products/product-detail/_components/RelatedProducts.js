import React from "react";
import styles from "./_styles/ProductDetail.module.css";
import ProductCard from "./ProductCard";

const RelatedProducts = () => {

  const products = [
    {
      id: 1,
      name: '拳擊手套',
      price: '45元/天',
      description: '高品質拳擊手套，適合訓練或比賽。高品質拳擊手套，適合訓練或比賽。',
      image:
        "/img/products.jpg",
      variant: 'dark',
    },
    {
      id: 2,
      name: '拳擊手套',
      price: '45元/天',
      description: '高品質拳擊手套，適合訓練或比賽。高品質拳擊手套，適合訓練或比賽。',
      image:
        "/img/products.jpg",
      variant: 'dark',
    },
    {
      id: 3,
      name: '拳擊手套',
      price: '45元/天',
      description: '高品質拳擊手套，適合訓練或比賽。高品質拳擊手套，適合訓練或比賽。',
      image:
        "/img/products.jpg",
      variant: 'dark',
    },
    {
      id: 4,
      name: '拳擊手套',
      price: '45元/天',
      description: '高品質拳擊手套，適合訓練或比賽。高品質拳擊手套，適合訓練或比賽。',
      image:
        "/img/products.jpg",
      variant: 'dark',
    }]

  return (
    <section className={styles.relatedProducts}>
      <div className={styles.relatedProductsGrid}>
      {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
